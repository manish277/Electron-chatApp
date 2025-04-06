# Electron Chat App

A modern desktop chat application built with Electron, React, and TypeScript. Features real-time messaging, typing indicators, and a clean, intuitive interface.

## Features

- 💬 Real-time messaging
- 👥 User presence indicators
- ⌨️ Typing indicators
- 🎨 Modern, responsive UI
- 🚀 Cross-platform support (macOS, Windows, Linux)

## Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (version 14 or higher)
- [npm](https://www.npmjs.com/) (usually comes with Node.js)

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/electron-chat-app.git
cd electron-chat-app
```

2. Install dependencies:
```bash
npm install
```

## Development

To run the app in development mode:
```bash
npm run dev
```

This will start:
- Vite dev server for the renderer process
- Electron app in development mode

## Building

To build the application for your current platform:
```bash
npm run build
```

### Platform-specific builds

For macOS:
```bash
npm run build:mac
```

For Windows:
```bash
npm run build:win
```

For Linux:
```bash
npm run build:linux
```

The built applications will be available in the `dist` directory.

## Project Structure

```
electron-chat-app/
├── src/
│   ├── main/              # Electron main process
│   └── renderer/          # React application (renderer process)
│       ├── components/    # React components
│       ├── services/      # Services (API, mock data)
│       └── types/         # TypeScript type definitions
├── dist/                  # Built applications
└── release/              # Build configurations
```

## Technology Stack

- [Electron](https://www.electronjs.org/) - Cross-platform desktop apps
- [React](https://reactjs.org/) - UI framework
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Vite](https://vitejs.dev/) - Build tool and development server
- [electron-builder](https://www.electron.build/) - Application packaging

## Development Notes

- The app uses a mock data service for demonstration purposes. In a production environment, you would replace this with real API calls.
- Hot reloading is enabled in development mode for both the main and renderer processes.
- The application follows modern React practices with functional components and hooks.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Troubleshooting

### Common Issues

1. **App doesn't start in development mode**
   - Make sure all dependencies are installed (`npm install`)
   - Check if ports 5173 (Vite) are available
   - Clear the dist directory and rebuild (`rm -rf dist && npm run build`)

2. **Build fails**
   - Ensure you have the latest dependencies (`npm install`)
   - Clear npm cache (`npm cache clean --force`)
   - Remove node_modules and reinstall (`rm -rf node_modules && npm install`)

3. **Packaging errors**
   - Make sure electron-builder is installed correctly
   - Check if you have the required dependencies for your target platform

For more help, please [open an issue](https://github.com/yourusername/electron-chat-app/issues) on GitHub. 