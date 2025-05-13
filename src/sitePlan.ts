import { SitePlan } from './types.js';

// Default animation settings (can be overridden in specific steps or by theme)
const DEFAULT_TYPING_SPEED = 10;
const DEFAULT_LINE_DELAY = 100;
const DEFAULT_COMMAND_DELAY = 800;
const DEFAULT_WIPE_SPEED = 10;
const DEFAULT_WIPE_CHARS = 5;

export const ENHANCE_COMMAND_TEXT = 'Make awesome profile page with lots of skills';

export const sitePlanData: SitePlan = {
    meta: {
        siteTitle: "Leo Vainio - Developer & Designer",
        initialUserPrompt: "[USER] build awesome profile page with lots of cool skills",
        animationSettings: {
            typingSpeed: DEFAULT_TYPING_SPEED,
            lineDelay: DEFAULT_LINE_DELAY,
            commandDelay: DEFAULT_COMMAND_DELAY,
            wipeSpeed: DEFAULT_WIPE_SPEED,
            wipeChars: DEFAULT_WIPE_CHARS,
        }
    },
    sections: [
        // --- Initial "Example" Content ---
        {
            id: "initialExample",
            type: "block",
            displayInitially: true,
            elements: [
                {
                    id: "init-hello",
                    tag: "h1",
                    versions: [{ versionId: "v1", text: "HELLO WORLD" }]
                },
                {
                    id: "init-example-site",
                    tag: "p",
                    versions: [{ versionId: "v1", text: "This is example site" }]
                }
            ]
        },
        // --- Main Page Content Sections ---
        {
            id: "header",
            type: "block",
            elements: [
                {
                    id: "header-h1-name",
                    tag: "h1",
                    versions: [
                        // Assuming enhancedWebsiteContentData has the "final" name if different
                        // For this example, let's say it's the same.
                        { versionId: "v1", text: "Leo Vainio", isFinal: true }
                    ]
                },
                {
                    id: "header-h2-title",
                    tag: "h2",
                    versions: [
                        { versionId: "v1", text: "Developer & Designer" },
                        { versionId: "v2", text: "Full-Stack Developer & UX Designer", isFinal: true }
                    ]
                }
            ]
        },
        {
            id: "sep1",
            type: "separator",
            separatorText: "----------------------------"
        },
        {
            id: "about",
            type: "block",
            elements: [
                {
                    id: "about-h2",
                    tag: "h2",
                    versions: [{ versionId: "v1", text: "About Me", isFinal: true }]
                },
                {
                    id: "about-p1",
                    tag: "p",
                    versions: [
                        { versionId: "v1", text: "I am a passionate developer with interests in web development and design." },
                        { versionId: "v2", text: "I am a passionate software engineer with expertise in modern web development and user experience design.", isFinal: true, critiqueOfPrevious: "Refined for a more professional tone." }
                    ]
                },
                {
                    id: "about-p2",
                    tag: "p",
                    versions: [
                        { versionId: "v1", text: "This website is a demonstration of text generation line by line, similar to code generation in editors." },
                        { versionId: "v2", text: "With a strong foundation in both frontend and backend technologies, I create elegant solutions to complex problems.", isFinal: true, critiqueOfPrevious: "Expanded on capabilities." }
                    ]
                }
            ]
        },
        {
            id: "sep2",
            type: "separator",
            separatorText: "----------------------------"
        },
        {
            id: "skills",
            type: "block",
            elements: [
                {
                    id: "skills-h2",
                    tag: "h2",
                    versions: [
                        { versionId: "v1", text: "Skills" },
                        { versionId: "v2", text: "Core Skills", isFinal: true }
                    ]
                },
                // Simplified mapping from old structure
                { id: "skills-js", tag: "p", versions: [{ versionId: "v1", text: "• JavaScript/TypeScript" },{ versionId: "v2", text: "• JavaScript/TypeScript (React, Next.js, Vue.js)", isFinal: true }]},
                { id: "skills-html", tag: "p", versions: [{ versionId: "v1", text: "• HTML & CSS" , isFinal: true }]}, // Assuming HTML/CSS is basic and final
                { id: "skills-react", tag: "p", versions: [{ versionId: "v1", text: "• React" } ]}, // No v2 if it's merged into skills-js v2
                { id: "skills-node", tag: "p", versions: [{ versionId: "v1", text: "• Node.js" },{ versionId: "v2", text: "• Node.js (Express, NestJS)", isFinal: true }]},
                { id: "skills-python", tag: "p", versions: [{ versionId: "v2", text: "• Python (Django, Flask, FastAPI)", isFinal: true }]}, // Added in enhanced
                { id: "skills-graphql", tag: "p", versions: [{ versionId: "v2", text: "• GraphQL & RESTful API Design", isFinal: true }]},
                { id: "skills-cloud", tag: "p", versions: [{ versionId: "v2", text: "• Cloud Architecture (AWS, Azure)", isFinal: true }]},
                { id: "skills-devops", tag: "p", versions: [{ versionId: "v2", text: "• DevOps (Docker, Kubernetes, CI/CD)", isFinal: true }]},
                { id: "skills-uiux", tag: "p", versions: [{ versionId: "v1", text: "• UI/UX Design" },{ versionId: "v2", text: "• UI/UX Design (Figma, Adobe Suite)", isFinal: true }]},
            ]
        },
        {
            id: "sep3",
            type: "separator",
            separatorText: "----------------------------"
        },
        {
            id: "contact",
            type: "block",
            elements: [
                {
                    id: "contact-h2",
                    tag: "h2",
                    versions: [{ versionId: "v1", text: "Contact", isFinal: true }]
                },
                { id: "contact-email", tag: "p", versions: [{ versionId: "v1", text: "Email: example@example.com", isFinal: true }]},
                { id: "contact-github", tag: "p", versions: [{ versionId: "v1", text: "GitHub: github.com/username", isFinal: true }]},
                { id: "contact-linkedin", tag: "p", versions: [{ versionId: "v1", text: "LinkedIn: linkedin.com/in/username", isFinal: true }]},
            ]
        }
    ],
    utilityCommands: [
        { command: 'help', displayText: 'Show available commands', description: 'Displays a list of all available commands' },
        { command: 'clear', displayText: 'Clear terminal', description: 'Clears the terminal output' },
        { command: 'reset', displayText: 'Reset website', description: 'Resets the website to initial state (animated)' },
        { command: 'auto', displayText: 'Auto-generate website', description: 'Automatically generate the website (animated)' },
        { command: 'skip', displayText: 'Skip to final content', description: 'Instantly displays the final website content.'}
    ],
    flow: [
        // Phase 1: Initial Setup & User Prompt
        { id: "f-prompt", action: "log", logMessage: "[USER] build awesome profile page with lots of cool skills", logType: "user" },
        { id: "f-proc-req", action: "log", logMessage: "[PROCESSING] Request analysis initiated", logType: "system" },
        { id: "f-render-initial", action: "renderInitial", logMessage: "[ANALYZING] Example site template detected", logType: "system" },
        { id: "f-delay1", action: "delay", delayMs: 1000 },

        // Phase 2: Transition to Real Content
        { id: "f-wipe", action: "clearContentArea", logMessage: "[PLANNING] Creating optimized portfolio structure", logType: "system" },
        { id: "f-delay2", action: "delay", delayMs: 500 },
        
        // Phase 3: Render Header with potential "thought" and "update"
        { id: "f-hdr-log", action: "log", logMessage: "[STEP 1] Generate header", logType: "system" },
        { id: "f-hdr-name", action: "renderElement", targetSectionId: "header", targetElementId: "header-h1-name", targetVersionId: "v1"},
        { id: "f-hdr-title-v1", action: "renderElement", targetSectionId: "header", targetElementId: "header-h2-title", targetVersionId: "v1"},
        { id: "f-hdr-thought", action: "thought", logMessage: "[AI_THOUGHT] 'Developer & Designer' is good, but 'Full-Stack Developer & UX Designer' is more specific to the enhanced skills.", logType: "ai-thought"},
        { id: "f-hdr-delay-thought", action: "delay", delayMs: 1200},
        { id: "f-hdr-title-update", action: "updateElement", targetSectionId: "header", targetElementId: "header-h2-title", targetVersionId: "v2", logMessage: "[REVISING] Refining title...", logType: "checking"},
        
        // Phase 4: Separator
        { id: "f-sep1-log", action: "log", logMessage: "[PROCESSING] Format spacing", logType: "checking"},
        { id: "f-sep1-render", action: "renderSection", targetSectionId: "sep1"},

        // Phase 5: About Me with "thought" and "update"
        { id: "f-about-log", action: "log", logMessage: "[STEP 2] Generate About Me", logType: "system"},
        { id: "f-about-h2", action: "renderElement", targetSectionId: "about", targetElementId: "about-h2", targetVersionId: "v1"},
        { id: "f-about-p1v1", action: "renderElement", targetSectionId: "about", targetElementId: "about-p1", targetVersionId: "v1"},
        { id: "f-about-p1-thought", action: "thought", logMessage: "[AI_THOUGHT] The first sentence about passion is a bit generic.", logType: "ai-thought"},
        { id: "f-about-p1-delay", action: "delay", delayMs: 1000},
        { id: "f-about-p1-update", action: "updateElement", targetSectionId: "about", targetElementId: "about-p1", targetVersionId: "v2", logMessage: "[REVISING] About Me - P1 (professional tone).", logType: "checking"},
        { id: "f-about-p2v1", action: "renderElement", targetSectionId: "about", targetElementId: "about-p2", targetVersionId: "v1"},
        { id: "f-about-p2-thought", action: "thought", logMessage: "[AI_THOUGHT] The second sentence can be more impactful.", logType: "ai-thought"},
        { id: "f-about-p2-delay", action: "delay", delayMs: 1000},
        { id: "f-about-p2-update", action: "updateElement", targetSectionId: "about", targetElementId: "about-p2", targetVersionId: "v2", logMessage: "[REVISING] About Me - P2 (capabilities).", logType: "checking"},

        // Phase 6: Skills section (simplified for brevity - could have thoughts and updates per skill)
        { id: "f-sep2-render", action: "renderSection", targetSectionId: "sep2"},
        { id: "f-skills-log", action: "log", logMessage: "[STEP 3] Add Skills", logType: "system"},
        { id: "f-skills-h2", action: "renderElement", targetSectionId: "skills", targetElementId: "skills-h2", targetVersionId: "v2"}, // Start with final H2
        { id: "f-skills-js", action: "renderElement", targetSectionId: "skills", targetElementId: "skills-js", targetVersionId: "v2"},
        { id: "f-skills-html", action: "renderElement", targetSectionId: "skills", targetElementId: "skills-html", targetVersionId: "v1"},
        // ... render other final skills directly or go through v1 -> v2 if desired for animation
        { id: "f-skills-node", action: "renderElement", targetSectionId: "skills", targetElementId: "skills-node", targetVersionId: "v2"},
        { id: "f-skills-python", action: "renderElement", targetSectionId: "skills", targetElementId: "skills-python", targetVersionId: "v2"},
        { id: "f-skills-graphql", action: "renderElement", targetSectionId: "skills", targetElementId: "skills-graphql", targetVersionId: "v2"},
        { id: "f-skills-cloud", action: "renderElement", targetSectionId: "skills", targetElementId: "skills-cloud", targetVersionId: "v2"},
        { id: "f-skills-devops", action: "renderElement", targetSectionId: "skills", targetElementId: "skills-devops", targetVersionId: "v2"},
        { id: "f-skills-uiux", action: "renderElement", targetSectionId: "skills", targetElementId: "skills-uiux", targetVersionId: "v2"},
        
        // Phase 7: Contact
        { id: "f-sep3-render", action: "renderSection", targetSectionId: "sep3"},
        { id: "f-contact-log", action: "log", logMessage: "[STEP 4] Add Contact Info", logType: "system"},
        { id: "f-contact-render", action: "renderSection", targetSectionId: "contact"}, // Renders all elements with their final version

        // Phase 8: Completion
        { id: "f-final-checks", action: "log", logMessage: "[VERIFYING] Content inspection complete.", logType: "system"},
        { id: "f-gen-complete", action: "log", logMessage: "[COMPLETE] Portfolio generated successfully!", logType: "system"}
    ]
};

// Example for how ENHANCE_COMMAND_TEXT could influence the flow if needed:
// The GenerationEngine's handleCommand could, upon seeing ENHANCE_COMMAND_TEXT,
// potentially set a flag that modifies which versions are targeted in the flow,
// or it could even switch to a different 'flow' array within the sitePlan if you define multiple.
// For now, this example primarily uses isFinal for the skip command and the flow explicitly chooses versions. 