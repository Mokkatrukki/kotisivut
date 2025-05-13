import './style.css';
import { UIController } from './uiController.js';
import { GenerationEngine } from './generationEngine.js';
import { sitePlanData } from './sitePlan.js';
import { SitePlan } from './types.js';

// Extend the Window interface (if needed for debugging, otherwise can be removed)
declare global {
    interface Window {
        // engine?: GenerationEngine; // Optional: for debugging
        // ui?: UIController;       // Optional: for debugging
    }
}

function init() {
    // Instantiate the UI controller
    const uiController = new UIController();

    // Instantiate the generation engine and pass the UI controller and sitePlanData
    const engine = new GenerationEngine(uiController, sitePlanData as SitePlan); // Cast to SitePlan for type safety

    // Connect the UI's command input to the engine's command handler
    // Use bind to ensure 'this' context is correct inside handleCommand
    uiController.setupCommandInput(engine.handleCommand.bind(engine));

    // (Optional: Expose engine for debugging)
    // window.engine = engine;
    // window.ui = uiController;

    engine.initialize(); // Engine decides render mode (instant or animated)
}

// Start the application when the DOM is ready
document.addEventListener('DOMContentLoaded', init);