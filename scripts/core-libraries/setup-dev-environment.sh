#!/bin/bash

# =============================================================================
# Corporate Dev Environment Setup Script
# =============================================================================
# This script sets up a complete development environment in a restricted 
# corporate environment without requiring admin privileges.
#
# What this script does:
# 1. Checks for Git installation
# 2. Installs Oh My Zsh framework
# 3. Installs zsh-syntax-highlighting and zsh-autosuggestions plugins
# 4. Installs NVM (Node Version Manager)
# 5. Installs Node.js v18 and LTS version
# 6. Installs Yarn package manager
# 7. Installs UV Python package manager  
# 8. Configures .zshrc with all enhancements
#
# Requirements:
# - macOS or Linux environment
# - Zsh shell
# - Internet access
# - No admin privileges required
# =============================================================================

set -e  # Exit on any error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Logging functions
log_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

log_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

log_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# =============================================================================
# 1. Check Git Installation
# =============================================================================
check_git() {
    log_info "Checking Git installation..."
    
    if command_exists git; then
        GIT_VERSION=$(git --version)
        log_success "Git is already installed: $GIT_VERSION"
    else
        log_error "Git is not installed. Please install Git first:"
        log_error "- On macOS: Install Xcode Command Line Tools with 'xcode-select --install'"
        log_error "- On Linux: Use your package manager (apt, yum, etc.)"
        exit 1
    fi
}

# =============================================================================
# 2. Install Oh My Zsh
# =============================================================================
install_oh_my_zsh() {
    log_info "Checking Oh My Zsh installation..."
    
    if [ -d "$HOME/.oh-my-zsh" ]; then
        log_warning "Oh My Zsh is already installed"
    else
        log_info "Installing Oh My Zsh..."
        
        # Download and run Oh My Zsh installer
        if command_exists curl; then
            sh -c "$(curl -fsSL https://raw.github.com/ohmyzsh/ohmyzsh/master/tools/install.sh)" "" --unattended
        elif command_exists wget; then
            sh -c "$(wget https://raw.github.com/ohmyzsh/ohmyzsh/master/tools/install.sh -O -)" "" --unattended
        else
            log_error "Neither curl nor wget is available. Cannot download Oh My Zsh."
            exit 1
        fi
        
        log_success "Oh My Zsh installed successfully"
    fi
}

# =============================================================================
# 3. Install Zsh Plugins
# =============================================================================
install_zsh_plugins() {
    log_info "Installing Zsh plugins..."
    
    # Install zsh-syntax-highlighting
    if [ -d "${ZSH_CUSTOM:-$HOME/.oh-my-zsh/custom}/plugins/zsh-syntax-highlighting" ]; then
        log_warning "zsh-syntax-highlighting is already installed"
    else
        log_info "Installing zsh-syntax-highlighting..."
        git clone https://github.com/zsh-users/zsh-syntax-highlighting.git ${ZSH_CUSTOM:-$HOME/.oh-my-zsh/custom}/plugins/zsh-syntax-highlighting
        log_success "zsh-syntax-highlighting installed"
    fi
    
    # Install zsh-autosuggestions
    if [ -d "${ZSH_CUSTOM:-$HOME/.oh-my-zsh/custom}/plugins/zsh-autosuggestions" ]; then
        log_warning "zsh-autosuggestions is already installed"
    else
        log_info "Installing zsh-autosuggestions..."
        git clone https://github.com/zsh-users/zsh-autosuggestions ${ZSH_CUSTOM:-$HOME/.oh-my-zsh/custom}/plugins/zsh-autosuggestions
        log_success "zsh-autosuggestions installed"
    fi
}

