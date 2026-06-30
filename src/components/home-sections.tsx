"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Bot,
  Smartphone,
  AppWindow,
  LayoutDashboard,
  ChevronRight,
  Folder,
  FolderOpen,
  FileCode,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { AssetType } from "@/lib/data";

const assetTypes: {
  id: AssetType | "admin";
  label: string;
  icon: React.ElementType;
  color: string;
}[] = [
  { id: "agent", label: "AI 智能体", icon: Bot, color: "text-emerald-500" },
  { id: "miniapp", label: "微信小程序", icon: Smartphone, color: "text-blue-500" },
  { id: "app", label: "移动 APP", icon: AppWindow, color: "text-purple-500" },
  { id: "admin", label: "后台系统", icon: LayoutDashboard, color: "text-orange-500" },
];

interface AssetTypeNavProps {
  active: AssetType | "admin";
  onChange: (type: AssetType | "admin") => void;
}

export function AssetTypeNav({ active, onChange }: AssetTypeNavProps) {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
      {assetTypes.map((type) => {
        const Icon = type.icon;
        const isActive = active === type.id;
        return (
          <motion.button
            key={type.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onChange(type.id)}
            className={cn(
              "flex flex-col items-center gap-3 rounded-xl border p-6 transition-all",
              isActive
                ? "border-primary bg-primary/5 shadow-md shadow-primary/10"
                : "border-border bg-card hover:border-primary/30"
            )}
          >
            <Icon className={cn("h-8 w-8", type.color)} />
            <span className={cn("text-sm font-medium", isActive && "text-primary")}>
              {type.label}
            </span>
          </motion.button>
        );
      })}
    </div>
  );
}

interface TreeNode {
  name: string;
  type: "folder" | "file";
  children?: TreeNode[];
}

const fileTree: TreeNode[] = [
  {
    name: "Mland",
    type: "folder",
    children: [
      {
        name: "packages",
        type: "folder",
        children: [
          {
            name: "mland-agent",
            type: "folder",
            children: [
              { name: "orchestrator/", type: "folder" },
              { name: "tools/", type: "folder" },
              { name: "memory/", type: "folder" },
            ],
          },
          { name: "mland-core/", type: "folder" },
          { name: "mland-deploy/", type: "folder" },
        ],
      },
      {
        name: "templates",
        type: "folder",
        children: [
          { name: "medical-translation/", type: "folder" },
          { name: "pmp-agent/", type: "folder" },
        ],
      },
      { name: "mcp-server/", type: "folder" },
      { name: "docker-compose.yml", type: "file" },
    ],
  },
];

function TreeItem({ node, depth = 0 }: { node: TreeNode; depth?: number }) {
  const [open, setOpen] = useState(depth < 2);
  const isFolder = node.type === "folder";
  const hasChildren = node.children && node.children.length > 0;

  return (
    <div>
      <button
        type="button"
        onClick={() => isFolder && setOpen(!open)}
        className={cn(
          "flex w-full items-center gap-1.5 rounded px-2 py-1 text-left text-sm hover:bg-muted/80",
          isFolder && "cursor-pointer"
        )}
        style={{ paddingLeft: `${depth * 16 + 8}px` }}
      >
        {isFolder ? (
          open ? (
            <FolderOpen className="h-4 w-4 shrink-0 text-primary" />
          ) : (
            <Folder className="h-4 w-4 shrink-0 text-primary" />
          )
        ) : (
          <FileCode className="h-4 w-4 shrink-0 text-muted-foreground" />
        )}
        <span className="font-mono text-xs">{node.name}</span>
        {hasChildren && (
          <ChevronRight
            className={cn(
              "ml-auto h-3 w-3 text-muted-foreground transition-transform",
              open && "rotate-90"
            )}
          />
        )}
      </button>
      {open && hasChildren && (
        <div>
          {node.children!.map((child) => (
            <TreeItem key={child.name} node={child} depth={depth + 1} />
          ))}
        </div>
      )}
    </div>
  );
}

export function MlandFactory() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-10 text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight">Mland 工厂</h2>
          <p className="mt-3 text-muted-foreground">
            成熟的开源工程化基座 — 不只是理念，而是可部署的生产级代码
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mx-auto max-w-lg overflow-hidden rounded-xl border bg-card shadow-xl"
        >
          <div className="flex items-center gap-2 border-b bg-muted/50 px-4 py-3">
            <div className="h-3 w-3 rounded-full bg-red-500" />
            <div className="h-3 w-3 rounded-full bg-yellow-500" />
            <div className="h-3 w-3 rounded-full bg-green-500" />
            <span className="ml-2 font-mono text-xs text-muted-foreground">
              Mland — Explorer
            </span>
          </div>
          <div className="max-h-80 overflow-y-auto p-2">
            {fileTree.map((node) => (
              <TreeItem key={node.name} node={node} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export { assetTypes };
