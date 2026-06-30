"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Bot, User, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DemoUploadZone } from "@/components/demo-upload-zone";
import { Badge } from "@/components/ui/badge";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface AgentPlaygroundProps {
  agentName: string;
  agentSlug: string;
}

export function AgentPlayground({ agentName, agentSlug }: AgentPlaygroundProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: `你好！我是 ${agentName}。你可以问我关于项目进度、风险预警或会议纪要的问题，立即体验智能体能力。`,
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [messages]);

  async function handleSend() {
    if (!input.trim() || loading) return;

    const userMessage = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setLoading(true);

    try {
      const res = await fetch("/api/agent-demo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage, slug: agentSlug }),
      });
      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.reply },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "抱歉，演示服务暂时不可用。请联系 sales@mland.io 获取完整体验。",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card className="overflow-hidden border-primary/20">
      <CardHeader className="border-b bg-primary/5 py-4">
        <div className="flex items-center justify-between gap-2">
          <CardTitle className="flex items-center gap-2 text-base">
            <Bot className="h-5 w-5 text-primary" />
            Agent Playground — 在线试玩
          </CardTitle>
          <Badge variant="outline" className="border-orange-500/30 text-[10px] text-orange-600">
            仅模拟数据
          </Badge>
        </div>
        <p className="text-xs text-muted-foreground">
          无需登录，立即体验 {agentName} 的对话能力（开源沙盒 · CPU 推理）
        </p>
      </CardHeader>
      <CardContent className="p-0">
        <div
          ref={scrollRef}
          className="flex max-h-80 flex-col gap-3 overflow-y-auto p-4"
        >
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex gap-2 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
            >
              <div
                className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${
                  msg.role === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted"
                }`}
              >
                {msg.role === "user" ? (
                  <User className="h-4 w-4" />
                ) : (
                  <Bot className="h-4 w-4" />
                )}
              </div>
              <div
                className={`max-w-[80%] rounded-lg px-3 py-2 text-sm ${
                  msg.role === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted"
                }`}
              >
                {msg.content}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Loader2 className="h-4 w-4 animate-spin" />
              智能体思考中...
            </div>
          )}
        </div>
        <div className="flex gap-2 border-t p-3">
          <Input
            placeholder="试试：当前项目进度如何？有哪些风险？"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            disabled={loading}
          />
          <Button size="icon" onClick={handleSend} disabled={loading || !input.trim()}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
        <div className="border-t p-3">
          <DemoUploadZone label="上传病历/影像测试 Pro 拦截" className="p-4" />
        </div>
      </CardContent>
    </Card>
  );
}
