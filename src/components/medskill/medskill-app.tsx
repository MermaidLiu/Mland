"use client";

import { useCallback, useState } from "react";
import { LayoutDashboard, Store, GitPullRequest } from "lucide-react";
import { AuthModal } from "./auth-modal";
import { MedSkillNavbar } from "./navbar";
import { CanvasTab } from "./canvas-tab";
import { SkillStoreTab } from "./skill-store-tab";
import { ContributorTab } from "./contributor-tab";
import { DEFAULT_CONTRIBUTOR_STATS } from "./mock-data";
import type { ContributorStats, MainTab, User, UserRole } from "./types";

const TABS: { id: MainTab; label: string; icon: typeof LayoutDashboard }[] = [
  { id: "research", label: "AI 智能看板 (Canvas)", icon: LayoutDashboard },
  { id: "store", label: "SKILL 广场", icon: Store },
  { id: "contributor", label: "Contributor Hub", icon: GitPullRequest },
];

export function MedSkillApp() {
  const [user, setUser] = useState<User | null>(null);
  const [authOpen, setAuthOpen] = useState(false);
  const [balance, setBalance] = useState(1250);
  const [tab, setTab] = useState<MainTab>("research");
  const [stats, setStats] = useState<ContributorStats>(DEFAULT_CONTRIBUTOR_STATS);
  const [toast, setToast] = useState<string | null>(null);

  const showToast = useCallback((msg: string) => {
    setToast(msg);
    window.setTimeout(() => setToast(null), 2200);
  }, []);

  const handleLogin = useCallback(
    (u: User) => {
      setUser(u);
      setTab(u.role === "contributor" ? "contributor" : "research");
      showToast(`欢迎，${u.name}`);
    },
    [showToast]
  );

  const handleLogout = useCallback(() => {
    setUser(null);
    setTab("research");
    showToast("已退出登录");
  }, [showToast]);

  const handleRoleChange = useCallback(
    (role: UserRole) => {
      setUser((prev) => (prev ? { ...prev, role } : prev));
      setTab(role === "contributor" ? "contributor" : "research");
      showToast(role === "student" ? "已切换为医学生视图" : "已切换为贡献者视图");
    },
    [showToast]
  );

  const handleRecharge = useCallback(() => {
    if (!user) {
      setAuthOpen(true);
      return;
    }
    setBalance((b) => b + 500);
    showToast("充值成功 +500 算力币");
  }, [user, showToast]);

  const handleSpend = useCallback(
    (amount: number) => {
      if (balance < amount) return false;
      setBalance((b) => b - amount);
      return true;
    },
    [balance]
  );

  const handlePublish = useCallback(() => {
    setStats((s) => ({
      ...s,
      skillsPublished: s.skillsPublished + 1,
      earnings: s.earnings + 120,
    }));
    showToast("SKILL 封装上架成功");
  }, [showToast]);

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <MedSkillNavbar
        user={user}
        balance={balance}
        onLoginClick={() => setAuthOpen(true)}
        onLogout={handleLogout}
        onRoleChange={handleRoleChange}
        onRecharge={handleRecharge}
      />

      <section className="border-b border-gray-100 bg-med-purple">
        <div className="mx-auto max-w-6xl px-4 py-10 md:py-14">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-400">
            Natural Language → Code-Based Workflow
          </p>
          <h1 className="mt-2 max-w-2xl text-3xl font-bold tracking-tight text-white md:text-4xl">
            MedSkill Canvas · 低代码医学科研画布
          </h1>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/75 md:text-base">
            医学生看可视化 SOP 与 SCI 图表；工科大牛一键切换底层 R / Python 源码。
          </p>
        </div>
      </section>

      <div className="border-b border-gray-100 bg-gray-50">
        <div className="mx-auto flex max-w-6xl gap-1 overflow-x-auto px-4 pt-3">
          {TABS.map((item) => {
            const active = tab === item.id;
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setTab(item.id)}
                className={`relative flex shrink-0 items-center gap-2 rounded-t-xl px-4 py-3 text-sm font-semibold transition md:px-5 ${
                  active
                    ? "bg-white text-med-purple"
                    : "text-gray-500 hover:text-med-purple"
                }`}
              >
                <Icon className={`h-4 w-4 ${active ? "text-amber-500" : ""}`} />
                {item.label}
                {active && (
                  <span className="absolute inset-x-3 bottom-0 h-0.5 rounded-full bg-amber-400" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      <main className="mx-auto max-w-6xl px-4 py-8">
        {tab === "research" && (
          <CanvasTab
            isLoggedIn={!!user}
            balance={balance}
            onRequireAuth={() => setAuthOpen(true)}
            onSpend={handleSpend}
          />
        )}
        {tab === "store" && (
          <SkillStoreTab
            isLoggedIn={!!user}
            onRequireAuth={() => setAuthOpen(true)}
            onSpend={handleSpend}
          />
        )}
        {tab === "contributor" && (
          <ContributorTab
            isLoggedIn={!!user}
            isContributor={user?.role === "contributor"}
            stats={stats}
            onRequireAuth={() => setAuthOpen(true)}
            onPublish={handlePublish}
          />
        )}
      </main>

      <footer className="border-t border-gray-100 bg-gray-50 py-8">
        <div className="mx-auto max-w-6xl px-4 text-center text-xs text-gray-500">
          MedSkill Canvas · 医学科研低代码画布 · PHI 本地脱敏
        </div>
      </footer>

      <AuthModal
        open={authOpen}
        onClose={() => setAuthOpen(false)}
        onLogin={handleLogin}
      />

      {toast && (
        <div className="fixed bottom-6 left-1/2 z-[110] -translate-x-1/2 rounded-full bg-med-purple px-5 py-2.5 text-sm font-medium text-white shadow-lg">
          <span className="mr-2 text-amber-400">●</span>
          {toast}
        </div>
      )}
    </div>
  );
}
