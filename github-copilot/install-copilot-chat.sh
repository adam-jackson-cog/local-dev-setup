#!/bin/bash

# GitHub Copilot Configuration Install Script
# This script copies GitHub Copilot chat modes, prompts, and workflows to a target project

set -e  # Exit on any error

# Function to display usage
show_usage() {
    echo "Usage: $0 <project_directory>"
    echo ""
    echo "Description:"
    echo "  Installs GitHub Copilot configuration files (chat modes, prompts, workflows)"
    echo "  to the specified project directory by creating a .github folder and copying"
    echo "  the subdirectories from the current github-copilot folder (excluding this script)."
    echo ""
    echo "Arguments:"
    echo "  project_directory    Target directory where .github folder will be created"
    echo ""
    echo "Examples:"
    echo "  $0 ~/development/my-project"
    echo "  $0 /Users/username/projects/sanofi-test"
    echo "  $0 ."
    echo "  $0 ../my-project"
    echo ""
    echo "This will create:"
    echo "  <project_directory>/.github/chatmodes/"
    echo "  <project_directory>/.github/prompts/"
    echo "  <project_directory>/.github/workflows/"
}

# Check if argument is provided
if [ $# -eq 0 ]; then
    echo "❌ Error: No project directory specified"
    echo ""
    show_usage
    exit 1
fi

# Check for help flag
if [ "$1" = "-h" ] || [ "$1" = "--help" ]; then
    show_usage
    exit 0
fi

PROJECT_DIR="$1"

# Get the directory where this script is located
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# Define source directory (script is now inside github-copilot directory)
SOURCE_DIR="$SCRIPT_DIR"

echo "🚀 Installing GitHub Copilot configuration..."
echo "============================================="
echo "📁 Source directory: $SOURCE_DIR"
echo "🎯 Target directory: $PROJECT_DIR"

# Verify source directory exists
if [ ! -d "$SOURCE_DIR" ]; then
    echo "❌ Error: Source directory not found: $SOURCE_DIR"
    echo "   Make sure you're running this script from the correct location."
    exit 1
fi

# Expand tilde in project directory path
PROJECT_DIR="${PROJECT_DIR/#\~/$HOME}"

# Convert relative path to absolute path
PROJECT_DIR="$(cd "$PROJECT_DIR" 2>/dev/null && pwd || echo "$PROJECT_DIR")"

# Check if project directory exists
if [ ! -d "$PROJECT_DIR" ]; then
    echo "❌ Error: Project directory does not exist: $PROJECT_DIR"
    echo "   Please create the directory first or provide a valid path."
    exit 1
fi

# Define target .github directory
GITHUB_DIR="$PROJECT_DIR/.github"

echo "📂 Creating .github directory..."

# Create .github directory if it doesn't exist
if [ ! -d "$GITHUB_DIR" ]; then
    mkdir -p "$GITHUB_DIR"
    echo "✅ Created: $GITHUB_DIR"
else
    echo "📁 Directory already exists: $GITHUB_DIR"
fi

# Copy subdirectories
SUBDIRS=("chatmodes" "prompts" "workflows")
COPIED_COUNT=0

for subdir in "${SUBDIRS[@]}"; do
    SOURCE_SUBDIR="$SOURCE_DIR/$subdir"
    TARGET_SUBDIR="$GITHUB_DIR/$subdir"
    
    if [ -d "$SOURCE_SUBDIR" ]; then
        echo "📋 Copying $subdir..."
        
        # Create target subdirectory if it doesn't exist
        mkdir -p "$TARGET_SUBDIR"
        
        # Copy contents (including hidden files) but exclude this script
        if [ "$(ls -A "$SOURCE_SUBDIR" 2>/dev/null)" ]; then
            cp -R "$SOURCE_SUBDIR"/* "$TARGET_SUBDIR/" 2>/dev/null || true
            
            # Count files copied
            FILE_COUNT=$(find "$SOURCE_SUBDIR" -type f | wc -l | xargs)
            echo "   ✅ Copied $FILE_COUNT file(s) to $TARGET_SUBDIR"
            COPIED_COUNT=$((COPIED_COUNT + FILE_COUNT))
        else
            echo "   📭 No files found in $SOURCE_SUBDIR (empty directory)"
        fi
    else
        echo "   ⚠️  Source subdirectory not found: $SOURCE_SUBDIR"
    fi
done

# Copy any additional files in the source directory (excluding this script and subdirectories)
echo "📋 Copying additional files..."
SCRIPT_NAME="$(basename "${BASH_SOURCE[0]}")"

for item in "$SOURCE_DIR"/*; do
    if [ -f "$item" ]; then
        filename="$(basename "$item")"
        # Skip the install script itself
        if [ "$filename" != "$SCRIPT_NAME" ]; then
            cp "$item" "$GITHUB_DIR/"
            echo "   ✅ Copied $filename to $GITHUB_DIR"
            COPIED_COUNT=$((COPIED_COUNT + 1))
        else
            echo "   ⏭️  Skipped install script: $filename"
        fi
    fi
done

echo ""
echo "🎉 Installation completed successfully!"
echo ""
echo "📊 Summary:"
echo "   • Target location: $GITHUB_DIR"
echo "   • Total files copied: $COPIED_COUNT"
echo ""
echo "📁 Created structure:"
for subdir in "${SUBDIRS[@]}"; do
    TARGET_SUBDIR="$GITHUB_DIR/$subdir"
    if [ -d "$TARGET_SUBDIR" ]; then
        FILE_COUNT=$(find "$TARGET_SUBDIR" -type f 2>/dev/null | wc -l | xargs)
        echo "   • $TARGET_SUBDIR ($FILE_COUNT files)"
    fi
done

echo ""
echo "🔧 What's installed:"
echo "   • Chat modes: Custom GitHub Copilot conversation modes"
echo "   • Prompts: Reusable prompt templates for development workflows"
echo "   • Workflows: GitHub Actions and automation configurations"
echo ""
echo "💡 Next steps:"
echo "   1. Review the copied files in $GITHUB_DIR"
echo "   2. Customize the configurations for your project needs"
echo "   3. Commit the .github directory to your project repository"
echo ""
echo "📖 For more information about GitHub Copilot configurations:"
echo "   https://docs.github.com/en/copilot"
