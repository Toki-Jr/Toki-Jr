import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef } from "react";
import { PiGraduationCap, PiCheckCircleFill, PiClockCountdownFill } from "react-icons/pi";
import { X } from "lucide-react";
import { useState } from "react";

const FORMATIONS = [
   {
    icon: PiGraduationCap,
    color: "#16A34A",
    title: "Troisième Année de Licence Professionnelle en Informatique",
    school: "École Nationale d'Informatique, Université de Fianarantsoa",
    year: "2025-2026",
    status: "En cours",
  },
  {
    icon: PiGraduationCap,
    color: "#16A34A",
    title: "Deuxième Année de Licence Professionnelle en Informatique",
    school: "École Nationale d'Informatique, Université de Fianarantsoa",
    year: "2024-2025",
    status: "validé",
  },
  {
    icon: PiGraduationCap,
    color: "#16A34A",
    title: "Première Année de Licence Professionnelle en Informatique",
    school: "École Nationale d'Informatique, Université de Fianarantsoa",
    year: "2023-2024",
    status: "validé",
  },
];

const CERTIFICATIONS = [
  {
    icon: PiGraduationCap,
    color: "#16A34A",
    title: "Du réseau classique aux infrastructures automatisées programmables et ultra sécurisées",
    school: "Orange Digital Center (ODC), Andrainjato de Fianarantsoa",
    year: "16 au 19 Juin 2026",
    status: "Terminé",
    certificateUrl: "/certificates/Formation1.pdf"
  },
   {
    icon: PiGraduationCap,
    color: "#16A34A",
    title: "Découverte du DEVOPS et Déploiement automatique des applications",
    school: "Orange Digital Center (ODC), Andrainjato de Fianarantsoa",
    year: "03 au 06 Mars 2026",
    status: "Terminé",
    certificateUrl: "/certificates/Formation2.pdf"
  },
  {
    icon: PiGraduationCap,
    color: "#16A34A",
    title: "Sécurisez votre système et vos données",
    school: "Orange Digital Center (ODC), Andrainjato de Fianarantsoa",
    year: "06 au 09 Mai 2025",
    status: "Terminé",
    certificateUrl: "/certificates/Formation3.pdf"
  },
];

export default function Formation() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [selectedCert, setSelectedCert] = useState(null);

  return (
    <section
      ref={ref}
      className="py-20 px-4 text-center"
      aria-label="Formation académique"
    >
      {/* Heading */}
      <motion.p
        className="text-[11px] font-medium tracking-[0.14em] uppercase text-green-600 mb-1"
        initial={{ opacity: 0, y: 12 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.45 }}
      >
        Parcours académique
      </motion.p>
      <motion.h2
        className="text-3xl lg:text-4xl font-bold mb-12"
        initial={{ opacity: 0, y: 16 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.45, delay: 0.07 }}
      >
        Certifications <span className="text-green-600"> & Formations</span>
      </motion.h2>

      <div className="flex flex-col gap-4 max-w-4xl mx-auto">
        <div className="flex gap-2">
          <PiGraduationCap size={40} className="text-green-600" />
          <h2 className="text-green-600 text-start text-2xl font-bold">Formations </h2>
        </div>
        {FORMATIONS.map((f, i) => {
          const Icon = f.icon;
          const isEnCours = f.status === "En cours";
          const StatusIcon = isEnCours ? PiClockCountdownFill : PiCheckCircleFill;

          return (
            <motion.div
              key={f.title}
              className="rounded-2xl border px-5 py-5"
              style={{ borderColor: f.color + "55" }}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.15 + i * 0.12, ease: "easeOut" }}
            >
              <div className="flex items-start gap-4">
                {/* Icône */}
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: f.color + "22", border: `1.5px solid ${f.color}` }}
                >
                  <Icon size={22} className="text-green-600" />
                </div>

                {/* Contenu */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-3">
                    <p className="text-base font-semibold leading-snug">
                      {f.title}
                    </p>
                    <span className="text-xs whitespace-nowrap pt-0.5 opacity-70">
                      {f.year}
                    </span>
                  </div>

                  <p className="text-sm text-start mt-1 opacity-70">{f.school}</p>

                  <span
                    className="inline-flex items-center gap-1 mt-3 px-2.5 py-1 rounded-full text-[11px] font-medium"
                    style={{ background: f.color + "1A", color: f.color }}
                  >
                    <StatusIcon size={12} />
                    {f.status}
                  </span> 
                </div>
              </div>
            </motion.div>
          );
        })}

        <div className="flex gap-2">
          <PiGraduationCap size={40} className="text-green-600" />
          <h2 className="text-green-600 text-start text-2xl font-bold">Certifications </h2>
        </div>
        {CERTIFICATIONS.map((f, i) => {
          const Icon = f.icon;
          const isEnCours = f.status === "En cours";
          const StatusIcon = isEnCours ? PiClockCountdownFill : PiCheckCircleFill;

          return (
            <motion.div
              key={f.title}
              className="rounded-2xl border px-5 py-5"
              style={{ borderColor: f.color + "55" }}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.15 + i * 0.12, ease: "easeOut" }}
            >
              <div className="flex items-start gap-4">
                {/* Icône */}
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: f.color + "22", border: `1.5px solid ${f.color}` }}
                >
                  <Icon size={22} className="text-green-600" />
                </div>

                {/* Contenu */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-3">
                    <p className="text-base font-semibold leading-snug">
                      {f.title}
                    </p>
                    <span className="text-xs whitespace-nowrap pt-0.5 opacity-70">
                      {f.year}
                    </span>
                  </div>

                  <p className="text-sm text-start mt-1 opacity-70">{f.school}</p>

                  <span
                    className="inline-flex items-center gap-1 mt-3 px-2.5 py-1 rounded-full text-[11px] font-medium"
                    style={{ background: f.color + "1A", color: f.color }}
                  >
                    <StatusIcon size={12} />
                    {f.status}
                  </span>

                  <button
                    onClick={() => setSelectedCert(f)}
                    className="ml-2 mt-3 text-2xs font-medium underline underline-offset-3 text-green-600"
                  >
                    Voir le certificat
                  </button>
                </div>
              </div>

              <AnimatePresence>
                {selectedCert && (
                  <motion.div
                    className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setSelectedCert(null)}
                  >
                    <motion.div
                      className="bg-white rounded-2xl max-w-2xl w-full max-h-[85vh] overflow-auto relative p-4"
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.9, opacity: 0 }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <button
                        onClick={() => setSelectedCert(null)}
                        className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200"
                      >
                        <X size={18} />
                      </button>

                      <h3 className="text-lg font-semibold mb-3">{selectedCert.title}</h3>

                      {selectedCert.certificateUrl?.endsWith(".pdf") ? (
                        <iframe
                          src={selectedCert.certificateUrl}
                          className="w-full h-[70vh] rounded-lg"
                          title="Certificat"
                        />
                      ) : (
                        <img
                          src={selectedCert.certificateUrl}
                          alt={`Certificat ${selectedCert.title}`}
                          className="w-full rounded-lg object-contain"
                        />
                      )}
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}