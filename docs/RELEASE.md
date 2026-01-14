# Release Guide / 发布指南

This guide explains how to create a new release of ccconfig.
这份指南说明如何创建新的 ccconfig 发布版本。

---

## Version Numbers / 版本号

We use Semantic Versioning: `MAJOR.MINOR.PATCH`
我们使用语义化版本：`MAJOR.MINOR.PATCH`

- **MAJOR**: Breaking changes / 重大变更
- **MINOR**: New features / 新功能
- **PATCH**: Bug fixes / Bug 修复

Examples / 示例：
- `v1.0.0` - First stable release / 首个稳定版本
- `v1.1.0` - New feature added / 添加新功能
- `v1.1.1` - Bug fix / Bug 修复
- `v2.0.0` - Major changes / 重大变更

---

## How to Release / 如何发布

### Step 1: Prepare / 准备

```bash
# Make sure all tests pass / 确保所有测试通过
make test

# Update CHANGELOG.md if needed / 如需要，更新 CHANGELOG.md
```

### Step 2: Create Tag / 创建标签

```bash
# Create and push tag / 创建并推送标签
git tag -a v1.0.0 -m "Release v1.0.0"
git push origin v1.0.0
```

### Step 3: Wait for GitHub Actions / 等待 GitHub Actions

After pushing the tag, GitHub Actions will automatically:
推送标签后，GitHub Actions 会自动：

1. ✅ Run tests / 运行测试
2. 🔨 Build binaries for all platforms / 为所有平台构建二进制文件
3. 📦 Create GitHub Release / 创建 GitHub Release
4. 📤 Upload build artifacts / 上传构建产物

This takes about 5-10 minutes.
这大约需要 5-10 分钟。

---

## Release Checklist / 发布检查清单

Before releasing / 发布前：

- [ ] All tests pass / 所有测试通过
- [ ] CHANGELOG.md updated / CHANGELOG.md 已更新
- [ ] Documentation updated / 文档已更新
- [ ] Tested on macOS and Linux / 在 macOS 和 Linux 上测试

After releasing / 发布后：

- [ ] Verify GitHub Release created / 验证 GitHub Release 已创建
- [ ] Download and test binaries / 下载并测试二进制文件
- [ ] Update install.sh if needed / 如需要，更新 install.sh

---

## Hotfix / 紧急修复

If you find a critical bug after release:
如果在发布后发现严重 bug：

```bash
# Fix the bug / 修复 bug
git commit -am "Hotfix: critical bug fix"

# Create new patch version / 创建新的补丁版本
git tag -a v1.0.1 -m "Hotfix: critical bug fix"
git push origin main v1.0.1
```

---

## Need Help? / 需要帮助?

- Check [GitHub Actions](https://github.com/jiangtao/cc-config/actions)
- Create an [issue](https://github.com/jiangtao/cc-config/issues)
