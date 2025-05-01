tsParticles.load("particles-js", {
    particles: {
        number: {
            value: 70, // Reduced number of particles for better performance
            density: {
                enable: true,
                value_area: 800 // Area density
            }
        },
        color: {
            // Oranges similar to Nixie glow
            value: ["#FF4500", "#FF6347", "#FF7F50", "#FFA500"]
        },
        shape: {
            type: "circle", // Simple circle particles
        },
        opacity: {
            value: 0.6, // Base opacity
            random: true, // Randomize opacity
            anim: {
                enable: true,
                speed: 0.5, // Fading speed
                opacity_min: 0.1, // Minimum opacity
                sync: false
            }
        },
        size: {
            value: 7, // Base size
            random: true, // Randomize size
            anim: {
                enable: true,
                speed: 2,
                size_min: 0.1,
                sync: false
            }
        },
        line_linked: {
            enable: true,
            distance: 150, // Increased distance for more connections
            color: "#FF7000", // Line color (softer orange)
            opacity: 0.15, // Reduced opacity for more subtle lines
            width: 1
        },
        move: {
            enable: true,
            speed: 0.8, // Slower speed for more gentle movement
            direction: "top", // Make particles move upward
            random: true, // Random direction
            straight: false, // Particles don't move in straight lines
            out_mode: "out", // Particles disappear when hitting edge
            bounce: false,
            attract: {
                enable: false,
                rotateX: 600,
                rotateY: 1200
            }
        }
    },
    interactivity: {
        detect_on: "canvas", // Detect interactions on the canvas area
        events: {
            onhover: {
                enable: true,
                mode: "repulse" // Push particles away on hover
            },
            onclick: {
                enable: true,
                mode: "push" // Add particles on click
            },
            resize: true // Re-adjust on window resize
        },
        modes: {
            grab: { // Not used in events, but defined
                distance: 400,
                line_opacity: 1
            },
            bubble: { // Not used
                distance: 400,
                size: 40,
                duration: 2,
                opacity: 8,
                speed: 3
            },
            repulse: {
                distance: 100, // How far particles are pushed
                duration: 0.4
            },
            push: {
                particles_nb: 4 // Number of particles to add on click
            },
            remove: { // Not used
                particles_nb: 2
            }
        }
    },
    retina_detect: true, // Adjusts for high-DPI screens
    background: {
        color: "#000000", // Ensure canvas background is black
        image: "",
        position: "50% 50%",
        repeat: "no-repeat",
        size: "cover"
    }
});