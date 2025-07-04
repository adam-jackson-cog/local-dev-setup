#!/bin/bash

# BiomCP MCP Server Setup Script for VS Code
# This script installs and configures biomcp MCP server for VS Code integration

set -e  # Exit on any error

echo "🧬 Setting up BiomCP MCP Server for VS Code..."
echo "=============================================="

# Check if uv is installed
if ! command -v uv &> /dev/null; then
    echo "❌ Error: 'uv' is not installed. Please install uv first:"
    echo "   curl -LsSf https://astral.sh/uv/install.sh | sh"
    exit 1
fi

echo "✅ Found uv version: $(uv --version)"

# Install biomcp globally using uv
echo "📦 Installing biomcp-python globally..."
uv tool install biomcp-python

# Verify installation
if ! command -v biomcp &> /dev/null; then
    echo "❌ Error: biomcp installation failed"
    exit 1
fi

echo "✅ biomcp installed successfully: $(biomcp --help | head -1)"

# Test MCP server startup
echo "🧪 Testing MCP server startup..."
timeout 5s biomcp run --mode stdio > /dev/null 2>&1 && echo "✅ MCP server test successful" || echo "⚠️  MCP server test timed out (this is expected)"

# Get current user ID
USER_ID=$(id -u)
echo "👤 Detected user ID: $USER_ID"

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

# Check if biomcp is already configured
if grep -q '"biomcp"' "$SETTINGS_PATH"; then
    echo "⚠️  biomcp MCP server is already configured in settings.json"
    echo "   If you want to update the configuration, please edit manually or remove the existing biomcp section."
else
    echo "⚙️  Adding biomcp MCP server configuration..."
    
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

# Add biomcp server configuration
settings['mcp']['servers']['biomcp'] = {
    'command': 'biomcp',
    'args': ['run', '--mode', 'stdio']
}

# Write updated settings
with open(settings_path, 'w') as f:
    json.dump(settings, f, indent=4)

print('✅ biomcp MCP server configuration added successfully')
"
fi

echo ""
echo "🎉 Setup completed successfully!"
echo ""
echo "📋 Next steps:"
echo "   1. Restart VS Code completely"
echo "   2. The biomcp MCP tools should now be available in your chat interface"
echo "   3. You can test by asking for biomedical research queries"
echo ""
echo "🔧 Available biomcp MCP tools include:"
echo "   - Article search (PubMed/PubTator3)"
echo "   - Clinical trial search (ClinicalTrials.gov)"
echo "   - Genetic variant search (MyVariant.info)"
echo "   - Comprehensive biomedical data fetching"
echo ""
echo "📖 For more details, see the accompanying documentation: biomcp-setup-guide.md"
