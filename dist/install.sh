#!/bin/bash

# CPA Lead Dashboard - Auto Install Script
# Supported: Ubuntu, Debian, CentOS, macOS

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Print colored output
print_status() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

print_header() {
    echo -e "${BLUE}================================${NC}"
    echo -e "${BLUE}$1${NC}"
    echo -e "${BLUE}================================${NC}"
}

# Check if running as root
check_root() {
    if [[ $EUID -eq 0 ]]; then
        print_warning "Running as root is not recommended. Please run as regular user."
        read -p "Do you want to continue? (y/N): " -n 1 -r
        echo
        if [[ ! $REPLY =~ ^[Yy]$ ]]; then
            exit 1
        fi
    fi
}

# Detect OS
detect_os() {
    if [[ "$OSTYPE" == "linux-gnu"* ]]; then
        if [ -f /etc/debian_version ]; then
            OS="debian"
        elif [ -f /etc/redhat-release ]; then
            OS="redhat"
        else
            OS="linux"
        fi
    elif [[ "$OSTYPE" == "darwin"* ]]; then
        OS="macos"
    else
        OS="unknown"
    fi
    print_status "Detected OS: $OS"
}

# Check Node.js installation
check_nodejs() {
    if command -v node &> /dev/null; then
        NODE_VERSION=$(node --version | cut -d'v' -f2)
        REQUIRED_VERSION="18.0.0"
        
        if [ "$(printf '%s\n' "$REQUIRED_VERSION" "$NODE_VERSION" | sort -V | head -n1)" = "$REQUIRED_VERSION" ]; then
            print_status "Node.js $NODE_VERSION found ✓"
            return 0
        else
            print_warning "Node.js $NODE_VERSION found, but version 18+ is required"
            return 1
        fi
    else
        print_warning "Node.js not found"
        return 1
    fi
}

# Install Node.js
install_nodejs() {
    print_status "Installing Node.js..."
    
    case $OS in
        "debian")
            # Ubuntu/Debian
            curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
            sudo apt-get install -y nodejs
            ;;
        "redhat")
            # CentOS/RHEL/Fedora
            curl -fsSL https://rpm.nodesource.com/setup_20.x | sudo bash -
            sudo yum install -y nodejs npm
            ;;
        "macos")
            # macOS
            if command -v brew &> /dev/null; then
                brew install node
            else
                print_error "Homebrew not found. Please install Homebrew first:"
                echo '/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"'
                exit 1
            fi
            ;;
        *)
            print_error "Unsupported OS for automatic Node.js installation"
            echo "Please install Node.js manually from https://nodejs.org"
            exit 1
            ;;
    esac
    
    # Verify installation
    if check_nodejs; then
        print_status "Node.js installed successfully ✓"
    else
        print_error "Node.js installation failed"
        exit 1
    fi
}

# Check if project directory exists
check_project_dir() {
    if [ -f "package.json" ] && [ -d "src" ]; then
        print_status "Project directory found ✓"
        return 0
    else
        print_error "Project directory not found or invalid"
        print_status "Please run this script from the CPA Lead Dashboard root directory"
        exit 1
    fi
}

# Install dependencies
install_dependencies() {
    print_status "Installing project dependencies..."
    
    if npm install; then
        print_status "Dependencies installed successfully ✓"
    else
        print_error "Failed to install dependencies"
        exit 1
    fi
}

# Setup database
setup_database() {
    print_status "Setting up database..."
    
    # Copy environment file if it doesn't exist
    if [ ! -f ".env" ]; then
        cp .env.example .env
        print_status "Created .env file from template ✓"
    fi
    
    # Push database schema
    if npm run db:push; then
        print_status "Database setup completed ✓"
    else
        print_error "Database setup failed"
        exit 1
    fi
}

# Test installation
test_installation() {
    print_status "Testing installation..."
    
    # Check if build works
    if npm run build; then
        print_status "Build test passed ✓"
    else
        print_error "Build test failed"
        exit 1
    fi
    
    # Test API endpoints
    print_status "Testing API endpoints..."
    
    # Start server in background
    npm start &
    SERVER_PID=$!
    
    # Wait for server to start
    sleep 5
    
    # Test API
    if curl -s http://localhost:3000/api/leads > /dev/null; then
        print_status "API test passed ✓"
    else
        print_warning "API test failed (server might still be starting)"
    fi
    
    # Stop server
    kill $SERVER_PID 2>/dev/null || true
}

# Print success message
print_success() {
    print_header "Installation Complete! 🎉"
    
    echo -e "${GREEN}CPA Lead Dashboard has been successfully installed!${NC}"
    echo
    echo "Next steps:"
    echo "1. Start the application: ${YELLOW}npm run dev${NC}"
    echo "2. Open browser: ${YELLOW}http://localhost:3000${NC}"
    echo "3. Configure your CPA platforms with these postback URLs:"
    echo
    echo -e "${BLUE}Imonetizeit:${NC}  http://localhost:3000/api/postback/imonetizeit"
    echo -e "${BLUE}Trafee:${NC}       http://localhost:3000/api/postback/trafee"
    echo -e "${BLUE}Clickdealer:${NC}  http://localhost:3000/api/postback/clickdealer"
    echo
    echo "For detailed instructions, see:"
    echo "- Installation Guide: ${YELLOW}dist/INSTALLATION.md${NC}"
    echo "- User Guide: ${YELLOW}dist/USER_GUIDE.md${NC}"
    echo "- Deployment Guide: ${YELLOW}DEPLOYMENT.md${NC}"
    echo
    echo "Need help? Check the troubleshooting section in INSTALLATION.md"
}

# Main installation function
main() {
    print_header "CPA Lead Dashboard - Auto Installer"
    
    check_root
    detect_os
    
    # Check if we're in the right directory
    if [ ! -f "package.json" ]; then
        print_error "Please run this script from the CPA Lead Dashboard directory"
        exit 1
    fi
    
    # Check and install Node.js
    if ! check_nodejs; then
        print_status "Installing Node.js..."
        install_nodejs
    fi
    
    # Install project dependencies
    install_dependencies
    
    # Setup database
    setup_database
    
    # Test installation
    test_installation
    
    # Print success message
    print_success
}

# Handle script interruption
trap 'print_error "Installation interrupted"; exit 1' INT

# Run main function
main "$@"