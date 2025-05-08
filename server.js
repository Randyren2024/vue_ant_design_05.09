import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 9000;

// 静态文件路径
app.use(express.static(path.join(__dirname, 'dist')));

// 所有路由指向index.html（SPA应用）
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// FC入口函数
export const handler = (req, res, context) => {
  app(req, res);
};

// FC初始化函数
export const initializer = (context, callback) => {
  console.log('Function initialized!');
  callback(null, '');
};

// 本地开发服务
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
} 