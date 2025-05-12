import { 
    websiteContentData,
    initialContentData,
    commandSequenceData,
    utilityCommandsData,
    enhancedWebsiteContentData,
    COMMAND_DELAY,
    ENHANCE_COMMAND_TEXT
} from './data';
import { CommandStep, ContentLine, UtilityCommand } from './types';
import { UIController } from './uiController';

export class GenerationEngine {
    private uiController: UIController;
    private currentCommandIndex: number = 0;
    private commandTimeout: ReturnType<typeof setTimeout> | null = null;
    private isRunning: boolean = false;
    private currentContentSource: ContentLine[];

    constructor(uiController: UIController) {
        this.uiController = uiController;
        this.currentContentSource = websiteContentData; // Default content
    }

    // --- Public Methods ---

    startInitialSequence() {
        this.resetState();
        document.title = 'Leo Vainio (0%)';
        this.uiController.renderInitialContent(initialContentData);

        // After a delay, show the initial prompt and start auto-generation
        setTimeout(() => {
            this.uiController.addLogEntry('[SYSTEM] > _', 'system');
            setTimeout(() => {
                this.uiController.clearLog(); 
                this.enhanceSkills(); // Pre-enhance for the default run
                this.startAutoGeneration();
            }, 1500);
        }, 2000);
    }

    // Handles commands entered by the user
    handleCommand(commandName: string): boolean {
        commandName = commandName.trim();
        
        // Special case: Enhance and auto-generate
        if (commandName === ENHANCE_COMMAND_TEXT) {
            this.uiController.addLogEntry(`[Request] ${commandName}`, 'system');
            this.uiController.addLogEntry('[Processing] Enhancing skill set', 'checking');
            this.enhanceSkills();
            setTimeout(() => {
                this.startAutoGeneration();
            }, COMMAND_DELAY);
            return true;
        }

        // Utility commands
        const utilityCommand = utilityCommandsData.find(cmd => cmd.command === commandName);
        if (utilityCommand) {
            switch(utilityCommand.command) {
                case 'help':
                    this.showHelp();
                    break;
                case 'clear':
                    this.uiController.clearLog();
                    break;
                case 'reset':
                    this.resetState();
                    this.uiController.renderInitialContent(initialContentData); // Show initial again
                    document.title = 'Leo Vainio (0%)';
                    break;
                case 'auto':
                    this.startAutoGeneration();
                    break;
            }
            return true;
        }

        // Allow executing specific sequence commands? (Maybe disable this for final version)
        // const sequenceCommand = commandSequenceData.find(cmd => cmd.command === commandName);
        // if (sequenceCommand) {
        //     this.uiController.addLogEntry(`[Executing] ${commandName}`, 'system');
        //     this.executeCommand(sequenceCommand); // Might need adjustment
        //     return true;
        // }

        // Unknown command
        this.uiController.addLogEntry(`[Error] Unknown command: "${commandName}"`, 'error');
        this.uiController.addLogEntry(`[Help] Type 'help' for available commands`, 'system');
        console.error(`Command not found: ${commandName}`);
        return false;
    }

    // --- Core Generation Logic ---

    private startAutoGeneration() {
        this.resetState(); // Reset before starting
        this.isRunning = true;
        this.executeNextCommand();
    }

    private executeNextCommand() {
        if (!this.isRunning || this.currentCommandIndex >= commandSequenceData.length) {
            console.log('Command sequence complete or stopped.');
            this.isRunning = false;
            return;
        }

        const command = commandSequenceData[this.currentCommandIndex];
        this.currentCommandIndex++;

        this.updateTitleProgress();
        this.uiController.addLogEntry(command.displayText, command.type);

        // Execute the command action
        this.executeCommand(command);
    }

    private async executeCommand(command: CommandStep) {
        switch (command.command) {
            case 'initialize_website':
            case 'load_example_site': // This step now mainly just logs, initial render is done earlier
            case 'render_template':
            case 'template_ready':
            case 'prepare_generation':
            case 'run_checks':
                 // Simple delay steps
                this.scheduleNextCommand();
                break;

            case 'start_line_rendering':
                 // Start the wiping animation
                await this.uiController.wipeAndClearContent();
                this.scheduleNextCommand(500); // Add delay after wiping
                break;

            case 'compile_header':
            case 'check_structure':
            case 'scan_blocks':
            case 'load_portfolio':
            case 'integrate_skills':
            case 'apply_styling':
            case 'format_contact':
            case 'finalize_content':
                // Render lines associated with this command
                if (command.lineRange) {
                    await this.renderLinesSequentially(command.lineRange[0], command.lineRange[1]);
                    this.scheduleNextCommand(0); // Schedule immediately after last line typed
                } else {
                     console.warn(`Command ${command.command} missing lineRange.`);
                     this.scheduleNextCommand(); // Skip if no lines defined
                }
                break;

            case 'complete':
                console.log('Website generation complete');
                this.isRunning = false;
                // No further commands scheduled
                break;

            default:
                console.log(`Unknown command: ${command.command}`);
                this.scheduleNextCommand();
        }
    }

    // Renders lines sequentially, waiting for each typing animation
    private async renderLinesSequentially(startIndex: number, endIndex: number) {
        for (let i = startIndex; i < endIndex; i++) {
            if (i >= this.currentContentSource.length) break; // Safety check
            const line = this.currentContentSource[i];
            await this.uiController.addContentElement(line); // Wait for line to finish typing
        }
    }

    private scheduleNextCommand(delay: number = COMMAND_DELAY) {
        if (!this.isRunning) return;
        this.clearCommandTimeout();
        this.commandTimeout = setTimeout(() => {
            this.executeNextCommand();
        }, delay);
    }

    // --- State and Utility Functions ---

    private resetState() {
        this.isRunning = false;
        this.currentCommandIndex = 0;
        this.clearCommandTimeout();
        this.uiController.clearAllTimeouts(); // Clear UI timeouts too
        this.uiController.clearLog();
        this.uiController.clearContentImmediate();
        this.currentContentSource = websiteContentData; // Reset to default content
        // Reset title? Might be better done when starting generation
    }

    private clearCommandTimeout() {
        if (this.commandTimeout) {
            clearTimeout(this.commandTimeout);
            this.commandTimeout = null;
        }
    }

    private updateTitleProgress() {
        const progress = Math.round((this.currentCommandIndex / commandSequenceData.length) * 100);
        document.title = `Leo Vainio (${progress}%)`;
    }

    private showHelp() {
        this.uiController.addLogEntry('[Help] Available commands:', 'system');
        utilityCommandsData.forEach(cmd => {
            this.uiController.addLogEntry(`  ${cmd.command}: ${cmd.description}`, '');
        });
        // Optionally list sequence commands if needed for debugging
        // this.uiController.addLogEntry('[Info] Portfolio generation steps:', 'system');
        // commandSequenceData.forEach(cmd => {
        //     this.uiController.addLogEntry(`  ${cmd.command}`, '');
        // });
    }
    
    private enhanceSkills() {
        // Switch the content source for subsequent generation
        this.currentContentSource = enhancedWebsiteContentData;
        console.log("Switched to enhanced content.");
    }
} 