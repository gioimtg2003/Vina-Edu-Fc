"use client";

import { motion } from "framer-motion";
import { BookOpen, Code2, GraduationCap } from "lucide-react";
import { HeroVideoDialog } from "./video-dialog";

export default function EducationSection() {
    const points = [
        { icon: <Code2 className="w-5 h-5" />, text: "Mã nguồn C++ rõ ràng, dễ hiểu. Tương thích hoàn toàn với Arduino IDE, giúp sinh viên dễ dàng học tập và phát triển." },
        { icon: <BookOpen className="w-5 h-5" />, text: "Truy cập trực tiếp vào thuật toán bay. Hiểu sâu và làm chủ các thuật toán điều khiển cốt lõi của drone." },
        { icon: <GraduationCap className="w-5 h-5" />, text: "Tùy chỉnh PID và bộ lọc cảm biến. Dễ dàng chỉnh sửa các bộ điều khiển PID và sensor fusion filters để tối ưu hiệu suất bay." },
        { icon: <GraduationCap className="w-5 h-5" />, text: "Nền tảng lý tưởng cho nghiên cứu. Phù hợp cho đồ án tốt nghiệp, nghiên cứu drone tự động và các dự án robotics tại trường đại học." },
    ];

    return (
        <section id="education" aria-label="Sứ mệnh giáo dục - Nền tảng drone nghiên cứu cho sinh viên Việt Nam" className="py-24 relative overflow-hidden bg-slate-900">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" aria-hidden="true"></div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="grid lg:grid-cols-2 gap-16 items-center">

                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="text-cyan-400 font-mono text-sm tracking-widest uppercase mb-3">Sứ Mệnh Giáo Dục</div>
                        <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
                            Educational Drone Platform — Dành Cho Sinh Viên Việt Nam
                        </h2>

                        <p className="text-slate-300 text-lg mb-8 leading-relaxed">
                            Khi sản phẩm được thương mại hóa, toàn bộ <strong className="text-cyan-400">firmware sẽ được mở mã nguồn hoàn toàn</strong>.
                            Chúng tôi mong muốn trao quyền cho thế hệ <strong className="text-cyan-400">kỹ sư hàng không – robot tương lai</strong> của Việt Nam thông qua nền tảng công nghệ minh bạch và dễ tiếp cận.                        </p>

                        <ul className="space-y-4 mb-10">
                            {points.map((point, index) => (
                                <motion.li
                                    key={index}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.2 + (index * 0.1) }}
                                    className="flex items-center gap-4 p-4 rounded-xl glass border-slate-700/50 hover:border-cyan-500/30 transition-colors"
                                >
                                    <div className="w-10 h-10 rounded-lg bg-cyan-500/10 text-cyan-400 flex items-center justify-center shrink-0">
                                        {point.icon}
                                    </div>
                                    <span className="text-slate-300 font-medium">{point.text}</span>
                                </motion.li>
                            ))}
                        </ul>

                        <button className="px-6 py-3 rounded-lg bg-cyan-600/10 text-cyan-400 border border-cyan-500/30 hover:bg-cyan-500/20 transition-all font-medium flex items-center gap-2">
                            <span className="relative z-10">Xem Tài Liệu</span>
                        </button>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="relative"
                    >
                        {/* Floating video placeholder card */}
                        <motion.div
                            animate={{ y: [-10, 10, -10] }}
                            transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
                            className="glass p-2 rounded-3xl border border-slate-700 bg-slate-900/60 shadow-[0_0_50px_-15px_rgba(168,85,247,0.3)] relative z-20"
                        >
                            <div className="aspect-video rounded-2xl bg-slate-800 overflow-hidden relative group">
                                <HeroVideoDialog
                                    className="block"
                                    animationStyle="top-in-bottom-out"
                                    videoSrc="/video1.mp4"
                                    thumbnailSrc="/fc-board.png"
                                    thumbnailAlt="Demo video: Vina Edu FC ESP32 drone flight controller bay ổn định"

                                />

                            </div>
                        </motion.div>



                    </motion.div>

                </div>
            </div>
        </section>
    );
}
