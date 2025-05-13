import { ContentElement } from './types.js';
// import { LINE_DELAY, TYPING_SPEED, WIPE_CHARS, WIPE_SPEED } from './data'; // Will get from SitePlan via Engine

export class UIController {
    private contentElement: HTMLElement;
    private changelogContentElement: HTMLElement;
    private commandInputElement: HTMLInputElement;
    private runCommandButton: HTMLElement;

    private typingTimeout: ReturnType<typeof setTimeout> | null = null;
    private animationSettings = { // Default values, can be updated by engine
        typingSpeed: 10,
        lineDelay: 100,
        wipeSpeed: 10,
        wipeChars: 5,
    };

    constructor(
        contentElementId: string = 'content',
        changelogContentElementId: string = 'changelog-content',
        commandInputElementId: string = 'command-input',
        runCommandButtonId: string = 'run-command'
    ) {
        this.contentElement = document.getElementById(contentElementId)!;
        this.changelogContentElement = document.getElementById(changelogContentElementId)!;
        this.commandInputElement = document.getElementById(commandInputElementId) as HTMLInputElement;
        this.runCommandButton = document.getElementById(runCommandButtonId)!;

        if (!this.contentElement || !this.changelogContentElement || !this.commandInputElement || !this.runCommandButton) {
            console.error("UIController: Required DOM elements not found!");
            // Potentially throw an error here if elements are critical
        }
    }

    public updateAnimationSettings(settings: any) {
        this.animationSettings = { ...this.animationSettings, ...settings };
    }

    // --- Content Area Management ---

    public ensureSectionWrapper(sectionId: string, className?: string): HTMLElement {
        const wrapperId = `section-wrapper-${sectionId}`;
        let sectionWrapper = document.getElementById(wrapperId);
        if (!sectionWrapper) {
            sectionWrapper = document.createElement('div');
            sectionWrapper.id = wrapperId;
            sectionWrapper.className = 'content-section'; // Base class
            if (className) {
                sectionWrapper.classList.add(className);
            }
            this.contentElement.appendChild(sectionWrapper);
        }
        return sectionWrapper;
    }

    public renderInitialPageContent(sections: Array<{ id: string, elements: ContentElement[], className?: string }>) {
        this.contentElement.innerHTML = ''; // Clear existing content
        sections.forEach(sectionData => {
            const sectionWrapper = this.ensureSectionWrapper(sectionData.id, sectionData.className);
            sectionData.elements.forEach(elementDef => {
                // Render the first version directly for initial content
                if (elementDef.versions && elementDef.versions.length > 0) {
                    const firstVersion = elementDef.versions[0];
                    const element = document.createElement(elementDef.tag);
                    element.id = elementDef.id;
                    if (elementDef.className) element.classList.add(elementDef.className);
                    element.textContent = firstVersion.text;
                    sectionWrapper.appendChild(element);
                }
            });
        });
    }
    
    // Renders an element with typing effect into a specific section wrapper
    public renderAnimatedElement(sectionId: string, elementDef: ContentElement, versionText: string): Promise<void> {
        return new Promise((resolve) => {
            const sectionWrapper = this.ensureSectionWrapper(elementDef.className ? `${sectionId}-${elementDef.className}` : sectionId, elementDef.className); // ensure wrapper exists for section
            const element = document.createElement(elementDef.tag);
            element.id = elementDef.id;
            if (elementDef.className) element.classList.add(elementDef.className);
            sectionWrapper.appendChild(element);
            this.typeText(element, versionText, 0, resolve);
        });
    }

    // Renders an element immediately without typing, into a specific section
    public renderElementDirectly(sectionId: string, elementDef: ContentElement, text: string): void {
        const sectionWrapper = this.ensureSectionWrapper(sectionId, elementDef.className);

        const domElement = document.createElement(elementDef.tag);
        domElement.id = elementDef.id;
        if (elementDef.className) {
            domElement.classList.add(elementDef.className);
        }
        domElement.textContent = text;
        sectionWrapper.appendChild(domElement);
    }
    
    // Updates an existing element's content with typing effect
    public updateAnimatedElement(elementId: string, newText: string): Promise<void> {
        return new Promise((resolve, reject) => {
            const element = document.getElementById(elementId);
            if (!element) {
                console.error(`Element with ID ${elementId} not found for update.`);
                reject(new Error(`Element ${elementId} not found`));
                return;
            }
            // Clear existing content before typing new one
            element.textContent = ''; 
            this.typeText(element, newText, 0, resolve);
        });
    }

