"use client";

import { Course } from "@/types/course";
import { motion } from "framer-motion";
import { Clock, Eye, Tag, ChevronDown, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";

interface CourseDetailClientProps {
    matchedCourse: Course;
}

export default function CourseDetailClient({ matchedCourse }: CourseDetailClientProps) {
    const t = useTranslations("common.courses");
    const [isSyllabusOpen, setIsSyllabusOpen] = useState(true);

    return (
        <div className="min-h-screen bg-white font-sans selection:bg-slate-900 selection:text-white">
            {/* Hero Section */}
            <section className="pt-32 pb-20 bg-slate-50 border-b border-slate-100">
                <div className="container mx-auto px-6 max-w-5xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <Link 
                            href="/#courses" 
                            className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-slate-900 mb-8 transition-colors"
                        >
                            <svg className="mr-2 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="15 19l-7-7 7-7" />
                            </svg>
                            {t("back_to_home")}
                        </Link>
                        
                        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 mb-6 leading-tight">
                            {matchedCourse.name}
                        </h1>
                        <p className="text-xl text-gray-600 font-light max-w-3xl leading-relaxed mb-10">
                            {matchedCourse.description}
                        </p>

                        <div className="flex flex-wrap gap-6 text-sm font-medium text-gray-500">
                            <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-slate-200 shadow-sm">
                                <Clock className="w-4 h-4 text-blue-500" />
                                <span>{t("duration")}: {matchedCourse.duration}</span>
                            </div>
                            <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-slate-200 shadow-sm">
                                <Eye className="w-4 h-4 text-emerald-500" />
                                <span>{matchedCourse.viewCount} {t("views")}</span>
                            </div>
                            <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-slate-200 shadow-sm">
                                <Tag className="w-4 h-4 text-amber-500" />
                                <span>{t("price")}: <span className="text-slate-900">{matchedCourse.price}</span></span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Course Content */}
            <section className="py-20 lg:py-28">
                <div className="container mx-auto px-6 max-w-5xl">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
                        {/* Main Info */}
                        <div className="lg:col-span-2 space-y-12">
                            <div>
                                <h2 className="text-2xl font-bold text-slate-900 mb-6">{t("what_will_you_learn")}</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {matchedCourse.details.map((detail, idx) => (
                                        <div key={idx} className="flex items-start gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                                            <CheckCircle2 className="w-5 h-5 text-blue-600 mt-0.5" />
                                            <span className="text-gray-700 font-medium">{detail}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="bg-slate-900 text-white rounded-[2rem] p-10 md:p-14 shadow-2xl relative overflow-hidden group">
                                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl -mr-32 -mt-32"></div>
                                <h2 className="text-2xl md:text-3xl font-bold mb-8 relative z-10">{t("detailed_content")}</h2>
                                <div 
                                    className="text-lg text-gray-300 font-light leading-relaxed space-y-4 relative z-10"
                                >
                                    <div 
                                        className="flex items-center justify-between cursor-pointer group/hover"
                                        onClick={() => setIsSyllabusOpen(!isSyllabusOpen)}
                                    >
                                        <span className="font-semibold text-white">{t("view_syllabus")}</span>
                                        <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${isSyllabusOpen ? 'rotate-180' : ''}`} />
                                    </div>
                                    {isSyllabusOpen && (
                                        <motion.div 
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: "auto" }}
                                            className="pt-6 border-t border-white/10 mt-6"
                                        >
                                            <p className="whitespace-pre-line text-blue-50/80">
                                                {matchedCourse.content}
                                            </p>
                                        </motion.div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Sidebar / CTA */}
                        <div className="lg:col-span-1">
                            <div className="sticky top-32 p-8 bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden relative">
                                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-600 to-emerald-500"></div>
                                <h3 className="text-xl font-bold text-slate-900 mb-4">{t("enroll_now")}</h3>
                                <p className="text-gray-500 text-sm mb-8">
                                    {t("cta_description")}
                                </p>
                                
                                <button className="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-slate-800 transition-all shadow-lg hover:shadow-xl active:scale-[0.98] mb-4">
                                    {t("book_consultation")}
                                </button>
                                <p className="text-center text-xs text-gray-400">
                                    {t("student_discount")}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
