import { Mail } from "lucide-react"
import { FaGithub, FaLinkedin} from "react-icons/fa"

const socialLinks = [
  { icon: FaGithub, href: "https://github.com/Toki-Jr", label: "GitHub" },
  { icon: FaLinkedin, href: "https://www.linkedin.com/in/tokinirina-jean-robert-randrianandrasana-b9aa01379/", label: "LinkedIn" },
  { icon: Mail, href: "mailto:roberttokinirina@example.com", label: "Email" },
]

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-5xl px-4 py-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
        <p className="text-sm text-muted-foreground">
          © {year} Toky Jr. Tous droits réservés.
        </p>

        <div className="flex items-center gap-4">
          {socialLinks.map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Icon className="size-5" />
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}