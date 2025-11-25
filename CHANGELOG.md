# 更新日志

本文档记录了 axios-file-export 的所有重要变更。

格式基于 [Keep a Changelog](https://keepachangelog.com/zh-CN/1.0.0/)，
并且本项目遵循 [语义化版本](https://semver.org/lang/zh-CN/)。

## [1.0.0] - 2025-11-25

### 🎉 首次发布

#### ✨ 新增功能

- **核心功能**
  - 基于axios的HTTP文件下载
  - 自动检测文件类型（支持40+种MIME类型）
  - 从响应头提取文件名
  - 灵活的文件命名策略（时间戳/自定义）
  - 自定义时间戳格式支持
  - 自动添加文件扩展名

- **环境支持**
  - 浏览器环境：使用Blob和下载链接
  - Node.js环境：保存到downloads目录
  - 自动环境检测

- **请求配置**
  - 支持GET/POST/PUT/DELETE等所有HTTP方法
  - URL查询参数支持
  - 请求体数据支持
  - 自定义请求头
  - 完整的axios配置透传

- **类型支持**
  - TypeScript类型定义
  - JSDoc文档注释
  - 完整的接口定义

#### 📝 文档

- 详细的README使用文档
- TypeScript类型定义文件
- 浏览器和Node.js使用示例
- 安装指南（INSTALL.md）
- 发布指南（PUBLISH.md）
- MIT开源许可证

#### 📦 支持的文件格式

- **文档**: PDF, Word (doc/docx), Excel (xls/xlsx), PowerPoint (ppt/pptx)
- **压缩**: ZIP, RAR, 7Z, GZIP, TAR
- **图片**: JPEG, PNG, GIF, BMP, WebP, SVG, TIFF
- **文本**: TXT, HTML, CSS, JavaScript, JSON, XML, CSV
- **音视频**: MP3, WAV, MP4, MPEG, MOV, AVI

#### 🧪 测试

- 6个实际场景的使用示例
- Node.js环境测试通过
- 浏览器交互式演示页面

#### 🌐 发布平台

- ✅ npm公共注册表
- ✅ GitHub开源仓库

---

## 链接

- [npm包](https://www.npmjs.com/package/axios-file-export)
- [GitHub仓库](https://github.com/zhangyanyange/export-file)
- [问题反馈](https://github.com/zhangyanyange/export-file/issues)

---

**图例**
- 🎉 首次发布 / 重大里程碑
- ✨ 新增功能
- 🐛 Bug修复
- 📝 文档更新
- 🔧 配置/构建变更
- ⚡ 性能优化
- 🎨 代码格式/结构改进
- ♻️ 代码重构
- 🔒 安全修复
- ⚠️ 废弃功能
- 🗑️ 移除功能
