# Contributing to DR-Engine

Thank you for your interest in contributing to DR-Engine! This document provides guidelines and instructions for contributing.

## 📜 Code of Conduct

- Be respectful and inclusive
- Provide constructive feedback
- Focus on the issue, not the person
- Help maintain a welcoming community

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Git
- A code editor (VS Code recommended)

### Development Setup

```bash
# 1. Fork the repository on GitHub

# 2. Clone your fork
git clone https://github.com/YOUR_USERNAME/dr-engine.git
cd dr-engine

# 3. Install dependencies
npm install

# 4. Start development server
npm run dev

# 5. Open http://localhost:3000
```

## 📁 Project Structure

```
dr-engine/
├── src/
│   ├── app/           # Next.js app router pages
│   ├── components/    # React components
│   ├── hooks/         # Custom React hooks
│   ├── lib/           # Utilities and API logic
│   └── types/         # TypeScript type definitions
├── public/            # Static assets
└── docs/              # Documentation
```

## 💻 Code Style Guidelines

### General Principles

- **Single Responsibility**: Each file should have one clear purpose
- **File Length**: Keep files under 100-150 lines; split if larger
- **Naming**: Use descriptive, industry-standard names
- **Subfolders**: Organize related files in subfolders

### TypeScript

- Use TypeScript for all new files
- Define explicit types for props and function parameters
- Avoid `any` type when possible

### Components

- Use functional components with hooks
- Place component-specific hooks in the same directory
- Follow naming convention: `ComponentName.tsx`

### CSS

- Use Tailwind CSS utility classes
- Follow the existing design system

## 🔄 Pull Request Process

### 1. Create a Branch

```bash
git checkout -b feature/your-feature-name
# or
git checkout -b fix/issue-description
```

### 2. Make Changes

- Write clean, documented code
- Follow the code style guidelines
- Test your changes locally

### 3. Commit Changes

```bash
git add .
git commit -m "feat: add new feature description"
```

**Commit Message Format:**
- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation changes
- `style:` Formatting changes
- `refactor:` Code refactoring
- `test:` Adding tests
- `chore:` Maintenance tasks

### 4. Push and Create PR

```bash
git push origin feature/your-feature-name
```

Then create a Pull Request on GitHub with:
- Clear title describing the change
- Description of what was changed and why
- Screenshots for UI changes
- Reference to related issues

## 🐛 Reporting Bugs

1. Check if the issue already exists
2. Create a new issue with:
   - Clear, descriptive title
   - Steps to reproduce
   - Expected vs actual behavior
   - Screenshots if applicable
   - Browser and OS information

## 💡 Suggesting Features

1. Check existing issues for similar suggestions
2. Create a new issue with:
   - Clear description of the feature
   - Use case and benefits
   - Possible implementation approach

## 📝 License

By contributing, you agree that your contributions will be licensed under the same [CC BY-NC 4.0](./LICENSE) license.

## 🙏 Thank You!

Your contributions help make DR-Engine better for everyone!
