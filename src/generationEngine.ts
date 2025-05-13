import { SitePlan, FlowStep, ContentElement, ContentSection, ContentElementVersion, UtilityCommand } from './types.js';
import { UIController } from './uiController.js';
import { ENHANCE_COMMAND_TEXT } from './sitePlan.js'; // Assuming ENHANCE_COMMAND_TEXT is exported from sitePlan.ts

export class GenerationEngine {
    private uiController: UIController;
    private sitePlan: SitePlan;
    private currentFlowStepIndex: number = 0;
    private commandTimeout: ReturnType<typeof setTimeout> | null = null;
    private isRunning: boolean = false;
    private enhancedMode: boolean = false; // To track if enhanced content should be prioritized

    private animationSettings: any;

    constructor(uiController: UIController, sitePlan: SitePlan) {
        this.uiController = uiController;
        this.sitePlan = sitePlan;
        this.animationSettings = this.sitePlan.meta.animationSettings || {};
        this.uiController.updateAnimationSettings(this.animationSettings); // Pass settings to UI
    }

    public initialize(): void {
        const urlParams = new URLSearchParams(window.location.search);
        const instantRender = urlParams.get('instant') === 'true';

        if (instantRender) {
            this.renderFinalSiteDirectly();
        } else {
            this.startInitialAnimatedSequence();
        }
    }

    private startInitialAnimatedSequence(): void {
        this.resetState();
        document.title = this.sitePlan.meta.siteTitle || 'Leo Vainio (0%)';
        this.uiController.addLogEntry(this.sitePlan.meta.initialUserPrompt, "user");
        this.isRunning = true;
        this.executeNextFlowStep();
    }

    private async executeNextFlowStep(): Promise<void> {
        if (!this.isRunning || this.currentFlowStepIndex >= this.sitePlan.flow.length) {
            console.log('Flow sequence complete or stopped.');
            this.isRunning = false;
            return;
        }

        const step = this.sitePlan.flow[this.currentFlowStepIndex];
        this.currentFlowStepIndex++;

        this.updateTitleProgress();
        if (step.logMessage && step.logType !== 'user') { // User prompt is logged by startInitialAnimatedSequence
            this.uiController.addLogEntry(step.logMessage, step.logType || 'system');
        }
        
        await this.executeFlowStepAction(step);
    }

