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

// Command sequence that drives the animation
const commandSequence = [
    { command: 'initialize_website', displayText: 'Website initialization...', type: '' },
    { command: 'load_example_site', displayText: 'Loading example site v0.1.0', type: '' },
    { command: 'render_template', displayText: 'Rendering template...', type: '' },
    { command: 'template_ready', displayText: 'Template loaded successfully', type: '' },
    { command: 'prepare_generation', displayText: 'Preparing content generation...', type: 'system' },
    { command: 'start_line_rendering', displayText: 'Beginning line-by-line rendering', type: 'system' },
    { command: 'compile_header', displayText: 'Compiling header...', type: 'checking' },
    { command: 'check_structure', displayText: 'Checking structure...', type: 'checking' },
    { command: 'scan_blocks', displayText: 'Scanning content blocks', type: 'system' },
    { command: 'load_portfolio', displayText: 'Loading portfolio content...', type: '' },
    { command: 'integrate_skills', displayText: 'Integrating skills section', type: 'checking' },
    { command: 'apply_styling', displayText: 'Applying styling...', type: 'system' },
    { command: 'format_contact', displayText: 'Formatting contact info', type: '' },
    { command: 'finalize_content', displayText: 'Finalizing content...', type: 'checking' },
    { command: 'run_checks', displayText: 'Running final checks', type: 'system' },
    { command: 'complete', displayText: 'Website v1.0.0 complete', type: '' }
];

// Special utility commands
const utilityCommands = [
    { command: 'help', displayText: 'Show available commands', description: 'Displays a list of all available commands' },
    { command: 'clear', displayText: 'Clear terminal', description: 'Clears the terminal output' },
    { command: 'reset', displayText: 'Reset website', description: 'Resets the website to initial state' },
    { command: 'auto', displayText: 'Auto-generate website', description: 'Automatically generate the website' }
];

// Animation settings
const TYPING_SPEED = 10; // ms per character
const LINE_DELAY = 100; // ms delay after each line
const INITIAL_DURATION = 1000; // ms to show initial content before replacing
const COMMAND_DELAY = 800; // ms between command executions

// DOM elements
let contentElement;
let changelogContentElement;

// Track progress
let currentLineIndex = 0;
let currentCommandIndex = 0;
let typingTimeout;
let lineTimeout;
let commandTimeout;

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
                executeNextCommand();
            }, LINE_DELAY);
        }
    }
}

// Execute the next command in the sequence
function executeNextCommand() {
    if (currentCommandIndex >= commandSequence.length) {
        console.log('Command sequence complete');
        return;
    }

    const command = commandSequence[currentCommandIndex];
    currentCommandIndex++;

    // Update title to show progress
    const progress = Math.round((currentCommandIndex / commandSequence.length) * 100);
    document.title = `Leo Vainio (${progress}%)`;

    // Add the command to the changelog
    addChangelogEntry(command.displayText, command.type);

    // Execute the command action
    executeCommand(command.command);
}

// Execute a specific command action
function executeCommand(command) {
    switch (command) {
        case 'initialize_website':
            // Initial setup
            setTimeout(() => executeNextCommand(), COMMAND_DELAY);
            break;

        case 'load_example_site':
            // Show the initial example site
            showInitialContent();
            setTimeout(() => executeNextCommand(), COMMAND_DELAY);
            break;

        case 'render_template':
            // Continue showing initial content
            setTimeout(() => executeNextCommand(), COMMAND_DELAY);
            break;

        case 'template_ready':
            // Template is ready
            setTimeout(() => executeNextCommand(), COMMAND_DELAY);
            break;

        case 'prepare_generation':
            // Prepare for content generation
            setTimeout(() => executeNextCommand(), COMMAND_DELAY);
            break;

        case 'start_line_rendering':
            // Start the wiping animation to clear initial content
            switchToRealContent();
            // executeNextCommand() will be called after wiping completes
            break;

        case 'compile_header':
            // Add header line
            addNextLine(0, 3);
            break;

        case 'check_structure':
            // Add structure line
            addNextLine(3, 5);
            break;

        case 'scan_blocks':
            // Add block separator
            addNextLine(5, 7);
            break;

        case 'load_portfolio':
            // Add about section
            addNextLine(7, 9);
            break;

        case 'integrate_skills':
            // Add skills section
            addNextLine(9, 15);
            break;

        case 'apply_styling':
            // Add another separator
            addNextLine(15, 16);
            break;

        case 'format_contact':
            // Add contact info
            addNextLine(16, 18);
            break;

        case 'finalize_content':
            // Add last contact line
            addNextLine(18, 19);
            break;

        case 'run_checks':
            // Final checks before completion
            setTimeout(() => executeNextCommand(), COMMAND_DELAY);
            break;

        case 'complete':
            // Website is complete
            console.log('Website generation complete');
            break;

        default:
            console.log(`Unknown command: ${command}`);
            setTimeout(() => executeNextCommand(), COMMAND_DELAY);
    }
}

