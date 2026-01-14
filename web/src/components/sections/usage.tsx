export function Usage() {
  const quickStart = [
    {
      title: "1. Create your config repository",
      code: `mkdir -p ~/cc-config
cd ~/cc-config
git init
git remote add origin git@github.com:YOURUSERNAME/cc-config.git`,
    },
    {
      title: "2. Backup your configurations",
      code: `ccconfig backup --repo ~/cc-config`,
    },
    {
      title: "3. Push to GitHub",
      code: `git add .
git commit -m "Initial backup"
git push -u origin main`,
    },
    {
      title: "4. On new computer, restore",
      code: `git clone git@github.com:YOURUSERNAME/cc-config.git ~/cc-config
ccconfig restore --repo ~/cc-config`,
    },
  ]

  const commonCommands = [
    {
      command: "ccconfig backup",
      description: "Backup all configurations",
    },
    {
      command: "ccconfig backup --all-projects",
      description: "Backup with auto-discovery of all projects",
    },
    {
      command: "ccconfig restore",
      description: "Restore configurations from repo",
    },
    {
      command: "ccconfig restore --dry-run",
      description: "Preview changes without applying",
    },
    {
      command: "ccconfig cache backup",
      description: "Backup plugin caches (large files)",
    },
  ]

  return (
    <section className="border-t bg-slate-50 py-24">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-slate-900">Usage</h2>
          <p className="text-lg text-slate-600">
            Get started in under 5 minutes
          </p>
        </div>

        <div className="mb-16">
          <h3 className="mb-8 text-center text-2xl font-semibold text-slate-900">
            Quick Start
          </h3>
          <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-2">
            {quickStart.map((step) => (
              <div
                key={step.title}
                className="rounded-lg border bg-white p-6 shadow-sm"
              >
                <h4 className="mb-3 font-semibold text-slate-900">
                  {step.title}
                </h4>
                <pre className="overflow-x-auto rounded bg-slate-900 p-4 text-sm text-green-400">
                  <code>{step.code}</code>
                </pre>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="mb-8 text-center text-2xl font-semibold text-slate-900">
            Common Commands
          </h3>
          <div className="mx-auto max-w-2xl space-y-3">
            {commonCommands.map((item) => (
              <div
                key={item.command}
                className="flex items-center justify-between rounded-lg border bg-white p-4"
              >
                <code className="text-sm font-mono text-slate-900">
                  {item.command}
                </code>
                <span className="text-sm text-slate-600">
                  {item.description}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
