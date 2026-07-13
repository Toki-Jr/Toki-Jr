import { Briefcase, Trophy, Medal, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

const experiences = [
  {
    type: "hackathon",
    title: "Compétition Hackathon",
    company: "Youth Computing Andriainjato",
    date: "Mai 2026",
    missions: [
      "Conception d'une application mobile de signalement citoyen avec photo et localisation.",
      "Calcul automatique du score de priorité et affectation à l'organisme compétent.",
      "Gestion des tâches par les organismes : acceptation, refus, intervention terrain.",
      "Notification du citoyen et clôture du signalement avec données analytiques.",
    ],
    techs: ["React JS", "Tailwind CSS", "Shadcn", "Nest JS", "Flutter", "PostgreSQL"],
    rank: "3ème place",
    link: "https://e-saha-frontend.vercel.app/",
  },
  {
    type: "stage",
    title: "Stagiaire Développeur Web Fullstack",
    company: "FMA Laura Vicuna Anjarasoa Ankofafa Fianarantsoa",
    date: "Septembre 2025 – Décembre 2025",
    missions: [
      "Conception et réalisation d'une application web pour la gestion d'inscription.",
      "Développement d'une interface élegante, attractive et moderne.",
      "Intégration et consommation de l'API pour acceder aux données de la base de données.",
      "Mise en place de la base de données PostgreSQL mieux securisé.",
    ],
    techs: ["React JS", "Tailwind CSS", "Laravel", "PostgreSQL"],
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const missionVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: (i) => ({
    opacity: 1,
    x: 0,
    transition: { delay: i * 0.07, duration: 0.3, ease: "easeOut" },
  }),
};

function ExperienceCard({ exp }) {
  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ y: -4, transition: { duration: 0.2, ease: "easeOut" } }}
      className="group flex flex-col gap-4 p-6 rounded-xl border border-green-600"
    >
      {/* Top row */}
      <div className="flex justify-between items-start flex-wrap gap-2">
        <span className="inline-flex items-center gap-2 text-green-600 font-medium text-2xl">
          {exp.type === "hackathon" ? (
            <>
              <motion.span
                whileHover={{ rotate: 10, scale: 1.15 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="inline-flex"
              >
                <Trophy size={18} color="#6CCF4A" />
              </motion.span>
              Hackathon
            </>
          ) : (
            <>
              <motion.span
                whileHover={{ scale: 1.15 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="inline-flex"
              >
                <Briefcase size={18} color="#6CCF4A" />
              </motion.span>
              Stage
            </>
          )}
        </span>
        <span className="text-[11px] text-muted-foreground">{exp.date}</span>
      </div>

      {/* Title */}
      <div>
        <h3 className="text-sm font-medium">{exp.title}</h3>
        <p className="text-xs text-muted-foreground mt-0.5">{exp.company}</p>
      </div>

      <hr className="border-border" />

      {/* Missions */}
      <ul className="flex flex-col gap-2">
        {exp.missions.map((mission, j) => (
          <motion.li
            key={j}
            custom={j}
            variants={missionVariants}
            className="flex items-start gap-3"
          >
            <div
              className="w-6 h-6 shrink-0 rounded-full border border-green-600/40 flex items-center justify-center
                text-green-600 text-xl mt-0.5
                transition-colors duration-200
                group-hover:border-green-600/70 group-hover:bg-green-600/10"
            >
              ✓
            </div>
            <span className="leading-relaxed text-muted-foreground">{mission}</span>
          </motion.li>
        ))}
      </ul>

      <hr className="border-border" />

      {/* Technologies */}
      <div className="flex flex-wrap gap-1.5 items-center">
        <span className="text-xs text-muted-foreground underline underline-offset-2 mr-1">
          Technologies :
        </span>
        {exp.techs.map((t) => (
          <motion.span
            key={t}
            whileHover={{ scale: 1.07 }}
            transition={{ type: "spring", stiffness: 400 }}
            className="text-[12px] font-bold px-2 py-0.5 rounded-full border border-green-600/40 text-green-600 cursor-default
              transition-colors duration-150 hover:border-green-600/80 hover:bg-green-600/10"
          >
            {t}
          </motion.span>
        ))}
      </div>

      {/* Footer */}
      {(exp.rank || exp.link) && (
        <div className="flex items-center justify-between flex-wrap gap-2 mt-auto">
          {exp.rank && (
            <span className="inline-flex items-center gap-1.5 text-[11px] px-2.5 py-1 rounded-full border border-green-600/40 text-green-600">
              <motion.span
                className="inline-flex"
                whileHover={{ rotate: 15 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Medal size={14} color="#6CCF4A" />
              </motion.span>
              {exp.rank}
            </span>
          )}
          {exp.link && (
            <motion.a
              href={exp.link}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ x: 2 }}
              transition={{ type: "spring", stiffness: 400 }}
              className="inline-flex items-center gap-1.5 text-[11px] px-2.5 py-1 rounded-full border border-green-600/40 text-green-600
                transition-colors duration-150 hover:border-green-600/80 hover:bg-green-600/10"
            >
              Voir le projet
              <ChevronRight size={13} />
            </motion.a>
          )}
        </div>
      )}
    </motion.div>
  );
}

export default function Experience() {
  return (
    <section className="py-16 max-w-7xl mx-auto px-4">
      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-3xl lg:text-4xl font-bold mb-10 text-center"
      >
        Expériences <span className="text-green-600">Professionnelles</span>
      </motion.h2>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {experiences.map((exp, i) => (
          <ExperienceCard key={i} exp={exp} />
        ))}
      </motion.div>
    </section>
  );
}