    private async executeFlowStepAction(step: FlowStep): Promise<void> {
        const commandDelay = this.animationSettings.commandDelay || 800;

        switch (step.action) {
            case 'log':
                // Already handled in executeNextFlowStep if not user type, or by initial call
                this.scheduleNextStep(commandDelay);
                break;

            case 'delay':
                this.scheduleNextStep(step.delayMs || commandDelay);
                break;

            case 'renderInitial':
                const initialSections = this.sitePlan.sections.filter(s => s.displayInitially);
                const initialPageContent = initialSections.map(s => ({
                    id: s.id,
                    elements: s.elements || [],
                    className: s.className
                }));
                this.uiController.renderInitialPageContent(initialPageContent);
                this.scheduleNextStep(commandDelay);
                break;

            case 'clearContentArea':
                await this.uiController.wipeAndClearContent();
                this.scheduleNextStep(this.animationSettings.wipeDelay || 500); // Specific delay after wipe
                break;

            case 'renderSection':
                if (step.targetSectionId) {
                    const section = this.sitePlan.sections.find(s => s.id === step.targetSectionId);
                    if (section) {
                        await this.renderSectionAnimated(section);
                    } else {
                        console.warn(`Target section ${step.targetSectionId} not found for step ${step.id}`);
                    }
                }
                this.scheduleNextStep(0); // Schedule immediately after section elements are done typing
                break;

            case 'renderElement':
                if (step.targetSectionId && step.targetElementId) {
                    const section = this.sitePlan.sections.find(s => s.id === step.targetSectionId);
                    const element = section?.elements?.find(e => e.id === step.targetElementId);
                    if (element) {
                        const versionIdToRender = this.enhancedMode && element.versions.find(v => v.isFinal) ? 
                                                  element.versions.find(v => v.isFinal)!.versionId : 
                                                  (step.targetVersionId || element.versions[0].versionId);
                        const version = element.versions.find(v => v.versionId === versionIdToRender);
                        if (version) {
                            await this.uiController.renderAnimatedElement(step.targetSectionId, element, version.text);
                            if(version.logMessage) this.uiController.addLogEntry(version.logMessage, 'system');
                        } else {
                            console.warn(`Version ${versionIdToRender} for element ${step.targetElementId} not found.`);
                        }
                    } else {
                        console.warn(`Target element ${step.targetElementId} in section ${step.targetSectionId} not found.`);
                    }
                }
                this.scheduleNextStep(0);
                break;

            case 'updateElement':
                if (step.targetElementId && step.targetVersionId) {
                    const element = this.findElementById(step.targetElementId);
                     if (element) {
                        const version = element.versions.find(v => v.versionId === step.targetVersionId);
                        if (version) {
                            // Log critique if present before updating
                            if (version.critiqueOfPrevious && step.logType !== 'ai-thought') {
                                this.uiController.addLogEntry(`[AI_REASONING] ${version.critiqueOfPrevious}`, 'ai-thought');
                                await this.delay(this.animationSettings.lineDelay || 100); // Small delay for reading
                            }
                            await this.uiController.updateAnimatedElement(step.targetElementId, version.text);
                            if(version.logMessage && step.logMessage !== version.logMessage) this.uiController.addLogEntry(version.logMessage, 'system');
                        } else {
                             console.warn(`Version ${step.targetVersionId} for element ${step.targetElementId} not found for update.`);
                        }
                    } else {
                        console.warn(`Element ${step.targetElementId} not found for update.`);
                    }
                }
                this.scheduleNextStep(commandDelay);
                break;
            
            case 'removeElement':
                if(step.targetElementId){
                    this.uiController.removeElementById(step.targetElementId);
                } else if (step.targetSectionId) {
                    // This would remove the entire section wrapper and its contents
                    this.uiController.removeSectionWrapper(step.targetSectionId);
                }
                this.scheduleNextStep(commandDelay);
                break;

            case 'thought': // Primarily for logging, specific styling done by UIController
                this.scheduleNextStep(step.delayMs || commandDelay);
                break;

            case 'setSectionVisualState':
                if (step.targetSectionId && step.targetSectionVisualState) {
                    this.uiController.setSectionVisualState(step.targetSectionId, step.targetSectionVisualState);
                }
                this.scheduleNextStep(step.delayMs !== undefined ? step.delayMs : commandDelay / 2); // Often quicker transition
                break;
            
            default:
                console.warn(`Unknown flow step action: ${step.action}`);
                this.scheduleNextStep(commandDelay);
        }
    }

    private async renderSectionAnimated(section: ContentSection): Promise<void> {
        this.uiController.ensureSectionWrapper(section.id, section.className);
        if (section.type === 'block' && section.elements) {
            for (const element of section.elements) {
                 // Determine which version to render (v1 or final if enhancedMode is true)
                const versionToRender = (this.enhancedMode && element.versions.find(v => v.isFinal)) 
                                      ? element.versions.find(v => v.isFinal)! 
                                      : element.versions[0]; 
                
                if (versionToRender) {
                    await this.uiController.renderAnimatedElement(section.id, element, versionToRender.text);
                    if(versionToRender.logMessage) this.uiController.addLogEntry(versionToRender.logMessage, 'system');
                } else {
                    console.warn(`No suitable version found for element ${element.id} in section ${section.id}`);
                }
            }
        } else if (section.type === 'separator' && section.separatorText) {
            // Separators are usually rendered directly or with minimal animation
            const separatorElementDef: ContentElement = {
                id: section.id + '-element', // Make a unique ID for the element itself
                tag: 'p', // Or div, or hr - adjust as needed
                versions: [{ versionId: 'v1', text: section.separatorText }],
                className: 'separator' // Add a class for styling
            };
            await this.uiController.renderAnimatedElement(section.id, separatorElementDef, section.separatorText);
        }
    }
    
    private findElementById(elementId: string): ContentElement | undefined {
        for (const section of this.sitePlan.sections) {
            if (section.elements) {
                const found = section.elements.find(e => e.id === elementId);
                if (found) return found;
            }
        }
        return undefined;
    }

    private scheduleNextStep(delay: number): void {
        if (!this.isRunning) return;
        this.clearCommandTimeout();
        this.commandTimeout = setTimeout(() => {
            this.executeNextFlowStep();
        }, delay);
    }

