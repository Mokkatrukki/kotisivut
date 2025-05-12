import './style.css';
import { UIController } from './uiController';
import { GenerationEngine } from './generationEngine';

// Extend the Window interface (if needed for debugging, otherwise can be removed)
declare global {
    interface Window {
        // Add debugging functions if necessary, e.g.:
        // engine: GenerationEngine;
    }
}

function init() {
    // Instantiate the UI controller
    const uiController = new UIController();

    // Instantiate the generation engine and pass the UI controller
    const engine = new GenerationEngine(uiController);

    // Connect the UI's command input to the engine's command handler
    // Use bind to ensure 'this' context is correct inside handleCommand
    uiController.setupCommandInput(engine.handleCommand.bind(engine));

    // (Optional: Expose engine for debugging)
    // window.engine = engine;

    // Start the initial animation sequence
    engine.startInitialSequence();

}

// Start the application when the DOM is ready
document.addEventListener('DOMContentLoaded', init);