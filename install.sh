#!/usr/bin/env bash
set -e

# ccconfig One-Click Installer
# Usage: curl -fsSL https://get.ccconfig.dev | bash
#        or: curl -fsSL https://cc-config.vercel.app/install.sh | bash

REPO="jiangtao/cc-config"
GITHUB_BASE="https://github.com/${REPO}"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

info() {
    echo -e "${GREEN}➜${NC} $1"
}

error() {
    echo -e "${RED}✗${NC} $1" >&2
}

warn() {
    echo -e "${YELLOW}⚠${NC} $1"
}

# Detect OS
OS="$(uname -s)"
case "$OS" in
    Darwin)
        OS="darwin"
        ;;
    Linux)
        OS="linux"
        ;;
    MINGW*|MSYS*|CYGWIN*)
        error "Windows not supported yet. Please download from ${GITHUB_BASE}/releases"
        exit 1
        ;;
    *)
        error "Unsupported OS: $OS"
        exit 1
        ;;
esac

# Detect architecture
ARCH="$(uname -m)"
case "$ARCH" in
    x86_64|amd64)
        ARCH="amd64"
        ;;
    i686|i386)
        ARCH="386"
        ;;
    aarch64|arm64)
        ARCH="arm64"
        ;;
    armv7l)
        ARCH="arm"
        ;;
    *)
        error "Unsupported architecture: $ARCH"
        exit 1
        ;;
esac

# Get latest version
info "Detecting latest version..."
LATEST_VERSION=$(curl -fsSL "https://api.github.com/repos/${REPO}/releases/latest" 2>/dev/null | grep '"tag_name"' | sed -E 's/.*"([^"]+)".*/\1/')

if [ -z "$LATEST_VERSION" ]; then
    warn "Failed to detect version from GitHub API"
    warn "This usually means the repository doesn't exist or has no releases yet."
    echo ""
    error "Repository '${REPO}' not found or no releases available."
    echo ""
    echo "Please:"
    echo "  1. Create the repository at: ${GITHUB_BASE}"
    echo "  2. Push code and create a release (git tag v1.0.0 && git push origin v1.0.0)"
    echo "  3. Or install manually from: ${GITHUB_BASE}/releases"
    echo ""
    exit 1
fi

info "Latest version: ${LATEST_VERSION}"
BINARY_URL="${GITHUB_BASE}/releases/download/${LATEST_VERSION}/ccconfig-${OS}-${ARCH}"

BINARY_NAME="ccconfig"
TEMP_DIR=$(mktemp -d)

info "Downloading ccconfig for ${OS}-${ARCH} from:"
echo "  ${BINARY_URL}"
echo ""

if ! curl -fSL "$BINARY_URL" -o "${TEMP_DIR}/${BINARY_NAME}"; then
    error "Download failed!"
    echo ""
    echo "Possible reasons:"
    echo "  1. Release ${LATEST_VERSION} doesn't have a binary for ${OS}-${ARCH}"
    echo "  2. The repository hasn't published releases yet"
    echo "  3. Network connectivity issues"
    echo ""
    echo "Check available releases at: ${GITHUB_BASE}/releases"
    rm -rf "$TEMP_DIR"
    exit 1
fi

chmod +x "${TEMP_DIR}/${BINARY_NAME}"

# Determine install location
INSTALL_DIR="/usr/local/bin"
if [ ! -w "$INSTALL_DIR" ]; then
    # Check if we can use sudo
    if command -v sudo >/dev/null 2>&1; then
        USE_SUDO=true
    else
        INSTALL_DIR="$HOME/.local/bin"
        mkdir -p "$INSTALL_DIR"
        info "Installing to ${INSTALL_DIR} (add to PATH: export PATH=\"\$HOME/.local/bin:\$PATH\")"
        USE_SUDO=false
    fi
else
    USE_SUDO=false
fi

# Install binary
info "Installing to ${INSTALL_DIR}..."
if [ "$USE_SUDO" = true ]; then
    sudo mv "${TEMP_DIR}/${BINARY_NAME}" "${INSTALL_DIR}/${BINARY_NAME}"
else
    mv "${TEMP_DIR}/${BINARY_NAME}" "${INSTALL_DIR}/${BINARY_NAME}"
fi

# Cleanup
rm -rf "$TEMP_DIR"

# Verify installation
if command -v ccconfig >/dev/null 2>&1; then
    INSTALLED_VERSION=$(ccconfig --version 2>/dev/null || echo "unknown")
    echo ""
    info "Successfully installed ccconfig!"
    echo "   Version: ${INSTALLED_VERSION}"
    echo "   Location: ${INSTALL_DIR}/${BINARY_NAME}"
    echo ""
    echo "Quick start:"
    echo "  ccconfig backup --repo ~/cc-config"
    echo ""
else
    warn "Installation completed, but 'ccconfig' is not in PATH."
    echo "   Add the following to your ~/.bashrc or ~/.zshrc:"
    echo "   export PATH=\"${INSTALL_DIR}:\$PATH\""
fi
