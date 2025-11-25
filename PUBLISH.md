# 发布到npm指南

本指南将帮助您将 `axios-file-export` 插件发布到npm公共注册表。

## 📋 发布前检查清单

在发布之前，请确认以下事项：

- ✅ 代码已完成并测试通过
- ✅ README.md 文档完整
- ✅ package.json 配置正确
- ✅ 已推送到GitHub
- ✅ 版本号正确（当前: 1.0.0）

## 🔐 步骤1: 注册/登录npm账号

### 如果还没有npm账号

1. 访问 https://www.npmjs.com/signup 注册账号
2. 验证邮箱地址

### 登录npm

在项目目录中运行：

```bash
npm login
```

系统会提示您输入：
- Username（用户名）
- Password（密码）
- Email（邮箱）
- OTP（如果启用了双因素认证）

登录成功后，可以验证：

```bash
npm whoami
```

应该显示您的npm用户名。

## 📦 步骤2: 检查包名可用性

确认包名 `axios-file-export` 是否可用：

```bash
npm search axios-file-export
```

如果没有完全匹配的结果，说明包名可用。

## 🚀 步骤3: 发布包

### 首次发布

```bash
npm publish
```

> **注意**: 如果您的npm账号是新注册的，可能需要验证邮箱后才能发布。

### 发布为公开包（推荐）

如果收到作用域相关的错误，使用：

```bash
npm publish --access public
```

## ✅ 步骤4: 验证发布

发布成功后：

1. 访问 https://www.npmjs.com/package/axios-file-export 查看包页面
2. 在新项目中测试安装：

```bash
npm install axios-file-export
```

3. 验证功能：

```javascript
import { exportFile } from 'axios-file-export';
await exportFile('https://example.com/file.pdf');
```

## 🔄 后续版本更新

### 更新版本号

根据变更类型更新版本：

```bash
# 修复bug（1.0.0 -> 1.0.1）
npm version patch

# 新增功能（1.0.0 -> 1.1.0）
npm version minor

# 重大变更（1.0.0 -> 2.0.0）
npm version major
```

### 发布新版本

```bash
# 1. 更新版本
npm version patch

# 2. 推送到GitHub
git push && git push --tags

# 3. 发布到npm
npm publish
```

## 📝 package.json 关键配置

确保以下字段正确配置：

```json
{
  "name": "axios-file-export",
  "version": "1.0.0",
  "description": "一个基于axios的文件导出工具...",
  "main": "src/index.js",
  "types": "src/index.d.ts",
  "keywords": [
    "axios",
    "file",
    "export",
    "download"
  ],
  "repository": {
    "type": "git",
    "url": "https://github.com/zhangyanyange/export-file.git"
  },
  "license": "MIT"
}
```

## 🏷️ 添加npm徽章到README

发布后，在README.md顶部添加npm徽章：

```markdown
[![npm version](https://img.shields.io/npm/v/axios-file-export.svg)](https://www.npmjs.com/package/axios-file-export)
[![npm downloads](https://img.shields.io/npm/dm/axios-file-export.svg)](https://www.npmjs.com/package/axios-file-export)
[![license](https://img.shields.io/npm/l/axios-file-export.svg)](https://github.com/zhangyanyange/export-file/blob/main/LICENSE)
```

## ⚠️ 常见问题

### 问题1: 包名已被占用

**错误**: `You do not have permission to publish "axios-file-export"`

**解决**: 更改package.json中的包名，例如：
- `@your-username/axios-file-export`
- `axios-export-file`
- `axios-file-downloader`

### 问题2: 需要邮箱验证

**错误**: `You must verify your email before publishing`

**解决**: 
1. 检查注册邮箱
2. 点击验证链接
3. 重新运行 `npm publish`

### 问题3: 双因素认证

如果启用了2FA，发布时需要一次性密码（OTP）：

```bash
npm publish --otp=123456
```

### 问题4: 需要付费账户

**错误**: `You must sign up for private packages`

**解决**: 使用公开发布：

```bash
npm publish --access public
```

## 📊 发布后的统计

发布成功后，您可以：

1. 在npm网站查看下载统计
2. 在GitHub上添加npm徽章
3. 监控Issues和Pull Requests
4. 持续改进和更新

## 🎯 下一步

发布成功后：

1. ✅ 更新README添加npm安装说明
2. ✅ 添加LICENSE文件
3. ✅ 创建CHANGELOG.md记录版本变更
4. ✅ 添加CI/CD自动化测试
5. ✅ 完善文档和示例

## 📞 需要帮助？

- npm文档: https://docs.npmjs.com/
- npm支持: https://www.npmjs.com/support
- 项目Issues: https://github.com/zhangyanyange/export-file/issues

---

**准备好了吗？** 按照上述步骤开始发布吧！ 🚀
