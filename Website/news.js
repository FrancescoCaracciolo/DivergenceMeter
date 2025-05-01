// API endpoints
const API_ENDPOINTS = {
    DIVERGENCE: 'https://divergence.nyarchlinux.moe/api/divergence',
    NEWS: 'https://divergence.nyarchlinux.moe/api/news',
    PLOT: 'https://divergence.nyarchlinux.moe/api/plot'
};

// Add pagination state
let currentPage = 1;
let totalPages = 1;
let totalItems = 0;
const itemsPerPage = 10;

// Add impact filter state
let currentImpactThreshold = 0.01;

// Add audio element for divergence change
const divergenceChangeSound = new Audio('images/divergence_change.mp3');

// Add a variable to track sound enabled state
let isSoundEnabled = true;

// Function to handle sound toggle change
function handleSoundToggle(event) {
    isSoundEnabled = event.target.checked;
}

// Function to update impact value display
function updateImpactValue(value) {
    const impactValue = document.getElementById('impact-value');
    if (impactValue) {
        impactValue.textContent = Number(value).toFixed(6);
    }
}

// Function to handle impact threshold change
function handleImpactChange(event) {
    currentImpactThreshold = parseFloat(event.target.value);
    updateImpactValue(currentImpactThreshold);
    currentPage = 1; // Reset to first page when changing threshold
    fetchNews();
}

// Function to strip HTML from text
function stripHtml(html) {
    const tmp = document.createElement('div');
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || '';
}

// Function to truncate text with ellipsis
function truncateText(text, maxLength = 150) {
    const cleanText = stripHtml(text);
    if (cleanText.length <= maxLength) return cleanText;
    return cleanText.substring(0, maxLength) + '...';
}

// Function to format number to 6 decimal places
function formatNumber(num) {
    if (num === null || num === undefined) return 'N/A';
    return Number(num).toFixed(6);
}

// Function to get Greek letter symbol
function getGreekLetter(field) {
    const greekLetters = {
        'ALPHA': 'α',
        'BETA': 'β',
        'GAMMA': 'γ',
        'DELTA': 'δ',
        'EPSILON': 'ε',
        'CHI': 'χ',
        'OMEGA': 'ω'
    };
    return greekLetters[field] || field;
}

// Function to format impact to 4 decimal places
function formatImpact(impact) {
    if (impact === null || impact === undefined) return 'N/A';
    return Number(impact).toFixed(4);
}

// Add a variable to store the previous divergence value
let previousDivergence = null;
let forceUpdate = false; // Add flag to force update when meter is clicked
let forceAnimate = false; // Add flag to force animation on click

// Function to check for divergence changes periodically
async function periodicCheck() {
    try {
        const response = await fetch(API_ENDPOINTS.DIVERGENCE);
        const data = await response.json();

        if (data.divergence === null) {
            return;
        }

        const currentDivergence = data.divergence;

        // Format both values to 6 decimal places for comparison
        const currentDivergenceFormatted = Number(currentDivergence).toFixed(6);
        const previousDivergenceFormatted = previousDivergence ? Number(previousDivergence).toFixed(6) : null;

        if (previousDivergenceFormatted === null || currentDivergenceFormatted !== previousDivergenceFormatted) {
            console.log(`Divergence changed from ${previousDivergenceFormatted} to ${currentDivergenceFormatted}. Refreshing data.`);
            // Play the divergence change sound
            if (isSoundEnabled) {
                divergenceChangeSound.play().catch(err => console.log('Error playing sound:', err));
            }
            // Set forceAnimate to true so the meter animates on this update
            forceAnimate = true;
            await fetchNews();
            await fetchPlot();
        }
    } catch (error) {
        console.error('Error during periodic check:', error);
    }
}

// Function to update pagination controls
function updatePaginationControls() {
    const paginationContainer = document.getElementById('pagination-controls');
    if (!paginationContainer) return;

    // Create pagination HTML
    let paginationHTML = '';

    // Previous button
    paginationHTML += `
        <button class="pagination-btn" ${currentPage === 1 ? 'disabled' : ''} onclick="changePage(${currentPage - 1})">
            Previous
        </button>
    `;

    // Page numbers
    for (let i = 1; i <= totalPages; i++) {
        if (
            i === 1 || // First page
            i === totalPages || // Last page
            (i >= currentPage - 1 && i <= currentPage + 1) // Pages around current
        ) {
            paginationHTML += `
                <button class="pagination-btn ${i === currentPage ? 'active' : ''}" 
                        onclick="changePage(${i})">
                    ${i}
                </button>
            `;
        } else if (
            i === currentPage - 2 || // Before current page
            i === currentPage + 2 // After current page
        ) {
            paginationHTML += `<span class="pagination-ellipsis">...</span>`;
        }
    }

    // Next button
    paginationHTML += `
        <button class="pagination-btn" ${currentPage === totalPages ? 'disabled' : ''} onclick="changePage(${currentPage + 1})">
            Next
        </button>
    `;

    paginationContainer.innerHTML = paginationHTML;
}

// Function to change page
async function changePage(newPage) {
    if (newPage < 1 || newPage > totalPages) return;

    currentPage = newPage;
    await fetchNews();
    updatePaginationControls();
}