# =============================================================================
# 4. Install NVM
# =============================================================================
install_nvm() {
    log_info "Checking NVM installation..."
    
    if [ -d "$HOME/.nvm" ]; then
        log_warning "NVM directory already exists"
    else
        log_info "Installing NVM..."
        git clone https://github.com/nvm-sh/nvm.git ~/.nvm
        log_success "NVM installed successfully"
    fi
    
    # Load NVM for this session
    export NVM_DIR="$HOME/.nvm"
    [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
}

# =============================================================================
# 5. Install Node.js versions
# =============================================================================
install_nodejs() {
    log_info "Installing Node.js versions..."
    
    # Ensure NVM is loaded
    export NVM_DIR="$HOME/.nvm"
    [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
    
    if command_exists nvm; then
        # Install Node.js v18
        log_info "Installing Node.js v18..."
        nvm install 18
        
        # Install LTS version
        log_info "Installing Node.js LTS..."
        nvm install --lts
        
        # Use Node.js v18 as default
        nvm use 18
        nvm alias default 18
        
        log_success "Node.js v18 and LTS installed successfully"
        
        # Show installed versions
        log_info "Installed Node.js versions:"
        nvm list
    else
        log_error "NVM is not available. Something went wrong with NVM installation."
        exit 1
    fi
}

# =============================================================================
# 6. Install Yarn
# =============================================================================
install_yarn() {
    log_info "Checking Yarn installation..."
    
    if command_exists yarn; then
        log_success "Yarn is already installed: $(yarn --version)"
    else
        log_info "Installing Yarn..."
        
        # Install Yarn using NPM (comes with Node.js)
        npm install -g yarn
        
        log_success "Yarn installed successfully"
    fi
}

# =============================================================================
# 7. Install UV
# =============================================================================
install_uv() {
    log_info "Checking UV installation..."
    
    if command_exists uv; then
        log_success "UV is already installed: $(uv --version)"
    else
        log_info "Installing UV Python package manager..."
        
        # Try official installer first
        if curl -LsSf https://astral.sh/uv/install.sh | sh; then
            log_success "UV installed successfully via official installer"
        else
            log_warning "Official installer failed, trying alternative method..."
            # Fallback: manual installation via GitHub releases
            if command_exists curl; then
                ARCH=$(uname -m)
                OS=$(uname -s | tr '[:upper:]' '[:lower:]')
                if [ "$ARCH" = "arm64" ]; then
                    ARCH="aarch64"
                fi
                
                UV_URL="https://github.com/astral-sh/uv/releases/latest/download/uv-${ARCH}-${OS}.tar.gz"
                log_info "Downloading UV from: $UV_URL"
                
                mkdir -p "$HOME/.local/bin"
                cd /tmp
                curl -LsSf "$UV_URL" | tar -xz
                mv uv "$HOME/.local/bin/"
                chmod +x "$HOME/.local/bin/uv"
                
                log_success "UV installed manually to ~/.local/bin"
            else
                log_error "Cannot install UV: curl not available"
                return 1
            fi
        fi
        
        # Ensure UV is in PATH for current session
        export PATH="$HOME/.local/bin:$PATH"
    fi
}

# =============================================================================
# 8. Configure .zshrc
# =============================================================================
configure_zshrc() {
    log_info "Configuring .zshrc..."
    
    # Backup existing .zshrc if it exists and doesn't have our marker
    if [ -f "$HOME/.zshrc" ] && ! grep -q "# Corporate Dev Setup" "$HOME/.zshrc"; then
        cp "$HOME/.zshrc" "$HOME/.zshrc.backup.$(date +%Y%m%d_%H%M%S)"
        log_info "Backed up existing .zshrc"
    fi
    
    # Create or update .zshrc
    cat > "$HOME/.zshrc" << 'EOF'
# Corporate Dev Setup - Auto-generated configuration
# If you come from bash you might have to change your $PATH.
# export PATH=$HOME/bin:$HOME/.local/bin:/usr/local/bin:$PATH

# Path to your Oh My Zsh installation.
export ZSH="$HOME/.oh-my-zsh"

# Set name of the theme to load
ZSH_THEME="robbyrussell"

# Uncomment the following line to use case-sensitive completion.
# CASE_SENSITIVE="true"

# Uncomment the following line to use hyphen-insensitive completion.
# HYPHEN_INSENSITIVE="true"

# Uncomment one of the following lines to change the auto-update behavior
# zstyle ':omz:update' mode disabled  # disable automatic updates
# zstyle ':omz:update' mode auto      # update automatically without asking
# zstyle ':omz:update' mode reminder  # just remind me to update when it's time

# Uncomment the following line to change how often to auto-update (in days).
# zstyle ':omz:update' frequency 13

# Uncomment the following line if pasting URLs and other text is messed up.
# DISABLE_MAGIC_FUNCTIONS="true"

# Uncomment the following line to disable colors in ls.
# DISABLE_LS_COLORS="true"

# Uncomment the following line to disable auto-setting terminal title.
# DISABLE_AUTO_TITLE="true"

# Uncomment the following line to enable command auto-correction.
# ENABLE_CORRECTION="true"

# Uncomment the following line to display red dots whilst waiting for completion.
# COMPLETION_WAITING_DOTS="true"

# Uncomment the following line if you want to disable marking untracked files
# under VCS as dirty. This makes repository status check for large repositories
# much, much faster.
# DISABLE_UNTRACKED_FILES_DIRTY="true"

# Which plugins would you like to load?
# Standard plugins can be found in $ZSH/plugins/
# Custom plugins may be added to $ZSH_CUSTOM/plugins/
# Add wisely, as too many plugins slow down shell startup.
plugins=(git zsh-syntax-highlighting zsh-autosuggestions)

source $ZSH/oh-my-zsh.sh

# User configuration

# NVM Configuration
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion

# Auto-use Node.js v18 on new terminal sessions
nvm use 18 > /dev/null 2>&1

# UV Python Package Manager
export PATH="$HOME/.local/bin:$PATH"

# Preferred editor for local and remote sessions
# if [[ -n $SSH_CONNECTION ]]; then
#   export EDITOR='vim'
# else
#   export EDITOR='code'
# fi

# Set personal aliases
# alias zshconfig="code ~/.zshrc"
# alias ohmyzsh="code ~/.oh-my-zsh"

# Git aliases for productivity
alias gs="git status"
alias ga="git add"
alias gc="git commit"
alias gp="git push"
alias gl="git pull"
alias gb="git branch"
alias gco="git checkout"

# Node.js aliases
alias nv="node --version"
alias npmv="npm --version"
alias ni="npm install"
alias nid="npm install --save-dev"
alias ns="npm start"
alias nt="npm test"
alias nb="npm run build"

# Yarn aliases for productivity
alias y="yarn"
alias ya="yarn add"
alias yad="yarn add --dev"
alias yag="yarn global add"
alias yr="yarn remove"
alias ys="yarn start"
alias yt="yarn test"
alias yb="yarn build"
alias yi="yarn install"
alias yc="yarn cache clean"
alias ygu="yarn global upgrade"

# UV Python aliases
alias uvv="uv --version"
alias uvi="uv add"
alias uvr="uv remove"
alias uvs="uv sync"
alias uvl="uv lock"

EOF

    log_success ".zshrc configured with all enhancements"
}

# =============================================================================
# 9. Final verification and instructions
# =============================================================================
final_verification() {
    log_info "Performing final verification..."
    
    # Source the new .zshrc to test
    export ZSH="$HOME/.oh-my-zsh"
    export NVM_DIR="$HOME/.nvm"
    [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
    
    echo ""
    echo "==============================================================================="
    log_success "Development Environment Setup Complete!"
    echo "==============================================================================="
    echo ""
    
    log_info "Installed components:"
    echo "  ✅ Git: $(git --version)"
    echo "  ✅ Oh My Zsh with robbyrussell theme"
    echo "  ✅ Zsh syntax highlighting (green=valid, red=invalid commands)"
    echo "  ✅ Zsh autosuggestions (gray text from history)"
    echo "  ✅ NVM: $(nvm --version)"
    
    if command_exists node; then
        echo "  ✅ Node.js: $(node --version)"
        echo "  ✅ npm: $(npm --version)"
    else
        echo "  ⚠️  Node.js not available in current session"
    fi
    
    if command_exists yarn; then
        echo "  ✅ Yarn: $(yarn --version)"
    else
        echo "  ⚠️  Yarn not available in current session"
    fi
    
    if command_exists uv; then
        echo "  ✅ UV: $(uv --version)"
    else
        echo "  ⚠️  UV not available in current session"
    fi
    
    echo ""
    log_info "To start using your new environment:"
    echo "  1. Close this terminal and open a new one, OR"
    echo "  2. Run: source ~/.zshrc"
    echo ""
    
    log_info "Useful commands:"
    echo "  • nvm list               - Show installed Node.js versions"
    echo "  • nvm use 18            - Switch to Node.js v18"
    echo "  • nvm use lts           - Switch to LTS version"
    echo "  • gs                    - Git status (alias)"
    echo "  • code ~/.zshrc         - Edit your shell config"
    echo ""
    
    log_info "Terminal features:"
    echo "  • Type commands and see real-time color feedback"
    echo "  • Use arrow keys to navigate command history"
    echo "  • Tab completion for files and commands"
    echo "  • Git branch info in prompt"
    echo ""
    
    if [ -f "$HOME/.zshrc.backup."* ]; then
        log_warning "Your original .zshrc was backed up as .zshrc.backup.*"
    fi
}

# =============================================================================
# Main execution
# =============================================================================
main() {
    echo "==============================================================================="
    echo "           Corporate Development Environment Setup Script"
    echo "==============================================================================="
    echo ""
    log_info "This script will set up a complete development environment"
    log_info "without requiring administrator privileges."
    echo ""
    
    # Run all setup functions
    check_git
    install_oh_my_zsh
    install_zsh_plugins
    install_nvm
    install_nodejs
    install_yarn
    install_uv
    configure_zshrc
    final_verification
    
    echo ""
    log_success "Setup completed successfully! 🎉"
    echo ""
}

# Run the main function
main "$@"
