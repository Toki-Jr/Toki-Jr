import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { PiGraduationCap, PiCheckCircleFill, PiClockCountdownFill } from "react-icons/pi";
import { X, FileText } from "lucide-react";

const COLOR = "#16A34A";

// Données non-traduisibles (icônes, couleurs, dates, statut, fichiers)
const FORMATIONS_META = [
  { key: "l3", statusKey: "inProgress", year: "2025-2026" },
  { key: "l2", statusKey: "validated", year: "2024-2025" },
  { key: "l1", statusKey: "validated", year: "2023-2024" },
];

const CERTIFICATIONS_META = [
  { key: "cert1", certificateUrl: "/certificates/Formation1.pdf" },
  { key: "cert2", certificateUrl: "/certificates/Formation2.pdf" },
  { key: "cert3", certificateUrl: "/certificates/Formation3.pdf" },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

function GroupHeading({ icon: Icon, children }) {
  return (
    <motion.div
      className="flex items-center gap-2 mb-1"
      initial={{ opacity: 0, x: -12 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
    >
      <Icon size={32} className="text-green-600" />
      <h3 className="text-green-600 text-start text-xl sm:text-2xl font-bold">{children}</h3>
      <div className="h-px flex-1 bg-green-600/20 ml-2" />
    </motion.div>
  );
}

function FormationCard({ title, school, year, statusKey, t, onViewCertificate, layoutKey }) {
  const isInProgress = statusKey === "inProgress";
  const StatusIcon = isInProgress ? PiClockCountdownFill : PiCheckCircleFill;

  return (
    <motion.div variants={cardVariants} whileHover={{ y: -4, borderColor: COLOR, transition: { duration: 0.2, ease: "easeOut" } }}
      className="rounded-2xl border px-5 py-5 bg-background/40 backdrop-blur-sm transition-shadow duration-200 hover:shadow-lg hover:shadow-green-600/5"
      style={{ borderColor: COLOR + "33" }}>
      <div className="flex items-start gap-4">
        <motion.div whileHover={{ rotate: -8, scale: 1.08 }} transition={{ type: "spring", stiffness: 300 }} className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ background: COLOR + "1A", border: `1.5px solid ${COLOR}` }} >
          <PiGraduationCap size={22} className="text-green-600" />
        </motion.div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-3">
            <p className="text-base font-semibold leading-snug">{title}</p>
            <span className="text-xs whitespace-nowrap pt-0.5 opacity-70">{year}</span>
          </div>

          <p className="text-sm text-start mt-1 opacity-70">{school}</p>

          <div className="flex items-center flex-wrap gap-2 mt-3">
            <motion.span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-medium" 
              style={{ background: COLOR + "1A", color: COLOR }} animate={isInProgress ? { opacity: [1, 0.55, 1] } : {}}
              transition={isInProgress ? { duration: 2, repeat: Infinity, ease: "easeInOut" } : {}}>
              <StatusIcon size={12} />
              {t(`formation.status.${statusKey}`)}
            </motion.span>

            {onViewCertificate && (
              <motion.button layoutId={`cert-trigger-${layoutKey}`} onClick={onViewCertificate} whileHover={{ x: 2 }} whileTap={{ scale: 0.96 }}
                className="inline-flex items-center gap-1 text-xs font-medium underline underline-offset-4 text-green-600 hover:text-green-500 transition-colors">
                <FileText size={13} />
                {t("formation.viewCertificate")}
              </motion.button>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Formation() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [selectedCert, setSelectedCert] = useState(null);
  const { t } = useTranslation();

  const formations = FORMATIONS_META.map((meta) => ({
    ...meta,
    ...t(`formation.items.formations.${meta.key}`, { returnObjects: true }),
  }));

  const certifications = CERTIFICATIONS_META.map((meta) => ({
    ...meta,
    statusKey: "completed",
    ...t(`formation.items.certifications.${meta.key}`, { returnObjects: true }),
  }));

  return (
    <section ref={ref} className="py-20 px-4 text-center" aria-label="Formation académique" id="formations">
      {/* Heading */}
      <motion.p className="text-[11px] font-medium tracking-[0.14em] uppercase text-green-600 mb-1" 
      initial={{ opacity: 0, y: 12 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.45 }}>
        {t("formation.eyebrow")}
      </motion.p>
      <motion.h2 className="text-3xl lg:text-4xl font-bold mb-12" initial={{ opacity: 0, y: 16 }} animate={inView ? 
        { opacity: 1, y: 0 } : {}} transition={{ duration: 0.45, delay: 0.07 }}>
        {t("formation.sectionTitle")} <span className="text-green-600">{t("formation.sectionTitleHighlight")}</span>
      </motion.h2>

      <div className="flex flex-col gap-10 max-w-4xl mx-auto">
        {/* Formations */}
        <div className="flex flex-col gap-4">
          <GroupHeading icon={PiGraduationCap}>{t("formation.formationsHeading")}</GroupHeading>
          <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-40px" }} className="flex flex-col gap-4">
            {formations.map((f) => (
              <FormationCard key={f.key} {...f} t={t} />
            ))}
          </motion.div>
        </div>

        {/* Certifications */}
        <div className="flex flex-col gap-4">
          <GroupHeading icon={PiGraduationCap}>{t("formation.certificationsHeading")}</GroupHeading>
          <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-40px" }} 
            className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {certifications.map((c) => (
              <FormationCard key={c.key} title={c.title} school={c.school} year={c.period} statusKey={c.statusKey}
                t={t} layoutKey={c.key} onViewCertificate={() => setSelectedCert(c)}/>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Modal — rendu une seule fois, hors du .map() */}
      <AnimatePresence>
        {selectedCert && (
          <motion.div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedCert(null)} >
            <motion.div layoutId={`cert-trigger-${selectedCert.key}`}
              className="bg-white text-black rounded-2xl max-w-2xl w-full max-h-[85vh] overflow-auto relative p-4"
              initial={{ scale: 0.92, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.92, opacity: 0 }} 
              transition={{ type: "spring", stiffness: 300, damping: 28 }} onClick={(e) => e.stopPropagation()}>
              <button onClick={() => setSelectedCert(null)} aria-label={t("formation.closeCertificate")}
                className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
              >
                <X size={18} />
              </button>

              <h3 className="text-lg font-semibold mb-3 pr-8">{selectedCert.title}</h3>

              {selectedCert.certificateUrl?.endsWith(".pdf") ? (
                <iframe src={selectedCert.certificateUrl} className="w-full h-[70vh] rounded-lg" title="Certificat" />
              ) : (
                <img src={selectedCert.certificateUrl} alt={`Certificat ${selectedCert.title}`}
                  className="w-full rounded-lg object-contain"/>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}