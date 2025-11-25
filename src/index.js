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
 * 通过文件头（magic number）检测文件类型
 * @param {ArrayBuffer|Buffer} data - 文件数据
 * @returns {string|null} 检测到的文件扩展名，如果无法识别则返回null
 */
function detectFileTypeByHeader(data) {
  try {
    // 转换为Uint8Array以便统一处理
    const arr = data instanceof ArrayBuffer
      ? new Uint8Array(data)
      : new Uint8Array(data.buffer || data);

    // 读取前8个字节
    const header = Array.from(arr.subarray(0, 8))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');

    // PDF文件头: 25 50 44 46 (%PDF)
    if (header.startsWith('25504446')) {
      return 'pdf';
    }

    // ZIP/XLSX/DOCX文件头: 50 4B 03 04
    if (header.startsWith('504b0304')) {
      return 'xlsx';
    }

    // PNG文件头: 89 50 4E 47
    if (header.startsWith('89504e47')) {
      return 'png';
    }

    // JPEG文件头: FF D8 FF
    if (header.startsWith('ffd8ff')) {
      return 'jpg';
    }

    // GIF文件头: 47 49 46 38
    if (header.startsWith('47494638')) {
      return 'gif';
    }

    return null;
  } catch (error) {
    console.warn('文件头检测失败:', error);
    return null;
  }
}

/**
 * 确保文件名有正确的扩展名
}

/**
 * 默认导出
 */
export default exportFile;
