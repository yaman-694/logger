# Contributing to omnilogs

Thank you for your interest in contributing to omnilogs! This is an open source project licensed under the MIT License, and we welcome contributions from the community.

## 🚀 Getting Started

### Prerequisites

- Node.js 18.0.0 or higher
- npm, yarn, or pnpm

### Development Setup

1. **Fork and Clone**

   ```bash
   git clone https://github.com/your-username/omnilogs.git
   cd omnilogs/package
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Development Commands**

   ```bash
   # Build the project
   npm run build

   # Development mode with watch
   npm run dev

   # Type checking
   npm run check-types

   # Test the package locally
   npm run install-global
   ```

## 🤝 How to Contribute

### Reporting Issues

- Use the [GitHub Issues](https://github.com/yaman-694/omnilogs/issues) page
- Provide a clear description of the problem
- Include steps to reproduce the issue
- Add relevant logs or error messages

### Suggesting Features

- Open a [feature request](https://github.com/yaman-694/omnilogs/issues) on GitHub
- Describe the use case and expected behavior
- Explain why this feature would be beneficial

### Pull Requests

1. **Fork the repository** and create a feature branch

   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes** following our coding standards

3. **Test your changes** thoroughly

   ```bash
   npm run build
   npm run check-types
   ```

4. **Commit your changes** with a descriptive message

   ```bash
   git commit -m "Add: new transport option for Discord webhooks"
   ```

5. **Push to your fork** and submit a pull request
   ```bash
   git push origin feature/your-feature-name
   ```

## 📝 Development Guidelines

### Code Style

- Use TypeScript for all new code
- Follow existing code formatting and patterns
- Ensure proper type definitions are included
- Add JSDoc comments for public APIs

### Testing

- Test your changes manually with the dev environment
- Ensure the build passes without errors
- Verify TypeScript types are correct

### Documentation

- Update README.md if adding new features
- Include usage examples for new functionality
- Update TypeScript interfaces in the documentation

## 🔧 Project Structure

```
package/
├── src/
│   ├── index.ts              # Main entry point
│   ├── configurations/       # Transport configurations
│   ├── constants/           # Constants and defaults
│   ├── interface/           # TypeScript interfaces
│   └── test/               # Test files
├── dist/                   # Built files (generated)
├── package.json
├── tsconfig.json
└── README.md
```

## 🎯 Areas for Contribution

We're particularly interested in contributions for:

- **New Transport Options**: File, database, webhook transports
- **Performance Improvements**: Optimization and benchmarking
- **Documentation**: Examples, tutorials, and API docs
- **Testing**: Unit tests, integration tests, and test coverage
- **Bug Fixes**: Resolving existing issues

## 📋 Commit Message Guidelines

Use clear, descriptive commit messages:

- `Add: new feature or functionality`
- `Fix: bug fixes`
- `Update: changes to existing features`
- `Docs: documentation changes`
- `Refactor: code refactoring`

## 🆘 Getting Help

- Check existing [issues](https://github.com/yaman-694/omnilogs/issues)
- Ask questions in new issues with the "question" label
- Contact the maintainer: [yamanjain694@gmail.com](mailto:yamanjain694@gmail.com)

## 📄 License

By contributing to omnilogs, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing to omnilogs! 🎉
