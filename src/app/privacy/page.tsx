import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "隐私政策",
};

export default function PrivacyPage() {
  return (
    <div className="container mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-bold">隐私政策</h1>
      <div className="prose-mland mt-8">
        <p>最后更新：2026 年 7 月 1 日</p>
        <h2>信息收集</h2>
        <p>
          Mland（以下简称「我们」）在您使用官网 Agent Playground
          演示功能时，可能临时处理您输入的对话内容以生成演示回复。我们不会永久存储这些对话数据。
        </p>
        <h2>数据使用</h2>
        <p>
          收集的信息仅用于提供和改进我们的服务。私有化部署方案的所有数据均存储在客户自有基础设施中。
        </p>
        <h2>联系我们</h2>
        <p>
          如有隐私相关问题，请联系{" "}
          <a href="mailto:privacy@mland.io">privacy@mland.io</a>。
        </p>
      </div>
    </div>
  );
}
