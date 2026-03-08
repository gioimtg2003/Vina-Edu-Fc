"use client";

import { motion } from "framer-motion";
import { Cpu, FileCode2, Zap } from "lucide-react";

export default function AboutSection() {
    return (
        <section id="about" aria-label="Giới thiệu sản phẩm Vina Edu FC - Drone flight controller ESP32" className="py-24 relative overflow-hidden bg-slate-900">
            {/* Background flare */}
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-600/10 rounded-full blur-[100px]" aria-hidden="true"></div>


            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <div className="text-cyan-400 font-mono text-sm tracking-widest uppercase mb-3">Về Sản Phẩm</div>
                    <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">Đơn giản hóa sự phức tạp của Drone</h2>
                    <p className="text-slate-400 max-w-2xl mx-auto text-lg">
                        Nhiều nền tảng máy bay không người lái như PX4 và Ardupilot rất mạnh mẽ nhưng cực kỳ phức tạp. Vina Edu FC đơn giản hóa quá trình học tập cho mọi người.

                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="space-y-8"
                    >
                        <div className="glass p-8 rounded-2xl border border-slate-700/50 hover:border-cyan-500/30 transition-colors shadow-2xl relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                <Cpu size={120} />
                            </div>
                            <div className="w-12 h-12 bg-cyan-500/20 text-cyan-400 rounded-xl flex items-center justify-center mb-6">
                                <Zap size={24} />
                            </div>
                            <h3 className="text-2xl font-bold mb-3 text-white">Phần cứng</h3>
                            <p className="text-slate-400 leading-relaxed">
                                Được trang bị vi điều khiển ESP32, mang lại tốc độ xung nhịp cao, tích hợp WiFi & Bluetooth và khả năng tính toán mạnh mẽ với chi phí cực thấp. Được thiết kế để xử lý các thuật toán điều khiển bay hiện đại một cách dễ dàng.                            </p>
                        </div>

                        <div className="glass p-8 rounded-2xl border border-slate-700/50 hover:border-purple-500/30 transition-colors shadow-2xl relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                <FileCode2 size={120} />
                            </div>
                            <div className="w-12 h-12 bg-purple-500/20 text-purple-400 rounded-xl flex items-center justify-center mb-6">
                                <FileCode2 size={24} />
                            </div>
                            <h3 className="text-2xl font-bold mb-3 text-white">Mã nguồn mở hoàn toàn</h3>
                            <p className="text-slate-400 leading-relaxed">
                                Kết hợp phần cứng hiệu năng cao với phần mềm mã nguồn mở được thiết kế đặc biệt dành cho sinh viên và nhà phát triển. Tùy chỉnh, học hỏi và mở rộng nền tảng mà không bị hạn chế.                            </p>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="relative h-[500px] rounded-3xl overflow-hidden glass border border-slate-700 flex items-center justify-center group"
                    >
                        {/* Holographic grid and glowing center representing the board */}
                        <div className="absolute inset-0 bg-[url('https://cdn.pixabay.com/photo/2021/11/20/03/17/grid-bg-6810793_1280.png')] opacity-10 mix-blend-overlay"></div>

                        <div className="absolute w-64 h-64 bg-cyan-500/20 rounded-full blur-[80px] group-hover:bg-cyan-500/30 transition-all duration-700"></div>

                        <div className="relative z-10 w-48 h-48 border border-cyan-500/50 bg-slate-900/80 backdrop-blur-md rounded-xl flex flex-col items-center justify-center shadow-[0_0_50px_-10px_rgba(6,182,212,0.4)] transform rotate-12 group-hover:rotate-0 transition-transform duration-700">
                            <img src="/fc_board.jpg" alt="Vina Edu FC - ESP32 drone flight controller board made in Vietnam" className="w-full h-full rounded-xl object-cover" loading="lazy" />

                        </div>

                        {/* Animated lines connecting to the center */}
                        <svg className="absolute inset-0 w-full h-full opacity-30" viewBox="0 0 100 100" preserveAspectRatio="none">
                            <motion.line
                                x1="0" y1="20" x2="50" y2="50" stroke="#06b6d4" strokeWidth="0.5"
                                initial={{ pathLength: 0, opacity: 0 }}
                                animate={{ pathLength: 1, opacity: 1 }}
                                transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
                            />
                            <motion.line
                                x1="100" y1="80" x2="50" y2="50" stroke="#a855f7" strokeWidth="0.5"
                                initial={{ pathLength: 0, opacity: 0 }}
                                animate={{ pathLength: 1, opacity: 1 }}
                                transition={{ duration: 2, delay: 1, repeat: Infinity, repeatType: "reverse" }}
                            />
                        </svg>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
