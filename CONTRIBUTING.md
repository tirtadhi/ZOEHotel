# Contributing to Online Booking Application

Thank you for considering contributing to our project!

## How to Contribute

### Reporting Bugs

1. Check if the bug has already been reported in Issues
2. Create a new issue with:
   - Clear title and description
   - Steps to reproduce
   - Expected vs actual behavior
   - Screenshots if applicable
   - Browser and OS information

### Suggesting Features

1. Check existing feature requests
2. Create a new issue with:
   - Clear description of the feature
   - Use cases and benefits
   - Possible implementation approach

### Code Contributions

1. **Fork the repository**
2. **Create a feature branch**

   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Make your changes**

   - Follow the existing code style
   - Write clear commit messages
   - Add comments where necessary
   - Update documentation if needed

4. **Test your changes**

   ```bash
   npm run dev
   npm run build
   npm run lint
   ```

5. **Commit with conventional commits**

   ```bash
   git commit -m "feat: add booking confirmation email"
   git commit -m "fix: resolve navbar mobile menu issue"
   git commit -m "docs: update README with API documentation"
   ```

6. **Push to your fork**

   ```bash
   git push origin feature/your-feature-name
   ```

7. **Create a Pull Request**
   - Use a clear title and description
   - Reference related issues
   - Include screenshots for UI changes
   - Wait for review

## Development Guidelines

### Code Style

- Use TypeScript for type safety
- Follow React best practices
- Use functional components with hooks
- Keep components small and focused
- Use meaningful variable and function names

### File Organization

```
- Components: Reusable UI components
- Pages: Next.js pages in app directory
- Lib: Utilities, types, data
- Public: Static assets
```

### Naming Conventions

- **Components**: PascalCase (e.g., `RoomCard.tsx`)
- **Files**: kebab-case (e.g., `user-profile.tsx`)
- **Functions**: camelCase (e.g., `formatPrice`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `MAX_GUESTS`)

### Component Structure

```tsx
// Imports
import React from 'react';
import { ComponentProps } from './types';

// Types/Interfaces
interface Props {
  // props definition
}

// Component
export default function ComponentName({ props }: Props) {
  // State
  // Effects
  // Handlers
  // Render
  return (
    // JSX
  );
}
```

### Commit Message Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Types:**

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

**Examples:**

```
feat(booking): add payment integration
fix(navbar): resolve mobile menu toggle issue
docs(readme): update installation instructions
style(rooms): improve card layout spacing
refactor(api): optimize database queries
test(booking): add unit tests for form validation
chore(deps): update dependencies
```

## Testing

### Manual Testing

- Test on different browsers (Chrome, Firefox, Safari)
- Test on mobile devices
- Test all user flows
- Test edge cases

### Future: Automated Testing

When implementing tests:

- Write unit tests for utilities
- Write component tests
- Write E2E tests for critical flows
- Aim for >80% code coverage

## Pull Request Guidelines

### Before Submitting

- [ ] Code follows project style guidelines
- [ ] Self-review completed
- [ ] Comments added for complex logic
- [ ] Documentation updated
- [ ] No console.log statements
- [ ] All tests pass (when implemented)
- [ ] Build succeeds without errors

### PR Description Template

```markdown
## Description

Brief description of changes

## Type of Change

- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing

How has this been tested?

## Screenshots (if applicable)

Add screenshots for UI changes

## Checklist

- [ ] Code follows style guidelines
- [ ] Self-reviewed
- [ ] Documentation updated
- [ ] No breaking changes
```

## Code Review Process

1. Maintainer will review within 2-3 days
2. Address feedback and requested changes
3. Once approved, PR will be merged
4. Delete your feature branch after merge

## Community Guidelines

- Be respectful and inclusive
- Welcome newcomers
- Provide constructive feedback
- Help others learn and grow
- Follow our Code of Conduct

## Questions?

Feel free to:

- Open an issue for discussion
- Join our community chat (if available)
- Email the maintainers

## Recognition

Contributors will be:

- Listed in CONTRIBUTORS.md
- Mentioned in release notes
- Given credit in documentation

Thank you for contributing! 🎉
