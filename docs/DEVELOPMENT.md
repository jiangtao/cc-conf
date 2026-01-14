# Development Guide / 开发指南

This guide is for contributors who want to help improve ccconfig.
这份指南是给想帮助改进 ccconfig 的贡献者的。

---

## Getting Started / 快速开始

### Prerequisites / 前置要求

- Go 1.21+ installed / 已安装 Go 1.21+
- Git installed / 已安装 Git
- Basic knowledge of Go / 基础 Go 知识

### Setup / 设置

```bash
# Clone the repository / 克隆仓库
git clone https://github.com/jiangtao/cc-config.git
cd ccconfig

# Download dependencies / 下载依赖
go mod download

# Build / 构建
make build

# Install to your system / 安装到系统
make install
```

---

## Project Structure / 项目结构

```
ccconfig/
├── cmd/              # CLI commands / CLI 命令
│   ├── backup.go     # backup command
│   ├── restore.go    # restore command
│   ├── cache.go      # cache command
│   └── init.go       # init command
├── pkg/              # Core packages / 核心包
│   ├── backup/       # Backup logic / 备份逻辑
│   ├── restore/      # Restore logic / 恢复逻辑
│   ├── config/       # Configuration / 配置
│   ├── git/          # Git operations / Git 操作
│   ├── i18n/         # Translations / 翻译
│   └── ui/           # Colors & output / 颜色和输出
├── web/              # Landing page / 着陆页
└── install.sh        # Installation script / 安装脚本
```

---

## Development Workflow / 开发流程

### Make Changes / 修改代码

```bash
# Edit code / 编辑代码
vim cmd/backup.go

# Run locally / 本地运行
go run . backup --repo ~/test-config

# Format code / 格式化代码
make fmt

# Run linter / 运行检查
make lint

# Run tests / 运行测试
make test
```

### Common Commands / 常用命令

| Command / 命令 | Description / 说明 |
|----------------|-------------------|
| `make build` | Build the binary / 构建二进制文件 |
| `make install` | Install to system / 安装到系统 |
| `make test` | Run all tests / 运行所有测试 |
| `make fmt` | Format code / 格式化代码 |
| `make lint` | Run linter / 运行代码检查 |
| `make tidy` | Clean up dependencies / 清理依赖 |

---

## Adding Features / 添加功能

### Add a New Command / 添加新命令

```go
// cmd/mycommand.go
package cmd

var myCmd = &cobra.Command{
    Use:   "mycommand",
    Short: "Description of my command",
    RunE:  runMyCommand,
}

func init() {
    GetRootCommand().AddCommand(myCmd)
}

func runMyCommand(cmd *cobra.Command, args []string) error {
    // Your code here / 你的代码在这里
    return nil
}
```

### Add a New Language / 添加新语言

1. Create `pkg/i18n/{lang}.yaml` / 创建语言文件
2. Add translations / 添加翻译

```yaml
# pkg/i18n/fr.yaml
my_message:
  title: "Mon Titre"
  description: "Ma Description"
```

3. Use in code / 在代码中使用：

```go
i18n.T("my_message.title", nil)
```

---

## Testing / 测试

### Write Tests / 编写测试

```go
func TestMyFunction(t *testing.T) {
    input := "test"
    expected := "expected output"

    result := MyFunction(input)

    if result != expected {
        t.Errorf("expected %v, got %v", expected, result)
    }
}
```

### Run Tests / 运行测试

```bash
# Run all tests / 运行所有测试
make test

# Run specific package / 运行特定包
go test ./pkg/backup -v

# Run with coverage / 运行并查看覆盖率
go test -cover ./...
```

---

## Releasing / 发布

### Create a Release / 创建发布

```bash
# Create a tag / 创建标签
git tag v1.0.0 -m "Release v1.0.0"

# Push the tag / 推送标签
git push origin v1.0.0
```

GitHub Actions will automatically:
GitHub Actions 会自动：
- Run tests / 运行测试
- Build binaries for all platforms / 构建所有平台的二进制文件
- Create a GitHub Release / 创建 GitHub Release

---

## Contributing / 贡献

We welcome contributions! / 欢迎贡献！

1. Fork the repository / Fork 仓库
2. Create a branch / 创建分支
   ```bash
   git checkout -b feature/my-feature
   ```
3. Commit your changes / 提交更改
   ```bash
   git commit -m "Add my feature"
   ```
4. Push to your fork / 推送到你的 fork
   ```bash
   git push origin feature/my-feature
   ```
5. Create a Pull Request / 创建 Pull Request

---

## Tips / 小贴士

### Code Style / 代码风格

- Use `gofmt` to format code / 使用 `gofmt` 格式化代码
- Follow Go conventions / 遵循 Go 约定
- Add comments for exported functions / 为导出函数添加注释

### Debugging / 调试

```bash
# Run with verbose output / 详细输出运行
go run . backup --repo ~/test-config --verbose

# Use Delve debugger / 使用 Delve 调试器
dlv debug ./... -- backup
```

---

## Need Help? / 需要帮助?

- Create an issue / 创建 issue: [https://github.com/jiangtao/cc-config/issues](https://github.com/jiangtao/cc-config/issues)
- Check existing issues / 检查现有 issues: [https://github.com/jiangtao/cc-config/issues](https://github.com/jiangtao/cc-config/issues)
