/**
 * Displays a divergence meter with the given value
 * @param {string} divergence - The divergence value to display
 * @param {boolean} animate - Whether to show the loading animation before displaying the value
 * @param {boolean} enableClickRandom - Whether to enable random divergence on click
 */
function displayDivergenceMeter(divergence, animate = false, enableClickRandom = false) {
    // Get the container element
    const container = document.getElementById('divergence-meter');
    if (!container) {
        console.error('Divergence meter container not found');
        return;
    }

    // If container is empty, create the initial image elements
    if (container.children.length === 0) {
        for (let i = 0; i < divergence.length; i++) {
            const img = document.createElement('img');
            img.alt = `Digit ${i}`;
            img.className = 'digit';
            container.appendChild(img);
        }
    }

    // Update image sources
    const digits = container.getElementsByTagName('img');
    for (let i = 0; i < digits.length; i++) {
        if (divergence[i] === '.') {
            digits[i].src = 'images/p.png';
        } else {
            digits[i].src = `images/${divergence[i]}.png`;
        }
    }

    // If animation is requested, show loading animation
    if (animate) {
        for (let i = 0; i < digits.length; i++) {
            digits[i].src = `images/${i % 2 === 0 ? '11.gif' : '12.gif'}`;
        }

        // Stop animation after 3 seconds 
        setTimeout(() => {
            for (let i = 0; i < digits.length; i++) {
                if (divergence[i] === '.') {
                    digits[i].src = 'images/p.png';
                } else {
                    digits[i].src = `images/${divergence[i]}.png`;
                }
            }
        }, 3000);
    }

    // Handle click events if enabled
    if (enableClickRandom) {
        container.onclick = function() {
            // Generate random divergence value
            let randomDivergence = "1."; // Always start with 1.
            for (let i = 0; i < 6; i++) {
                randomDivergence += Math.floor(Math.random() * 10);
            }
            displayDivergenceMeter(randomDivergence, true, true);
        };
    } else {
        container.onclick = null; // Remove click handler if disabled
    }
}

/**
 * Initializes the divergence meter with the given number of digits
 * and displays the animation GIFs.
 * @param {number} numDigits - The number of digits to display in the divergence meter
 */
function initDivergenceMeter(numDigits) {
    // Get the container element
    const container = document.getElementById('divergence-meter');
    if (!container) {
        console.error('Divergence meter container not found');
        return;
    }

    // Clear any existing children in the container
    container.innerHTML = '';

    // Create and append the initial image elements with animation GIFs
    for (let i = 0; i < numDigits; i++) {
        const img = document.createElement('img');
        img.alt = `Digit ${i}`;
        img.className = 'digit';
        img.src = `images/${i % 2 === 0 ? '11.gif' : '12.gif'}`; // Alternate animation GIFs
        container.appendChild(img);
    }
}