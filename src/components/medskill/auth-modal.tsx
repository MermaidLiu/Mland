"use client";

import { useState } from "react";
import { X, GraduationCap, Code2, Smartphone, Mail, ShieldCheck } from "lucide-react";
import type { AuthChannel, User, UserRole } from "./types";

interface AuthModalProps {
  open: boolean;
  onClose: () => void;
  onLogin: (user: User) => void;
}

export function AuthModal({ open, onClose, onLogin }: AuthModalProps) {
  const [channel, setChannel] = useState<AuthChannel>("student");
  const [account, setAccount] = useState("");
  const [code, setCode] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  if (!open) return null;

  const role: UserRole = channel === "student" ? "student" : "contributor";

  function handleSendCode() {
    if (!account.trim()) {
      setError("请输入手机号或邮箱");
      return;
    }
    setError("");
    setSent(true);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!account.trim() || !code.trim()) {
      setError("请填写账号与验证码");
      return;
    }
    if (code.trim().length < 4) {
      setError("验证码至少 4 位（演示任意填入即可）");
      return;
    }
    const isEmail = account.includes("@");
    const name =
      channel === "student"
        ? isEmail
          ? account.split("@")[0]
          : `医学生 ${account.slice(-4)}`
        : isEmail
          ? account.split("@")[0]
          : `贡献者 ${account.slice(-4)}`;

    onLogin({
      name,
      email: isEmail ? account : `${account}@medskill.local`,
      role,
      avatarInitials: name.slice(0, 1).toUpperCase(),
    });
    setAccount("");
    setCode("");
    setSent(false);
    setError("");
    onClose();
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <button
        type="button"
        className="absolute inset-0 bg-med-purple/40 backdrop-blur-sm"
        aria-label="关闭"
        onClick={onClose}
      />
      <div className="relative w-full max-w-md overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-gray-100 bg-med-purple px-6 py-4">
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-amber-400">
              MedSkill 广场
            </p>
            <h2 className="text-lg font-semibold text-white">登录 / 注册</h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1.5 text-white/80 transition hover:bg-white/10 hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6">
          <div className="mb-6 grid grid-cols-2 gap-2 rounded-xl bg-gray-50 p-1">
            <button
              type="button"
              onClick={() => setChannel("student")}
              className={`flex items-center justify-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                channel === "student"
                  ? "bg-med-purple text-white shadow-sm"
                  : "text-gray-600 hover:text-med-purple"
              }`}
            >
              <GraduationCap className="h-4 w-4" />
              医学生 / 使用者
            </button>
            <button
              type="button"
              onClick={() => setChannel("contributor")}
              className={`flex items-center justify-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                channel === "contributor"
                  ? "bg-med-purple text-white shadow-sm"
                  : "text-gray-600 hover:text-med-purple"
              }`}
            >
              <Code2 className="h-4 w-4" />
              技术专家 / 贡献者
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="mb-1.5 block text-xs font-medium text-gray-600">
                手机号 / 邮箱
              </label>
              <div className="relative">
                {account.includes("@") || account.includes(".") ? (
                  <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                ) : (
                  <Smartphone className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                )}
                <input
                  type="text"
                  value={account}
                  onChange={(e) => setAccount(e.target.value)}
                  placeholder="138****8888 或 name@edu.cn"
                  className="w-full rounded-xl border border-gray-200 bg-white py-2.5 pl-10 pr-3 text-sm outline-none ring-med-purple/30 transition focus:border-med-purple focus:ring-2"
                />
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-medium text-gray-600">
                验证码
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder={sent ? "已发送演示码，任意输入即可" : "输入验证码"}
                  className="flex-1 rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm outline-none ring-med-purple/30 transition focus:border-med-purple focus:ring-2"
                />
                <button
                  type="button"
                  onClick={handleSendCode}
                  className="shrink-0 rounded-xl border border-med-purple/20 bg-gray-50 px-4 text-sm font-medium text-med-purple transition hover:bg-med-purple hover:text-white"
                >
                  {sent ? "已发送" : "获取验证码"}
                </button>
              </div>
            </div>

            {error && (
              <p className="text-xs text-red-600">{error}</p>
            )}

            <div className="flex items-start gap-2 rounded-xl bg-amber-50 px-3 py-2.5 text-xs text-amber-900">
              <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-amber-500" />
              <span>
                {channel === "student"
                  ? "医学生通道：登录后可使用算力币调用 SKILL，数据默认本地脱敏。"
                  : "贡献者通道：登录后可封装 GitHub 工具并获得调用分成。"}
              </span>
            </div>

            <button
              type="submit"
              className="w-full rounded-xl bg-med-purple py-3 text-sm font-semibold text-white transition hover:bg-med-purple-dark"
            >
              登录并进入广场
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
