import fs from "fs";
import path from "path";

export function getDeployGuide(templatePath: string): string {
  const filePath = path.join(
    process.cwd(),
    "templates",
    templatePath,
    "deploy_guide.md"
  );

  try {
    return fs.readFileSync(filePath, "utf-8");
  } catch {
    return `# 部署指南\n\n该方案的部署文档正在完善中，请联系 Mland 团队获取完整部署包。`;
  }
}
