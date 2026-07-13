import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import ThemeToggle from "@/shared/ThemeToggle";
import { Menu, X, Shield, Languages, User, Code2, Mail } from "lucide-react";
import { createPortal } from "react-dom";

function useSmoothScroll() {
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - 72;
    window.scrollTo({ top, behavior: "smooth" });
  };
  return scrollTo;
}

function AnimatedLogo({ size = "text-base" }) {
  return (
    <div className="flex items-center gap-2.5">
        <div className="w-9 h-9 rounded-[10px] bg-green-600/10 border border-green-600/30 flex items-center justify-center">
            <Shield className="w-4.5 h-4.5 text-green-600" />
        </div>
        <span className={`${size} font-bold text-xl flex`}>
            {["T","o","k","i",".","J","r"].map((char, i) => (
                <span
                    key={i}
                    className="inline-block transition-all duration-200 ease-out
                        hover:scale-125 hover:-translate-y-1.5"
                    style={{
                    ...(i >= 5
                        ? {
                            animation: `colorCycle 3s ease-in-out infinite`,  
                            animationDelay: `${i * 0.2}s`,                    
                        }
                        : {}),
                    transitionDelay: `${i * 20}ms`, 
                    cursor: "default",
                    willChange: "transform",         
                    }}
                >
                    {char === " " ? "\u00A0" : char}
                </span>
            ))}
      </span>
    </div>
  );
}

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("")
  const scrollTo = useSmoothScroll();
  const { t, i18n } = useTranslation();

  const navLinks = [
    { label: t("nav.about"),    id: "profil", icon: User },
    { label: t("nav.projects"), id: "projets", icon: Code2 },
    { label: t("nav.contact"),  id: "contact", icon: Mail },
  ];

    useEffect(() => {
        const handleScroll = () => {
                setScrolled(window.scrollY > 20);
                const sections = navLinks.map(l => document.getElementById(l.id)).filter(Boolean);
            let current = "";
            sections.forEach(section => {
            const top = section.getBoundingClientRect().top;
            if (top <= 120) current = section.id;
            });
            setActiveSection(current);
        };

        window.addEventListener("scroll", handleScroll);

        // ✏️ MODIF — ajout blocage scroll body
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }

        return () => {
            window.removeEventListener("scroll", handleScroll);
            document.body.style.overflow = "";
        };
    }, [isOpen]); 

  const changeLanguage = (e) => i18n.changeLanguage(e.target.value);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300
        ${scrolled
          ? "bg-background/90 backdrop-blur-xl border-b border-border shadow-[0_1px_0_hsl(var(--border))]"
          : "bg-transparent"
        }`}
    >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-20">
            <AnimatedLogo />

            {/* Desktop */}
            <div className="hidden lg:flex items-center gap-1">
                {navLinks.map((link) => (
                    <button
                        key={link.id}
                        onClick={() => scrollTo(link.id)}
                        className={`px-3.5 py-2 text-sm font-medium transition-all duration-200
                            relative
                            after:absolute after:bottom-0 after:left-0 after:h-[2px]
                            after:bg-green-600 after:transition-all after:duration-300 after:ease-out  // ✏️ MODIF ajout ease-out
                            ${activeSection === link.id
                            ? "text-foreground after:w-full"                                          // ✏️ active : underline complet
                            : "text-muted-foreground after:w-0 hover:text-foreground hover:after:w-full"  // ✏️ hover : slide de 0 → full
                        }`}
                    >
                        {link.label}
                    </button>
                ))}

                <div className="w-px h-5 bg-border mx-2" />

                <ThemeToggle />

                 <button
                    onClick={() => i18n.changeLanguage(i18n.language === "fr" ? "en" : "fr")}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border
                                text-sm text-muted-foreground
                                hover:bg-green-600/10 hover:text-green-600 hover:border-green-600/40 
                                active:scale-95                                                          
                                transition-all duration-200"                                             
                    >
                    <Languages className="w-3.5 h-3.5" />
                    {i18n.language.toUpperCase()}
                </button>
            </div>

            {/* Mobile toggle */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="lg:hidden p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
            >
                {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            </div>
        </nav>

      {/* Mobile menu */}
        {/* Mobile menu — hors du header via portal */}
{isOpen && createPortal(
  <>
    <div
      className="fixed inset-0 z-[190]"  // ✏️ MODIF z-[90] → z-[190] hors header
      style={{
        background: "rgba(0,0,0,0.6)",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
      }}
      onClick={() => setIsOpen(false)}
    />
    <div className="fixed top-[76px] left-3 right-3 z-[200]  // ✏️ MODIF z-[100] → z-[200]
                    bg-background
                    border border-border rounded-2xl
                    p-4 shadow-xl
                    animate-in slide-in-from-top-2 duration-200">
      <div className="flex flex-col gap-1">
        {navLinks.map((link) => {
          const Icon = link.icon;
          return (
            <button
              key={link.id}
              onClick={() => { scrollTo(link.id); setIsOpen(false); }}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl
                          text-left transition-all duration-150
                          ${activeSection === link.id
                            ? "bg-green-600/10 text-green-600"
                            : "text-muted-foreground hover:bg-accent hover:text-foreground"
                          }`}
            >
              <Icon className="w-4.5 h-4.5 shrink-0" />
              <span className="font-medium text-base">{link.label}</span>
            </button>
          );
        })}

        <div className="flex items-center justify-between pt-4 mt-2 border-t border-border">
          <ThemeToggle />
          <button
            onClick={() => i18n.changeLanguage(i18n.language === "fr" ? "en" : "fr")}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg
                       border border-border text-sm font-medium text-muted-foreground
                       hover:bg-green-600/10 hover:text-green-600 transition-all duration-150"
          >
            <Languages className="w-3.5 h-3.5" />
            {i18n.language === "fr" ? "FR" : "EN"}
          </button>
        </div>
      </div>
    </div>
  </>,
  document.body  
)}
    </header>
  );
}

export default function NavBarExport() {
  return <Navbar />;
}