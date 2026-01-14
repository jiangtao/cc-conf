import { Button } from "@/components/ui/button"
import { Download, Github } from "lucide-react"

export function Hero() {
  return (
    <section className="container mx-auto px-4 py-24 text-center">
      <div className="mx-auto max-w-3xl">
        <div className="mb-6 flex justify-center">
          <code className="rounded-lg bg-slate-100 px-4 py-2 text-sm font-mono">
            ccconfig
          </code>
        </div>
        <h1 className="mb-6 text-5xl font-bold tracking-tight text-slate-900 sm:text-6xl">
          Claude Code Configuration Sync
        </h1>
        <p className="mb-8 text-xl text-slate-600">
          Backup and restore your Claude Code settings, commands, skills, and
          project configs across all your machines with a single command.
        </p>
        <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
          <Button size="lg" asChild>
            <a href="#installation">
              <Download className="mr-2 h-4 w-4" />
              Get Started
            </a>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <a
              href="https://github.com/jiangtao/cc-config"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="mr-2 h-4 w-4" />
              GitHub
            </a>
          </Button>
        </div>
      </div>
    </section>
  )
}
