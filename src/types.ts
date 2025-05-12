export interface ContentLine {
    tag: string;
    text: string;
}

export interface CommandStep {
    command: string;
    displayText: string;
    type: string;
    lineRange?: [number, number]; // Optional: [start index inclusive, end index exclusive]
}

export interface UtilityCommand {
    command: string;
    displayText: string;
    description: string;
} 