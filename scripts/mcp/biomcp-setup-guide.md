# BiomCP MCP Server Setup Guide for VS Code

This guide walks you through setting up the BiomCP (Biomedical Model Context Protocol) server for VS Code integration, enabling access to biomedical research tools directly within your coding environment.

## 📋 Prerequisites

- **VS Code** installed and configured
- **uv** (Python package manager) installed
- **macOS** (this guide is specifically for macOS environments)

### Installing uv (if not already installed)

```bash
curl -LsSf https://astral.sh/uv/install.sh | sh
```

## 🚀 Quick Setup

### Option 1: Automated Setup Script

1. Download and run the setup script:
   ```bash
   ./setup-biomcp.sh
   ```

2. Restart VS Code completely
3. Test by asking for biomedical research queries in the chat interface

### Option 2: Manual Setup

#### Step 1: Install BiomCP Globally

```bash
uv tool install biomcp-python
```

This installs the biomcp command globally and avoids dependency resolution delays during MCP server startup.

#### Step 2: Verify Installation

```bash
biomcp --version
biomcp run --mode stdio --help
```

#### Step 3: Configure VS Code Settings

Add the following configuration to your VS Code `settings.json` file:

**Location:** `/Users/[YOUR_USER_ID]/Library/Application Support/Code/User/settings.json`

```json
{
    "mcp": {
        "servers": {
            "biomcp": {
                "command": "biomcp",
                "args": ["run", "--mode", "stdio"]
            }
        },
        "inputs": []
    }
}
```

If you already have MCP servers configured, add the biomcp server to your existing configuration:

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
3. Ask for biomedical research queries, such as:
   - "Search for latest articles on immune thrombocytopenia"
   - "Find clinical trials for cancer immunotherapy"
   - "Look up genetic variants associated with BRCA1"

## 🔧 Available BiomCP MCP Tools

Once configured, you'll have access to the following biomedical research tools:

### Core Tools
- **`mcp_biomcp_think`** - Structured sequential thinking for biomedical research planning
- **`mcp_biomcp_search`** - Unified search across biomedical literature, clinical trials, and genetic variants
- **`mcp_biomcp_fetch`** - Fetch comprehensive details for specific biomedical records

### Article Research
- **`mcp_biomcp_article_searcher`** - Search PubMed/PubTator3 for research articles and preprints
- **`mcp_biomcp_article_getter`** - Fetch detailed information for specific PubMed articles

### Clinical Trials
- **`mcp_biomcp_trial_searcher`** - Search ClinicalTrials.gov for clinical studies
- **`mcp_biomcp_trial_getter`** - Fetch comprehensive trial details
- **`mcp_biomcp_trial_protocol_getter`** - Get core protocol information
- **`mcp_biomcp_trial_locations_getter`** - Get contact and location details
- **`mcp_biomcp_trial_outcomes_getter`** - Get outcome measures and results
- **`mcp_biomcp_trial_references_getter`** - Get publications and references

### Genetic Variants
- **`mcp_biomcp_variant_searcher`** - Search MyVariant.info for genetic variant database records
- **`mcp_biomcp_variant_getter`** - Fetch comprehensive variant details

## 🔍 Example Usage

### Searching for Articles on ITP
```
"Use biomcp to search for the latest articles on immune thrombocytopenia (ITP)"
```

### Finding Clinical Trials
```
"Find active clinical trials for melanoma treatment using biomcp"
```

### Genetic Variant Research
```
"Search for BRAF V600E variant information using biomcp tools"
```

## 🐛 Troubleshooting

### Issue: MCP Tools Not Available

**Symptoms:** biomcp tools don't appear in the chat interface after restart

**Solutions:**
1. Verify biomcp is installed globally:
   ```bash
   which biomcp
   biomcp --version
   ```

2. Check VS Code settings.json syntax:
   ```bash
   python3 -c "import json; json.load(open('/Users/[USER_ID]/Library/Application Support/Code/User/settings.json'))"
   ```

3. Test MCP server manually:
   ```bash
   biomcp run --mode stdio
   ```

4. Ensure complete VS Code restart (not just reload window)

### Issue: Dependency Resolution Delays

**Symptoms:** Long startup times or timeouts

**Solution:** Use global installation instead of uvx:
- ✅ Good: `"command": "biomcp"`
- ❌ Avoid: `"command": "uvx", "args": ["--with", "biomcp-python", ...]`

### Issue: Path Not Found

**Symptoms:** Command not found errors

**Solutions:**
1. Verify uv tool installation directory is in PATH
2. Use full path to biomcp in settings.json:
   ```json
   {
       "command": "/Users/[USER_ID]/.local/bin/biomcp",
       "args": ["run", "--mode", "stdio"]
   }
   ```

## 📚 Additional Resources

- [BiomCP Documentation](https://github.com/bio-mcp/biomcp-python)
- [Model Context Protocol Specification](https://spec.modelcontextprotocol.io/)
- [VS Code MCP Extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode.mcp)

## 🤝 Support

If you encounter issues:
1. Check the troubleshooting section above
2. Verify all prerequisites are met
3. Test the manual installation steps
4. Ensure your corporate environment allows the required network access

## 📝 Configuration Summary

**Key Configuration Points:**
- Install biomcp globally with `uv tool install biomcp-python`
- Use simple command configuration: `"command": "biomcp"`
- Include `--mode stdio` argument for proper MCP integration
- Restart VS Code completely after configuration changes
- Test with biomedical research queries

This setup enables powerful biomedical research capabilities directly within your VS Code environment, providing access to the latest scientific literature, clinical trials, and genetic variant databases.
