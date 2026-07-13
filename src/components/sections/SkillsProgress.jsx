// SkillsProgress.jsx
import { color, motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  SiNodedotjs, SiLaravel, SiPhp, SiPython,
  SiReact, SiJavascript, SiTailwindcss,
  SiPostgresql, SiMysql,
  SiDocker, SiGithub, SiGithubactions,SiShadcnui, SiApache, SiNginx
} from "react-icons/si";
import { FaJava, FaLinux, FaWindows } from 'react-icons/fa'
import { VscCircuitBoard } from "react-icons/vsc";
import { MdBugReport } from "react-icons/md";


const CATEGORIES = [
  {
    label: "Frameworks",
    color: "#6CCF4A",
    skills: [
      { name: "Node.js",     icon: SiNodedotjs,   color: "#6CCF4A",  level: 80 },
      { name: "Laravel",     icon: SiLaravel,      color: "#EF9F27", level: 80 },
      { name: "Jakarta EE",  icon: VscCircuitBoard,color: "#D85A30", level: 75 },
      { name: "React.js",    icon: SiReact,        color: "#378ADD", level: 90 },
      { name: "shadcn/ui", icon: SiShadcnui, color: "#7F77DD", level: 65 },
      { name: "Tailwind CSS",icon: SiTailwindcss,  color: "#06B6D4", level: 90 },
    ],
  },
  {
    label: "Langage de programmation",
    color: "#378ADD",
    skills: [
      { name: "JavaScript",  icon: SiJavascript,   color: "#EF9F27", level: 65 },
      { name: "PHP",         icon: SiPhp,          color: "#EF9F27", level: 60 },
      { name: "Java",        icon: FaJava,         color: "#D85A30", level: 70 },
      { name: "Python",      icon: SiPython,       color: "#6CCF4A", level: 50 },
    ]
  },
  {
    label: "Base de données, Serveur et Système d'exploitation",
    color: "#336791",
    skills: [
      { name: "PostgreSQL",  icon: SiPostgresql,   color: "#336791", level: 95 },
      { name: "MySQL",       icon: SiMysql,        color: "#EF9F27", level: 95 },
      { name: "Apache", icon: SiApache,        color: "#D85A30", level: 80 },
      { name: "Nginx",  icon: SiNginx,        color: "#6CCF4A", level: 80 },
      { name: "Linux",          icon: FaLinux,        color: "#FCC624", level: 90 },
      { name: "Windows",        icon: FaWindows,        color: "#0078D4", level: 90 },
    ],
  },
  {
    label: "Outils DevOps et Autres",
    color: "#7F77DD",
    skills: [
      { name: "Docker",      icon: SiDocker,       color: "#378ADD", level: 70 },
      { name: "Git / GitHub",icon: SiGithub,       color: "#7F77DD", level: 85 },
      { name: "SonarQube",   icon: MdBugReport,    color: "#1D9E75", level: 50 },
      { name: "GH Actions",  icon: SiGithubactions,color: "#1D9E75", level: 65 },
      { name: "CI/CD",       icon: SiGithubactions,color: "#7F77DD", level: 65 },
    ],
  },
];

function SkillBar({ skill, inView, index }) {
  return (
    <motion.div
      className="flex items-center gap-3 mb-2.5"
      initial={{ opacity: 0, x: -16 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.4, delay: 0.1 + index * 0.05, ease: "easeOut" }}
    >
      <div
        className="w-7 h-7 rounded-md flex items-center justify-center flex-shrink-0"
        style={{ background: skill.color + "18" }}
      >
        <skill.icon size={15} style={{ color: skill.color }} />
      </div>
      <span className="w-24 flex-shrink-0 truncate">
        {skill.name}
      </span>
      <div className="flex-1 h-1.5 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ background: skill.color }}
          initial={{ width: 0 }}
          animate={inView ? { width: `${skill.level}%` } : { width: 0 }}
          transition={{ duration: 0.9, delay: 0.2 + index * 0.05, ease: [0.4, 0, 0.2, 1] }}
        />
      </div>
      <span className="w-8 font-medium text-right flex-shrink-0">
        {skill.level}%
      </span>
    </motion.div>
  );
}

export default function SkillsProgress() {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: "-60px" });

    return (
        <div ref={ref} className="grid grid-cols-2 gap-x-8 gap-y-8 mt-12 max-w-6xl mx-auto px-4">
                {CATEGORIES.map((cat, ci) => (
                    <div key={cat.label}>
                    <motion.div
                        className="flex items-center gap-2 mb-4"
                        initial={{ opacity: 0, y: 10 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.4, delay: ci * 0.08 }}
                    >
                        <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: cat.color }} />
                        <span className="font-medium">{cat.label}</span>
                    </motion.div>

                    {cat.skills.map((skill, si) => (
                        <SkillBar key={skill.name} skill={skill} inView={inView} index={ci * 6 + si} />
                    ))}
                    </div>
                ))}
            </div>
    );
}