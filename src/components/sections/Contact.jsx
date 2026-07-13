import { Mail, Phone, MapPin, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";
import { FaFacebook, FaGithub, FaLinkedin } from "react-icons/fa";
const contactInfo = [
  { icon: Mail, value: "roberttokinirina@gmail.com", color: "#EA4335", href: "mailto:roberttokinirina@gmail.com" },
  { icon: Phone, value: "+261 38 60 176 34 / +261 038 30 142 95", color: "#22C55E", href: "tel:+261386017634" },
  { icon: MapPin, value: "Tanambao Zoara, Fianarantsoa", color: "#3B82F6", href: "#" },
];

const socialLinks = [
  { icon: FaGithub, label: "GitHub", color: "#EA4335", href: "https://github.com/Toki-Jr" },
  { icon: FaFacebook, label: "Facebook", color: "#1877F2", href: "https://www.facebook.com/profile.php?id=61550603194732" },
  { icon: FaLinkedin, label: "LinkedIn", color: "#0A66C2", href: "https://www.linkedin.com/in/tokinirina-jean-robert-randrianandrasana-b9aa01379/" },
  { icon: MessageCircle, label: "WhatsApp", color: "#25D366", href: "https://wa.me/261340000000" },
  { icon: Mail, label: "Gmail", color: "#EA4335", href: "mailto:roberttokinirina@gmail.com" },
];

export default function ContactPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h2 className="text-3xl text-center font-bold mb-1"><span className="text-green-600">Mes</span> Contacts</h2>
      <p className="text-sm text-center opacity-70 mb-6 mt-2">N'hésitez pas à me contacter</p>

      {/* Infos de contact */}
      <div className="flex flex-col gap-3 mb-8 border border-green-600 p-6 rounded-2xl">
        {contactInfo.map((item, i) => {
          const Icon = item.icon;
          return (
            <motion.a
              key={i}
              href={item.href}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="flex items-center gap-4 p-3 rounded-xl border hover:shadow-md transition-shadow"
            >
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
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
        <p className="text-sm font-semibold mb-3 opacity-80">Retrouvez-moi sur</p>

        <div className="flex flex-wrap gap-2">
          {socialLinks.map((social, i) => {
            const Icon = social.icon;
            return (
              <motion.a
                key={i}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center mx-auto gap-2 px-4 py-2.5 rounded-xl text-sm font-medium"
                style={{ background: social.color + "1A", color: social.color, border: `1px solid ${social.color}33` }}
              >
                <Icon size={18} />
                {social.label}
              </motion.a>
            );
          })}
        </div>
      </div>

      
    </div>
  );
}