    public removeElementById(elementId: string): void {
        const element = document.getElementById(elementId);
        if (element && element.parentNode) {
            element.parentNode.removeChild(element);
        } else {
            console.warn(`Element with ID ${elementId} not found for removal.`);
        }
    }

    public removeSectionWrapper(sectionId: string): void {
        const wrapperId = `section-wrapper-${sectionId}`;
        const sectionWrapper = document.getElementById(wrapperId);
        if (sectionWrapper && sectionWrapper.parentNode) {
            sectionWrapper.parentNode.removeChild(sectionWrapper);
        }
    }

    public wipeAndClearContent(): Promise<void> {
        return new Promise((resolve) => {
            const contentToRemove = this.contentElement.innerHTML;
            let charIndex = contentToRemove.length;

            const wipe = () => {
                if (charIndex <= 0) {
                    this.contentElement.innerHTML = '';
                    resolve();
                    return;
                }
                this.contentElement.innerHTML = contentToRemove.substring(0, charIndex);
                charIndex -= this.animationSettings.wipeChars;
                setTimeout(wipe, this.animationSettings.wipeSpeed);
            };
            wipe();
        });
    }

    public clearContentImmediate() {
        this.contentElement.innerHTML = '';
    }

    public setSectionVisualState(sectionId: string, state: 'default' | 'inProgress' | 'error'): void {
        const sectionWrapper = document.getElementById(`section-wrapper-${sectionId}`);
        if (sectionWrapper) {
            sectionWrapper.classList.remove('state-default', 'state-in-progress', 'state-error');
            if (state !== 'default') { // Add state class if not default
                 sectionWrapper.classList.add(`state-${state}`);
            }
             // Add a base class if not already present for consistent styling targets
            if (!sectionWrapper.classList.contains('content-section')) {
                sectionWrapper.classList.add('content-section');
            }
        } else {
            console.warn(`Section wrapper for ${sectionId} not found to set visual state.`);
        }
    }

    // --- Terminal/Log Area Management ---

    public addLogEntry(text: string, type: string = '') {
        const entry = document.createElement('div');
        entry.className = type ? `changelog-entry ${type}` : 'changelog-entry';
        entry.textContent = text;
        this.changelogContentElement.appendChild(entry);
        this.scrollToBottom();
    }

    public clearLog() {
        this.changelogContentElement.innerHTML = '';
    }

    private scrollToBottom() {
        // Force scroll to bottom with a small delay
        setTimeout(() => {
            this.changelogContentElement.scrollTop = this.changelogContentElement.scrollHeight;
        }, 10);
    }

    // --- Command Input Management ---

    public setupCommandInput(commandHandler: (command: string) => void) {
        if (!this.commandInputElement || !this.runCommandButton) return; // Guard if elements missing

        this.runCommandButton.addEventListener('click', () => {
            const command = this.commandInputElement.value.trim();
            if (command) {
                commandHandler(command);
                this.commandInputElement.value = '';
            }
        });

        this.commandInputElement.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                const command = this.commandInputElement.value.trim();
                if (command) {
                    commandHandler(command);
                    this.commandInputElement.value = '';
                }
            }
        });
    }

    // --- Typing Animation ---

    private typeText(element: HTMLElement, text: string, charIndex: number = 0, onComplete?: () => void) {
        if (charIndex < text.length) {
            element.textContent = text.substring(0, charIndex + 1);
            this.typingTimeout = setTimeout(() => {
                this.typeText(element, text, charIndex + 1, onComplete);
            }, this.animationSettings.typingSpeed);
        } else {
            if (onComplete) {
                // Use a minimal delay before calling completion to ensure rendering
                 setTimeout(onComplete, this.animationSettings.lineDelay);
            }
        }
    }

    // --- Utility ---

    public clearAllTimeouts() {
        if (this.typingTimeout) {
            clearTimeout(this.typingTimeout);
            this.typingTimeout = null;
        }
        // Add clearing for other timeouts if they are managed here
    }

     // --- Potentially add methods for highlighting/modifying content later ---
    // highlightElement(selector: string) { ... }
    // modifyElementText(selector: string, newText: string) { ... }
} 