# Code Editor Style Portfolio Website

A minimalist personal portfolio website that simulates a code editor with line-by-line text generation effect. This project creates a unique experience where visitors see your portfolio being "coded" in real-time.

![Portfolio Generator](https://via.placeholder.com/800x400?text=Portfolio+Generator)

## Features

- **Line-by-line Text Generation**: Content appears as if being typed in real-time
- **Declarative Site Definition**: Entire site content, generation flow, and "AI thoughts" are defined in `src/sitePlan.ts`.
- **Interactive Terminal**: Shows the "thought process" and generation steps from the site plan.
- **Command System**: Hidden command interface (press Ctrl+/) allows users to control the generation
- **Initial Example Site**: Starts with a placeholder that gets replaced with your actual content
- **Responsive Design**: Works well on various screen sizes

## How It Works

1.  The website structure, content versions (including initial, intermediate, and final states), and the entire generation sequence (the "flow") are defined in `src/sitePlan.ts`.
2.  On load, the `GenerationEngine` processes the `sitePlanData`.
3.  It can either display the final content instantly (if `?instant=true` in URL or `skip` command is used) or start an animated sequence.
4.  During animated generation:
    *   It follows the `flow` defined in the site plan, step by step.
    *   Each step can trigger actions like logging messages to the terminal, rendering content elements (with typing animation), updating existing elements, showing AI "thoughts", or applying visual effects to sections.
    *   The `UIController` handles all DOM manipulations and animations based on instructions from the `GenerationEngine`.
5.  A complete portfolio is built, potentially with simulated revisions and AI decision-making, as scripted in `src/sitePlan.ts`.

## File Structure Overview

- `src/index.ts`: Main entry point, initializes the engine and UI controller.
- `src/sitePlan.ts`: **The core configuration file.** Defines the site's metadata, content sections (with versions for each element), utility commands, and the step-by-step generation `flow`.
- `src/types.ts`: TypeScript interfaces defining the structure of `sitePlanData` and its components.
- `src/generationEngine.ts`: Orchestrates the site generation process by interpreting the `sitePlanData` and instructing the `UIController`.
- `src/uiController.ts`: Manages all direct DOM interactions, including rendering content, animations, and terminal updates.
- `public/`: Static assets.
- `dist/`: Build output.

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/portfolio-site.git
   cd portfolio-site
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm run dev
   ```

4. Build for production:
   ```
   npm run build
   ```

## Deployment

### GitHub Pages

This project is set up for easy deployment to GitHub Pages:

1. First, update the `homepage` field in `package.json` with your GitHub username:
   ```json
   "homepage": "https://mokkatrukki.github.io/kotisivut"
   ```

2. Deploy to GitHub Pages with:
   ```
   npm run deploy
   ```

3. Your site will be available at `https://mokkatrukki.github.io/kotisivut`

### Custom Domain

To use a custom domain:

1. Create a `CNAME` file in the `public` folder with your domain name
2. Configure your DNS settings as described in [GitHub Pages documentation](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site)

## Customization

All primary customization of content, generation behavior, and terminal messages is now done within the `src/sitePlan.ts` file. This file exports a `sitePlanData` object conforming to the `SitePlan` interface (defined in `src/types.ts`).

### 1. Site Metadata (`sitePlanData.meta`)

   - `siteTitle`: The title of your website.
   - `initialUserPrompt`: The first message displayed in the terminal, simulating a user request.
   - `animationSettings`: Default speeds for typing, delays, etc.

   ```typescript
   meta: {
       siteTitle: "Your Name - Your Title",
       initialUserPrompt: "[USER] Create an amazing portfolio for me!",
       animationSettings: { /* ... */ }
   }
   ```

### 2. Content Sections (`sitePlanData.sections`)

   Define the structure of your website content. Each section has an `id`, `type` (e.g., 'block', 'separator'), and an array of `elements`.

   Each `element` has:
   - `id`: A unique identifier for the element.
   - `tag`: The HTML tag (e.g., 'h1', 'p').
   - `versions`: An array of `ContentElementVersion` objects. Each version represents a state of the element's text. You can define multiple versions to simulate revisions.
     - `versionId`: Unique ID for the version.
     - `text`: The content for this version.
     - `isFinal: true`: Marks this version as the one to use for instant rendering (`skip` command or `?instant=true`).
     - `critiqueOfPrevious`: Optional text logged as an AI thought when updating to this version.
     - `logMessage`: Optional message logged when this version is rendered.

   ```typescript
   sections: [
       {
           id: "hero",
           type: "block",
           elements: [
               {
                   id: "hero-title",
                   tag: "h1",
                   versions: [{ versionId: "v1", text: "My Awesome Portfolio", isFinal: true }]
               },
               {
                   id: "hero-subtitle",
                   tag: "p",
                   versions: [
                       { versionId: "v1", text: "A simple subtitle." },
                       { versionId: "v2", text: "A much improved and dynamic subtitle!", isFinal: true, critiqueOfPrevious: "The first one was too plain." }
                   ]
               }
           ]
       },
       // ... more sections ...
   ]
   ```

### 3. Generation Flow (`sitePlanData.flow`)

   This array of `FlowStep` objects dictates the entire animation and generation sequence. Each step has an `action` and other properties based on the action.

   **Common Actions:**
   - `log`: Displays a message in the terminal.
   - `delay`: Pauses for a specified duration.
   - `renderInitial`: Renders sections marked with `displayInitially: true` without animation.
   - `clearContentArea`: Wipes the main content area.
   - `renderSection`: Renders all elements of a target section (typically their first or final version based on `enhancedMode`).
   - `renderElement`: Renders a specific version of a single element with typing animation.
   - `updateElement`: Updates an already rendered element to a new version, simulating revision.
   - `thought`: Logs a message with an "AI thought" style.
   - `setSectionVisualState`: Applies visual effects (e.g., blur, highlight) to a section wrapper.

   ```typescript
   flow: [
       { id: "start", action: "log", logMessage: "Initiating portfolio generation...", logType: "system" },
       { id: "render-hero", action: "renderSection", targetSectionId: "hero" },
       { 
           id: "think-subtitle", 
           action: "thought", 
           logMessage: "[AI_THOUGHT] That subtitle could be punchier.", 
           logType: "ai-thought" 
       },
       { 
           id: "update-subtitle", 
           action: "updateElement", 
           targetElementId: "hero-subtitle", 
           targetVersionId: "v2", 
           logMessage: "[REVISING] Improving subtitle.",
           logType: "checking"
       },
       // ... more flow steps ...
   ]
   ```

### 4. Utility Commands (`sitePlanData.utilityCommands`)

   Define the commands available in the interactive terminal (Ctrl+/).

   ```typescript
   utilityCommands: [
       { command: 'help', displayText: 'Show commands', description: 'Lists available commands.' },
       // ... other commands ...
   ]
   ```

### 5. Styling

Edit `src/style.css` to customize the appearance. New CSS classes for section states (e.g., `.state-in-progress`) can be styled here.

## Special Commands

Press `Ctrl+/` to toggle the command input, then try these commands (defined in `sitePlan.data.utilityCommands`):

- `help` - Show available commands
- `reset` - Resets the website to its initial animated state.
- `clear` - Clear the terminal.
- `auto` - Alias for `reset`, starts the animated generation from the beginning.
- `skip` - Instantly displays the final version of the website content.
- **`Make awesome profile page with lots of skills`**: (Or text defined in `ENHANCE_COMMAND_TEXT` in `sitePlan.ts`) This special phrase triggers a regeneration, often targeting versions of content marked as `isFinal: true` or more detailed versions to simulate an "enhanced" build.

**Instant Rendering URL Parameter:**
Append `?instant=true` to the URL to load the final version of the site directly, bypassing all animations and flow steps.

## Technologies Used

- TypeScript
- HTML5/CSS3
- Vite
- NPM

## License

MIT License

## Credits

Created by Leo Vainio 