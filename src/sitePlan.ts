import { SitePlan } from './types.js';

// Default animation settings (can be overridden in specific steps or by theme)
const DEFAULT_TYPING_SPEED = 7;
const DEFAULT_LINE_DELAY = 67;
const DEFAULT_COMMAND_DELAY = 533;
const DEFAULT_WIPE_SPEED = 7;
const DEFAULT_WIPE_CHARS = 8;

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
        // P0: Initial Setup & User Prompt
        { id: "p0-f-prompt", action: "log", logMessage: "[USER] build awesome profile page with lots of cool skills", logType: "user" },
        { id: "p0-f-proc-req", action: "log", logMessage: "[PROCESSING] Request analysis initiated", logType: "system" },
        { id: "p0-f-render-initial-example", action: "renderInitial", logMessage: "[ANALYZING] Example site template detected", logType: "system" },
        { id: "p0-f-delay1", action: "delay", delayMs: 330 },
        { id: "p0-f-wipe", action: "clearContentArea", logMessage: "[PLANNING] Preparing for full site generation", logType: "system" },
        { id: "p0-f-delay2", action: "delay", delayMs: 170 },

        // P1: Full V1 Draft Generation
        { id: "p1-f-log-draft-start", action: "log", logMessage: "[SYSTEM] Generating initial V1 draft of the website...", logType: "system" },
        
        { id: "p1-f-hdr-log", action: "log", logMessage: "[RENDERING V1] Header section...", logType: "checking" },
        { id: "p1-f-hdr-name", action: "renderElement", targetSectionId: "header", targetElementId: "header-h1-name", targetVersionId: "v1"},
        { id: "p1-f-hdr-title", action: "renderElement", targetSectionId: "header", targetElementId: "header-h2-title", targetVersionId: "v1"},
        
        { id: "p1-f-sep1", action: "renderSection", targetSectionId: "sep1"},
        
        { id: "p1-f-about-log", action: "log", logMessage: "[RENDERING V1] About Me section...", logType: "checking" },
        { id: "p1-f-about-h2", action: "renderElement", targetSectionId: "about", targetElementId: "about-h2", targetVersionId: "v1"},
        { id: "p1-f-about-p1", action: "renderElement", targetSectionId: "about", targetElementId: "about-p1", targetVersionId: "v1"},
        { id: "p1-f-about-p2", action: "renderElement", targetSectionId: "about", targetElementId: "about-p2", targetVersionId: "v1"},

        { id: "p1-f-sep2", action: "renderSection", targetSectionId: "sep2"},

        { id: "p1-f-skills-log", action: "log", logMessage: "[RENDERING V1] Skills section...", logType: "checking" },
        { id: "p1-f-skills-h2", action: "renderElement", targetSectionId: "skills", targetElementId: "skills-h2", targetVersionId: "v1"},
        { id: "p1-f-skills-js", action: "renderElement", targetSectionId: "skills", targetElementId: "skills-js", targetVersionId: "v1"},
        { id: "p1-f-skills-html", action: "renderElement", targetSectionId: "skills", targetElementId: "skills-html", targetVersionId: "v1"},
        { id: "p1-f-skills-react", action: "renderElement", targetSectionId: "skills", targetElementId: "skills-react", targetVersionId: "v1"},
        { id: "p1-f-skills-node", action: "renderElement", targetSectionId: "skills", targetElementId: "skills-node", targetVersionId: "v1"},
        { id: "p1-f-skills-uiux", action: "renderElement", targetSectionId: "skills", targetElementId: "skills-uiux", targetVersionId: "v1"},

        { id: "p1-f-sep3", action: "renderSection", targetSectionId: "sep3"},

        { id: "p1-f-contact-log", action: "log", logMessage: "[RENDERING V1] Contact section...", logType: "checking" },
        { id: "p1-f-contact-h2", action: "renderElement", targetSectionId: "contact", targetElementId: "contact-h2", targetVersionId: "v1"},
        { id: "p1-f-contact-email", action: "renderElement", targetSectionId: "contact", targetElementId: "contact-email", targetVersionId: "v1"},
        { id: "p1-f-contact-github", action: "renderElement", targetSectionId: "contact", targetElementId: "contact-github", targetVersionId: "v1"},
        { id: "p1-f-contact-linkedin", action: "renderElement", targetSectionId: "contact", targetElementId: "contact-linkedin", targetVersionId: "v1"},
        
        { id: "p1-f-log-draft-end", action: "log", logMessage: "[SYSTEM] Initial V1 draft complete.", logType: "system" },
        { id: "p1-f-delay-after-v1", action: "delay", delayMs: 500 },

        // P2: AI Review & Refinement Introduction
        { id: "p2-f-log-review-start", action: "log", logMessage: "[AI_SYSTEM] Commencing review and refinement of the V1 draft...", logType: "system" },
        { id: "p2-f-thought-review", action: "thought", logMessage: "[AI_THOUGHT] The V1 draft is a solid foundation. Let's enhance it for clarity, impact, and detail.", logType: "ai-thought" },
        { id: "p2-f-delay-after-thought", action: "delay", delayMs: 670 },

        // P3: Header Refinement (to V2)
        { id: "p3-f-hdr-revisit-log", action: "log", logMessage: "[AI_REVISIT] Revisiting Header section for enhancements...", logType: "system" },
        { id: "p3-f-hdr-visual-start", action: "setSectionVisualState", targetSectionId: "header", targetSectionVisualState: "inProgress" },
        { id: "p3-f-hdr-thought", action: "thought", logMessage: "[AI_THOUGHT] The title 'Developer & Designer' is good, but 'Full-Stack Developer & UX Designer' is more specific for the enhanced profile.", logType: "ai-thought"},
        { id: "p3-f-hdr-delay-thought", action: "delay", delayMs: 400},
        { id: "p3-f-hdr-title-update", action: "updateElement", targetSectionId: "header", targetElementId: "header-h2-title", targetVersionId: "v2", logMessage: "[REVISING] Header title refined.", logType: "checking"},
        { id: "p3-f-hdr-visual-end", action: "setSectionVisualState", targetSectionId: "header", targetSectionVisualState: "default" },
        { id: "p3-f-hdr-delay-after", action: "delay", delayMs: 330},

        // P4: About Me Refinement (to V2)
        { id: "p4-f-about-revisit-log", action: "log", logMessage: "[AI_REVISIT] Refining 'About Me' section...", logType: "system" },
        { id: "p4-f-about-visual-start", action: "setSectionVisualState", targetSectionId: "about", targetSectionVisualState: "inProgress" },
        { id: "p4-f-about-p1-thought", action: "thought", logMessage: "[AI_THOUGHT] For 'About Me P1': The initial statement is okay. Let's make it more professional and highlight expertise.", logType: "ai-thought"},
        { id: "p4-f-about-p1-delay", action: "delay", delayMs: 400},
        { id: "p4-f-about-p1-update", action: "updateElement", targetSectionId: "about", targetElementId: "about-p1", targetVersionId: "v2", logMessage: "[REVISING] About Me - P1 updated.", logType: "checking"},
        { id: "p4-f-about-p2-thought", action: "thought", logMessage: "[AI_THOUGHT] For 'About Me P2': The website demo description can be expanded to showcase problem-solving abilities.", logType: "ai-thought"},
        { id: "p4-f-about-p2-delay", action: "delay", delayMs: 400},
        { id: "p4-f-about-p2-update", action: "updateElement", targetSectionId: "about", targetElementId: "about-p2", targetVersionId: "v2", logMessage: "[REVISING] About Me - P2 updated.", logType: "checking"},
        { id: "p4-f-about-visual-end", action: "setSectionVisualState", targetSectionId: "about", targetSectionVisualState: "default" },
        { id: "p4-f-about-delay-after", action: "delay", delayMs: 330},

        // P5: Skills Refinement (to V2 and adding new skills)
        { id: "p5-f-skills-revisit-log", action: "log", logMessage: "[AI_REVISIT] Enhancing 'Skills' section...", logType: "system" },
        { id: "p5-f-skills-visual-start", action: "setSectionVisualState", targetSectionId: "skills", targetSectionVisualState: "inProgress" },
        { id: "p5-f-skills-h2-thought", action: "thought", logMessage: "[AI_THOUGHT] Changing 'Skills' header to 'Core Skills' for better focus.", logType: "ai-thought"},
        { id: "p5-f-skills-h2-update", action: "updateElement", targetSectionId: "skills", targetElementId: "skills-h2", targetVersionId: "v2", logMessage: "[REVISING] Skills header updated.", logType: "checking"},
        { id: "p5-f-skills-js-thought", action: "thought", logMessage: "[AI_THOUGHT] Expanding JavaScript/TypeScript with specific frameworks.", logType: "ai-thought"},
        { id: "p5-f-skills-js-update", action: "updateElement", targetSectionId: "skills", targetElementId: "skills-js", targetVersionId: "v2", logMessage: "[REVISING] JavaScript/TypeScript skills detailed.", logType: "checking"},
        { id: "p5-f-skills-node-thought", action: "thought", logMessage: "[AI_THOUGHT] Adding specifics for Node.js.", logType: "ai-thought"},
        { id: "p5-f-skills-node-update", action: "updateElement", targetSectionId: "skills", targetElementId: "skills-node", targetVersionId: "v2", logMessage: "[REVISING] Node.js skills detailed.", logType: "checking"},
        { id: "p5-f-skills-uiux-thought", action: "thought", logMessage: "[AI_THOUGHT] Detailing UI/UX Design tools.", logType: "ai-thought"},
        { id: "p5-f-skills-uiux-update", action: "updateElement", targetSectionId: "skills", targetElementId: "skills-uiux", targetVersionId: "v2", logMessage: "[REVISING] UI/UX Design skills detailed.", logType: "checking"},
        { id: "p5-f-skills-add-thought", action: "thought", logMessage: "[AI_THOUGHT] Incorporating additional key competencies: Python, API Design, Cloud, and DevOps.", logType: "ai-thought"},
        { id: "p5-f-skills-add-python", action: "renderElement", targetSectionId: "skills", targetElementId: "skills-python", targetVersionId: "v2", logMessage: "[ADDING] Python skills integrated.", logType: "checking"},
        { id: "p5-f-skills-add-graphql", action: "renderElement", targetSectionId: "skills", targetElementId: "skills-graphql", targetVersionId: "v2", logMessage: "[ADDING] API Design skills integrated.", logType: "checking"},
        { id: "p5-f-skills-add-cloud", action: "renderElement", targetSectionId: "skills", targetElementId: "skills-cloud", targetVersionId: "v2", logMessage: "[ADDING] Cloud Architecture skills integrated.", logType: "checking"},
        { id: "p5-f-skills-add-devops", action: "renderElement", targetSectionId: "skills", targetElementId: "skills-devops", targetVersionId: "v2", logMessage: "[ADDING] DevOps skills integrated.", logType: "checking"},
        { id: "p5-f-skills-react-thought", action: "thought", logMessage: "[AI_THOUGHT] The separate 'React' line is now redundant due to expanded JS/TS details. Consolidating for clarity.", logType: "ai-thought"},
        { id: "p5-f-skills-remove-react", action: "removeElement", targetElementId: "skills-react", logMessage: "[OPTIMIZING] Skill list consolidated.", logType: "checking"},
        { id: "p5-f-skills-visual-end", action: "setSectionVisualState", targetSectionId: "skills", targetSectionVisualState: "default" },
        { id: "p5-f-skills-delay-after", action: "delay", delayMs: 330},

        // P6: Contact Section Review (Assuming V1 is final and no changes needed here)
        { id: "p6-f-contact-review-log", action: "log", logMessage: "[AI_REVIEW] Contact section reviewed. V1 content is final.", logType: "system" },
        { id: "p6-f-contact-delay", action: "delay", delayMs: 330},

        // P7: Final Completion Messages
        { id: "p7-f-final-checks", action: "log", logMessage: "[VERIFYING] All revisions and enhancements complete. Final content inspection...", logType: "system"},
        { id: "p7-f-gen-complete", action: "log", logMessage: "[COMPLETE] Enhanced portfolio generated successfully!", logType: "system"}
    ]
}; 