    private renderFinalSiteDirectly(): void {
        this.resetState(true); // Pass true to indicate silent reset for direct render
        this.uiController.addLogEntry("[SYSTEM] Displaying final site content.", "system");
        document.title = this.sitePlan.meta.siteTitle;

        this.sitePlan.sections.forEach(section => {
            // Decide if section should be displayed in final output (e.g. skip initialExample)
            if (section.id === 'initialExample') return; 

            this.uiController.ensureSectionWrapper(section.id, section.className);

            if (section.type === 'block' && section.elements) {
                section.elements.forEach(element => {
                    let finalVersion = element.versions.find(v => v.isFinal === true);
                    if (!finalVersion && element.versions.length > 0) {
                        finalVersion = element.versions[element.versions.length - 1];
                    }
                    if (finalVersion) {
                        this.uiController.renderElementDirectly(section.id, element, finalVersion.text);
                    }
                });
            } else if (section.type === 'separator' && section.separatorText) {
                 const separatorElementDef: ContentElement = {
                    id: section.id + '-element',
                    tag: 'p',
                    versions: [{ versionId: 'v1', text: section.separatorText }],
                    className: 'separator'
                };
                this.uiController.renderElementDirectly(section.id, separatorElementDef, section.separatorText);
            }
        });
        this.uiController.addLogEntry("[COMPLETE] Site rendered.", "system");
        this.isRunning = false; // Stop any potential flow
    }

    public handleCommand(commandName: string): boolean {
        commandName = commandName.trim().toLowerCase();
        const utilityCmd = this.sitePlan.utilityCommands.find(cmd => cmd.command === commandName);

        if (commandName === ENHANCE_COMMAND_TEXT.toLowerCase()) {
             this.uiController.addLogEntry(`[Request] ${ENHANCE_COMMAND_TEXT}`, 'system');
             this.uiController.addLogEntry('[Processing] Enhancing skill set and re-generating...', 'checking');
             this.enhancedMode = true; // Set flag
             this.startInitialAnimatedSequence(); // Restart generation with enhanced mode
             return true;
        }

        if (utilityCmd) {
            switch (utilityCmd.command) {
                case 'help':
                    this.showHelp();
                    break;
                case 'clear':
                    this.uiController.clearLog();
                    break;
                case 'reset':
                    this.enhancedMode = false; // Reset enhanced mode
                    this.startInitialAnimatedSequence();
                    break;
                case 'auto': // Alias for reset/start
                     this.enhancedMode = false;
                    this.startInitialAnimatedSequence();
                    break;
                case 'skip':
                    this.renderFinalSiteDirectly();
                    break;
            }
            return true;
        }

        this.uiController.addLogEntry(`[Error] Unknown command: "${commandName}"`, 'error');
        this.uiController.addLogEntry(`[Help] Type 'help' for available commands`, 'system');
        return false;
    }

    private resetState(silent: boolean = false): void {
        this.isRunning = false;
        this.currentFlowStepIndex = 0;
        this.clearCommandTimeout();
        this.uiController.clearAllTimeouts();
        if (!silent) {
            this.uiController.clearLog();
        }
        this.uiController.clearContentImmediate();
        // enhancedMode is reset by specific commands like 'reset' or at start
    }

    private clearCommandTimeout(): void {
        if (this.commandTimeout) {
            clearTimeout(this.commandTimeout);
            this.commandTimeout = null;
        }
    }
    
    private delay(ms: number): Promise<void> {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    private updateTitleProgress(): void {
        const progress = Math.round((this.currentFlowStepIndex / this.sitePlan.flow.length) * 100);
        const baseTitle = this.sitePlan.meta.siteTitle || "Leo Vainio";
        document.title = `${baseTitle} (${progress}%)`;
    }

    private showHelp(): void {
        this.uiController.addLogEntry('[Help] Available commands:', 'system');
        this.sitePlan.utilityCommands.forEach(cmd => {
            this.uiController.addLogEntry(`  ${cmd.command}: ${cmd.description}`, '');
        });
        this.uiController.addLogEntry(`  "${ENHANCE_COMMAND_TEXT}" (Special request to enhance & regenerate)`, '');
    }
} 