// Function to fetch and display news
async function fetchNews() {
    try {
        console.log('Fetching news...'); // Debug log

        // Get current divergence from the dedicated endpoint
        const divergenceResponse = await fetch(API_ENDPOINTS.DIVERGENCE);
        const divergenceData = await divergenceResponse.json();
        const currentDivergence = divergenceData.divergence;

        // Fetch news data
        const response = await fetch(`${API_ENDPOINTS.NEWS}?page=${currentPage}&per_page=${itemsPerPage}&min_impact=${currentImpactThreshold}&max_impact=1`);
        const data = await response.json();

        const tableBody = document.getElementById('news-table-body');
        tableBody.innerHTML = ''; // Clear existing content

        if (!data.articles || data.articles.length === 0) {
            // Handle empty articles case
            tableBody.innerHTML = `
                <tr>
                    <td colspan="6" style="text-align: center;">
                        No news articles available with impact >= ${currentImpactThreshold}.
                    </td>
                </tr>
            `;
            return; // Exit early
        }

        data.articles.forEach(article => {
            // Create main row
            const mainRow = document.createElement('tr');
            mainRow.innerHTML = `
                <td class="expand-cell">
                    <span class="expand-icon"></span>
                </td>
                <td><a href="${article.link}">${article.title}</a></td>
                <td>${formatNumber(article.divergence)}</td>
                <td class="attractor-cell mobile-hide">${getGreekLetter(article.field)}</td>
                <td>${formatImpact(article.impact)}</td>
                <td class="mobile-hide">${stripHtml(truncateText(article.content))}</td>
                <td class="mobile-hide">${formatNumber(article.independent_divergence)}</td>
            `;
            tableBody.appendChild(mainRow);

            // Create details row
            const detailsRow = document.createElement('tr');
            detailsRow.className = 'details-row';
            detailsRow.innerHTML = `
                <td colspan="4">
                    <div class="details-content">
                        <p><strong>Attractor:</strong> ${getGreekLetter(article.field)}</p>
                        <p><strong>Description:</strong> ${stripHtml(article.content)}</p>
                        <p><strong>Independent Divergence:</strong> ${formatNumber(article.independent_divergence)}</p>
                    </div>
                </td>
            `;
            tableBody.appendChild(detailsRow);

            // Add click handler for expansion
            mainRow.addEventListener('click', function (e) {
                // Don't expand if clicking on the title link
                if (e.target.tagName === 'A') return;

                // Toggle expansion
                this.classList.toggle('expanded');
                const detailsRow = this.nextElementSibling;
                if (detailsRow && detailsRow.classList.contains('details-row')) {
                    detailsRow.style.display = this.classList.contains('expanded') ? 'table-row' : 'none';
                }
            });
        });

        // Update pagination state
        totalPages = data.pagination.total_pages;
        totalItems = data.pagination.total_count;
        updatePaginationControls();

        // Update divergence meter only if we have valid divergence data
        if (currentDivergence !== null && currentDivergence !== undefined) {
            console.log('Updating divergence meter with:', currentDivergence); // Debug log
            const shouldAnimate = forceAnimate || previousDivergence === null || previousDivergence !== currentDivergence;
            displayDivergenceMeter(currentDivergence.toString(), shouldAnimate);
            previousDivergence = currentDivergence;
            // Reset force animate flag
            forceAnimate = false;
        }
    } catch (error) {
        console.error('Error fetching news:', error);
        // Display error message in the table
        const tableBody = document.getElementById('news-table-body');
        tableBody.innerHTML = `
            <tr>
                <td colspan="6" style="text-align: center; color: #FF4500;">
                    Error loading news. Please try again later.
                </td>
            </tr>
        `;
    }
}

// Function to fetch and display plot
async function fetchPlot() {
    try {
        const iframe = document.getElementById('plot-frame');
        iframe.src = API_ENDPOINTS.PLOT;

        // Add event listener to handle iframe load
        iframe.onload = function () {
            // Attempt to adjust iframe height to content if needed
            try {
                const height = iframe.contentWindow.document.body.scrollHeight;
                iframe.style.height = `${height}px`;
            } catch (e) {
                console.log('Could not adjust iframe height:', e);
            }
        };
    } catch (error) {
        console.error('Error fetching plot:', error);
        document.getElementById('plot-frame').style.display = 'none';
    }
}

// Function to refresh news periodically (every minute)
function startNewsRefresh() {
    // Add impact threshold event listener
    const impactThreshold = document.getElementById('impact-threshold');
    if (impactThreshold) {
        impactThreshold.addEventListener('input', handleImpactChange);
        // Set initial value
        updateImpactValue(impactThreshold.value);
    }

    // Initial fetch for news, plot, and setting initial divergence
    fetchNews();
    fetchPlot();

    // Start periodic check for divergence changes
    setInterval(periodicCheck, 60 * 1000); // Check every minute

    // Add event listener for sound toggle
    initializeSoundToggle();
}

// Function to handle divergence meter click
function handleDivergenceMeterClick(event) {
    console.log('Divergence meter clicked'); // Debug log
    event.preventDefault(); // Prevent any default behavior
    // Play the divergence change sound
    if (isSoundEnabled) {
        divergenceChangeSound.play().catch(err => console.log('Error playing sound:', err));
    }
    // Force update and animation on click
    forceUpdate = true;
    forceAnimate = true;
    fetchNews(); // Update table and divergence meter
    fetchPlot(); // Update plot
}

// Add event listener for sound toggle
function initializeSoundToggle() {
    const soundToggle = document.getElementById('sound-toggle');
    if (soundToggle) {
        soundToggle.addEventListener('change', handleSoundToggle);
    }
}

// Export functions for use in other files
window.fetchNews = fetchNews;
window.fetchPlot = fetchPlot;
window.startNewsRefresh = startNewsRefresh;
window.handleDivergenceMeterClick = handleDivergenceMeterClick;

window.changePage = changePage; // Export the changePage function