'use client'

import { useState } from "react"

const oneClickInstall = "curl -fsSL https://get.ccconfig.dev | bash"

const installSteps = [
  {
    platform: "macOS (Apple Silicon)",
    command: "curl -L https://github.com/jiangtao/cc-config/releases/latest/download/ccconfig-darwin-arm64 -o ccconfig && chmod +x ccconfig && sudo mv ccconfig /usr/local/bin/",
  },
  {
    platform: "macOS (Intel)",
    command: "curl -L https://github.com/jiangtao/cc-config/releases/latest/download/ccconfig-darwin-amd64 -o ccconfig && chmod +x ccconfig && sudo mv ccconfig /usr/local/bin/",
  },
  {
    platform: "Linux",
    command: "curl -L https://github.com/jiangtao/cc-config/releases/latest/download/ccconfig-linux-amd64 -o ccconfig && chmod +x ccconfig && sudo mv ccconfig /usr/local/bin/",
  },
]

export function Installation() {
  const [copiedPlatform, setCopiedPlatform] = useState<string | null>(null)

  const handleCopy = async (command: string, platform: string) => {
    await navigator.clipboard.writeText(command)
    setCopiedPlatform(platform)
    setTimeout(() => setCopiedPlatform(null), 2000)
  }

  return (
    <section id="installation" className="py-24">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-slate-900">
            Installation
          </h2>
          <p className="text-lg text-slate-600">
            Single binary, no dependencies. One command to get started:
          </p>
        </div>

        {/* One-Click Install - Highlighted */}
        <div className="mx-auto mb-10 max-w-3xl">
          <div className="rounded-xl border-2 border-blue-500 bg-gradient-to-r from-blue-50 to-indigo-50 p-6 shadow-lg">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="rounded-full bg-blue-500 px-3 py-1 text-xs font-semibold text-white">
                  Recommended
                </span>
                <h3 className="text-lg font-bold text-slate-900">
                  One-Click Install (macOS/Linux)
                </h3>
              </div>
              <button
                type="button"
                onClick={() => handleCopy(oneClickInstall, "oneclick")}
                aria-label="Copy one-click install command"
                className="rounded-lg bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-blue-600 transition-colors"
              >
                {copiedPlatform === "oneclick" ? "✓ Copied!" : "Copy Command"}
              </button>
            </div>
            <code className="block break-all rounded-lg bg-slate-900 p-4 text-sm font-medium text-green-400">
              {oneClickInstall}
            </code>
            <p className="mt-3 text-sm text-slate-600">
              Auto-detects your platform and installs the latest version.
            </p>
          </div>
        </div>

        {/* Manual Install Options */}
        <div className="mx-auto max-w-3xl">
          <p className="mb-6 text-center text-sm text-slate-500 uppercase tracking-wide">
            Or manually download for your platform:
          </p>
          <div className="space-y-4">
            {installSteps.map((step) => (
              <div
                key={step.platform}
                className="rounded-lg border bg-slate-50 p-5"
              >
                <div className="mb-3 flex items-center justify-between">
                  <h3 className="font-semibold text-slate-900">{step.platform}</h3>
                  <button
                    type="button"
                    onClick={() => handleCopy(step.command, step.platform)}
                    aria-label={`Copy installation command for ${step.platform}`}
                    className="rounded px-3 py-1 text-sm text-slate-600 hover:bg-slate-200"
                  >
                    {copiedPlatform === step.platform ? "Copied!" : "Copy"}
                  </button>
                </div>
                <code className="block break-all rounded bg-slate-800 p-3 text-xs text-green-400">
                  {step.command}
                </code>
              </div>
            ))}
          </div>

          <div className="mt-6 rounded-lg border-2 border-dashed border-slate-300 p-5 text-center">
            <p className="text-slate-600">
              Or build from source:{" "}
              <code className="rounded bg-slate-100 px-2 py-1 text-sm">
                git clone https://github.com/jiangtao/cc-config.git && cd ccconfig && make build && sudo make install
              </code>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
