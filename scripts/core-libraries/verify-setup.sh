#!/bin/bash

# =============================================================================
# Development Environment Verification Script
# =============================================================================
# This script verifies that all components were installed correctly
# =============================================================================

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Check functions
check_command() {
    if command -v "$1" >/dev/null 2>&1; then
        echo -e "  ✅ $1: ${GREEN}$(command -v "$1")${NC}"
        return 0
    else
        echo -e "  ❌ $1: ${RED}Not found${NC}"
        return 1
    fi
}

check_directory() {
    if [ -d "$1" ]; then
        echo -e "  ✅ $2: ${GREEN}$1${NC}"
        return 0
    else
        echo -e "  ❌ $2: ${RED}$1 not found${NC}"
        return 1
    fi
}

check_file() {
    if [ -f "$1" ]; then
        echo -e "  ✅ $2: ${GREEN}$1${NC}"
        return 0
    else
        echo -e "  ❌ $2: ${RED}$1 not found${NC}"
        return 1
    fi
}

echo "==============================================================================="
echo "           Development Environment Verification"
echo "==============================================================================="
echo ""

# Check basic commands
echo -e "${BLUE}[1] Basic Commands${NC}"
check_command "git"
check_command "zsh"
check_command "curl"
echo ""

# Check Oh My Zsh installation
echo -e "${BLUE}[2] Oh My Zsh Installation${NC}"
check_directory "$HOME/.oh-my-zsh" "Oh My Zsh directory"
check_file "$HOME/.zshrc" ".zshrc configuration"
echo ""

# Check Zsh plugins
echo -e "${BLUE}[3] Zsh Plugins${NC}"
check_directory "$HOME/.oh-my-zsh/custom/plugins/zsh-syntax-highlighting" "Syntax highlighting plugin"
check_directory "$HOME/.oh-my-zsh/custom/plugins/zsh-autosuggestions" "Autosuggestions plugin"
echo ""

# Check NVM installation
echo -e "${BLUE}[4] NVM Installation${NC}"
check_directory "$HOME/.nvm" "NVM directory"
check_file "$HOME/.nvm/nvm.sh" "NVM script"

# Load NVM for verification
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

if command -v nvm >/dev/null 2>&1; then
    echo -e "  ✅ NVM command: ${GREEN}$(nvm --version)${NC}"
else
    echo -e "  ❌ NVM command: ${RED}Not available${NC}"
fi
echo ""

# Check Node.js installations
echo -e "${BLUE}[5] Node.js Installations${NC}"
if command -v node >/dev/null 2>&1; then
    echo -e "  ✅ Node.js: ${GREEN}$(node --version)${NC}"
    echo -e "  ✅ npm: ${GREEN}$(npm --version)${NC}"
    
    # Show installed Node versions
    if command -v nvm >/dev/null 2>&1; then
        echo -e "  ${BLUE}Installed versions:${NC}"
        nvm list | sed 's/^/    /'
    fi
else
    echo -e "  ❌ Node.js: ${RED}Not available${NC}"
    echo -e "  ❌ npm: ${RED}Not available${NC}"
fi
echo ""

# Check Yarn installation
echo -e "${BLUE}[6] Yarn Package Manager${NC}"
if command -v yarn >/dev/null 2>&1; then
    echo -e "  ✅ Yarn: ${GREEN}$(yarn --version)${NC}"
    
    # Test yarn global list
    if yarn global list >/dev/null 2>&1; then
        echo -e "  ✅ Yarn global access working"
    else
        echo -e "  ❌ Yarn global access failed"
    fi
else
    echo -e "  ❌ Yarn: ${RED}Not available${NC}"
fi
echo ""

# Check UV installation
echo -e "${BLUE}[7] UV Python Package Manager${NC}"
if command -v uv >/dev/null 2>&1; then
    echo -e "  ✅ UV: ${GREEN}$(uv --version)${NC}"
    echo -e "  ✅ UV location: ${GREEN}$(command -v uv)${NC}"
    
    # Check if UV is in PATH correctly
    if echo $PATH | grep -q "$HOME/.local/bin"; then
        echo -e "  ✅ UV PATH configured correctly"
    else
        echo -e "  ❌ UV PATH not configured"
    fi
else
    echo -e "  ❌ UV: ${RED}Not available${NC}"
    echo -e "  ❌ Check if ~/.local/bin is in PATH"
fi
echo ""

# Check .zshrc configuration
echo -e "${BLUE}[8] Shell Configuration${NC}"
if [ -f "$HOME/.zshrc" ]; then
    echo -e "  ✅ .zshrc exists"
    
    # Check for specific configurations
    if grep -q "zsh-syntax-highlighting" "$HOME/.zshrc"; then
        echo -e "  ✅ Syntax highlighting configured"
    else
        echo -e "  ❌ Syntax highlighting not configured"
    fi
    
    if grep -q "zsh-autosuggestions" "$HOME/.zshrc"; then
        echo -e "  ✅ Autosuggestions configured"
    else
        echo -e "  ❌ Autosuggestions not configured"
    fi
    
    if grep -q "NVM_DIR" "$HOME/.zshrc"; then
        echo -e "  ✅ NVM configured"
    else
        echo -e "  ❌ NVM not configured"
    fi
    
    if grep -q "nvm use 18" "$HOME/.zshrc"; then
        echo -e "  ✅ Node.js v18 auto-load configured"
    else
        echo -e "  ❌ Node.js v18 auto-load not configured"
    fi
else
    echo -e "  ❌ .zshrc not found"
fi
echo ""

# Test aliases
echo -e "${BLUE}[9] Aliases Test${NC}"
if [ -f "$HOME/.zshrc" ]; then
    source "$HOME/.zshrc" 2>/dev/null
    
    # Test a few key aliases
    if alias gs >/dev/null 2>&1; then
        echo -e "  ✅ Git aliases configured (gs = $(alias gs | cut -d"'" -f2))"
    else
        echo -e "  ❌ Git aliases not found"
    fi
    
    if alias nv >/dev/null 2>&1; then
        echo -e "  ✅ Node aliases configured (nv = $(alias nv | cut -d"'" -f2))"
    else
        echo -e "  ❌ Node aliases not found"
    fi
    
    if alias y >/dev/null 2>&1; then
        echo -e "  ✅ Yarn aliases configured (y = $(alias y | cut -d"'" -f2))"
    else
        echo -e "  ❌ Yarn aliases not found"
    fi
    
    if alias uvv >/dev/null 2>&1; then
        echo -e "  ✅ UV aliases configured (uvv = $(alias uvv | cut -d"'" -f2))"
    else
        echo -e "  ❌ UV aliases not found"
    fi
fi
echo ""

# Final summary
echo "==============================================================================="
echo -e "${GREEN}Verification Complete!${NC}"
echo "==============================================================================="
echo ""
echo -e "${YELLOW}Next steps:${NC}"
echo "1. Close this terminal and open a new one to see all features"
echo "2. Or run: source ~/.zshrc"
echo "3. Test typing commands and see color feedback"
echo "4. Test Node.js: node --version"
echo "5. Test Yarn: y --version"
echo "6. Test UV: uv --version"
echo "7. Test Git: git status"
echo ""
echo -e "${BLUE}Package Managers Available:${NC}"
echo "• npm (Node.js packages): npm install package"
echo "• yarn (Node.js packages, faster): y add package"
echo "• uv (Python packages, extremely fast): uv add package"
echo ""
echo -e "${BLUE}Enjoy your enhanced development environment! 🚀${NC}"
