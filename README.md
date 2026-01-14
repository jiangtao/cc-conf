# ccconfig

> **Sync your Claude Code settings across all your computers with one command**
>
> 用一条命令在所有电脑间同步你的 Claude Code 配置

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![GitHub Releases](https://img.shields.io/github/v/release/jiangtao/cc-config)](https://github.com/jiangtao/cc-config/releases)

---

## What is ccconfig? / 什么是 ccconfig?

**ccconfig** is a simple tool that backs up and restores your Claude Code configurations to GitHub.

**ccconfig** 是一个简单的工具，可以将你的 Claude Code 配置备份到 GitHub 并随时恢复。

**Why do you need it? / 为什么需要它？**

- ✅ You use Claude Code on multiple computers (work + personal)
  你在多台电脑上使用 Claude Code（工作 + 个人）
- ✅ You created custom commands and don't want to lose them
  你创建了自定义命令，不想丢失它们
- ✅ You want to share project-specific settings across machines
  你想在多台机器间共享项目配置
- ✅ You want version control for your Claude settings
  你想要版本控制你的 Claude 设置

---

## Quick Start / 快速开始

### Step 1: Install / 安装

**One-line install / 一键安装:**

```bash
curl -fsSL https://jiangtao.vercel.app/install.sh | bash
```

**Manual install / 手动安装:**

```bash
# For macOS / macOS 系统
curl -L https://github.com/jiangtao/cc-config/releases/latest/download/ccconfig-darwin-arm64 -o ccconfig
chmod +x ccconfig
sudo mv ccconfig /usr/local/bin/

# For Linux / Linux 系统
curl -L https://github.com/jiangtao/cc-config/releases/latest/download/ccconfig-linux-amd64 -o ccconfig
chmod +x ccconfig
sudo mv ccconfig /usr/local/bin/
```

---

### Step 2: First Time Setup / 首次设置

**On your main computer / 在你的主电脑上:**

```bash
# 1. Create a folder for your configs
# 创建一个存放配置的文件夹
mkdir -p ~/cc-config
cd ~/cc-config

# 2. Initialize git repository
# 初始化 git 仓库
git init
git remote add origin git@github.com:YOURUSERNAME/cc-config.git

# 3. Backup everything!
# 备份所有配置！
ccconfig backup --repo ~/cc-config

# 4. Push to GitHub
# 推送到 GitHub
git add .
git commit -m "Initial backup"
git push -u origin main
```

**On a new computer / 在新电脑上:**

```bash
# 1. Clone your configs
# 克隆你的配置
git clone git@github.com:YOURUSERNAME/cc-config.git ~/cc-config

# 2. Restore everything!
# 恢复所有配置！
ccconfig restore --repo ~/cc-config
```

That's it! / 就这么简单！

---

## What Gets Backed Up? / 备份了什么？

| Component / 组件 | Description / 说明 |
|------------------|-------------------|
| **Settings** / 设置 | Global Claude Code settings (minus API tokens) <br> 全局设置（不包含 API 令牌） |
| **Commands** / 命令 | All custom commands you created <br> 你创建的所有自定义命令 |
| **Skills** / 技能 | All custom skills you installed <br> 你安装的所有自定义技能 |
| **Projects** / 项目 | Project-specific Claude settings <br> 项目特定的 Claude 设置 |

**Note:** API tokens are NEVER stored in Git for your security.
**注意：** 为了安全，API 令牌永远不会存储在 Git 中。

---

## Common Commands / 常用命令

### Backup / 备份

```bash
# Simple backup / 简单备份
ccconfig backup --repo ~/cc-config

# Backup with preview (see what will be backed up)
# 备份并预览（查看将备份什么）
ccconfig backup --repo ~/cc-config --dry-run

# Find ALL Claude projects automatically
# 自动查找所有 Claude 项目
ccconfig backup --all-projects
```

### Restore / 恢复

```bash
# Simple restore / 简单恢复
ccconfig restore --repo ~/cc-config

# Preview changes without applying them
# 预览更改但不应用
ccconfig restore --repo ~/cc-config --dry-run
```

### Language / 语言

```bash
# Use English interface / 使用英文界面
ccconfig backup --lang en

# 使用中文界面
ccconfig backup --lang zh
```

---

## Optional: Configuration File / 可选：配置文件

Create `~/.ccconfig.yaml` to save your preferences:
创建 `~/.ccconfig.yaml` 来保存你的偏好设置：

```yaml
# Where your configs are stored
# 你的配置存放位置
repo: ~/cc-config

# Folders to scan for Claude projects
# 扫描 Claude 项目的文件夹
projects:
  - ~/work
  - ~/projects
  - ~/code

# Language: en or zh
# 语言：en 或 zh
lang: en

# Auto-commit after backup
# 备份后自动提交
git:
  autoCommit: true
  autoPush: false
```

---

## FAQ / 常见问题

### Q: Is my API token safe? / 我的 API 令牌安全吗？

**A: Yes!** API tokens are automatically removed before backup and never stored in Git.
**答：是的！** API 令牌会在备份前自动移除，永远不会存储在 Git 中。

### Q: What if I don't have a GitHub account? / 如果我没有 GitHub 账号怎么办？

**A:** You can still use ccconfig! Just use a local folder:
**答：** 你仍然可以使用 ccconfig！只需使用本地文件夹：

```bash
ccconfig backup --repo ~/Documents/my-claude-configs
```

### Q: How often should I backup? / 我应该多久备份一次？

**A:** Whenever you make changes to your Claude Code setup:
**答：** 每当你修改 Claude Code 设置时：

```bash
# After creating new commands or skills
# 创建新命令或技能后
ccconfig backup
```

Or set up automatic backups with cron / 或者设置 cron 自动备份：

```bash
# Edit crontab
crontab -e

# Add this line to backup daily at 6 PM
# 添加这一行每天下午 6 点备份
0 18 * * * /usr/local/bin/ccconfig backup --repo ~/cc-config
```

### Q: Can I backup just some projects? / 我可以只备份部分项目吗？

**A:** Yes! Specify which projects to include:
**答：可以！** 指定要包含的项目：

```bash
ccconfig backup --projects ~/work/project1 --projects ~/work/project2
```

---

## Need Help? / 需要帮助?

- **Documentation / 文档:** [https://github.com/jiangtao/cc-config](https://github.com/jiangtao/cc-config)
- **Issues / 问题反馈:** [https://github.com/jiangtao/cc-config/issues](https://github.com/jiangtao/cc-config/issues)

---

## License

MIT License - see [LICENSE](LICENSE) for details.
