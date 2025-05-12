import { CommandStep, ContentLine, UtilityCommand } from './types';

// Content to be displayed line by line
export const websiteContentData: ContentLine[] = [
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

// Enhanced content used after the "enhanceSkills" command
export const enhancedWebsiteContentData: ContentLine[] = [
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


// Initial content that appears immediately
export const initialContentData: ContentLine[] = [
    { tag: 'h1', text: 'HELLO WORLD' },
    { tag: 'p', text: 'This is example site' },
];

// Command sequence that drives the animation
export const commandSequenceData: CommandStep[] = [
    { command: 'initialize_website', displayText: '[USER] build awesome profile page with lots of cool skills', type: '' },
    { command: 'load_example_site', displayText: '[PROCESSING] Request analysis initiated', type: 'system' },
    { command: 'render_template', displayText: '[ANALYZING] Example site template detected', type: 'system' },
    { command: 'template_ready', displayText: '[PLANNING] Creating optimized portfolio structure', type: 'system' },
    { command: 'prepare_generation', displayText: '[STEP 1] Setup structure', type: 'checking' },
    { command: 'start_line_rendering', displayText: '[STEP 2] Initialize content generation', type: 'system' },
    { command: 'compile_header', displayText: '[STEP 3] Generate header', type: 'system', lineRange: [1, 4] }, // Lines 1-3 (inclusive)
    { command: 'check_structure', displayText: '[PROCESSING] Name and title', type: 'checking', lineRange: [4, 5] }, // Line 4
    { command: 'scan_blocks', displayText: '[PROCESSING] Format spacing', type: 'checking', lineRange: [5, 8] }, // Lines 5-7
    { command: 'load_portfolio', displayText: '[STEP 4] Generate about section', type: 'system', lineRange: [8, 9] }, // Line 8
    { command: 'integrate_skills', displayText: '[STEP 5] Add skills section', type: 'checking', lineRange: [9, 15] }, // Lines 9-14
    { command: 'apply_styling', displayText: '[PROCESSING] Insert separator', type: 'system', lineRange: [15, 17] }, // Lines 15-16
    { command: 'format_contact', displayText: '[STEP 6] Add contact info', type: 'system', lineRange: [17, 19] }, // Lines 17-18
    { command: 'finalize_content', displayText: '[FINALIZING] Adjusting format', type: 'checking', lineRange: [19, 20] }, // Line 19
    { command: 'run_checks', displayText: '[VERIFYING] Content inspection', type: 'system' },
    { command: 'complete', displayText: '[COMPLETE] Portfolio generated successfully', type: 'system' }
];

// Special utility commands
export const utilityCommandsData: UtilityCommand[] = [
    { command: 'help', displayText: 'Show available commands', description: 'Displays a list of all available commands' },
    { command: 'clear', displayText: 'Clear terminal', description: 'Clears the terminal output' },
    { command: 'reset', displayText: 'Reset website', description: 'Resets the website to initial state' },
    { command: 'auto', displayText: 'Auto-generate website', description: 'Automatically generate the website' }
];

// Special request command
export const ENHANCE_COMMAND_TEXT = 'Make awesome profile page with lots of skills';

// Animation settings
export const TYPING_SPEED = 10; // ms per character
export const LINE_DELAY = 100; // ms delay after each line
export const COMMAND_DELAY = 800; // ms between command executions
export const WIPE_SPEED = 10; // ms delay for wipe effect
export const WIPE_CHARS = 5; // characters removed per wipe step 