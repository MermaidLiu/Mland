# 医院 PMP 项目管理智能体 — 部署指南

> 已在 **航天中心医院** 私有化部署，基于 ReAct 架构实现项目进度质控。

## 架构概览

```
┌──────────────┐     ┌─────────────────┐     ┌─────────────┐
│  Web 管理端   │────▶│  Mland Agent    │────▶│   Redis     │
│  (项目经理)   │     │  Orchestrator   │     │  会话记忆    │
└──────────────┘     └────────┬────────┘     └─────────────┘
                              │
              ┌───────────────┼───────────────┐
              ▼               ▼               ▼
        ┌──────────┐   ┌──────────┐   ┌──────────────┐
        │ PMP Tool │   │ Doc Tool │   │ Hospital     │
        │ 进度计算  │   │ 文档解析  │   │ Adapter(HIS) │
        └──────────┘   └──────────┘   └──────────────┘
```

## 快速开始

```bash
npx mland-cli add pmp-agent --hospital=航天中心医院
cd pmp-agent
cp .env.example .env
docker compose up -d
npm run agent:start
```

## 环境变量

| 变量名 | 说明 | 示例 |
|--------|------|------|
| `OPENAI_API_KEY` | 大模型 API Key | `sk-...` |
| `MODEL_NAME` | 模型名称 | `gpt-4o` |
| `REDIS_URL` | Redis 连接 | `redis://localhost:6379` |
| `QDRANT_URL` | 向量数据库 | `http://localhost:6333` |
| `HIS_API_ENDPOINT` | 项目管理系统 API | `https://pms.hospital.internal` |
| `HIS_API_TOKEN` | 系统访问令牌 | `Bearer xxx` |

## Docker 一键部署

```bash
docker compose up -d
# 启动: agent(8080), qdrant(6333), redis(6379), postgres(5432)
```

## Kubernetes 部署 (Pro)

Pro 版提供高可用 K8s 配置：

```bash
kubectl apply -f packages/mland-deploy/k8s/pmp-agent/
```

包含：
- 3 副本 Agent 服务 + HPA 自动扩缩
- Prometheus + Grafana 监控告警
- 7×24 值班告警通道

## 智能体工具说明

| 工具 | 功能 |
|------|------|
| `pmp_calculator` | 计算 SPI/CPI/EAC 等项目指标 |
| `risk_analyzer` | 基于历史数据预测风险 |
| `meeting_summarizer` | 生成结构化会议纪要 |
| `his_project_reader` | 读取院内项目数据 |

## 联系 Pro 版

[联系销售获取 Pro 部署包 →](mailto:sales@mland.io)
