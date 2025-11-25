/**
 * axios-file-export - 文件导出工具
 * 支持自动检测文件类型、时间戳命名和自定义文件名
 */

import axios from 'axios';

/**
 * MIME类型到文件扩展名的映射表
 */
const MIME_MAP = {
  // 文档类型
  'application/pdf': 'pdf',
  'application/msword': 'doc',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'docx',
  'application/vnd.ms-excel': 'xls',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': 'xlsx',
  'application/vnd.ms-powerpoint': 'ppt',
  'application/vnd.openxmlformats-officedocument.presentationml.presentation': 'pptx',
  
  // 压缩文件
  'application/zip': 'zip',
  'application/x-rar-compressed': 'rar',
  'application/x-7z-compressed': '7z',
  'application/gzip': 'gz',
  'application/x-tar': 'tar',
  
  // 图片类型
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/gif': 'gif',
  'image/bmp': 'bmp',
  'image/webp': 'webp',
  'image/svg+xml': 'svg',
  'image/tiff': 'tiff',
  
  // 文本类型
  'text/plain': 'txt',
  'text/html': 'html',
  'text/css': 'css',
  'text/javascript': 'js',
  'application/javascript': 'js',
  'application/json': 'json',
  'text/xml': 'xml',
  'application/xml': 'xml',
  'text/csv': 'csv',
  
  // 音视频
  'audio/mpeg': 'mp3',
  'audio/wav': 'wav',
  'video/mp4': 'mp4',
  'video/mpeg': 'mpeg',
  'video/quicktime': 'mov',
  'video/x-msvideo': 'avi',
  
  // 其他
  'application/octet-stream': 'bin'
};

/**
 * 生成时间戳字符串
 * @param {string} format - 时间格式，默认 'YYYYMMDD_HHmmss'
 * @returns {string} 格式化的时间戳
 */
function generateTimestamp(format = 'YYYYMMDD_HHmmss') {
  const now = new Date();
  
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  const milliseconds = String(now.getMilliseconds()).padStart(3, '0');
  
  return format
    .replace('YYYY', year)
    .replace('MM', month)
    .replace('DD', day)
    .replace('HH', hours)
    .replace('mm', minutes)
    .replace('ss', seconds)
    .replace('SSS', milliseconds);
}

/**
 * 从Content-Disposition头中提取文件名
 * @param {string} contentDisposition - Content-Disposition头的值
 * @returns {string|null} 提取的文件名或null
 */
function extractFilenameFromHeader(contentDisposition) {
  if (!contentDisposition) return null;
  
  // 匹配 filename*=UTF-8''encoded-filename
  const filenameStarMatch = contentDisposition.match(/filename\*=UTF-8''(.+?)(?:;|$)/i);
  if (filenameStarMatch) {
    try {
      return decodeURIComponent(filenameStarMatch[1]);
    } catch (e) {
      console.warn('解码filename*失败:', e);
    }
  }
  
  // 匹配 filename="filename" 或 filename=filename
  const filenameMatch = contentDisposition.match(/filename=["']?([^"';]+)["']?/i);
  if (filenameMatch) {
    try {
      return decodeURIComponent(filenameMatch[1]);
    } catch (e) {
      return filenameMatch[1];
    }
  }
  
  return null;
}

/**
 * 从MIME类型获取文件扩展名
 * @param {string} mimeType - MIME类型
 * @returns {string} 文件扩展名
 */
function getExtensionFromMime(mimeType) {
  if (!mimeType) return 'bin';
  
  // 移除可能的参数，如 "application/json; charset=utf-8"
  const cleanMime = mimeType.split(';')[0].trim().toLowerCase();
  
  return MIME_MAP[cleanMime] || 'bin';
}

/**
 * 确保文件名有正确的扩展名
 * @param {string} filename - 文件名
 * @param {string} extension - 预期的扩展名
 * @returns {string} 带有正确扩展名的文件名
 */
function ensureExtension(filename, extension) {
  const hasExtension = /\.[a-zA-Z0-9]+$/.test(filename);
  
  if (!hasExtension) {
    return `${filename}.${extension}`;
  }
  
  return filename;
}

