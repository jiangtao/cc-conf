import { Github } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t bg-slate-900 py-12 text-slate-300">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <p>© 2024 ccconfig. MIT License.</p>
          <div className="flex items-center gap-6">
            <a
              href="https://github.com/jiangtao/cc-config"
              className="flex items-center gap-2 hover:text-white"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="h-5 w-5" />
              GitHub
            </a>
            <a
              href="https://github.com/jiangtao/cc-config/blob/main/README.md"
              className="hover:text-white"
              target="_blank"
              rel="noopener noreferrer"
            >
              Documentation
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
