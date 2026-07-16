
export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-border bg-background">
        <p className="text-sm text-muted-foreground text-center">
          © {year} Toky Jr. Tous droits réservés.
        </p>
    </footer>
  )
}