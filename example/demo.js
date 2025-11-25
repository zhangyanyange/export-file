/**
 * Node.js环境使用示例
 * 运行方式: node example/demo.js
 */

import { exportFile } from '../src/index.js';

console.log('🚀 axios-file-export Node.js 示例\n');

/**
 * 示例1: 使用时间戳命名下载PDF
 */
async function example1() {
    console.log('📄 示例1: 下载PDF文件（时间戳命名）');
    console.log('-------------------------------------------');

    const result = await exportFile('https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf');

    if (result.success) {
        console.log('✅ 成功:', result.message);
        console.log('   文件名:', result.filename);
        console.log('   保存路径:', result.filepath);
    } else {
        console.log('❌ 失败:', result.message);
    }
    console.log('');
}

/**
 * 示例2: 自定义文件名
 */
async function example2() {
    console.log('📝 示例2: 自定义文件名下载');
    console.log('-------------------------------------------');

    const result = await exportFile('https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', {
        filename: 'custom-document'
    });

    if (result.success) {
        console.log('✅ 成功:', result.message);
        console.log('   文件名:', result.filename);
        console.log('   保存路径:', result.filepath);
    } else {
        console.log('❌ 失败:', result.message);
    }
    console.log('');
}

/**
 * 示例3: 带参数的GET请求
 */
async function example3() {
    console.log('📊 示例3: 带参数的GET请求');
    console.log('-------------------------------------------');

    const result = await exportFile('https://jsonplaceholder.typicode.com/posts', {
        params: {
            _limit: 10
        },
        filename: 'api-response',
        useTimestamp: true,
        timestampFormat: 'YYYY-MM-DD_HH-mm-ss'
    });

    if (result.success) {
        console.log('✅ 成功:', result.message);
        console.log('   文件名:', result.filename);
        console.log('   保存路径:', result.filepath);
    } else {
        console.log('❌ 失败:', result.message);
    }
    console.log('');
}

/**
 * 示例4: POST请求下载
 */
async function example4() {
    console.log('📮 示例4: POST请求下载');
    console.log('-------------------------------------------');

    const result = await exportFile('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        data: {
            title: 'Test Post',
            body: 'This is a test',
            userId: 1
        },
        filename: 'post-response'
    });

    if (result.success) {
        console.log('✅ 成功:', result.message);
        console.log('   文件名:', result.filename);
        console.log('   保存路径:', result.filepath);
    } else {
        console.log('❌ 失败:', result.message);
    }
    console.log('');
}

/**
 * 示例5: 下载图片
 */
async function example5() {
    console.log('🖼️  示例5: 下载图片');
    console.log('-------------------------------------------');

    const result = await exportFile('https://picsum.photos/800/600', {
        filename: 'random-image',
        timestampFormat: 'YYYYMMDD'
    });

    if (result.success) {
        console.log('✅ 成功:', result.message);
        console.log('   文件名:', result.filename);
        console.log('   保存路径:', result.filepath);
    } else {
        console.log('❌ 失败:', result.message);
    }
    console.log('');
}

/**
 * 示例6: 带自定义请求头
 */
async function example6() {
    console.log('🔐 示例6: 带认证头的请求');
    console.log('-------------------------------------------');

    const result = await exportFile('https://jsonplaceholder.typicode.com/users/1', {
        headers: {
            'Authorization': 'Bearer demo-token-123',
            'X-Custom-Header': 'custom-value'
        },
        filename: 'user-data'
    });

    if (result.success) {
        console.log('✅ 成功:', result.message);
        console.log('   文件名:', result.filename);
        console.log('   保存路径:', result.filepath);
    } else {
        console.log('❌ 失败:', result.message);
    }
    console.log('');
}

/**
 * 示例7: 用户指定扩展名 (v1.1.0新功能) ✨
 */
async function example7() {
    console.log('✨ 示例7: 用户指定扩展名 (v1.1.0新功能)');
    console.log('-------------------------------------------');
    console.log('💡 当您提供带扩展名的文件名时，插件将直接使用该扩展名');
    console.log('   不进行文件类型检测，避免因Content-Type不准确导致的问题');
    console.log('');

    const result = await exportFile('https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', {
        filename: 'my-report.pdf',  // 直接指定.pdf扩展名
        useTimestamp: true
    });

    if (result.success) {
        console.log('✅ 成功:', result.message);
        console.log('   文件名:', result.filename);
        console.log('   保存路径:', result.filepath);
        console.log('   🎯 插件直接使用了您指定的.pdf扩展名');
    } else {
        console.log('❌ 失败:', result.message);
    }
    console.log('');
}

/**
 * 运行所有示例
 */
async function runAllExamples() {
    console.log('════════════════════════════════════════════\n');

    try {
        await example1();
        await new Promise(resolve => setTimeout(resolve, 500)); // 延迟避免请求过快

        await example2();
        await new Promise(resolve => setTimeout(resolve, 500));

        await example3();
        await new Promise(resolve => setTimeout(resolve, 500));

        await example4();
        await new Promise(resolve => setTimeout(resolve, 500));

        await example5();
        await new Promise(resolve => setTimeout(resolve, 500));

        await example6();
        await new Promise(resolve => setTimeout(resolve, 500));

        await example7();

        console.log('════════════════════════════════════════════');
        console.log('✨ 所有示例运行完成！');
        console.log('📁 文件保存在: downloads/ 目录');
        console.log('════════════════════════════════════════════');
    } catch (error) {
        console.error('❌ 运行示例时出错:', error);
    }
}

// 运行示例
runAllExamples();
