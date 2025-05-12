# Code Editor Style Portfolio Website

A minimalist personal portfolio website that simulates a code editor with line-by-line text generation effect. This project creates a unique experience where visitors see your portfolio being "coded" in real-time.

![Portfolio Generator](https://via.placeholder.com/800x400?text=Portfolio+Generator)

## Features

- **Line-by-line Text Generation**: Content appears as if being typed in real-time
- **Interactive Terminal**: Shows the "thought process" behind generating the site
- **Command System**: Hidden command interface (press Ctrl+/) allows users to control the generation
- **Initial Example Site**: Starts with a placeholder that gets replaced with your actual content
- **Responsive Design**: Works well on various screen sizes

## How It Works

1. On load, the site shows a brief "HELLO WORLD" example
2. A user prompt appears: "build awesome profile page with lots of cool skills"
3. The system processes the request with machine-like messages
4. Content is generated line-by-line with real-time terminal feedback
5. A complete portfolio is built before your eyes

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

## Customization

### Content

Edit the `websiteContent` array in `src/index.js` to customize your portfolio content:

```javascript
let websiteContent = [
    { tag: 'h1', text: 'Your Name' },
    { tag: 'h2', text: 'Your Title' },
    // Add more content items...
];
```

### Command Messages

Modify the `commandSequence` array to change the terminal messages:

```javascript
const commandSequence = [
    { command: 'initialize_website', displayText: '[USER] build awesome profile page with lots of cool skills', type: '' },
    // More commands...
];
```

### Styling

Edit `src/style.css` to customize the appearance of your site.

## Special Commands

Press `Ctrl+/` to toggle the command input, then try these commands:

- `help` - Show available commands
- `reset` - Reset the website to its initial state
- `clear` - Clear the terminal
- `auto` - Automatically generate the website

## Technologies Used

- JavaScript (ES6+)
- HTML5/CSS3
- Webpack
- NPM

## License

MIT License

## Credits

Created by Leo Vainio 