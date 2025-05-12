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

// Initial content that appears immediately
const initialContent = [
    { tag: 'h1', text: 'HELLO WORLD' },
    { tag: 'p', text: 'This is example site' },
];

// Changelog entries that will appear over time
const changelogEntries = [
    'Website initialization...',
    'Loading example site v0.1.0',
    'Rendering template...',
    'Template loaded successfully',
    'Preparing content generation...',
    'Beginning line-by-line rendering',
    'Loading portfolio content...',
    'Applying styling...',
    'Website v1.0.0 complete'
];

// Animation settings
const TYPING_SPEED = 10; // ms per character
const LINE_DELAY = 100; // ms delay after each line
const INITIAL_DURATION = 1000; // ms to show initial content before replacing
const CHANGELOG_DELAY = 800; // ms between changelog entries

// DOM elements
let contentElement;
let changelogContentElement;

// Track progress
let currentLineIndex = 0;
let currentChangelogIndex = 0;
let typingTimeout;
let lineTimeout;
let changelogTimeout;

// Types text one character at a time
function typeText(element, text, charIndex = 0, onComplete) {
    if (charIndex < text.length) {
        element.textContent = text.substring(0, charIndex + 1);

        typingTimeout = setTimeout(() => {
            typeText(element, text, charIndex + 1, onComplete);
        }, TYPING_SPEED);
    } else {
        // Line is complete
        if (onComplete) {
            setTimeout(onComplete, LINE_DELAY);
        } else {
            // Move to next line after current line is complete (for main content)
            lineTimeout = setTimeout(() => {
                animateNextLine();
            }, LINE_DELAY);
        }
    }
}

// Adds the next line element and starts typing its content
function animateNextLine() {
    if (currentLineIndex >= websiteContent.length) {
        console.log('Animation complete');
        addChangelogEntry('Website v1.0.0 complete', 'system');
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

    // Add a changelog entry at certain points
    if (currentLineIndex === 1) {
        addChangelogEntry('Beginning line-by-line rendering', 'system');
    } else if (currentLineIndex === 3) {
        addChangelogEntry('Compiling header...', 'checking');
    } else if (currentLineIndex === 5) {
        addChangelogEntry('Checking structure...', 'checking');
    } else if (currentLineIndex === 7) {
        addChangelogEntry('Scanning content blocks', 'system');
    } else if (currentLineIndex === 8) {
        addChangelogEntry('Loading portfolio content...');
    } else if (currentLineIndex === 10) {
        addChangelogEntry('Integrating skills section', 'checking');
    } else if (currentLineIndex === 12) {
        addChangelogEntry('Applying styling...', 'system');
    } else if (currentLineIndex === 15) {
        addChangelogEntry('Formatting contact info');
    } else if (currentLineIndex === websiteContent.length - 2) {
        addChangelogEntry('Finalizing content...', 'checking');
    } else if (currentLineIndex === websiteContent.length - 1) {
        addChangelogEntry('Running final checks', 'system');
    }
}

// Add an entry to the changelog
function addChangelogEntry(text, type = '') {
    const entry = document.createElement('div');
    entry.className = type ? `changelog-entry ${type}` : 'changelog-entry';
    entry.textContent = text;
    changelogContentElement.appendChild(entry);

    // Force scroll to bottom with a small delay to ensure rendering completes
    setTimeout(() => {
        changelogContentElement.scrollTop = changelogContentElement.scrollHeight;
    }, 10);
}

// Display initial content immediately (no typing animation)
function showInitialContent() {
    contentElement.innerHTML = '';

    // Show the initial content immediately (no typing animation)
    initialContent.forEach(line => {
        const element = document.createElement(line.tag);
        element.textContent = line.text;
        contentElement.appendChild(element);
    });

    // Add initial changelog entries
    addChangelogEntry('Generating...', 'system');
    setTimeout(() => addChangelogEntry('Checking index.js', 'checking'), CHANGELOG_DELAY / 2);
    setTimeout(() => addChangelogEntry('Website initialization...'), CHANGELOG_DELAY);
    setTimeout(() => addChangelogEntry('Loading example site v0.1.0'), CHANGELOG_DELAY * 2);
    setTimeout(() => addChangelogEntry('Rendering template...'), CHANGELOG_DELAY * 3);

    // After displaying for a while, switch to real content
    setTimeout(() => {
        addChangelogEntry('Template loaded successfully');
        setTimeout(() => {
            addChangelogEntry('Preparing content generation...', 'system');
            switchToRealContent();
        }, CHANGELOG_DELAY);
    }, INITIAL_DURATION);
}

// Clear the content and start the main animation
function switchToRealContent() {
    // Clear current content with a wipe effect
    const contentToRemove = contentElement.innerHTML;
    let charIndex = contentToRemove.length;

    function wipeContent() {
        if (charIndex <= 0) {
            // When wiping is complete, clear and start main animation
            contentElement.innerHTML = '';
            currentLineIndex = 0;
            setTimeout(animateNextLine, 500);
            return;
        }

        // Remove one character at a time for wipe effect
        contentElement.innerHTML = contentToRemove.substring(0, charIndex);
        charIndex -= 5; // Remove 5 chars at a time for speed

        setTimeout(wipeContent, 10);
    }

    wipeContent();
}

// Initialize the animation when the DOM is loaded
function init() {
    contentElement = document.getElementById('content');
    changelogContentElement = document.getElementById('changelog-content');

    // Initialize
    document.title = 'Leo Vainio (0%)';

    // Start with initial content already displayed
    showInitialContent();
}

// Start the animation when the page loads
document.addEventListener('DOMContentLoaded', init);