"use client";

import { useRef, useState } from "react";
import { Upload, FileWarning, Shield } from "lucide-react";
import { UpgradeModal } from "@/components/upgrade-modal";
import { cn } from "@/lib/utils";

interface DemoUploadZoneProps {
  className?: string;
  label?: string;
}

export function DemoUploadZone({
  className,
  label = "上传病历 / 影像 / 化验单（Demo）",
}: DemoUploadZoneProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [fileName, setFileName] = useState<string>();

  function handleFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      setModalOpen(true);
    }
    e.target.value = "";
  }

  return (
    <>
      <div
        className={cn(
          "relative cursor-pointer rounded-xl border-2 border-dashed border-muted-foreground/25 bg-muted/30 p-6 transition-colors hover:border-orange-500/40 hover:bg-orange-500/5",
          className
        )}
        onClick={() => inputRef.current?.click()}
        onKeyDown={(e) => e.key === "Enter" && inputRef.current?.click()}
        role="button"
        tabIndex={0}
      >
        <input
          ref={inputRef}
          type="file"
          className="hidden"
          accept=".pdf,.jpg,.jpeg,.png,.dcm,.hl7,.xml"
          onChange={handleFileSelect}
        />

        <div className="flex flex-col items-center gap-3 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
            <Upload className="h-6 w-6 text-muted-foreground" />
          </div>
          <div>
            <p className="font-medium">{label}</p>
            <p className="mt-1 text-xs text-muted-foreground">
              支持 PDF、DICOM、HL7 等医疗格式
            </p>
          </div>
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <FileWarning className="h-3.5 w-3.5 text-orange-500" />
              开源版：真实数据已禁用
            </span>
            <span className="flex items-center gap-1">
              <Shield className="h-3.5 w-3.5 text-emerald-500" />
              Pro：加密存储
            </span>
          </div>
        </div>

        {/* Watermark overlay hint */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden rounded-xl opacity-[0.04]">
          <span className="rotate-[-20deg] text-6xl font-black uppercase tracking-widest">
            DEMO ONLY
          </span>
        </div>
      </div>

      <UpgradeModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        fileName={fileName}
      />
    </>
  );
}
