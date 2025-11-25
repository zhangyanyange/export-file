# axios-file-export

一个基于axios的轻量级文件导出工具，支持自动检测文件类型、时间戳命名和自定义文件名，兼容所有文件格式。

## 特性

✅ **基于axios** - 使用流行的HTTP客户端库  
✅ **自动类型检测** - 从响应头自动识别文件类型和扩展名  
✅ **灵活命名** - 支持时间戳命名和自定义文件名  
✅ **全格式支持** - 兼容PDF、Excel、Word、图片、压缩包等所有格式  
✅ **双环境支持** - 同时支持浏览器和Node.js环境  
✅ **TypeScript支持** - 完整的类型定义  
✅ **可配置** - 支持自定义请求头、参数、时间戳格式等

## 安装

```bash
npm install axios-file-export
```

或使用yarn：

```bash
yarn add axios-file-export
```

## 快速开始

### 基础用法

```javascript
import { exportFile } from 'axios-file-export';

// 最简单的用法 - 使用时间戳命名
await exportFile('https://example.com/file.pdf');
// 下载文件名示例: 20250125_154230.pdf
```

### 自定义文件名

```javascript
// 自定义文件名（自动添加正确的扩展名）
await exportFile('https://example.com/file.pdf', {
  filename: 'my-document'
});
// 下载文件名: my-document.pdf

// 自定义文件名（包含扩展名）
await exportFile('https://example.com/file.pdf', {
  filename: 'report.pdf'
});
// 下载文件名: report.pdf
```

### 带参数的请求

```javascript
// GET请求带参数
await exportFile('https://example.com/api/export', {
  params: {
    id: 123,
    type: 'pdf',
    date: '2025-01-25'
  }
});

// POST请求
await exportFile('https://example.com/api/export', {
  method: 'POST',
  data: {
    userId: 123,
    format: 'excel',
    columns: ['name', 'email', 'phone']
  }
});
```

### 自定义请求头

```javascript
await exportFile('https://example.com/api/export', {
  headers: {
    'Authorization': 'Bearer your-token-here',
    'X-Custom-Header': 'custom-value'
  }
});
```

### 自定义时间戳格式

```javascript
await exportFile('https://example.com/file.pdf', {
  timestampFormat: 'YYYY-MM-DD_HH-mm-ss'
});
// 下载文件名示例: 2025-01-25_15-42-30.pdf

await exportFile('https://example.com/file.pdf', {
  timestampFormat: 'YYYYMMDD'
});
// 下载文件名示例: 20250125.pdf
```

### 不使用时间戳

```javascript
await exportFile('https://example.com/file.pdf', {
  useTimestamp: false,
  filename: 'document'
});
// 下载文件名: document.pdf
```

## API文档

### exportFile(url, options)

导出文件的主函数。

#### 参数

- **url** `string` - 文件下载地址（必需）
- **options** `Object` - 配置选项（可选）

#### 配置选项

| 选项 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `params` | `Object` | - | URL查询参数 |
| `data` | `Object` | - | POST请求体数据 |
| `method` | `string` | `'GET'` | HTTP方法（GET/POST/PUT/DELETE等） |
| `headers` | `Object` | `{}` | 自定义请求头 |
| `filename` | `string` | - | 自定义文件名 |
| `useTimestamp` | `boolean` | `true` | 是否使用时间戳命名 |
| `timestampFormat` | `string` | `'YYYYMMDD_HHmmss'` | 时间戳格式 |
| `axiosConfig` | `Object` | `{}` | 额外的axios配置 |

#### 时间戳格式占位符

| 占位符 | 说明 | 示例 |
|--------|------|------|
| `YYYY` | 四位年份 | 2025 |
| `MM` | 两位月份 | 01 |
| `DD` | 两位日期 | 25 |
| `HH` | 两位小时（24小时制） | 15 |
| `mm` | 两位分钟 | 42 |
| `ss` | 两位秒 | 30 |
| `SSS` | 三位毫秒 | 123 |

#### 返回值

返回一个Promise，解析为以下对象：

```typescript
{
  success: boolean;      // 是否成功
  filename: string;      // 文件名
  filepath?: string;     // 文件路径（仅Node.js环境）
  message?: string;      // 结果消息
}
```

## 支持的文件类型

插件会自动检测以下常见文件类型的扩展名：

### 文档类型
- PDF (`.pdf`)
- Word (`.doc`, `.docx`)
- Excel (`.xls`, `.xlsx`)
- PowerPoint (`.ppt`, `.pptx`)

### 压缩文件
- ZIP (`.zip`)
- RAR (`.rar`)
- 7Z (`.7z`)
- GZIP (`.gz`)
- TAR (`.tar`)

### 图片类型
- JPEG (`.jpg`)
- PNG (`.png`)
- GIF (`.gif`)
- BMP (`.bmp`)
- WebP (`.webp`)
- SVG (`.svg`)
- TIFF (`.tiff`)

### 文本类型
- TXT (`.txt`)
- HTML (`.html`)
- CSS (`.css`)
- JavaScript (`.js`)
- JSON (`.json`)
- XML (`.xml`)
- CSV (`.csv`)

### 音视频
- MP3 (`.mp3`)
- WAV (`.wav`)
- MP4 (`.mp4`)
- MPEG (`.mpeg`)
- MOV (`.mov`)
- AVI (`.avi`)

如果文件类型无法识别，将使用`.bin`作为默认扩展名。

## 环境区别

### 浏览器环境

在浏览器中，文件会自动触发下载：

```javascript
import { exportFile } from 'axios-file-export';

// 点击按钮下载文件
button.addEventListener('click', async () => {
  const result = await exportFile('https://example.com/file.pdf');
  if (result.success) {
    console.log('下载成功:', result.filename);
  }
});
```

### Node.js环境

在Node.js中，文件会保存到`downloads`目录：

```javascript
import { exportFile } from 'axios-file-export';

const result = await exportFile('https://example.com/file.pdf');
if (result.success) {
  console.log('保存成功:', result.filepath);
  // 输出: 保存成功: /path/to/your/project/downloads/20250125_154230.pdf
}
```

## 完整示例

### 导出报表（带认证和参数）

```javascript
async function exportReport(reportId, format = 'excel') {
  try {
    const result = await exportFile('https://api.example.com/reports/export', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      },
      data: {
        reportId,
        format,
        dateRange: {
          start: '2025-01-01',
          end: '2025-01-31'
        }
      },
      filename: `report_${reportId}`,
      timestampFormat: 'YYYY-MM-DD'
    });
    
    if (result.success) {
      alert(`报表导出成功: ${result.filename}`);
    } else {
      alert(`导出失败: ${result.message}`);
    }
  } catch (error) {
    console.error('导出报表时出错:', error);
  }
}

// 使用
exportReport(12345, 'excel');
```

## 错误处理

```javascript
const result = await exportFile('https://example.com/file.pdf');

if (!result.success) {
  console.error('下载失败:', result.message);
  // 处理错误...
}
```

## TypeScript支持

插件提供完整的TypeScript类型定义：

```typescript
import { exportFile, ExportOptions, ExportResult } from 'axios-file-export';

const options: ExportOptions = {
  method: 'POST',
  data: { id: 123 },
  filename: 'document'
};

const result: ExportResult = await exportFile('https://example.com/api/export', options);
```

## 许可证

MIT

## 贡献

欢迎提交Issues和Pull Requests！
