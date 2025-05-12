import { ContentLine } from './types';
import { LINE_DELAY, TYPING_SPEED, WIPE_CHARS, WIPE_SPEED } from './data';

export class UIController {
    private contentElement: HTMLElement;
    private changelogContentElement: HTMLElement;
    private commandInputElement: HTMLInputElement;
    private runCommandButton: HTMLElement;

    private typingTimeout: ReturnType<typeof setTimeout> | null = null;

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

    // --- Content Area Management ---

    renderInitialContent(initialContent: ContentLine[]) {
        this.contentElement.innerHTML = ''; // Clear existing content
        initialContent.forEach(line => {
            const element = document.createElement(line.tag);
            element.textContent = line.text;
            this.contentElement.appendChild(element);
        });
    }

    // Adds a single content line with typing effect
    addContentElement(line: ContentLine): Promise<void> {
        return new Promise((resolve) => {
            const element = document.createElement(line.tag);
            // Add data attributes or IDs if needed for future highlighting/modification
            // element.dataset.lineIndex = index.toString();
            this.contentElement.appendChild(element);
            this.typeText(element, line.text, 0, resolve); // Pass resolve as the onComplete callback
        });
    }

    wipeAndClearContent(): Promise<void> {
        return new Promise((resolve) => {
            const contentToRemove = this.contentElement.innerHTML;
            let charIndex = contentToRemove.length;

            const wipe = () => {
                if (charIndex <= 0) {
                    this.contentElement.innerHTML = '';
                    resolve(); // Resolve the promise when wiping is complete
                    return;
                }
                this.contentElement.innerHTML = contentToRemove.substring(0, charIndex);
                charIndex -= WIPE_CHARS; // Use constant
                setTimeout(wipe, WIPE_SPEED); // Use constant
            };

            wipe();
        });
    }

    clearContentImmediate() {
        this.contentElement.innerHTML = '';
    }

    // --- Terminal/Log Area Management ---

    addLogEntry(text: string, type: string = '') {
        const entry = document.createElement('div');
        entry.className = type ? `changelog-entry ${type}` : 'changelog-entry';
        entry.textContent = text;
        this.changelogContentElement.appendChild(entry);
        this.scrollToBottom();
    }

    clearLog() {
        this.changelogContentElement.innerHTML = '';
    }

    private scrollToBottom() {
        // Force scroll to bottom with a small delay
        setTimeout(() => {
            this.changelogContentElement.scrollTop = this.changelogContentElement.scrollHeight;
        }, 10);
    }

    // --- Command Input Management ---

    setupCommandInput(commandHandler: (command: string) => void) {
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
            }, TYPING_SPEED);
        } else {
            if (onComplete) {
                // Use a minimal delay before calling completion to ensure rendering
                 setTimeout(onComplete, LINE_DELAY); // Use constant
            }
        }
    }

    // --- Utility ---

    clearAllTimeouts() {
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