import { User, FolderKanban, Award, ChevronRight } from "lucide-react";
import { useTranslation } from "react-i18next";

const ICONS = [User, FolderKanban, Award];

export default function About() {
    const { t } = useTranslation(); 
    const stats = t("about.stats", { returnObjects: true });

    return (
        <section className="py-15 max-w-5xl mx-auto px-4" id="about">
            <h2 className="text-3xl lg:text-4xl font-bold mb-8 text-center">
                {t("about.title")} <span className="text-green-600">{t("about.title_accent")}</span>
            </h2>
            
            <div className="space-y-6 text-muted-foreground text-lg leading-relaxed m-4 border border-green-600 rounded-3xl p-8">
                <p className="indent-8 text-justify">
                   {t("about.p1")}
                </p>

                <p className="indent-8 text-justify">
                    {t("about.p2")}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {stats.map((item, index) => {
                        const Icon = ICONS[index];

                        return (
                        <div key={index} className="group flex flex-col justify-between p-4 rounded-xl border border-green-600">
                            <div className="flex items-center justify-between">
                                <span className="uppercase font-bold tracking-wider text-[9px]">
                                    {item.titre}
                                </span>

                                <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border">
                                    <Icon size={16} color="#6CCF4A" />
                                </div>
                            </div>

                            <div className="flex items-end justify-between mt-3 flex-wrap gap-1">
                                <div>
                                    <div className="text-xl font-bold font-mono leading-none">
                                    {item.valeur}
                                    </div>

                                    <div className="text-[10px]">
                                    {item.description}
                                    </div>
                                </div>

                                <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity text-zinc-400 dark:text-zinc-500"/>
                            </div>
                        </div>
                        );
                    })}
                </div>
            </div>

        </section>
    );
}