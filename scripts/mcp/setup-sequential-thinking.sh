#!/bin/bash

# Sequential Thinking MCP Server Setup Script for VS Code
# This script configures Sequential Thinking MCP server for VS Code integration

set -e  # Exit on any error

echo "🧠 Setting up Sequential Thinking MCP Server for VS Code..."
echo "========================================================="

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Error: 'node' is not installed. Please install Node.js first:"
    echo "   brew install node"
    echo "   Or download from https://nodejs.org/"
    exit 1
fi

echo "✅ Found Node.js version: $(node --version)"

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ Error: 'npm' is not installed. Please install npm first."
    exit 1
fi

echo "✅ Found npm version: $(npm --version)"

# Test Sequential Thinking MCP package availability
echo "📦 Testing Sequential Thinking MCP package availability..."
if npx -y @modelcontextprotocol/server-sequential-thinking --help > /dev/null 2>&1; then
    echo "✅ Sequential Thinking MCP package is accessible"
else
    echo "❌ Error: Unable to access @modelcontextprotocol/server-sequential-thinking package"
    echo "   Please check your network connection and npm configuration"
    exit 1
fi

# Get current user
USER_ID=$(whoami)
echo "👤 Detected user: $USER_ID"

# Define VS Code settings path
SETTINGS_PATH="/Users/$USER_ID/Library/Application Support/Code/User/settings.json"

echo "📁 VS Code settings path: $SETTINGS_PATH"

# Check if settings.json exists
if [ ! -f "$SETTINGS_PATH" ]; then
    echo "❌ Error: VS Code settings.json not found at $SETTINGS_PATH"
    echo "   Please ensure VS Code is installed and has been run at least once."
    exit 1
fi

# Backup existing settings
echo "💾 Creating backup of existing settings..."
cp "$SETTINGS_PATH" "$SETTINGS_PATH.backup.$(date +%Y%m%d_%H%M%S)"

# Check if sequential-thinking is already configured
if grep -q '"sequential-thinking"' "$SETTINGS_PATH"; then
    echo "⚠️  Sequential Thinking MCP server is already configured in settings.json"
    echo "   If you want to update the configuration, please edit manually or remove the existing sequential-thinking section."
else
    echo "⚙️  Adding Sequential Thinking MCP server configuration..."
    
    # Create a temporary file with the updated configuration
    python3 -c "
import json
import sys

settings_path = '$SETTINGS_PATH'

try:
    with open(settings_path, 'r') as f:
        settings = json.load(f)
except json.JSONDecodeError:
    print('Error: Invalid JSON in settings.json')
    sys.exit(1)

# Ensure mcp structure exists
if 'mcp' not in settings:
    settings['mcp'] = {}
if 'servers' not in settings['mcp']:
    settings['mcp']['servers'] = {}
if 'inputs' not in settings['mcp']:
    settings['mcp']['inputs'] = []

# Add sequential-thinking server configuration
settings['mcp']['servers']['sequential-thinking'] = {
    'command': 'npx',
    'args': ['-y', '@modelcontextprotocol/server-sequential-thinking'],
    'env': {}
}

# Write updated settings
with open(settings_path, 'w') as f:
    json.dump(settings, f, indent=4)

print('✅ Sequential Thinking MCP server configuration added successfully')
"
fi

echo ""
echo "🎉 Setup completed successfully!"
echo ""
echo "📋 Next steps:"
echo "   1. Restart VS Code completely"
echo "   2. The Sequential Thinking MCP tools should now be available in your chat interface"
echo "   3. You can test by asking for complex problem-solving queries"
echo ""
echo "🔧 Available Sequential Thinking MCP tools include:"
echo "   - Structured problem-solving and analysis"
echo "   - Multi-step thinking with revision capabilities"
echo "   - Hypothesis generation and verification"
echo "   - Branching logic for alternative approaches"
echo ""
echo "🧪 Test queries to try:"
echo "   - 'Help me design an efficient algorithm step by step'"
echo "   - 'Analyze the trade-offs of different architectural approaches'"
echo "   - 'Walk through debugging this complex issue systematically'"
echo ""
echo "📖 For more details, see the accompanying documentation: sequential-thinking-setup-guide.md"
