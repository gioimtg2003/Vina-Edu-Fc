"use client";

import { motion, Variants } from "framer-motion";
import { Wrench, Cpu, MapPin, GraduationCap } from "lucide-react";

const fadeUpVariant: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: { delay: i * 0.15, duration: 0.6, ease: "easeOut" },
    }),
};

import { COURSES } from "@/lib/courses";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";

const iconMap = {
    Wrench,
    Cpu,
    MapPin,
    GraduationCap,
};

export default function CoursesSection() {
    const t = useTranslations("common.courses");
    return (
        <section id="courses" className="relative py-32 bg-slate-50 text-gray-900 border-t border-slate-200">
            <div className="container mx-auto px-6 max-w-6xl">
                {/* Section Header */}
                <div className="text-center md:max-w-3xl mx-auto mb-20">
                    <motion.h2
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-50px" }}
                        variants={fadeUpVariant}
                        custom={0}
                        className="text-4xl md:text-5xl font-bold tracking-tight mb-6"
                    >
                        {t("title")}
                    </motion.h2>
                    <motion.p
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-50px" }}
                        variants={fadeUpVariant}
                        custom={1}
                        className="text-lg md:text-xl text-gray-500 font-light leading-relaxed"
                    >
                        {t("subtitle")}
                    </motion.p>
                </div>

                {/* Courses Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                    {COURSES.map((course, i) => {
                        const Icon = iconMap[course.iconName as keyof typeof iconMap] || GraduationCap;
                        return (
                            <Link
                                key={course.id}
                                href={`/khoa-hoc/${course.id}`}
                                className="block"
                            >
                                <motion.div
                                    custom={i + 2}
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true, margin: "-50px" }}
                                    variants={fadeUpVariant}
                                    whileHover={{ y: -8, transition: { duration: 0.3 } }}
                                    className="group h-full bg-white rounded-3xl p-10 shadow-sm hover:shadow-xl border border-slate-100 transition-all duration-300"
                                >
                                    <div className="w-14 h-14 rounded-2xl bg-gray-50 flex items-center justify-center mb-8 group-hover:bg-slate-900 group-hover:text-white transition-colors duration-500">
                                        <Icon className="w-7 h-7" strokeWidth={1.5} />
                                    </div>
                                    <h3 className="text-2xl font-bold tracking-tight mb-4 group-hover:text-slate-900">
                                        {course.name}
                                    </h3>
                                    <p className="text-gray-500 font-light leading-relaxed text-lg line-clamp-3">
                                        {course.description}
                                    </p>
                                    <div className="mt-8 flex items-center text-sm font-semibold text-slate-900 opacity-0 group-hover:opacity-100 transition-opacity">
                                        {t("view_details")}
                                        <svg className="ml-2 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="9 5l7 7-7 7" />
                                        </svg>
                                    </div>
                                </motion.div>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
