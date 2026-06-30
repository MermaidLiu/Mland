# 医患语言无障碍翻译助手 — 部署指南

> 已在 **长庚医院** 私有化部署，支持中英/中日/中韩实时语音翻译。

## 架构概览

```
┌─────────────┐     ┌──────────────┐     ┌─────────────┐
│  微信小程序   │────▶│  Mland Agent │────▶│   Qdrant    │
│  (患者/医生)  │     │   Gateway    │     │  术语向量库   │
└─────────────┘     └──────┬───────┘     └─────────────┘
                           │
                    ┌──────▼───────┐
                    │ Hospital     │
                    │ Adapter(HIS) │
                    └──────────────┘
```

## 快速开始

```bash
npx mland-cli add medical-translation --hospital=长庚医院
cd medical-translation
docker compose up -d
```

## 环境变量

| 变量名 | 说明 | 示例 |
|--------|------|------|
| `WECHAT_APP_ID` | 微信小程序 AppID | `wx1234567890` |
| `WECHAT_APP_SECRET` | 小程序密钥 | `your-secret` |
| `OPENAI_API_KEY` | 语音识别/翻译 API | `sk-...` |
| `QDRANT_URL` | 向量数据库地址 | `http://localhost:6333` |
| `HIS_API_ENDPOINT` | 医院 HIS 接口 | `https://his.hospital.internal/api` |

## 微信小程序配置

1. 在微信公众平台注册小程序，获取 AppID 和 AppSecret
2. 修改 `miniprogram/project.config.json` 中的 `appid`
3. 将服务器域名加入微信白名单
4. 替换 `server/.env` 中的密钥

## Docker 部署

```bash
docker compose up -d
# 服务: gateway(3000), qdrant(6333), redis(6379)
```

## 私有化注意事项

- 医疗数据不出院：所有 API 调用走内网 Gateway
- 翻译会话日志存储在院内 PostgreSQL
- 支持 LDAP 单点登录对接

## 联系 Pro 版

Pro 版包含：高可用集群、7×24 监控告警、定制术语库导入服务。

[联系销售 →](mailto:sales@mland.io)
