import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import {
  SiNodedotjs, SiLaravel, SiReact, SiTailwindcss,
  SiPhp, SiPython, SiJavascript,
  SiDocker, SiGithub, SiGithubactions,
  SiPostgresql, SiMysql,SiApache, SiNginx
} from "react-icons/si";
import { FaJava, FaLinux, FaWindows } from "react-icons/fa";
import { RxComponent1 } from "react-icons/rx";
import { MdOutlineVerified } from "react-icons/md";

// ─── Data ────────────────────────────────────────────────────────────────────

const SKILLS = [
  { name: "Node.js",     icon: SiNodedotjs,    desc: "Node.js",      cat: "Backend",  ring: 0, color: "#6CCF4A" },
  { name: "Laravel",     icon: SiLaravel,      desc: "Laravel",      cat: "Backend",  ring: 0, color: "#EF9F27" },
  { name: "React.js",    icon: SiReact,        desc: "React.js",     cat: "Frontend", ring: 0, color: "#378ADD" },
  { name: "Tailwind",    icon: SiTailwindcss,  desc: "Tailwind CSS", cat: "Frontend", ring: 0, color: "#06B6D4" },
  { name: "shadcn/ui",   icon: RxComponent1,   desc: "shadcn/ui",    cat: "Frontend", ring: 0, color: "#7F77DD" },
  { name: "Jakarta EE",  icon: FaJava,         desc: "Jakarta EE",   cat: "Backend",  ring: 0, color: "#D85A30" },
  { name: "PHP",         icon: SiPhp,          desc: "PHP",          cat: "Backend",  ring: 1, color: "#D85A30" },
  { name: "Python",      icon: SiPython,       desc: "Python",       cat: "Backend",  ring: 1, color: "#6CCF4A" },
  { name: "Java",        icon: FaJava,         desc: "Java",         cat: "Backend",  ring: 1, color: "#EF9F27" },
  { name: "JavaScript",  icon: SiJavascript,   desc: "JavaScript",   cat: "Frontend", ring: 1, color: "#378ADD" },
  { name: "Docker",      icon: SiDocker,       desc: "Docker",       cat: "DevOps",   ring: 2, color: "#378ADD" },
  { name: "Git/GitHub",  icon: SiGithub,       desc: "Git / GitHub", cat: "DevOps",   ring: 2, color: "#7F77DD" },
  { name: "SonarQube",   icon: MdOutlineVerified, desc: "SonarQube", cat: "Qualité",  ring: 2, color: "#1D9E75" },
  { name: "CI/CD",       icon: SiGithubactions,desc: "CI/CD",        cat: "DevOps",   ring: 2, color: "#1D9E75" },
  { name: "GH Actions",  icon: SiGithubactions,desc: "GH Actions",   cat: "DevOps",   ring: 2, color: "#7F77DD" },
  { name: "PostgreSQL",  icon: SiPostgresql,   desc: "PostgreSQL",   cat: "SGBD",     ring: 3, color: "#336791" },
  { name: "MySQL",       icon: SiMysql,        desc: "MySQL",        cat: "SGBD",     ring: 3, color: "#EF9F27" },
  { name: "Linux",       icon: FaLinux,        desc: "Linux",        cat: "OS",       ring: 3, color: "#FCC624" },
  { name: "Windows 10/11", icon: FaWindows,     desc: "Windows",     cat: "OS",      ring: 3, color: "#0078D4" },
  { name: "Apache",      icon: SiApache,         desc: "Apache",      cat: "Serveur Web",     ring: 3, color: "#D85A30" },
  { name: "Nginx",       icon: SiNginx,         desc: "Nginx",        cat: "Serveur Web",     ring: 3, color: "#6CCF4A" },
];

