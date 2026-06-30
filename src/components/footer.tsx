import Link from "next/link";
import { GitBranch } from "lucide-react";
import { APP_NAME, GITHUB_REPO_URL } from "@/lib/data";

export function Footer() {
  return (
    <footer className="border-t bg-muted/30">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-mland-navy">
                <span className="text-sm font-bold text-white">M</span>
              </div>
              <span className="text-lg font-bold">{APP_NAME}</span>
            </div>
            <p className="mt-4 max-w-md text-sm text-muted-foreground">
              企业级 AI 智能体解决方案市场。将复杂的 AI 能力打包成开箱即用的
              Recipe，支持私有化部署。
            </p>
            <p className="mt-2 text-sm font-medium text-primary">
              已服务医院：长庚医院、航天中心医院
            </p>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold">产品</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/industries" className="hover:text-foreground">
                  行业方案
                </Link>
              </li>
              <li>
                <Link href="/docs" className="hover:text-foreground">
                  开发者文档
                </Link>
              </li>
              <li>
                <Link href="/solution/pmp-agent" className="hover:text-foreground">
                  PMP 智能体
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold">链接</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a
                  href={GITHUB_REPO_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 hover:text-foreground"
                >
                  <GitBranch className="h-4 w-4" />
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href="https://x.com/mland_io"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-foreground"
                >
                  Twitter / X
                </a>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-foreground">
                  隐私政策
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} {APP_NAME}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
