import { ReactNode } from "react";

export default function ResumeLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="flex">
        <main className="flex-1">
          {children}
        </main>
      </div>
    </div>
  );
}