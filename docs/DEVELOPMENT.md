# 开发文档

## 项目结构

```
ccconfig/
├── cmd/                     # CLI 命令定义
│   ├── root.go             # 根命令
│   ├── backup.go           # backup 命令
│   ├── restore.go          # restore 命令
│   ├── cache.go            # cache 命令
│   └── init.go             # init 命令
├── pkg/                     # 核心功能包
│   ├── backup/             # 备份逻辑
│   │   ├── settings.go     # settings 处理
│   │   ├── commands.go     # 命令备份
│   │   ├── skills.go       # 技能备份
│   │   └── projects.go     # 项目备份
│   ├── restore/            # 恢复逻辑
│   │   ├── settings.go
│   │   └── files.go
│   ├── cache/              # 缓存管理
│   │   └── cache.go
│   ├── config/             # 配置管理
│   │   └── config.go
│   ├── git/                # Git 操作
│   │   └── git.go
│   ├── i18n/               # 国际化
│   │   ├── i18n.go
│   │   ├── en.yaml
│   │   └── zh.yaml
│   └── ui/                 # 用户界面
│       └── colors.go
├── .github/workflows/      # GitHub Actions
│   ├── build.yml           # 构建和测试
│   ├── auto-restore.yml    # 自动恢复
│   └── pr-comment.yml      # PR 评论
├── go.mod
├── go.sum
├── main.go
├── Makefile
└── README.md
```

## 开发环境

### 要求

- Go 1.21+
- Git

### 设置

```bash
# 克隆仓库
git clone https://github.com/jiangtao/cc-config.git
cd ccconfig

# 安装依赖
go mod download

# 构建
make build

# 安装到 GOPATH/bin
make install
```

## 代码风格

### 遵循 Go 惯例

- 使用 `gofmt` 格式化代码
- 使用 `golint` 检查代码
- 使用 `go vet` 检查错误

### 添加新命令

1. 在 `cmd/` 创建新文件
2. 实现命令逻辑
3. 在 `cmd/root.go` 注册命令

```go
var newCmd = &cobra.Command{
    Use:   "new",
    Short: "New command description",
    RunE:  runNew,
}

func init() {
    GetRootCommand().AddCommand(newCmd)
}

func runNew(cmd *cobra.Command, args []string) error {
    // 实现逻辑
    return nil
}
```

### 添加新功能包

1. 在 `pkg/` 创建新目录
2. 实现功能
3. 在命令中使用

## 测试

### 运行测试

```bash
# 运行所有测试
make test

# 运行特定包测试
go test ./pkg/backup

# 运行带覆盖率的测试
go test -cover ./...
```

### 编写测试

```go
func TestFunctionName(t *testing.T) {
    // Arrange
    input := "test"

    // Act
    result := FunctionName(input)

    // Assert
    if result != expected {
        t.Errorf("expected %v, got %v", expected, result)
    }
}
```

## 国际化 (i18n)

### 添加新翻译

1. 在 `pkg/i18n/en.yaml` 添加英文翻译
2. 在 `pkg/i18n/zh.yaml` 添加中文翻译

```yaml
# en.yaml
new_feature:
  title: "New Feature"
  description: "Feature description"

# zh.yaml
new_feature:
  title: "新功能"
  description: "功能描述"
```

### 使用翻译

```go
i18n.T("new_feature.title", nil)
i18n.T("new_feature.description", map[string]interface{}{
    "Param": value,
})
```

## 发布流程

### 1. 更新版本

```bash
# 创建 tag
git tag -a v1.0.0 -m "Release v1.0.0"
git push origin v1.0.0
```

### 2. GitHub Actions 自动

- 运行测试
- 构建多平台二进制
- 创建 GitHub Release

### 3. 验证

下载 Release 中的二进制文件并测试。

## 调试

### 启用详细日志

```bash
# 使用 -v 标志
go run . -v backup
```

### 调试测试

```bash
# 使用 -v 查看详细输出
go test -v ./pkg/backup

# 使用 dlv 调试
dlv test ./pkg/backup
```

## 贡献

1. Fork 项目
2. 创建功能分支 (`git checkout -b feature/amazing-feature`)
3. 提交更改 (`git commit -m 'Add amazing feature'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 创建 Pull Request

## 常见问题

### Q: 如何添加新的配置选项？

A: 在 `pkg/config/config.go` 的 `Config` 结构体添加字段，然后使用 viper 绑定。

### Q: 如何处理敏感信息？

A: 在备份时使用 `jq` 或 `encoding/json` 移除敏感字段，不将其纳入版本控制。

### Q: 如何支持新平台？

A: 在 `Makefile` 的 `PLATFORMS` 变量添加新平台，在 GitHub Actions 中添加对应的构建配置。
