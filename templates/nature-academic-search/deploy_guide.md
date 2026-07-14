# Academic Search 学术搜索 SKILL — 部署指南

> 上游：[wp-a/nature-academic-search](https://github.com/wp-a/nature-academic-search)  
> MedSkill 封装路径：`templates/nature-academic-search/`

## 架构

```
┌─────────────────┐     ┌──────────────────────────┐     ┌─────────────┐
│  params.json    │────▶│  MedSkill Docker 容器     │────▶│ result.json │
│  (/data/input)  │     │  run.sh → cli/run_skill  │     │ (/data/out) │
└─────────────────┘     └────────────┬─────────────┘     └─────────────┘
                                       │
                         ┌─────────────┼─────────────┐
                         ▼             ▼             ▼
                    CrossRef       PubMed         arXiv
```

## 前置条件

- Docker Desktop 或 Docker Engine 20+
- 可访问 GitHub（构建时 clone 上游仓库）
- PubMed 联系邮箱（NCBI E-utilities 要求）

## 一键部署

```bash
cd templates/nature-academic-search
cp .env.example .env
# 编辑 PUBMED_EMAIL=your-email@edu.cn

cp data/params.example.json data/params.json
docker compose build
docker compose run --rm academic-search
```

成功后在 `data/output/result.json` 查看 JSON 结果。

## 本地开发调试

```bash
docker build -t medskill/nature-academic-search:dev .

docker run --rm \
  -e PUBMED_EMAIL=your@edu.cn \
  -v "$(pwd)/data:/data" \
  medskill/nature-academic-search:dev
```

## 挂接到 Cursor MCP（可选）

若希望在 Cursor 中直接使用上游 MCP Server（非 Docker CLI 模式）：

```json
{
  "mcpServers": {
    "academic-search": {
      "command": "python3",
      "args": ["/path/to/nature-academic-search/mcp-server/academic_search_server.py"],
      "env": {
        "PUBMED_EMAIL": "your@edu.cn"
      }
    }
  }
}
```

或在上游仓库根目录执行：

```bash
bash install.sh your@edu.cn
```

## MedSkill 广场调用

- **分类**：基础生信
- **算力币**：45 / 次
- **GitHub**：[wp-a/nature-academic-search](https://github.com/wp-a/nature-academic-search)

## 常见问题

**Q: 构建时 git clone 失败？**  
A: 检查网络或设置 `http_proxy` / `https_proxy` 后重试 `docker compose build`。

**Q: PubMed 返回空结果？**  
A: 确认 `PUBMED_EMAIL` 已设置；国内环境建议配置代理。

**Q: 如何更新上游版本？**  
A: 重新 `docker compose build --no-cache`，Dockerfile 会拉取 main 分支最新代码。
