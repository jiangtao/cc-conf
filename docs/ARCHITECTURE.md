# Architecture / 架构设计

## Overview / 概述

ccconfig uses a simple three-layer architecture:
ccconfig 使用简单的三层架构：

1. **CLI Layer** (`cmd/`) - Command-line interface / 命令行界面
2. **Business Layer** (`pkg/backup/`, `pkg/restore/`) - Core logic / 核心逻辑
3. **Support Layer** (`pkg/config`, `pkg/git`, `pkg/i18n`, `pkg/ui`) - Utilities / 工具函数

```
┌─────────────────────────────────────────────────────────┐
│                         CLI Layer                        │
│  User commands: backup, restore, cache, init             │
│  用户命令：backup, restore, cache, init                  │
└─────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────┐
│                      Business Layer                      │
│  Backup and restore logic for settings, commands, etc.   │
│  设置、命令等备份和恢复逻辑                               │
└─────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────┐
│                      Support Layer                       │
│  Config, Git, i18n, UI helpers                          │
│  配置、Git、国际化、界面辅助                               │
└─────────────────────────────────────────────────────────┘
```

## Key Packages / 核心包

| Package / 包 | Purpose / 用途 |
|--------------|----------------|
| `pkg/backup/` | Backup settings, commands, skills, projects <br> 备份设置、命令、技能、项目 |
| `pkg/restore/` | Restore from backup <br> 从备份恢复 |
| `pkg/config/` | Load and merge config from flags + files <br> 从标志和文件加载配置 |
| `pkg/git/` | Git operations (init, add, commit, push) <br> Git 操作 |
| `pkg/i18n/` | Multi-language support (English/中文) <br> 多语言支持 |

## How It Works / 工作原理

### Backup Flow / 备份流程

```
User runs: ccconfig backup
    │
    ▼
Load config (flags + ~/.ccconfig.yaml)
    │
    ▼
Backup settings → commands → skills → projects
    │
    ▼
Git add + commit (optional: push)
    │
    ▼
Done! ✅
```

### Restore Flow / 恢复流程

```
User runs: ccconfig restore
    │
    ▼
Git pull (get latest configs)
    │
    ▼
Restore settings → commands → skills → projects
    │
    ▼
Prompt for API token (if needed)
    │
    ▼
Done! ✅
```

## For Developers / 开发者说明

### Add a new command / 添加新命令

1. Create file in `cmd/` / 在 `cmd/` 中创建文件
2. Use Cobra library / 使用 Cobra 库
3. Register in `init()` / 在 `init()` 中注册

### Add a new language / 添加新语言

1. Create `pkg/i18n/{lang}.yaml` / 创建语言文件
2. Add translations / 添加翻译

For more details, see [DEVELOPMENT.md](DEVELOPMENT.md).
更多详情请参阅 [DEVELOPMENT.md](DEVELOPMENT.md)。
