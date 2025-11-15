# ConnectCampus - AI Coding Agent Instructions

## Project Overview

ConnectCampus is a campus connectivity and collaboration platform (currently in early development stages). This repository serves as the main workspace for coordinating the project structure and submodules.

## Repository Structure

- **connectcampus/** - Primary application submodule (contains main application code)
- **package-lock.json** - Dependency lock file (when package.json is added)
- **.github/** - GitHub-specific configuration and documentation

## Getting Started

Before beginning work on this codebase:

1. Initialize submodules: `git submodule update --init --recursive`
2. Check each component's documentation for specific setup instructions
3. Review the architecture of the main `connectcampus` submodule for the full project structure

## Key Areas to Learn

When working in this codebase, understand these critical aspects:

### Application Architecture
- Review the main application structure once the codebase is populated
- Identify service boundaries between frontend, backend, and database layers
- Understand data models and how they flow through the system

### Development Workflow
- Check for build scripts and test commands in each submodule's `package.json`
- Look for configuration files (eslint, prettier, tsconfig) to understand project standards
- Consult CI/CD workflows in `.github/workflows/` for testing and deployment procedures

### Code Conventions
- Follow existing patterns when adding new features
- Apply consistent error handling and validation approaches across the codebase
- Maintain existing architectural boundaries when making changes

## Common Tasks

### Making Changes to Submodules
When working with the `connectcampus` submodule:
1. Navigate to the submodule directory: `cd connectcampus`
2. Create a feature branch within the submodule
3. Make changes and test according to the submodule's instructions
4. Commit and push changes within the submodule
5. Update the parent repository to reference the new submodule commit

### Testing
- Look for `test` scripts in `package.json` files
- Run tests before pushing changes to ensure stability
- Check for any pre-commit hooks or CI requirements

## Integration Points

Key areas where components interact:
- Frontend to backend: Check API routes and data contracts
- Database schema: Review migrations and model definitions
- External services: Document API keys and service configurations in appropriate credential storage

## Need More Information?

This project is in early development. As the codebase grows:
1. Update this file with specific architecture details
2. Document emerging patterns and conventions
3. Add references to key files that exemplify important patterns
4. Include specific build and test commands as they're established
