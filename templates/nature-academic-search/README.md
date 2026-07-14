# Academic Search — MedSkill Docker 封装

基于上游开源项目 [wp-a/nature-academic-search](https://github.com/wp-a/nature-academic-search) 的 Docker 化 SKILL，供 MedSkill 广场一键调用。

## 功能

- **多源并发搜索**：CrossRef / PubMed / arXiv
- **按 ID 获取详情**：DOI、PMID、arXiv ID 自动识别
- **格式化引用**：APA / Nature / IEEE / Vancouver 等
- **MeSH 词表查询**：构建 PubMed 检索式

## 快速开始

```bash
cd templates/nature-academic-search
cp .env.example .env
# 编辑 .env，填入 PUBMED_EMAIL（必填）

cp data/params.example.json data/params.json
docker compose build
docker compose run --rm academic-search
cat data/output/result.json
```

## 输入格式 (`data/params.json`)

### 文献搜索

```json
{
  "action": "search_papers",
  "query": "diabetes cardiovascular mortality",
  "sources": ["pubmed", "crossref"],
  "rows": 10
}
```

### 按 ID 获取

```json
{
  "action": "get_paper_by_id",
  "id": "10.1038/nature12373",
  "id_type": "auto"
}
```

### 格式化引用

```json
{
  "action": "get_citation",
  "id": "12345678",
  "id_type": "pmid",
  "style": "nature"
}
```

### MeSH 查询

```json
{
  "action": "lookup_mesh",
  "term": "Diabetes Mellitus"
}
```

## 环境变量

| 变量 | 说明 |
|------|------|
| `PUBMED_EMAIL` | PubMed 联系邮箱（必填） |
| `CROSSREF_MAILTO` | CrossRef polite pool 邮箱 |
| `NCBI_API_KEY` | 可选，提高 NCBI 请求速率 |
| `http_proxy` / `https_proxy` | 可选，国内网络代理 |

## 镜像标签

```bash
docker build -t medskill/nature-academic-search:1.0.0 .
```

## 上游 MCP 工具对照

| MedSkill action | 上游 MCP Tool |
|-----------------|---------------|
| `search_papers` | `search_papers` |
| `get_paper_by_id` | `get_paper_by_id` |
| `get_citation` | `get_citation` |
| `lookup_mesh` | `lookup_mesh` |

## 许可证

上游仓库许可证以 GitHub 仓库为准。本封装目录遵循 Mland 项目 MIT 许可。
