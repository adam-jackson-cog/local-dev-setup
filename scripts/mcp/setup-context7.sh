#!/bin/bash

# Context7 MCP Server Setup Script for VS Code
# This script configures Context7 MCP server for VS Code integration

set -e  # Exit on any error

echo "📚 Setting up Context7 MCP Server for VS Code..."
echo "==============================================="

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

# Test Context7 MCP package availability
echo "📦 Testing Context7 MCP package availability..."
if npx -y @upstash/context7-mcp --help > /dev/null 2>&1; then
    echo "✅ Context7 MCP package is accessible"
else
    echo "❌ Error: Unable to access @upstash/context7-mcp package"
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

# Check if context7 is already configured
if grep -q '"context7"' "$SETTINGS_PATH"; then
    echo "⚠️  Context7 MCP server is already configured in settings.json"
    echo "   If you want to update the configuration, please edit manually or remove the existing context7 section."
else
    echo "⚙️  Adding Context7 MCP server configuration..."
    
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

# Add context7 server configuration
settings['mcp']['servers']['context7'] = {
    'command': 'npx',
    'args': ['-y', '@upstash/context7-mcp'],
    'env': {}
}

# Write updated settings
with open(settings_path, 'w') as f:
    json.dump(settings, f, indent=4)

print('✅ Context7 MCP server configuration added successfully')
"
fi

echo ""
echo "🎉 Setup completed successfully!"
echo ""
echo "📋 Next steps:"
echo "   1. Restart VS Code completely"
echo "   2. The Context7 MCP tools should now be available in your chat interface"
echo "   3. You can test by asking for library documentation queries"
echo ""
echo "🔧 Available Context7 MCP tools include:"
echo "   - Library documentation search and retrieval"
echo "   - Up-to-date documentation for thousands of libraries"
echo "   - Automatic library ID resolution"
echo ""
echo "🧪 Test queries to try:"
echo "   - 'Get React hooks documentation'"
echo "   - 'Show me Next.js routing examples'"
echo "   - 'Find MongoDB connection documentation'"
echo ""
echo "📖 For more details, see the accompanying documentation: context7-setup-guide.md"
