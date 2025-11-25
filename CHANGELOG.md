# 更新日志

## [1.1.0] - 2025-11-25

### ✨ 新增功能
- **文件头检测**：添加通过文件头（magic number）检测文件类型的功能
  - 支持识别：PDF、XLSX、PNG、JPG、GIF等格式
  - 当API返回的Content-Type不明确时自动启用
  
### 🔧 优化改进
- **用户扩展名优先**：如果用户提供的文件名已包含扩展名，则直接使用，不进行文件类型检测
  - 示例：`filename: "report.pdf"` 将直接使用`.pdf`扩展名
  - 避免因检测失败导致的扩展名错误
  
- **智能文件类型识别**：
  - 优先使用Content-Type头
  - Content-Type不明确时使用文件头检测
  - 用户提供扩展名时跳过检测

### 📝 文档更新
- 更新README说明文件名参数可以包含扩展名
- 添加文件头检测功能说明

---

## [1.0.0] - 2025-11-25

### 🎉 首次发布

#### ✨ 核心功能
- **自动文件类型检测**：根据Content-Type自动识别文件类型
- **时间戳命名**：支持自定义时间戳格式（默认：YYYYMMDD_HHmmss）
- **自定义文件名**：允许用户指定文件名
- **环境适配**：自动识别浏览器和Node.js环境
- **灵活配置**：支持GET/POST请求、自定义请求头、请求参数等

#### 📦 支持的文件类型
- 文档：PDF、Word、Excel、PowerPoint
- 图片：JPG、PNG、GIF、BMP、WebP、SVG
- 压缩：ZIP、RAR、7Z、TAR、GZ
- 音视频：MP3、MP4、AVI、MOV
- 文本：TXT、HTML、CSS、JS、JSON、XML、CSV

#### 🌐 环境支持
- **浏览器**：使用Blob和URL.createObjectURL实现下载
- **Node.js**：保存文件到downloads目录

#### 📚 文档
- 完整的README文档
- TypeScript类型定义
- 使用示例（浏览器和Node.js）
- API文档

#### 🔧 开发工具
- ES模块支持
- CommonJS兼容
- MIT开源协议
