import { ChevronRight } from "lucide-react";
import { Button } from "../ui/button";
import { TypeAnimation } from "react-type-animation";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next"; 

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.55, ease: "easeOut", delay },
});

const fadeIn = (delay = 0) => ({
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.6, ease: "easeOut", delay },
});

export default function Profil() {
  const {t} = useTranslation();
  return (
    <section id="accueil" className="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden bg-background text-foreground transition-colors duration-300">

      {/* Fond décoratif grille */}
      <div className="absolute inset-0 opacity-[0.08] dark:opacity-[0.03] pointer-events-none"
        style={{ backgroundImage: `linear-gradient(#6CCF4A 1px, transparent 1px), linear-gradient(90deg, #6CCF4A 1px, transparent 1px)`, backgroundSize: "40px 40px",}}
      />

      {/* Glow ambient */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-green-600/20 dark:bg-green-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* ── Section Texte ── */}
          <div className="space-y-6">

            {/* Badge "disponible" */}
            <motion.div {...fadeUp(0)} className="inline-flex items-center gap-2 px-3 py-1 bg-green-600/10 border border-green-600/20 rounded-full text-xs font-semibold uppercase tracking-wider text-green-600">
              <div className="w-1.5 h-1.5 rounded-full bg-green-600 animate-pulse" />
              {t("hero.badge")}
            </motion.div>

            {/* Titre */}
            <motion.h1 {...fadeUp(0.1)} className="text-5xl font-extrabold leading-[1.1]">
             {t("hero.greeting")} <br />
              <span className="text-green-600 text-6xl">
                RANDRIANANDRASANA Tokinirina Jean Robert
              </span>
            </motion.h1>

            {/* Type animation + description */}
            <motion.div {...fadeUp(0.2)} className="space-y-4">
              <TypeAnimation
                sequence={[
                  t("hero.typewriter.0"), 2000, "",500,
                  t("hero.typewriter.1"), 2000, "", 500,
                ]} wrapper="p" speed={50} repeat={Infinity}
                className="text-5xl font-bold text-muted-foreground"
              />
              <p className="text-lg text-muted-foreground max-w-lg leading-relaxed">
                {t("hero.description")}
              </p>
            </motion.div>

            <motion.div {...fadeUp(0.3)} className="flex gap-4 pt-4">
              <Button 
                onClick={() => {
                  const el = document.getElementById("competences");
                  if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 72, behavior: "smooth" });
                }} className="bg-green-600 hover:bg-green-600 font-bold px-8 py-6 rounded-xl text-lg shadow-lg shadow-green-600/20">
                {t("hero.cta_more")}
              </Button>
              <Button variant="outline"
                onClick={() => {
                  const el = document.getElementById("contact");
                  if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 72, behavior: "smooth" });
                }} className="px-8 py-6 rounded-xl text-lg hover:border-green-600 transition-colors">
                {t("hero.cta_contact")} <ChevronRight className="ml-2 w-5 h-5" />
              </Button>
            </motion.div>
          </div>

          {/* ── Section Photo ── */}
          <motion.div
              {...fadeIn(0.25)}
              className="relative flex justify-center lg:justify-end"
            >
              <motion.div
                onMouseMove={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const x = (e.clientX - rect.left - rect.width / 2) / 8;
                  const y = (e.clientY - rect.top - rect.height / 2) / 8;
                  e.currentTarget.style.setProperty("--rx", `${-y}deg`);
                  e.currentTarget.style.setProperty("--ry", `${x}deg`);
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.setProperty("--rx", "0deg");
                  e.currentTarget.style.setProperty("--ry", "0deg");
                }}
                style={{
                  transformStyle: "preserve-3d",
                  transform: "perspective(800px) rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg))",
                }}
                whileHover={{ scale: 1.03 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
                className="relative group transition-transform duration-200 ease-out"
              >
                <motion.div
                  className="absolute inset-0 rounded-full bg-green-500/30 blur-3xl pointer-events-none"
                  animate={{ scale: [1, 1.25, 1], opacity: [0.25, 0.5, 0.25] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                />

                {/* Halo moyen - respiration plus rapide, décalée */}
                <motion.div
                  className="absolute inset-0 rounded-full bg-green-400/25 blur-2xl pointer-events-none"
                  animate={{ scale: [1.1, 1, 1.1], opacity: [0.3, 0.6, 0.3] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                />

                {/* Anneau net qui pulse */}
                <motion.div
                  className="absolute inset-0 rounded-full border-2 border-green-500/70 pointer-events-none"
                  animate={{ scale: [1, 1.12, 1], opacity: [0.9, 0.2, 0.9] }}
                  transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
                />

                {/* Second anneau décalé */}
                <motion.div
                  className="absolute inset-0 rounded-full border border-green-400/50 pointer-events-none"
                  animate={{ scale: [1, 1.2, 1], opacity: [0.6, 0, 0.6] }}
                  transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut", delay: 1.3 }}
                />

                {/* Photo avec ombre élargie teintée green-600, qui respire aussi */}
                <motion.img src="/tokijr.jpeg" alt="Tokinirina Jean Robert" whileHover={{ scale: 1.05 }}
                  animate={{
                    boxShadow: [
                      "0 0 40px 8px rgba(22,163,74,0.35)",
                      "0 0 70px 18px rgba(22,163,74,0.55)",
                      "0 0 40px 8px rgba(22,163,74,0.35)",
                    ],
                  }}
                  transition={{
                    scale: { type: "spring", stiffness: 250, damping: 20 },
                    boxShadow: { duration: 3.5, repeat: Infinity, ease: "easeInOut" },
                  }}
                  className="relative z-10 w-48 h-48 md:w-64 md:h-64 object-cover rounded-full border-4 border-green-600/80 shadow-2xl shadow-green-600/40"
                />
              </motion.div>
            </motion.div>

        </div>
      </div>
    </section>
  );
}