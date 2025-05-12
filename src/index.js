import './style.css';

// Content to be displayed line by line
const websiteContent = [
    { tag: 'h1', text: 'HELLO WORLD' },
    { tag: 'h1', text: 'Leo Vainio' },
    { tag: 'h2', text: 'Developer & Designer' },
    { tag: 'p', text: '----------------------------' },
    { tag: 'h2', text: 'About Me' },
    { tag: 'p', text: 'I am a passionate developer with interests in web development and design.' },
    { tag: 'p', text: 'This website is a demonstration of text generation line by line, similar to code generation in editors.' },
    { tag: 'p', text: '----------------------------' },
    { tag: 'h2', text: 'Skills' },
    { tag: 'p', text: '• JavaScript/TypeScript' },
    { tag: 'p', text: '• HTML & CSS' },
    { tag: 'p', text: '• React' },
    { tag: 'p', text: '• Node.js' },
    { tag: 'p', text: '• UI/UX Design' },
    { tag: 'p', text: '----------------------------' },
    { tag: 'h2', text: 'Contact' },
    { tag: 'p', text: 'Email: example@example.com' },
    { tag: 'p', text: 'GitHub: github.com/username' },
    { tag: 'p', text: 'LinkedIn: linkedin.com/in/username' },
];

// Animation settings
const TYPING_SPEED = 10; // ms per character
const LINE_DELAY = 100; // ms delay after each line

// DOM elements
let contentElement;

// Track progress
let currentLineIndex = 0;
let typingTimeout;
let lineTimeout;

// Types text one character at a time
function typeText(element, text, charIndex = 0) {
    if (charIndex < text.length) {
        element.textContent = text.substring(0, charIndex + 1);

        typingTimeout = setTimeout(() => {
            typeText(element, text, charIndex + 1);
        }, TYPING_SPEED);
    } else {
        // Move to next line after current line is complete
        lineTimeout = setTimeout(() => {
            animateNextLine();
        }, LINE_DELAY);
    }
}

// Adds the next line element and starts typing its content
function animateNextLine() {
    if (currentLineIndex >= websiteContent.length) {
        console.log('Animation complete');
        return;
    }

    const line = websiteContent[currentLineIndex];
    currentLineIndex++;

    // Update title to show progress
    const progress = Math.round((currentLineIndex / websiteContent.length) * 100);
    document.title = `Leo Vainio (${progress}%)`;

    // Create the element for this line
    const element = document.createElement(line.tag);
    contentElement.appendChild(element);

    // Start typing the text for this line
    typeText(element, line.text);
}

// Initialize the animation when the DOM is loaded
function init() {
    contentElement = document.getElementById('content');

    // Initialize
    document.title = 'Leo Vainio (0%)';

    // Start with a slight delay
    setTimeout(animateNextLine, 1000);
}

// Start the animation when the page loads
document.addEventListener('DOMContentLoaded', init);