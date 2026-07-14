"use client";

import { useEffect, useRef, useState } from "react";
import {
  Shield,
  Code2,
  Coins,
  Plus,
  ChevronDown,
  GraduationCap,
  LogOut,
  UserRound,
  LogIn,
} from "lucide-react";
import type { User, UserRole } from "./types";

interface MedSkillNavbarProps {
  user: User | null;
  balance: number;
  onLoginClick: () => void;
  onLogout: () => void;
  onRoleChange: (role: UserRole) => void;
  onRecharge: () => void;
}

export function MedSkillNavbar({
  user,
  balance,
  onLoginClick,
  onLogout,
  onRoleChange,
  onRecharge,
}: MedSkillNavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-gray-100 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4">
        <div className="flex items-center gap-2.5">
          <div className="relative flex h-9 w-9 items-center justify-center rounded-lg bg-med-purple">
            <Shield className="h-5 w-5 text-amber-400" strokeWidth={2.2} />
            <Code2 className="absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded bg-white p-0.5 text-med-purple" />
          </div>
          <div>
            <p className="text-base font-bold tracking-tight text-med-purple">
              MedSkill 广场
            </p>
            <p className="hidden text-[10px] text-gray-500 sm:block">
              医学生科研 SKILL 开放平台
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 rounded-full border border-gray-200 bg-gray-50 px-3 py-1.5 sm:gap-3 sm:px-4">
          <div className="flex items-center gap-1.5 text-sm">
            <Coins className="h-4 w-4 text-amber-500" />
            <span className="hidden text-gray-600 sm:inline">算力币:</span>
            <span className="font-semibold tabular-nums text-med-purple">
              {balance.toLocaleString()}
            </span>
            <span aria-hidden>🪙</span>
          </div>
          <button
            type="button"
            onClick={onRecharge}
            className="inline-flex items-center gap-1 rounded-full bg-amber-400 px-2.5 py-1 text-xs font-bold text-med-purple transition hover:bg-amber-300"
          >
            <Plus className="h-3.5 w-3.5" />
            充值
          </button>
        </div>

        <div className="relative" ref={menuRef}>
          {user ? (
            <>
              <button
                type="button"
                onClick={() => setMenuOpen((v) => !v)}
                className="flex items-center gap-2 rounded-full border border-gray-200 bg-white py-1 pl-1 pr-2.5 transition hover:border-med-purple/30"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-med-purple text-sm font-semibold text-white">
                  {user.avatarInitials}
                </span>
                <span className="hidden max-w-[100px] truncate text-sm font-medium text-gray-800 md:inline">
                  {user.name}
                </span>
                <span
                  className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                    user.role === "student"
                      ? "bg-indigo-50 text-med-purple"
                      : "bg-amber-100 text-amber-800"
                  }`}
                >
                  {user.role === "student" ? "医学生" : "贡献者"}
                </span>
                <ChevronDown className="h-4 w-4 text-gray-400" />
              </button>

              {menuOpen && (
                <div className="absolute right-0 mt-2 w-56 overflow-hidden rounded-xl border border-gray-100 bg-white py-1 shadow-xl">
                  <p className="border-b border-gray-50 px-3 py-2 text-xs text-gray-500">
                    切换身份视图
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      onRoleChange("student");
                      setMenuOpen(false);
                    }}
                    className="flex w-full items-center gap-2 px-3 py-2.5 text-left text-sm hover:bg-gray-50"
                  >
                    <GraduationCap className="h-4 w-4 text-med-purple" />
                    医学生 / 使用者
                    {user.role === "student" && (
                      <span className="ml-auto text-[10px] text-amber-600">当前</span>
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      onRoleChange("contributor");
                      setMenuOpen(false);
                    }}
                    className="flex w-full items-center gap-2 px-3 py-2.5 text-left text-sm hover:bg-gray-50"
                  >
                    <Code2 className="h-4 w-4 text-amber-600" />
                    技术专家 / 贡献者
                    {user.role === "contributor" && (
                      <span className="ml-auto text-[10px] text-amber-600">当前</span>
                    )}
                  </button>
                  <div className="my-1 border-t border-gray-50" />
                  <button
                    type="button"
                    onClick={() => {
                      setMenuOpen(false);
                      onLogout();
                    }}
                    className="flex w-full items-center gap-2 px-3 py-2.5 text-left text-sm text-red-600 hover:bg-red-50"
                  >
                    <LogOut className="h-4 w-4" />
                    退出登录
                  </button>
                </div>
              )}
            </>
          ) : (
            <button
              type="button"
              onClick={onLoginClick}
              className="inline-flex items-center gap-2 rounded-full bg-med-purple px-4 py-2 text-sm font-semibold text-white transition hover:bg-med-purple-dark"
            >
              <LogIn className="h-4 w-4" />
              <span className="hidden sm:inline">登录</span>
              <UserRound className="h-4 w-4 sm:hidden" />
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
