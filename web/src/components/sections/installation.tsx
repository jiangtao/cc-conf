'use client'

import { Check } from "lucide-react"

const installSteps = [
  {
    platform: "macOS (Apple Silicon)",
    command: "curl -L https://github.com/jiangtao/ccconfig/releases/latest/download/ccconfig-darwin-arm64 -o ccconfig && chmod +x ccconfig && sudo mv ccconfig /usr/local/bin/",
  },
  {
    platform: "macOS (Intel)",
    command: "curl -L https://github.com/jiangtao/ccconfig/releases/latest/download/ccconfig-darwin-amd64 -o ccconfig && chmod +x ccconfig && sudo mv ccconfig /usr/local/bin/",
  },
  {
    platform: "Linux",
    command: "curl -L https://github.com/jiangtao/ccconfig/releases/latest/download/ccconfig-linux-amd64 -o ccconfig && chmod +x ccconfig && sudo mv ccconfig /usr/local/bin/",
  },
]

export function Installation() {
  return (
    <section id="installation" className="py-24">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-slate-900">
            Installation
          </h2>
          <p className="text-lg text-slate-600">
            Single binary, no dependencies. Pick your platform:
          </p>
        </div>
        <div className="mx-auto max-w-3xl space-y-6">
          {installSteps.map((step) => (
            <div
              key={step.platform}
              className="rounded-lg border bg-slate-50 p-6"
            >
              <div className="mb-3 flex items-center justify-between">
                <h3 className="font-semibold text-slate-900">{step.platform}</h3>
                <button
                  onClick={() => navigator.clipboard.writeText(step.command)}
                  className="rounded px-3 py-1 text-sm text-slate-600 hover:bg-slate-200"
                >
                  Copy
                </button>
              </div>
              <code className="block break-all rounded bg-slate-900 p-4 text-sm text-green-400">
                {step.command}
              </code>
            </div>
          ))}
          <div className="rounded-lg border-2 border-dashed border-slate-300 p-6 text-center">
            <p className="text-slate-600">
              Or build from source:{" "}
              <code className="rounded bg-slate-100 px-2 py-1">
                git clone https://github.com/jiangtao/ccconfig.git && cd ccconfig && make build && sudo make install
              </code>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