/**
 * 在浏览器环境中下载文件
 * @param {Blob} blob - 文件Blob对象
 * @param {string} filename - 文件名
 */
function downloadInBrowser(blob, filename) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.style.display = 'none';
  
  document.body.appendChild(link);
  link.click();
  
  // 清理
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * 在Node.js环境中保存文件
 * @param {Buffer} buffer - 文件Buffer
 * @param {string} filename - 文件名
 * @returns {Promise<void>}
 */
async function saveInNode(buffer, filename) {
  const fs = await import('fs');
  const path = await import('path');
  
  const downloadDir = path.join(process.cwd(), 'downloads');
  
  // 确保downloads目录存在
  if (!fs.existsSync(downloadDir)) {
    fs.mkdirSync(downloadDir, { recursive: true });
  }
  
  const filepath = path.join(downloadDir, filename);
  fs.writeFileSync(filepath, buffer);
  
  return filepath;
}

/**
 * 检测当前运行环境
 * @returns {'browser'|'node'}
 */
function detectEnvironment() {
  return typeof window !== 'undefined' && typeof document !== 'undefined' ? 'browser' : 'node';
}

/**
 * 导出文件
 * @param {string} url - 文件下载地址
 * @param {Object} options - 配置选项
 * @param {Object} [options.params] - URL查询参数
 * @param {Object} [options.data] - POST请求体数据
 * @param {string} [options.method='GET'] - HTTP方法
 * @param {Object} [options.headers] - 自定义请求头
 * @param {string} [options.filename] - 自定义文件名（不含扩展名）
 * @param {boolean} [options.useTimestamp=true] - 是否使用时间戳命名
 * @param {string} [options.timestampFormat='YYYYMMDD_HHmmss'] - 时间戳格式
 * @param {Object} [options.axiosConfig] - 额外的axios配置
 * @returns {Promise<{success: boolean, filename: string, filepath?: string, message?: string}>}
 */
export async function exportFile(url, options = {}) {
  try {
    const {
      params,
      data,
      method = 'GET',
      headers = {},
      filename,
      useTimestamp = true,
      timestampFormat = 'YYYYMMDD_HHmmss',
      axiosConfig = {}
    } = options;
    
    // 发送请求
    const response = await axios({
      url,
      method,
      params,
      data,
      headers,
      responseType: 'arraybuffer', // 获取二进制数据
      ...axiosConfig
    });
    
    // 检测文件类型
    const contentType = response.headers['content-type'] || response.headers['Content-Type'];
    const contentDisposition = response.headers['content-disposition'] || response.headers['Content-Disposition'];
    
    // 获取文件扩展名
    const extension = getExtensionFromMime(contentType);
    
    // 确定文件名
    let finalFilename;
    
    if (filename) {
      // 使用自定义文件名
      finalFilename = ensureExtension(filename, extension);
    } else {
      // 尝试从header中提取文件名
      const headerFilename = extractFilenameFromHeader(contentDisposition);
      
      if (headerFilename) {
        finalFilename = headerFilename;
      } else {
        // 使用时间戳命名
        const timestamp = useTimestamp ? generateTimestamp(timestampFormat) : 'download';
        finalFilename = `${timestamp}.${extension}`;
      }
    }
    
    // 根据环境下载文件
    const env = detectEnvironment();
    
    if (env === 'browser') {
      const blob = new Blob([response.data], { type: contentType });
      downloadInBrowser(blob, finalFilename);
      
      return {
        success: true,
        filename: finalFilename,
        message: '文件下载成功'
      };
    } else {
      const filepath = await saveInNode(Buffer.from(response.data), finalFilename);
      
      return {
        success: true,
        filename: finalFilename,
        filepath,
        message: `文件保存成功: ${filepath}`
      };
    }
    
  } catch (error) {
    console.error('文件导出失败:', error);
    
    return {
      success: false,
      filename: '',
      message: error.message || '文件导出失败'
    };
  }
}

/**
 * 默认导出
 */
export default exportFile;
