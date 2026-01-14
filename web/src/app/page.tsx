import { Hero } from "@/components/sections/hero"
import { Features } from "@/components/sections/features"
import { Installation } from "@/components/sections/installation"
import { Usage } from "@/components/sections/usage"
import { Footer } from "@/components/sections/footer"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <Features />
      <Installation />
      <Usage />
      <Footer />
    </main>
  )
}
