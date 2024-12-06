let currentState = 'services'; // Track current state: either 'services' or 'quote'

function fadeOnScroll(event) {
    // Scroll down: transition from "Our Services" to "Request a Quote"
    if (event.deltaY > 0 && currentState === 'services') {
        document.body.classList.add('fade-background'); // Change background color
        document.getElementById('services-text').classList.add('fade-out'); // Fade out services text
        document.getElementById('services-text').classList.remove('fade-in'); // Ensure services text is hidden
        document.getElementById('quote-text').classList.add('fade-in'); // Fade in quote text
        document.getElementById('quote-text').classList.remove('fade-out'); // Ensure quote text is visible
        currentState = 'quote'; // Update current state
    }
    // Scroll up: transition back to "Our Services"
    else if (event.deltaY < 0 && currentState === 'quote') {
        document.body.classList.remove('fade-background'); // Revert background color
        document.getElementById('services-text').classList.add('fade-in'); // Fade in services text
        document.getElementById('services-text').classList.remove('fade-out'); // Ensure services text is visible
        document.getElementById('quote-text').classList.add('fade-out'); // Fade out quote text
        document.getElementById('quote-text').classList.remove('fade-in'); // Ensure quote text is hidden
        currentState = 'services'; // Update current state
    }
}

// Attach wheel event listener to detect scroll direction
window.addEventListener('wheel', fadeOnScroll);
