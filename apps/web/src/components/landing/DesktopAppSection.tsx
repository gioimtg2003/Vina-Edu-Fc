"use client";

import { motion, Variants } from "framer-motion";
import Image from "next/image";
import { Monitor, Wifi, SlidersHorizontal, Download, Apple } from "lucide-react";

const fadeUp: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const staggerContainer: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.15 } },
};

const features = [
    {
        icon: Monitor,
        title: "Kết nối Serial",
        description: "Giao tiếp trực tiếp với Flight Controller qua cổng COM, hỗ trợ baud rate tùy chỉnh.",
    },
    {
        icon: Wifi,
        title: "Telemetry thời gian thực",
        description: "Hiển thị dữ liệu cảm biến IMU, GPS, pin và tín hiệu điều khiển trực quan.",
    },
    {
        icon: SlidersHorizontal,
        title: "Tune PID trực quan",
        description: "Giao diện kéo-thả tinh chỉnh thông số PID với biểu đồ phản hồi real-time.",
    },
];

export default function DesktopAppSection() {
    return (
        <section
            id="desktop-app"
            className="relative py-32 bg-white text-black overflow-hidden"
        >
            {/* Subtle gradient accent */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-b from-cyan-500/10 to-transparent rounded-full blur-3xl" />
            </div>

            <div className="container mx-auto px-6 max-w-7xl relative z-10 ">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">
                    {/* Left: Text Content */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={staggerContainer}
                    >
                        <motion.div variants={fadeUp}>
                            <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-cyan-400 mb-6">
                                <Monitor className="w-4 h-4" />
                                Desktop Application
                            </span>
                        </motion.div>

                        <motion.h2
                            variants={fadeUp}
                            className="text-4xl md:text-5xl font-bold tracking-tight mb-6"
                        >
                            VinaUAV
                            <br />
                            <span className="text-gray-900">Ground Control Station</span>
                        </motion.h2>

                        <motion.p
                            variants={fadeUp}
                            className="text-lg text-gray-900 font-light leading-relaxed mb-10 max-w-lg"
                        >
                            Phần mềm điều khiển mặt đất chuyên dụng, được thiết kế tối ưu cho
                            hệ sinh thái VinaFC. Kết nối, giám sát và tinh chỉnh Flight
                            Controller ngay trên máy tính cá nhân.
                        </motion.p>

                        {/* Feature highlights */}
                        <motion.div variants={fadeUp} className="space-y-6 mb-12">
                            {features.map((feature) => (
                                <div
                                    key={feature.title}
                                    className="flex items-start gap-4 group"
                                >
                                    <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:bg-cyan-500/20 group-hover:border-cyan-500/30 transition-colors duration-300">
                                        <feature.icon
                                            className="w-5 h-5 text-gray-400 group-hover:text-cyan-400 transition-colors duration-300"
                                            strokeWidth={1.5}
                                        />
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-semibold text-gray-900 mb-1">
                                            {feature.title}
                                        </h4>
                                        <p className="text-sm text-gray-800 font-light leading-relaxed ">
                                            {feature.description}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </motion.div>

                        {/* Download CTAs */}
                        <motion.div
                            variants={fadeUp}
                            className="flex flex-col sm:flex-row gap-4  font-mono"
                        >
                            <a
                                href="https://github.com/gioimtg2003/VinaUAV/releases"
                                className="group inline-flex items-center justify-center gap-3 bg-black text-white px-8 py-3.5 rounded-full font-medium hover:bg-black/80 hover:border-black/40 transition-all duration-300"
                            >
                                <Download className="w-5 h-5" strokeWidth={1.5} />
                                <span>
                                    <span className="block text-sm font-bold">Download cho Windows</span>
                                    <span className="block text-xs text-gray-500 font-normal">.exe installer</span>
                                </span>
                            </a>
                            <a
                                href="https://github.com/gioimtg2003/VinaUAV/releases"
                                className="group inline-flex items-center justify-center gap-3 bg-transparent text-black border border-black/20 px-8 py-3.5 rounded-full font-medium hover:bg-black/5 hover:border-black/40 transition-all duration-300"
                            >
                                <Apple className="w-5 h-5" strokeWidth={1.5} />
                                <span>
                                    <span className="block text-sm font-bold">Download cho macOS</span>
                                    <span className="block text-xs text-gray-500 font-normal">.dmg package</span>
                                </span>
                            </a>
                        </motion.div>
                    </motion.div>

                    {/* Right: App Mockup */}
                    <motion.div
                        initial={{ opacity: 0, x: 60, scale: 0.95 }}
                        whileInView={{ opacity: 1, x: 0, scale: 1 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
                        className="relative"
                    >
                        {/* Glow effect behind image */}
                        <div className="absolute -inset-6 bg-gradient-to-br from-cyan-500/20 via-transparent to-blue-500/10 rounded-3xl blur-2xl" />

                        {/* Window frame */}
                        <div className="relative bg-gray-800 rounded-2xl overflow-hidden shadow-2xl shadow-black/40 border border-white/10">
                            {/* Title bar */}
                            <div className="flex items-center gap-2 px-4 py-3 bg-gray-800/80 border-b border-white/5">
                                <div className="flex gap-1.5">
                                    <div className="w-3 h-3 rounded-full bg-red-500/80" />
                                    <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                                    <div className="w-3 h-3 rounded-full bg-green-500/80" />
                                </div>
                                <span className="text-xs text-gray-500 font-mono ml-2">
                                    VinaFlightControl Desktop — v0.1.0
                                </span>
                            </div>

                            {/* App screenshot */}
                            <div className="relative w-full aspect-[16/10]">
                                <Image
                                    src="/desktop-app-mockup.png"
                                    alt="VinaFlightControl Desktop Application — Ground Control Station"
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                />
                            </div>
                        </div>

                        {/* Floating badge */}
                        <div className="absolute -bottom-4 -left-4 sm:-bottom-6 sm:-left-6 bg-gray-800 border border-white/10 rounded-2xl px-5 py-3 shadow-xl">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-lg bg-cyan-500/20 flex items-center justify-center">
                                    <Wifi className="w-4 h-4 text-cyan-400" />
                                </div>
                                <div>
                                    <p className="text-xs font-semibold text-white">Connected</p>
                                    <p className="text-[10px] text-gray-500">COM3 @ 115200</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
