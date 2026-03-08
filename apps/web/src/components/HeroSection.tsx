"use client";

import { motion } from "framer-motion";
import { Rocket, Code } from "lucide-react";

export default function HeroSection() {
    return (
        <section
            id="hero"
            aria-label="VINA EDU FC - Open Source Drone Flight Controller Made in Vietnam"
            className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden"
        >
            {/* Background gradients and blobs */}
            <div className="absolute inset-0 z-0" aria-hidden="true">
                <div className="absolute top-[20%] left-[20%] w-[300px] h-[300px] bg-cyan-600/30 rounded-full blur-[100px] mix-blend-screen animate-[blob_7s_infinite]"></div>
                <div className="absolute top-[30%] right-[20%] w-[400px] h-[400px] bg-purple-600/20 rounded-full blur-[120px] mix-blend-screen animate-[blob_7s_infinite_2s]"></div>
                <div className="absolute bottom-[20%] left-[40%] w-[350px] h-[350px] bg-blue-600/20 rounded-full blur-[100px] mix-blend-screen animate-[blob_7s_infinite_4s]"></div>
            </div>

            {/* Grid overlay */}
            <div
                className="absolute inset-0 bg-[url('https://cdn.pixabay.com/photo/2021/11/20/03/17/grid-bg-6810793_1280.png')] opacity-[0.03] z-0 mix-blend-overlay"
                style={{ backgroundSize: "50px 50px" }}
                aria-hidden="true"
            ></div>

            <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col items-center text-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-300 text-xs font-mono font-medium mb-8 uppercase tracking-wider backdrop-blur-sm"
                >
                    🚀 Thương hiệu Việt - Công nghệ Việt
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-6xl md:text-8xl font-black tracking-tighter mb-4 drop-shadow-2xl"
                >
                    <span className="text-white">VINA EDU </span>
                    <span className="text-gradient inline-block">FC</span>
                </motion.h1>



                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed font-light"
                >
                    Bộ điều khiển bay &quot;Make in Vietnam&quot; — Đơn giản hóa công nghệ Drone cho người Việt.
                    Nền tảng drone nghiên cứu lý tưởng cho sinh viên, kỹ sư và cộng đồng maker.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="flex flex-col sm:flex-row gap-4 items-center justify-center"
                >
                    <a
                        href="#technology"
                        className="group cursor-pointer relative px-8 py-3 bg-cyan-600 hover:bg-cyan-500 text-white font-medium rounded-lg overflow-hidden transition-all shadow-[0_0_20px_-5px_rgba(6,182,212,0.5)] hover:shadow-[0_0_30px_-5px_rgba(6,182,212,0.8)] flex items-center gap-2"
                        aria-label="Khám phá công nghệ drone flight controller"
                    >
                        <span className="relative z-10">Khám phá công nghệ</span>
                        <Rocket className="relative z-10 w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden="true"></div>
                    </a>

                    <a
                        href="#contact"
                        className="group cursor-pointer px-8 py-3 bg-transparent border border-slate-600 hover:border-slate-400 text-slate-300 hover:text-white font-medium rounded-lg transition-all flex items-center gap-2 glass"
                        aria-label="Liên hệ hợp tác phát triển drone"
                    >
                        <span>Liên hệ hợp tác</span>
                        <Code className="w-4 h-4 opacity-70 group-hover:opacity-100" aria-hidden="true" />
                    </a>
                </motion.div>
            </div>

            {/* Scroll indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2, duration: 1 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-500"
                aria-hidden="true"
            >
                <span className="text-xs uppercase tracking-widest">Scroll</span>
                <div className="w-[1px] h-12 relative overflow-hidden bg-slate-800">
                    <motion.div
                        animate={{ top: ["-100%", "100%"] }}
                        transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                        className="absolute top-0 left-0 w-full h-1/2 bg-cyan-500"
                    ></motion.div>
                </div>
            </motion.div>
        </section>
    );
}
