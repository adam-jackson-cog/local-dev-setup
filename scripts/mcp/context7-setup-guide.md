# Context7 MCP Server Setup Guide for VS Code

This guide walks you through setting up the Context7 MCP server for VS Code integration, enabling access to up-to-date documentation for thousands of libraries directly within your coding environment.

## 📋 Prerequisites

- **VS Code** installed and configured
- **Node.js** and **npm** installed
- **macOS** (this guide is specifically for macOS environments)

### Installing Node.js (if not already installed)

```bash
# Using Homebrew
brew install node

# Or download from https://nodejs.org/
```

## 🚀 Quick Setup

### Option 1: Automated Setup Script

1. Download and run the setup script:
   ```bash
   ./setup-context7.sh
   ```

2. Restart VS Code completely
3. Test by asking for library documentation queries in the chat interface

### Option 2: Manual Setup

#### Step 1: Verify Context7 MCP Package

The Context7 MCP server will be installed automatically via npx when VS Code starts. No global installation is required.

#### Step 2: Test Package Availability

```bash
npx -y @upstash/context7-mcp --help
```

#### Step 3: Configure VS Code Settings

Add the following configuration to your VS Code `settings.json` file:

**Location:** `/Users/[YOUR_USER_ID]/Library/Application Support/Code/User/settings.json`

```json
{
    "mcp": {
        "servers": {
            "context7": {
                "command": "npx",
                "args": [
                    "-y",
                    "@upstash/context7-mcp"
                ],
                "env": {}
            }
        },
        "inputs": []
    }
}
```

If you already have MCP servers configured, add the context7 server to your existing configuration:

```json
{
    "mcp": {
        "servers": {
            "context7": {
                "command": "npx",
                "args": [
                    "-y",
                    "@upstash/context7-mcp"
                ],
                "env": {}
            },
            "biomcp": {
                "command": "biomcp",
                "args": ["run", "--mode", "stdio"]
            }
        },
        "inputs": []
    }
}
```

#### Step 4: Restart VS Code

Completely restart VS Code for the MCP server configuration to take effect.

## 🧪 Testing the Installation

1. Open VS Code
2. Start a chat session
3. Ask for library documentation queries, such as:
   - "Get React hooks documentation"
   - "Show me Next.js routing examples"
   - "Find MongoDB connection documentation"

## 🔧 Available Context7 MCP Tools

Once configured, you'll have access to the following documentation tools:

### Core Tools
- **`mcp_context7_resolve-library-id`** - Resolves a package/product name to a Context7-compatible library ID
- **`mcp_context7_get-library-docs`** - Fetches up-to-date documentation for a specific library

## 🔍 Example Usage

### Getting React Documentation
```
"Get React hooks documentation using Context7"
```

### Finding Next.js Documentation
```
"Show me Next.js routing documentation"
```

### MongoDB Documentation
```
"Get MongoDB Node.js driver documentation"
```

## 🐛 Troubleshooting

### Issue: MCP Tools Not Available

**Symptoms:** Context7 tools don't appear in the chat interface after restart

**Solutions:**
1. Verify Node.js and npm are installed:
   ```bash
   node --version
   npm --version
   ```

2. Test Context7 MCP package manually:
   ```bash
   npx -y @upstash/context7-mcp --help
   ```

3. Check VS Code settings.json syntax:
   ```bash
   python3 -c "import json; json.load(open('/Users/[USER_ID]/Library/Application Support/Code/User/settings.json'))"
   ```

4. Ensure complete VS Code restart (not just reload window)

### Issue: Package Download Failures

**Symptoms:** Long startup times or npm errors

**Solutions:**
1. Clear npm cache:
   ```bash
   npm cache clean --force
   ```

2. Test network connectivity:
   ```bash
   npm ping
   ```

3. Check corporate firewall/proxy settings if applicable

### Issue: Permission Errors

**Symptoms:** Permission denied errors when running npx

**Solutions:**
1. Fix npm permissions:
   ```bash
   sudo chown -R $(whoami) ~/.npm
   ```

2. Use a Node version manager like nvm if needed

## 📚 Additional Resources

- [Context7 Documentation](https://github.com/upstash/context7-mcp)
- [Model Context Protocol Specification](https://spec.modelcontextprotocol.io/)
- [VS Code MCP Extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode.mcp)

## 🤝 Support

If you encounter issues:
1. Check the troubleshooting section above
2. Verify all prerequisites are met
3. Test the manual installation steps
4. Ensure your corporate environment allows npm package downloads

## 📝 Configuration Summary

**Key Configuration Points:**
- No global installation required - uses npx for on-demand package execution
- Use npx command configuration: `"command": "npx"`
- Include `-y` flag to auto-accept package installation
- Restart VS Code completely after configuration changes
- Test with library documentation queries

This setup enables powerful documentation access capabilities directly within your VS Code environment, providing access to up-to-date documentation for thousands of popular libraries and frameworks.