// Add line(s) of content from startIndex to endIndex (exclusive)
function addNextLine(startIndex, endIndex) {
    if (startIndex >= websiteContent.length) {
        executeNextCommand();
        return;
    }

    const line = websiteContent[startIndex];

    // Create the element for this line
    const element = document.createElement(line.tag);
    contentElement.appendChild(element);

    // Start typing the text for this line
    typeText(element, line.text, 0, () => {
        startIndex++;
        if (startIndex < endIndex) {
            addNextLine(startIndex, endIndex);
        } else {
            executeNextCommand();
        }
    });
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
            setTimeout(() => executeNextCommand(), 500);
            return;
        }

        // Remove one character at a time for wipe effect
        contentElement.innerHTML = contentToRemove.substring(0, charIndex);
        charIndex -= 5; // Remove 5 chars at a time for speed

        setTimeout(wipeContent, 10);
    }

    wipeContent();
}

// Add a command interface for manual command execution
function executeCommandByName(commandName) {
    // Special commands
    if (commandName === 'toggle-input' || commandName === 'show-input') {
        toggleCommandInput();
        return true;
    }

    // Special command for generating an awesome profile
    if (commandName === 'Make awesome profile page with lots of skills') {
        addChangelogEntry(`Executing: "${commandName}"`, 'system');
        addChangelogEntry('Preparing to generate an awesome profile!', 'checking');
        setTimeout(() => {
            // Update the content with more impressive skills
            enhanceSkillsSection();
            autoGenerate();
        }, 800);
        return true;
    }

    // Check for utility commands first
    if (commandName === 'help') {
        showHelp();
        return true;
    } else if (commandName === 'clear') {
        clearChangelog();
        return true;
    } else if (commandName === 'reset') {
        resetWebsite();
        return true;
    } else if (commandName === 'auto') {
        autoGenerate();
        return true;
    }

    // Check for animation commands
    const commandObj = commandSequence.find(cmd => cmd.command === commandName);
    if (commandObj) {
        addChangelogEntry(`Execute: ${commandName}`, 'system');
        addChangelogEntry(commandObj.displayText, commandObj.type);
        executeCommand(commandObj.command);
        return true;
    } else {
        addChangelogEntry(`Unknown command: ${commandName}`, 'error');
        addChangelogEntry(`Type 'help' to see available commands`, 'system');
        console.error(`Command not found: ${commandName}`);
        return false;
    }
}

// Toggle the command input visibility
function toggleCommandInput() {
    const changelog = document.querySelector('.changelog');
    if (changelog.classList.contains('show-command')) {
        changelog.classList.remove('show-command');
        addChangelogEntry('Command input hidden', 'system');
    } else {
        changelog.classList.add('show-command');
        addChangelogEntry('Command input shown - type commands here', 'system');
        // Focus the input field
        setTimeout(() => document.getElementById('command-input').focus(), 100);
    }
}

// Show help message with available commands
function showHelp() {
    addChangelogEntry('Available commands:', 'system');

    // Add special commands
    addChangelogEntry('  toggle-input: Show/hide the command input', '');

    // Add utility commands
    utilityCommands.forEach(cmd => {
        addChangelogEntry(`  ${cmd.command}: ${cmd.description}`, '');
    });

    // Add website generation commands
    addChangelogEntry('Website generation commands:', 'system');
    commandSequence.forEach(cmd => {
        addChangelogEntry(`  ${cmd.command}`, '');
    });
}

