# 安装指南

## 从GitHub安装

由于这是一个私有包（尚未发布到npm），您可以直接从GitHub安装：

### 方法1: 使用npm从GitHub安装

```bash
npm install https://github.com/zhangyanyange/export-file.git
```

或者在`package.json`中添加：

```json
{
  "dependencies": {
    "axios-file-export": "git+https://github.com/zhangyanyange/export-file.git"
  }
}
```

然后运行：
```bash
npm install
```

### 方法2: 克隆仓库本地使用

```bash
# 克隆仓库
git clone https://github.com/zhangyanyange/export-file.git

# 进入目录
cd export-file

# 安装依赖
npm install

# 运行示例测试
npm test
```

### 方法3: 使用npm link进行本地开发

```bash
# 在export-file目录中
npm link

# 在您的项目目录中
npm link axios-file-export
```

## 使用示例

### 在您的项目中使用

```javascript
import { exportFile } from 'axios-file-export';

// 下载文件
await exportFile('https://example.com/file.pdf', {
  filename: 'my-document'
});
```

## 发布到npm（可选）

如果您想将包发布到npm，执行以下步骤：

1. 注册npm账号（如果还没有）
   ```bash
   npm login
   ```

2. 发布包
   ```bash
   npm publish
   ```

发布后，其他用户就可以通过以下方式安装：
```bash
npm install axios-file-export
```

## 浏览器环境使用

打开 `example/demo.html` 查看浏览器环境的交互式演示。

## Node.js环境使用

运行示例脚本：
```bash
npm test
```

或直接运行：
```bash
node example/demo.js
```

## 项目地址

- GitHub: https://github.com/zhangyanyange/export-file
- Issues: https://github.com/zhangyanyange/export-file/issues

## 文档

完整文档请参阅：[README.md](README.md)
