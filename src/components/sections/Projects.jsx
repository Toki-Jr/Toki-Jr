import { useState, useEffect, useRef, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { ExternalLink, ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { FaGithub } from "react-icons/fa";
const INTERVAL = 5000;
const VISIBLE = 3;

export default function ProjetCarousel({ projects = DEMO_PROJECTS }) {
  const { t } = useTranslation();
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const timerRef = useRef(null);
  const progressRef = useRef(null);
  const startRef = useRef(null);

  const total = projects.length;

  const next = useCallback(() => {
    setCurrent((c) => (c + 1) % total);
    setProgress(0);
    startRef.current = Date.now();
  }, [total]);

  const prev = useCallback(() => {
    setCurrent((c) => (c - 1 + total) % total);
    setProgress(0);
    startRef.current = Date.now();
  }, [total]);

  const goTo = (i) => {
    setCurrent(i);
    setProgress(0);
    startRef.current = Date.now();
  };

  // Auto-play
  useEffect(() => {
    if (paused) return;
    timerRef.current = setInterval(next, INTERVAL);
    return () => clearInterval(timerRef.current);
  }, [paused, next, current]);

  // Progress bar animation
  useEffect(() => {
    if (paused) return;
    startRef.current = Date.now();
    const tick = () => {
      const elapsed = Date.now() - startRef.current;
      setProgress(Math.min((elapsed / INTERVAL) * 100, 100));
      progressRef.current = requestAnimationFrame(tick);
    };
    progressRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(progressRef.current);
  }, [paused, current]);

  // Cartes visibles : current, current+1, current+2
  const visibleIndices = Array.from({ length: VISIBLE }, (_, i) => (current + i) % total);

  return (
    <section id="projets" className="py-20 px-4">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-sm font-medium text-green-600 uppercase tracking-widest mb-2">
              {t("projects.label", "Portfolio")}
            </p>
            <h2 className="text-3xl font-bold text-foreground">
              {t("projects.title", "Mes projets récents")}
            </h2>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setPaused((p) => !p)}
              className="p-2 rounded-lg border border-border text-muted-foreground
                         hover:text-foreground hover:bg-accent transition-all duration-150"
              aria-label={paused ? "Reprendre" : "Pause"}
            >
              {paused ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
            </button>
            <button
              onClick={prev}
              className="p-2 rounded-lg border border-border text-muted-foreground
                         hover:text-foreground hover:bg-accent transition-all duration-150"
              aria-label="Précédent"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={next}
              className="p-2 rounded-lg border border-border text-muted-foreground
                         hover:text-foreground hover:bg-accent transition-all duration-150"
              aria-label="Suivant"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {visibleIndices.map((idx, pos) => {
            const project = projects[idx];
            const isActive = pos === 0;
            return (
              <div
                key={`${idx}-${pos}`}
                className={`group relative rounded-2xl overflow-hidden border transition-all duration-500
                  ${isActive
                    ? "border-green-600/40 ring-1 ring-green-600/20"
                    : "border-border/50"
                  }
                 hover:border-green-600/30`}
                style={{ opacity: isActive ? 1 : 0.75 + pos * 0.05 }}
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Overlay sombre bas */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111] via-transparent to-transparent" />

                  {/* Badge stack tech */}
                  <div className="absolute top-3 left-3 flex gap-1.5 flex-wrap">
                    {project.tags?.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 rounded-md text-[10px] font-semibold uppercase tracking-wide
                                backdrop-blur-sm text-green-600 border border-green-600/20"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Progress bar sur la carte active */}
                  {isActive && !paused && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5">
                      <div
                        className="h-full bg-green-600 transition-none"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className={`text-base font-bold mb-2 transition-colors duration-200
                    ${isActive ? "text-green-600" : "text-foreground group-hover:text-green-600"}`}>
                    {project.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                    {project.description}
                  </p>

                  {/* Links */}
                  <div className="flex items-center gap-3 mt-4 pt-4 border-t border-border/40">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-xs text-muted-foreground
                                   hover:text-green-600 transition-colors duration-150"
                      >
                        <FaGithub className="w-3.5 h-3.5" />
                        Code
                      </a>
                    )}
                    {project.demo && (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-xs text-muted-foreground
                                   hover:text-green-600 transition-colors duration-150"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        Demo
                      </a>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Dots nav */}
        <div className="flex items-center justify-center gap-2 mt-8">
          {projects.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`transition-all duration-300 rounded-full
                ${i === current
                  ? "w-6 h-1.5 bg-green-600"
                  : "w-1.5 h-1.5 bg-border hover:bg-muted-foreground"
                }`}
              aria-label={`Aller au projet ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

// Données de démo — remplace par tes vrais projets
const DEMO_PROJECTS = [
  {
    title: "Gestion de stock Médicament",
    description: "Application web pour faciliter et aider la pharmacie ou groupe pharmaceutique pour gérer les stocks, suivre les commandes et alerter les stocks en cas de rupture",
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600&q=80",
    tags: ["Node.js", "PostgreSQL", "ReactJs"],
    github: "https://github.com/Toki-Jr",
    demo: null,
  },
  {
    title: "Système contrôle d'accès",
    description: "Architecture multi-facteurs (RFID, biométrie, PIN, facial) avec base de données 6 tables et gestion des droits.",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
    tags: ["dotnet", "PostegreSQL", "ReactJs"],
    github: "https://github.com/Toki-Jr",
    demo: null,
  },
  {
    title: "Load Balancer HAProxy",
    description: "Architecture haute disponibilité avec HAProxy + Docker Compose sur VMs VirtualBox, ciblant un backend Node.js/Express.",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&q=80",
    tags: ["Docker", "HAProxy", "Linux"],
    github: "https://github.com/Toki-Jr",
    demo: null,
  },
  {
    title: "Gestion de Questionnaire",
    description: "Système de gestion de questionnaires académiques avec génération dynamique, statistiques et export des résultats.",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&q=80",
    tags: ["JakartaEE", "Java", "PostgreSQL"],
    github: "https://github.com/Toki-Jr",
    demo: null,
  },
];