// Clear the changelog
function clearChangelog() {
    changelogContentElement.innerHTML = '';
    addChangelogEntry('Terminal cleared', 'system');
}

// Reset the website to initial state
function resetWebsite() {
    // Clear content and changelog
    contentElement.innerHTML = '';
    clearChangelog();

    // Reset counters
    currentLineIndex = 0;
    currentCommandIndex = 0;

    // Clear any pending timeouts
    clearTimeout(typingTimeout);
    clearTimeout(lineTimeout);
    clearTimeout(commandTimeout);

    // Reset title
    document.title = 'Leo Vainio (0%)';

    addChangelogEntry('Website reset complete', 'system');
    addChangelogEntry(`Type 'help' to see available commands`, 'system');
}

// Auto-generate the website from beginning to end
function autoGenerate() {
    resetWebsite();
    addChangelogEntry('Auto-generating website...', 'system');
    currentCommandIndex = 0;
    executeNextCommand();
}

// Enhance the skills section with more impressive skills
function enhanceSkillsSection() {
    // Replace the skills section with more impressive skills
    websiteContent = [
        { tag: 'h1', text: 'HELLO WORLD' },
        { tag: 'h1', text: 'Leo Vainio' },
        { tag: 'h2', text: 'Full-Stack Developer & UX Designer' },
        { tag: 'p', text: '----------------------------' },
        { tag: 'h2', text: 'About Me' },
        { tag: 'p', text: 'I am a passionate software engineer with expertise in modern web development and user experience design.' },
        { tag: 'p', text: 'With a strong foundation in both frontend and backend technologies, I create elegant solutions to complex problems.' },
        { tag: 'p', text: '----------------------------' },
        { tag: 'h2', text: 'Core Skills' },
        { tag: 'p', text: '• JavaScript/TypeScript (React, Next.js, Vue.js)' },
        { tag: 'p', text: '• Python (Django, Flask, FastAPI)' },
        { tag: 'p', text: '• Node.js (Express, NestJS)' },
        { tag: 'p', text: '• GraphQL & RESTful API Design' },
        { tag: 'p', text: '• Cloud Architecture (AWS, Azure)' },
        { tag: 'p', text: '• DevOps (Docker, Kubernetes, CI/CD)' },
        { tag: 'p', text: '• UI/UX Design (Figma, Adobe Suite)' },
        { tag: 'p', text: '----------------------------' },
        { tag: 'h2', text: 'Contact' },
        { tag: 'p', text: 'Email: example@example.com' },
        { tag: 'p', text: 'GitHub: github.com/username' },
        { tag: 'p', text: 'LinkedIn: linkedin.com/in/username' },
    ];
}

// Initialize the animation when the DOM is loaded
function init() {
    contentElement = document.getElementById('content');
    changelogContentElement = document.getElementById('changelog-content');
    const commandInput = document.getElementById('command-input');
    const runCommandButton = document.getElementById('run-command');

    // Setup command input
    runCommandButton.addEventListener('click', () => {
        const command = commandInput.value.trim();
        if (command) {
            executeCommandByName(command);
            commandInput.value = '';
        }
    });

    commandInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && commandInput.value.trim()) {
            executeCommandByName(commandInput.value.trim());
            commandInput.value = '';
        }
    });

    // Add keyboard shortcut to toggle command input (Ctrl+/)
    document.addEventListener('keydown', (e) => {
        if (e.ctrlKey && e.key === '/') {
            toggleCommandInput();
            e.preventDefault();
        }
    });

    // Initialize
    document.title = 'Leo Vainio (0%)';

    // Start with system entry
    addChangelogEntry('Generating...', 'system');
    setTimeout(() => addChangelogEntry('Checking index.js', 'checking'), 300);
    setTimeout(() => addChangelogEntry('Website ready', 'system'), 600);

    // Auto-start generation after a brief delay
    setTimeout(() => {
        addChangelogEntry('Auto-generating profile... press Ctrl+/ to show command input', 'system');
        enhanceSkillsSection();
        autoGenerate();
    }, 1000);

    // Make the command interface available globally (for debugging/demonstration)
    window.runCommand = executeCommandByName;
    window.toggleInput = toggleCommandInput;
}

// Start the animation when the page loads
document.addEventListener('DOMContentLoaded', init);