# Local Development Setup for Cog Moment Tech Team

This repository contains essential setup scripts and guides for establishing a complete local development environment for Cognizant Moment tech team members. The setup is designed to work in corporate environments where admin privileges may not be available.

## 📁 Repository Structure

### `/mcp` - Model Context Protocol Setup
Contains setup scripts and documentation for integrating multiple MCP servers with VS Code:

#### BioMCP (Biomedical Research)

**What BioMCP provides:**
- Direct access to biomedical research tools within VS Code
- Integration with PubMed, ClinicalTrials.gov, and genetic variant databases
- Support for research queries through VS Code chat interface
- Automated installation of required Python packages (uv, biomcp-python)

#### Context7 (Documentation Access)

**What Context7 provides:**
- Up-to-date documentation for thousands of libraries directly in VS Code
- Automatic library ID resolution for popular frameworks
- Real-time documentation fetching and display
- Support for React, Next.js, MongoDB, and many other libraries

#### Sequential Thinking (Problem Solving)

**What Sequential Thinking provides:**
- Structured problem-solving and analytical thinking capabilities
- Multi-step analysis with revision and branching support
- Hypothesis generation and verification workflows
- Complex debugging and architecture decision support

### `/scripts` - Core Development Tools + MCP Tools
Contains automated setup scripts for essential development tools and environment configuration:

#### `/scripts/core-libraries/`
- **`README.md`** - Detailed documentation for the core development environment setup
- **`setup-dev-environment.sh`** - Main automated setup script for development tools
- **`verify-setup.sh`** - Verification script to ensure all tools are properly installed

**What the core setup includes:**
- **Terminal Enhancement:** Oh My Zsh with syntax highlighting and autosuggestions
- **Node.js Environment:** NVM, Node.js v18, LTS version, npm, and Yarn
- **Python Tools:** UV package manager for fast Python package management
- **Git Configuration:** Helpful aliases and terminal integration
- **Productivity Aliases:** Common shortcuts for development commands

#### `/scripts/mcp/`
- **`biomcp-setup-guide.md`** - Setup guide for BiomCP biomedical research tools
- **`setup-biomcp.sh`** - BiomCP setup script
- **`context7-setup-guide.md`** - Setup guide for Context7 documentation access
- **`setup-context7.sh`** - Context7 setup script  
- **`sequential-thinking-setup-guide.md`** - Setup guide for Sequential Thinking problem solving
- **`setup-sequential-thinking.sh`** - Sequential Thinking setup script

### `/github-copilot` - GitHub Copilot Configuration
Contains custom chat modes, prompts, and workflows for enhanced GitHub Copilot experience:

- **`install-copilot-chat.sh`** - Automated script to install GitHub Copilot configurations to target projects
- **`chatmodes/`** - Custom conversation modes for specialized development workflows
- **`prompts/`** - Reusable prompt templates for common development tasks
- **`workflows/`** - GitHub Actions and automation configurations

**What the GitHub Copilot setup provides:**
- Custom chat modes for specialized development scenarios (UX/PRD workflows)
- Reusable prompt templates for consistent development practices
- Pre-configured GitHub Actions workflows
- Easy installation to any target project directory

## 🚀 Quick Start

### For New Team Members

1. **Clone this repository:**
   ```bash
   git clone <repository-url>
   cd local-dev-setup
   ```

2. **Set up core development environment:**
   ```bash
   chmod +x scripts/core-libraries/setup-dev-environment.sh
   ./scripts/core-libraries/setup-dev-environment.sh
   ```

3. **Verify the setup:**
   ```bash
   ./scripts/core-libraries/verify-setup.sh
   ```

4. **Set up MCP tools for enhanced VS Code capabilities (optional):**
   ```bash
   # For biomedical research
   chmod +x mcp/setup-biomcp.sh
   ./mcp/setup-biomcp.sh
   
   # For documentation access
   chmod +x mcp/setup-context7.sh
   ./mcp/setup-context7.sh
   
   # For structured problem solving
   chmod +x mcp/setup-sequential-thinking.sh
   ./mcp/setup-sequential-thinking.sh
   ```

5. **Install GitHub Copilot configurations to your project (optional):**
   ```bash
   # Install to a specific project directory
   chmod +x github-copilot/install-copilot-chat.sh
   ./github-copilot/install-copilot-chat.sh ~/path/to/your/project
   
   # Or install to current directory
   ./github-copilot/install-copilot-chat.sh .
   ```

6. **Restart your terminal and VS Code**

### What You'll Get

After running the setup scripts, you'll have:

- ✅ **Enhanced terminal experience** with syntax highlighting and autosuggestions
- ✅ **Node.js development environment** with version management
- ✅ **Python development tools** with fast package management
- ✅ **Git integration** with helpful aliases
- ✅ **VS Code MCP integration** with multiple powerful tools:
  - BiomCP for biomedical research (if installed)
  - Context7 for library documentation access (if installed)
  - Sequential Thinking for structured problem solving (if installed)
- ✅ **Custom GitHub Copilot configurations** (if installed to projects)
- ✅ **Productivity shortcuts** for common development tasks

## 📋 Prerequisites

- **macOS** (scripts are optimized for macOS environments)
- **VS Code** installed
- **Internet connection** for downloading packages
- **Basic terminal access** (admin privileges not required)

### Examples
```bash
# Install to a React project
./install-copilot-chat.sh ~/development/my-react-app

# Install to current project directory  
./install-copilot-chat.sh .

# Install to a specific project path
./install-copilot-chat.sh /Users/username/projects/sanofi-test
```

## 📖 Documentation

- **Core Development Setup:** See `/scripts/core-libraries/README.md` for detailed information
- **MCP Tools Setup:** 
  - BiomCP: See `/mcp/biomcp-setup-guide.md` for comprehensive BiomCP documentation
  - Context7: See `/mcp/context7-setup-guide.md` for Context7 documentation access setup
  - Sequential Thinking: See `/mcp/sequential-thinking-setup-guide.md` for problem-solving tool setup
- **GitHub Copilot Configuration:** Run `./github-copilot/install-copilot-chat.sh --help` for usage instructions

## 🤝 Support

For issues or questions regarding the setup:

1. Check the individual README files in each directory
2. Verify your setup using the verification scripts
3. Contact the Cognizant Moment tech team for additional support

## 🔧 Corporate Environment Notes

These scripts are specifically designed for corporate environments where:
- Admin privileges may not be available
- Network restrictions may apply
- Standard package managers may be restricted
- Custom configurations are required for enterprise setups

All tools are installed in user space and do not require system-level permissions.

---

*Last updated: July 2025*
*Maintained by: Cognizant Moment Tech Team*