const RINGS = [
  { radius: 95,  speed: 0.38 },
  { radius: 158, speed: 0.24 },
  { radius: 205, speed: 0.15 },
  { radius: 255, speed: 0.10 },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

function groupByRing(skills) {
  const groups = [[], [], [], []];
  skills.forEach((s) => groups[s.ring].push(s));
  return groups;
}

function startAngle(index, total) {
  return (2 * Math.PI * index) / total - Math.PI / 2;
}

// ─── Single Chip ─────────────────────────────────────────────────────────────

function SkillChip({ skill, x, y, visible, index }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      className="absolute"
      style={{
        left: x,
        top: y,
        translateX: "-50%",
        translateY: "-50%",
        zIndex: hovered ? 20 : 5,
        pointerEvents: "auto",
      }}
      initial={{ opacity: 0, scale: 0.4 }}
      animate={visible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.4 }}
      transition={{ duration: 0.45, delay: index * 0.06, ease: "backOut" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Tooltip */}
      <motion.div
        className="absolute bottom-[calc(100%+8px)] left-1/2 -translate-x-1/2
                   border rounded-lg
                   px-3 py-1.5
                   whitespace-nowrap pointer-events-none z-30
                   shadow-md"
        initial={{ opacity: 0, y: 4 }}
        animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 4 }}
        transition={{ duration: 0.18 }}
      >
        <span className="font-medium" style={{ color: skill.color }}>{skill.cat}</span>
        {" · "}
        {skill.desc}
      </motion.div>

      <motion.div
        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full
                  text-xs font-medium whitespace-nowrap cursor-default
                  transition-colors duration-200"
        style={{
          border: `1px solid ${hovered ? skill.color + "88" : "rgba(128,128,128,0.25)"}`,
        }}
        animate={{ scale: hovered ? 1.12 : 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <skill.icon size={40} style={{ color: skill.color, flexShrink: 0 }} />
      </motion.div>
    </motion.div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function SkillsOrbit() {
  const SIZE = 450;
  const CX = SIZE / 2;
  const CY = SIZE / 2;

  const sectionRef = useRef(null);
  const canvasRef  = useRef(null);
  const rafRef     = useRef(null);
  const lastRef    = useRef(null);
  const trailRef   = useRef([]);
  const pausedRef  = useRef(false);

  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  const groups     = groupByRing(SKILLS);
  const initAngles = useRef(
    SKILLS.map((s) => {
      const inRing = groups[s.ring].indexOf(s);
      const total  = groups[s.ring].length;
      return startAngle(inRing, total);
    })
  );

  const [positions, setPositions] = useState(
    SKILLS.map((s, i) => {
      const r = RINGS[s.ring].radius;
      const a = initAngles.current[i];
      return { x: CX + r * Math.cos(a), y: CY + r * Math.sin(a) };
    })
  );

  useEffect(() => {
    if (!isInView) return;
    const angles    = [...initAngles.current];
    const MAX_TRAIL = 28;

    function draw(ts) {
      if (!lastRef.current) lastRef.current = ts;
      const dt = Math.min((ts - lastRef.current) / 1000, 0.05);
      lastRef.current = ts;

      if (!pausedRef.current) {
        SKILLS.forEach((s, i) => { angles[i] += RINGS[s.ring].speed * dt; });
      }

      const nextPos = SKILLS.map((s, i) => ({
        x: CX + RINGS[s.ring].radius * Math.cos(angles[i]),
        y: CY + RINGS[s.ring].radius * Math.sin(angles[i]),
      }));
      setPositions(nextPos);

      const canvas = canvasRef.current;
      if (!canvas) { rafRef.current = requestAnimationFrame(draw); return; }
      const ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, SIZE, SIZE);

      if (!pausedRef.current) {
        trailRef.current.push({ ...nextPos[0] });
        if (trailRef.current.length > MAX_TRAIL) trailRef.current.shift();
        trailRef.current.forEach((p, idx) => {
          const alpha = (idx / trailRef.current.length) * 0.45;
          ctx.beginPath();
          ctx.arc(p.x, p.y, 2.5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(108,207,74,${alpha})`;
          ctx.fill();
        });
      } else {
        trailRef.current = [];
      }

      rafRef.current = requestAnimationFrame(draw);
    }

    rafRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(rafRef.current);
  }, [isInView]);

  return (
    <section
      ref={sectionRef}
      className="py-20 px-5 text-center relative overflow-hidden"
      aria-label="Compétences techniques"
    >

      {/* Title */}
      <motion.h2
        className="text-3xl lg:text-4xl font-bold mb-3"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.08, ease: "easeOut" }}
      >
        <span className="text-green-600">Mes</span> compétences
      </motion.h2>

      {/* Subtitle */}
      <motion.p
        className="text-sm mx-auto mb-10"
        initial={{ opacity: 0, y: 16 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.14, ease: "easeOut" }}
      >
        Tout ce qu'il faut pour créer des apps web modernes, de bout en bout.
      </motion.p>

      {/* Orbit */}
      <div
        className="relative mx-auto mb-2"
        style={{ width: SIZE, height: SIZE }}
        onMouseEnter={() => { pausedRef.current = true; }}
        onMouseLeave={() => { setTimeout(() => { pausedRef.current = false; }, 360); }}
      >
        {/* Trail canvas */}
        <canvas
          ref={canvasRef}
          width={SIZE}
          height={SIZE}
          className="absolute inset-0 pointer-events-none z-[1]"
          style={{ margin: "2rem auto" }}
        />

        {/* Dashed rings */}
        {RINGS.map((ring, i) => (
          <motion.div
            key={i}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full
                       border border-dashed"
            style={{ width: ring.radius * 2, height: ring.radius * 2 }}
            initial={{ opacity: 0, scale: 0.6 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.1 + i * 0.1, ease: "easeOut" }}
          />
        ))}

        {/* Center core */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                     w-[76px] h-[76px] rounded-full z-10
                     flex flex-col items-center justify-center gap-0.5"
          style={{ border: "1.5px solid #6CCF4A44" }}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.2, ease: "backOut" }}
        >
          <svg
            width="25" height="25" viewBox="0 0 24 24"
            fill="none" stroke="#6CCF4A"
            strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
            aria-hidden="true"
          >
            <polyline points="16 18 22 12 16 6" />
            <polyline points="8 6 2 12 8 18" />
          </svg>
          <span className="font-medium leading-none" style={{ color: "#6CCF4A" }}>
            TokiJr
          </span>
        </motion.div>

        {/* Chips layer */}
        <div className="absolute inset-0 z-[5] pointer-events-none">
          {SKILLS.map((skill, i) => (
            <SkillChip
              key={skill.name}
              skill={skill}
              x={positions[i].x}
              y={positions[i].y}
              visible={isInView}
              index={i}
            />
          ))}
        </div>
      </div>
    </section>
    
  );
}