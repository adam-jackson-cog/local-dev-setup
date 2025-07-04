# Local Development Setup for Cognizant Moment Tech Team

This repository contains essential setup scripts and guides for establishing a complete local development environment for Cognizant Moment tech team members. The setup is designed to work in corporate environments where admin privileges may not be available.

## 📁 Repository Structure

### `/mcp` - Model Context Protocol Setup
Contains setup scripts and documentation for integrating BiomCP (Biomedical Model Context Protocol) with VS Code:

- **`biomcp-setup-guide.md`** - Comprehensive guide for setting up BiomCP MCP server in VS Code
- **`setup-biomcp.sh`** - Automated setup script for BiomCP installation and configuration

**What BiomCP provides:**
- Direct access to biomedical research tools within VS Code
- Integration with PubMed, ClinicalTrials.gov, and genetic variant databases
- Support for research queries through VS Code chat interface
- Automated installation of required Python packages (uv, biomcp-python)

### `/scripts` - Core Development Tools
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
- **`biomcp-setup-guide.md`** - Duplicate of the MCP setup guide
- **`setup-biomcp.sh`** - Duplicate of the BiomCP setup script

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

4. **Set up BiomCP for biomedical research (optional):**
   ```bash
   chmod +x mcp/setup-biomcp.sh
   ./mcp/setup-biomcp.sh
   ```

5. **Restart your terminal and VS Code**

### What You'll Get

After running the setup scripts, you'll have:

- ✅ **Enhanced terminal experience** with syntax highlighting and autosuggestions
- ✅ **Node.js development environment** with version management
- ✅ **Python development tools** with fast package management
- ✅ **Git integration** with helpful aliases
- ✅ **VS Code integration** with biomedical research tools (if BiomCP is installed)
- ✅ **Productivity shortcuts** for common development tasks

## 📋 Prerequisites

- **macOS** (scripts are optimized for macOS environments)
- **VS Code** installed
- **Internet connection** for downloading packages
- **Basic terminal access** (admin privileges not required)

## 🛠️ Individual Tool Setup

If you prefer to set up specific tools individually:

### Core Development Environment
```bash
./scripts/core-libraries/setup-dev-environment.sh
```

### BiomCP for Biomedical Research
```bash
./mcp/setup-biomcp.sh
```

## 📖 Documentation

- **Core Development Setup:** See `/scripts/core-libraries/README.md` for detailed information
- **BiomCP Setup:** See `/mcp/biomcp-setup-guide.md` for comprehensive BiomCP documentation

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
