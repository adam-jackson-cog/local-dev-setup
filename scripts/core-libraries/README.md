# Corporate Development Environment Setup

This repository contains an automated setup script for establishing a complete development environment in restricted corporate environments where admin privileges are not available.

## 🎯 What This Script Does

The `setup-dev-environment.sh` script automates the entire setup process we went through manually, including:

1. **Git Verification** - Checks if Git is installed and provides installation guidance
2. **Oh My Zsh Installation** - Installs the popular Zsh framework for enhanced terminal experience
3. **Terminal Enhancements** - Adds syntax highlighting and autosuggestions
4. **NVM Installation** - Installs Node Version Manager without requiring admin privileges
5. **Node.js Setup** - Installs Node.js v18 and LTS version
6. **Yarn Installation** - Installs Yarn package manager for faster npm alternative
7. **UV Installation** - Installs UV Python package manager (extremely fast)
8. **Shell Configuration** - Configures `.zshrc` with all enhancements and useful aliases

## ✨ Features You'll Get

### 🎨 **Enhanced Terminal Experience**
- **Color-coded command validation**: Green for valid commands, red for invalid ones
- **Smart autosuggestions**: Gray text suggestions based on command history
- **Beautiful prompt**: Clean, informative prompt with Git branch information
- **Syntax highlighting**: Real-time feedback as you type commands

### 🛠️ **Development Tools**
- **Node.js v18** (set as default)
- **Node.js LTS** (latest stable version)
- **NVM** for easy Node.js version management
- **npm** package manager
- **Yarn** package manager (faster alternative to npm)
- **UV** Python package manager (extremely fast)
- **Git** with helpful aliases

### ⚡ **Productivity Aliases**
```bash
# Git shortcuts
gs    # git status
ga    # git add
gc    # git commit
gp    # git push
gl    # git pull
gb    # git branch
gco   # git checkout

# Node.js shortcuts
nv    # node --version
npmv  # npm --version
ni    # npm install
nid   # npm install --save-dev
ns    # npm start
nt    # npm test
nb    # npm run build

# Yarn shortcuts
y     # yarn
ya    # yarn add
yad   # yarn add --dev
yag   # yarn global add
yr    # yarn remove
ys    # yarn start
yt    # yarn test
yb    # yarn build
yi    # yarn install
yc    # yarn cache clean
ygu   # yarn global upgrade

# UV Python shortcuts
uvv   # uv --version
uvi   # uv add
uvr   # uv remove
uvs   # uv sync
uvl   # uv lock
```

## 🚀 Quick Start

### Prerequisites
- **macOS** or **Linux** environment
- **Zsh shell** (default on modern macOS)
- **Internet access**
- **Git** installed (the script will check and guide you if missing)

### Installation

1. **Download the script:**
   ```bash
   curl -O https://raw.githubusercontent.com/your-repo/setup-dev-environment.sh
   ```
   
   Or if you have this repository:
   ```bash
   git clone <repository-url>
   cd <repository-name>
   ```

2. **Make it executable:**
   ```bash
   chmod +x setup-dev-environment.sh
   ```

3. **Run the setup:**
   ```bash
   ./setup-dev-environment.sh
   ```

4. **Restart your terminal or reload configuration:**
   ```bash
   source ~/.zshrc
   ```

## 📋 What Happens During Setup

The script will:

1. ✅ Check for Git installation
2. ✅ Install Oh My Zsh framework
3. ✅ Install zsh-syntax-highlighting plugin
4. ✅ Install zsh-autosuggestions plugin  
5. ✅ Install NVM (Node Version Manager)
6. ✅ Install Node.js v18 and set as default
7. ✅ Install Node.js LTS version
8. ✅ Install Yarn package manager
9. ✅ Install UV Python package manager
10. ✅ Configure `.zshrc` with all enhancements
11. ✅ Create useful aliases for productivity
12. ✅ Backup your existing configuration

## 🔧 Post-Installation Usage

### Package Managers
You'll have three powerful package managers available:

#### **Yarn (JavaScript/Node.js)**
```bash
y init                # Initialize new project
ya express           # Add Express.js
yad @types/node      # Add dev dependency
ys                   # Start the project
yt                   # Run tests
yb                   # Build project
```

#### **npm (JavaScript/Node.js)**
```bash
ni express           # Install Express.js
nid nodemon          # Install dev dependency
ns                   # Start project
nt                   # Run tests
nb                   # Build project
```

#### **UV (Python)**
```bash
uv init my-project   # Create new Python project
uvi requests         # Add requests library
uvr unused-package   # Remove package
uvs                  # Sync environment
uvl                  # Update lockfile
```

### Node.js Version Management
```bash
nvm list              # Show installed versions
nvm use 18            # Switch to Node.js v18
nvm use lts           # Switch to LTS version
nvm install 20        # Install additional versions
```

### Terminal Features
- **Color feedback**: Commands turn green (valid) or red (invalid) as you type
- **Autosuggestions**: Press → (right arrow) to accept gray suggestions
- **Tab completion**: Enhanced completion for files and commands
- **Git integration**: See current branch in your prompt

### Customization
Edit your configuration anytime:
```bash
code ~/.zshrc         # Edit shell configuration
```

## 🏢 Corporate Environment Notes

This script is specifically designed for **restricted corporate environments**:

- ✅ **No admin privileges required**
- ✅ **Installs everything in user home directory**
- ✅ **Works behind corporate firewalls**
- ✅ **Uses HTTPS Git cloning (not SSH)**
- ✅ **Doesn't modify system files**
- ✅ **Safe to run multiple times**

## 🛡️ Safety Features

- **Automatic backups**: Your existing `.zshrc` is backed up before changes
- **Idempotent**: Safe to run multiple times - won't break existing installations
- **Error handling**: Stops on errors with clear messages
- **Verification**: Confirms each step completed successfully
- **Rollback friendly**: Easy to restore from backups if needed

## 🔍 Troubleshooting

### Git Not Found
If Git isn't installed:
- **macOS**: Run `xcode-select --install`
- **Linux**: Use your package manager (`apt install git`, `yum install git`, etc.)

### Permission Issues
The script only modifies files in your home directory, so no admin privileges are needed.

### Network Issues
If downloads fail due to corporate firewall:
- Ask your IT team to whitelist: `github.com`, `raw.githubusercontent.com`, `nodejs.org`
- Some companies require proxy configuration

### Zsh Not Default
If you're not using Zsh:
```bash
chsh -s $(which zsh)  # Switch to Zsh (may require logout/login)
```

## 📁 Files Modified/Created

The script will modify or create these files:
- `~/.zshrc` (backed up if exists)
- `~/.oh-my-zsh/` (Oh My Zsh installation)
- `~/.nvm/` (NVM installation)
- Plugin directories under `~/.oh-my-zsh/custom/plugins/`

## 🔄 Updates and Maintenance

### Updating Components
```bash
# Update Oh My Zsh
omz update

# Update NVM
cd ~/.nvm && git pull

# Update Node.js versions
nvm install node --reinstall-packages-from=current
```

### Staying Current
This script installs the latest stable versions available at the time of running. For the most current versions, re-run the script periodically.

## 🤝 Contributing

If you find issues or have improvements:
1. Test in a clean environment
2. Ensure compatibility with restricted corporate networks
3. Maintain the "no admin privileges" requirement
4. Add appropriate error handling and user feedback

## 📄 License

This script is provided as-is for corporate development environment setup. Feel free to modify for your organization's specific needs.

---

**Happy coding! 🚀**
