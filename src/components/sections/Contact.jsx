import { Mail, Phone, MapPin, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { FaFacebook, FaGithub, FaLinkedin } from "react-icons/fa";

const contactInfoMeta = [
  {
    key: "email",
    icon: Mail,
    value: "roberttokinirina@gmail.com",
    color: "#EA4335",
    href: "mailto:roberttokinirina@gmail.com",
  },
  {
    key: "phone",
    icon: Phone,
    value: "+261 38 60 176 34 / +261 038 30 142 95",
    color: "#22C55E",
    href: "tel:+261386017634",
  },
  {
    key: "address",
    icon: MapPin,
    value: "Tanambao Zoara, Fianarantsoa",
    color: "#3B82F6",
    href: "https://www.google.com/maps/search/?api=1&query=Tanambao+Zoara+Fianarantsoa",
  },
];

const socialLinks = [
  { icon: FaGithub, label: "GitHub", color: "#EA4335", href: "https://github.com/Toki-Jr" },
  { icon: FaFacebook, label: "Facebook", color: "#1877F2", href: "https://www.facebook.com/profile.php?id=61550603194732" },
  { icon: FaLinkedin, label: "LinkedIn", color: "#0A66C2", href: "https://www.linkedin.com/in/tokinirina-jean-robert-randrianandrasana-b9aa01379/" },
  { icon: MessageCircle, label: "WhatsApp", color: "#25D366", href: "https://wa.me/261386017634" },
  { icon: Mail, label: "Gmail", color: "#EA4335", href: "mailto:roberttokinirina@gmail.com" },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

export default function ContactPage() {
  const { t } = useTranslation();

  const contactInfo = contactInfoMeta.map((meta) => ({
    ...meta,
    label: t(`contact.info.${meta.key}`),
  }));

  return (
    <section className="max-w-4xl mx-auto px-4 py-20" id="contact">
      <motion.p className="text-[11px] font-medium tracking-[0.14em] uppercase text-green-600 mb-1 text-center" 
        initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45 }}>
        {t("contact.eyebrow")}
      </motion.p>

      <motion.h2 className="text-3xl lg:text-4xl font-bold text-center mb-1"
        initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45, delay: 0.07 }}>
        <span className="text-green-600">{t("contact.titlePrefix")}</span> {t("contact.titleSuffix")}
      </motion.h2>

      <p className="text-sm text-center opacity-70 mb-8 mt-2">{t("contact.subtitle")}</p>

      <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-40px" }}
        className="flex flex-col gap-3 p-6 rounded-2xl border border-green-600/40 bg-background/40 backdrop-blur-sm" >
        {/* Infos de contact */}
        {contactInfo.map((item) => {
          const Icon = item.icon;
          return (
            <motion.a key={item.key} href={item.href} target={item.key === "address" ? "_blank" : undefined} rel={item.key === "address" ? "noopener noreferrer" : undefined} 
              variants={itemVariants} whileHover={{ x: 4, borderColor: item.color, transition: { duration: 0.15 } }}
              className="flex items-center gap-4 p-3 rounded-xl border border-border transition-colors" >
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: item.color + "1A", border: `1.5px solid ${item.color}55` }}
              >
                <Icon size={20} style={{ color: item.color }} />
              </div>
              <div className="min-w-0">
                <p className="text-xs opacity-60">{item.label}</p>
                <p className="text-sm font-medium truncate">{item.value}</p>
              </div>
            </motion.a>
          );
        })}

        <div className="h-px bg-border my-2" />

        <p className="text-sm font-semibold opacity-80">{t("contact.socialHeading")}</p>

        <motion.div variants={containerVariants} className="flex flex-wrap gap-2 justify-center sm:justify-start">
          {socialLinks.map((social) => {
            const Icon = social.icon;
            return (
              <motion.a key={social.label} href={social.href} target="_blank" rel="noopener noreferrer" variants={itemVariants} whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium" style={{ background: social.color + "1A", color: social.color, border: `1px solid ${social.color}33` }}
              >
                <Icon size={18} />
                {social.label}
              </motion.a>
            );
          })}
        </motion.div>
      </motion.div>
    </section>
  );
}