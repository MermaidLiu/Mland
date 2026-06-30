# 医院 PMP 项目管理智能体

> **Blueprint** — 已在航天中心医院私有化部署

## 快速开始

```bash
npx mland-cli add pmp-agent --hospital=航天中心医院
cd pmp-agent
docker compose up -d
```

## 目录结构

```
pmp-agent/
├── agent.ts         # ReAct 智能体入口
├── .env.example
└── docker-compose.yml
```

## Pro 版

K8s 高可用 + 7×24 监控告警见 `packages/mland-deploy/k8s/pmp-agent/`

## License

MIT — 基础版开源 | Pro 版商业授权
