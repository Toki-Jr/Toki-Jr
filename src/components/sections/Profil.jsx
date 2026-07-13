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
    <section className="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden bg-background text-foreground transition-colors duration-300">

      {/* Fond décoratif grille */}
      <div
        className="absolute inset-0 opacity-[0.08] dark:opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(#6CCF4A 1px, transparent 1px), linear-gradient(90deg, #6CCF4A 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
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
                ]}
                wrapper="p"
                speed={50}
                repeat={Infinity}
                className="text-5xl font-bold text-muted-foreground"
              />
              <p className="text-lg text-muted-foreground max-w-lg leading-relaxed">
                {t("hero.description")}
              </p>
            </motion.div>

            {/* CTA */}
            <motion.div {...fadeUp(0.3)} className="flex gap-4 pt-4">
              <Button className="bg-green-600 hover:bg-green-600 font-bold px-8 py-6 rounded-xl text-lg shadow-lg shadow-green-600/20">
                {t("hero.cta_more")}
              </Button>
              <Button
                variant="outline"
                className="px-8 py-6 rounded-xl text-lg hover:border-green-600 transition-colors"
              >
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
              whileHover={{ y: -8 }}
              transition={{ type: "spring", stiffness: 180, damping: 18 }}
              className="relative p-2 bg-card border border-border rounded-[2rem] shadow-2xl"
            >
              {/* Overlay gradient card */}
              <div className="absolute inset-0 bg-gradient-to-tr from-green-600/20 to-transparent rounded-[2rem] pointer-events-none" />

              <img
                src="/tokijr.jpeg"
                alt="Tokinirina Jean Robert"
                className="w-48 h-48 md:w-64 md:h-64 object-cover rounded-full border-4 border-cyan-500 shadow-xl"
              />

              {/* Badge flottant */}
              <motion.div
                initial={{ opacity: 0, x: -16, y: 16 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ delay: 0.5, duration: 0.45, ease: "easeOut" }}
                className="absolute -bottom-6 -left-6 bg-background p-4 rounded-2xl border border-border shadow-xl"
              >
                <p className="text-xs font-bold text-muted-foreground">{t("hero.badge_student")}</p>
                <p className="text-sm font-semibold">{t("hero.badge_school")}</p>
              </motion.div>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}