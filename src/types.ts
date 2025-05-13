export interface ContentLine {
    tag: string;
    text: string;
}

export interface ContentElementVersion {
    versionId: string;
    text: string;
    logMessage?: string;    // Specific log for this version's generation
    critiqueOfPrevious?: string; // If this version corrects a prior one
    isFinal?: boolean; // True if this is the version for instant rendering
}

export interface ContentElement {
    id: string;             // e.g., "hero-h1", "about-p1" - must be unique across the site
    tag: string;            // "h1", "p", "li", etc.
    // initialText?: string;   // Optional: quickly shown placeholder (Covered by displayInitially sections)
    versions: ContentElementVersion[]; // Array of versions, at least one
    currentVersionId?: string; // To track which version is currently displayed (managed by engine)
    className?: string;      // Optional CSS class
}

export interface ContentSection {
    id: string;             // e.g., "hero", "about", "skills-initial"
    type: 'block' | 'separator' | 'custom'; // Type of section
    elements?: ContentElement[]; // If type is 'block' or 'custom'
    separatorText?: string;    // If type is 'separator'
    displayInitially?: boolean; // Should this section be rendered by 'renderInitial' flow step?
    className?: string; // Optional CSS class for the section wrapper
}

export interface FlowStep {
    id: string; // For potential future reference or branching
    action: 'log' | 
            'delay' | 
            'renderInitial' | 
            'renderSection' | 
            'renderElement' | 
            'updateElement' | 
            'removeElement' | 
            'clearContentArea' | 
            'thought' | 
            'setSectionVisualState';
    
    logMessage?: string;    // Message for the terminal
    logType?: 'system' | 'user' | 'checking' | 'error' | 'ai-thought' | 'ai-decision';
    delayMs?: number;       // For 'delay' action

    targetSectionId?: string;
    targetElementId?: string; // For element-specific actions
    targetVersionId?: string; // Which version of an element to render/update to
    targetSectionVisualState?: 'default' | 'inProgress' | 'error'; // For setSectionVisualState
    // initialSectionsToShow?: string[]; // Not needed if renderInitial scans for displayInitially=true
}

export interface SitePlanMeta {
    siteTitle: string;
    initialUserPrompt: string;
    animationSettings?: {
        typingSpeed?: number;
        lineDelay?: number;
        commandDelay?: number;
        wipeSpeed?: number;
        wipeChars?: number;
    };
}

export interface UtilityCommand {
    command: string;
    displayText: string;
    description: string;
}

export interface SitePlan {
    meta: SitePlanMeta;
    sections: ContentSection[];
    utilityCommands: UtilityCommand[];
    flow: FlowStep[];
}

// Old CommandStep can be removed if flow replaces commandSequenceData completely
// export interface CommandStep {
//     command: string;
//     displayText: string;
//     type: string;
//     lineRange?: [number, number]; 
// } 