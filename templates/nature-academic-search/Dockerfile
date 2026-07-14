# Academic Search Skill — MedSkill Docker 封装
# 上游: https://github.com/wp-a/nature-academic-search

FROM python:3.10-slim

LABEL org.opencontainers.image.source="https://github.com/wp-a/nature-academic-search"
LABEL medskill.name="nature-academic-search"
LABEL medskill.version="1.0.0"

RUN apt-get update \
  && apt-get install -y --no-install-recommends git ca-certificates \
  && rm -rf /var/lib/apt/lists/*

WORKDIR /app

ARG SKILL_REPO=https://github.com/wp-a/nature-academic-search.git
ARG SKILL_REF=main

RUN git clone --depth 1 --branch "${SKILL_REF}" "${SKILL_REPO}" upstream

RUN pip install --no-cache-dir -r upstream/mcp-server/requirements.txt

COPY cli/ /app/cli/
COPY run.sh /app/run.sh
RUN chmod +x /app/run.sh

ENV PYTHONPATH=/app/upstream/mcp-server
ENV PUBMED_EMAIL=user@example.com
ENV CROSSREF_MAILTO=user@example.com

VOLUME ["/data"]
ENTRYPOINT ["/app/run.sh"]
