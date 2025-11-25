/**
 * TypeScript类型定义
 */

import { AxiosRequestConfig } from 'axios';

/**
 * 文件导出选项
 */
export interface ExportOptions {
    /**
     * URL查询参数
     */
    params?: Record<string, any>;

    /**
     * POST请求体数据
     */
    data?: any;

    /**
     * HTTP请求方法
     * @default 'GET'
     */
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | string;

    /**
     * 自定义请求头
     */
    headers?: Record<string, string>;

    /**
     * 自定义文件名（可以包含或不包含扩展名）
     * 如果不包含扩展名，将根据文件类型自动添加
     */
    filename?: string;

    /**
     * 是否使用时间戳命名文件
     * @default true
     */
    useTimestamp?: boolean;

    /**
     * 时间戳格式
     * 支持的占位符：
     * - YYYY: 四位年份
     * - MM: 两位月份
     * - DD: 两位日期
     * - HH: 两位小时（24小时制）
     * - mm: 两位分钟
     * - ss: 两位秒
     * - SSS: 三位毫秒
     * @default 'YYYYMMDD_HHmmss'
     */
    timestampFormat?: string;

    /**
     * 额外的axios配置
     * 可以传入任何axios支持的配置项
     */
    axiosConfig?: AxiosRequestConfig;
}

/**
 * 文件导出结果
 */
export interface ExportResult {
    /**
     * 是否成功
     */
    success: boolean;

    /**
     * 文件名
     */
    filename: string;

    /**
     * 文件保存路径（仅在Node.js环境中返回）
     */
    filepath?: string;

    /**
     * 结果消息
     */
    message?: string;
}

/**
 * 导出文件
 * 
 * @param url - 文件下载地址
 * @param options - 配置选项
 * @returns Promise，返回导出结果
 * 
 * @example
 * ```javascript
 * // 基础用法 - 使用时间戳命名
 * await exportFile('https://example.com/file.pdf');
 * 
 * // 自定义文件名
 * await exportFile('https://example.com/file.pdf', {
 *   filename: 'my-document'
 * });
 * 
 * // 带参数的GET请求
 * await exportFile('https://example.com/api/export', {
 *   params: { id: 123, type: 'pdf' }
 * });
 * 
 * // POST请求
 * await exportFile('https://example.com/api/export', {
 *   method: 'POST',
 *   data: { userId: 123, format: 'excel' }
 * });
 * 
 * // 自定义请求头
 * await exportFile('https://example.com/api/export', {
 *   headers: {
 *     'Authorization': 'Bearer token123'
 *   }
 * });
 * 
 * // 自定义时间戳格式
 * await exportFile('https://example.com/file.pdf', {
 *   timestampFormat: 'YYYY-MM-DD_HH-mm-ss'
 * });
 * ```
 */
export function exportFile(url: string, options?: ExportOptions): Promise<ExportResult>;

export default exportFile;
