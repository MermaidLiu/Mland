# 制造业设备巡检 AI 助手 — 部署指南

> 跨行业可复制方案，支持 Flutter 移动端 + FastAPI 后端。

## 快速开始

```bash
npx mland-cli add manufacturing-inspection
cd manufacturing-inspection
docker compose up -d
```

## 环境变量

| 变量名 | 说明 |
|--------|------|
| `API_BASE_URL` | 后端 API 地址 |
| `VISION_MODEL_PATH` | YOLOv8 模型路径 |
| `DATABASE_URL` | PostgreSQL 连接 |

## 移动端构建

```bash
cd mobile
flutter build apk --release
```

## Docker 部署

```bash
docker compose up -d
```
