"use client";

import { motion, Variants } from "framer-motion";
import { CheckCircle2, Target } from "lucide-react";

const fadeInLeft: Variants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

export default function HeroMission() {
    return (
        <section className="relative w-full bg-white text-gray-900 pb-20">
            {/* Cinematic Hero Video Area */}
            <div className="relative w-full h-[70vh] min-h-[600px] overflow-hidden bg-black flex items-center justify-center">
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover opacity-60"
                >
                    <source src="/video1.mp4" type="video/mp4" />
                </video>
                <div className="relative z-10 container mx-auto px-6 text-center max-w-4xl pt-20">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-6 leading-tight"
                    >
                        VinaUAV – Nền tảng học lập trình Drone dành cho sinh viên
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="text-lg md:text-xl text-gray-200 font-light max-w-3xl mx-auto"
                    >
                        Việc tiếp cận các hệ sinh thái UAV như PX4 hay ArduPilot thường gặp rào cản do kiến trúc
                        phần mềm phức tạp và các lớp hệ điều hành thời gian thực (RTOS) đồ sộ. VinaUAV ra đời
                        nhằm giải quyết bài toán này: Cung cấp nền tảng Flight Controller (FC) phục vụ giáo dục đi
                        kèm Firmware mã nguồn mở 100%, cho phép người dùng can thiệp trực tiếp vào lớp điều khiển
                        thấp (Low-level Control) qua môi trường Arduino IDE.
                    </motion.p>
                </div>
                {/* Scroll Indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1, duration: 1 }}
                    className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center"
                >
                    <span className="text-white/60 text-sm mb-2 tracking-widest uppercase">Khám phá</span>
                    <div className="w-[1px] h-12 bg-white/30 overflow-hidden">
                        <motion.div
                            className="w-full h-1/2 bg-white"
                            animate={{ y: ["-100%", "200%"] }}
                            transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                        />
                    </div>
                </motion.div>
            </div>

            {/* Mission Details Section */}
            <div className="container mx-auto px-6 mt-24 max-w-6xl">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                    {/* Features (Đặc điểm thiết kế) */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={fadeInLeft}
                    >
                        <h2 className="text-3xl font-bold tracking-tight mb-8">Đặc điểm thiết kế</h2>
                        <ul className="space-y-6">
                            {[
                                "Lập trình trực tiếp bằng ngôn ngữ C/C++ trên Arduino IDE.",
                                "Mã nguồn cấu trúc rõ ràng, dễ đọc và dễ chỉnh sửa.",
                                "Phù hợp cho sinh viên Điện tử, Tự động hóa, Cơ điện tử nghiên cứu và làm đồ án.",
                                "Tập trung vào việc thấu hiểu thuật toán cốt lõi thay vì sử dụng các \"hộp đen\" có sẵn.",
                            ].map((feature, i) => (
                                <li key={i} className="flex gap-4 items-start">
                                    <CheckCircle2 className="w-6 h-6 text-slate-800 shrink-0 mt-0.5" strokeWidth={1.5} />
                                    <span className="text-gray-600 text-lg">{feature}</span>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Goals (Mục tiêu) */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={fadeInUp}
                    >
                        <h2 className="text-3xl font-bold tracking-tight mb-8">Mục tiêu</h2>
                        <div className="bg-slate-50 rounded-3xl p-8 border border-slate-100">
                            <ul className="space-y-6">
                                {[
                                    "Lập trình thuật toán bay cân bằng (Stabilize).",
                                    "Lập trình giữ vị trí (Position Hold) kết hợp GPS hoặc Optical Flow.",
                                    "Xử lý Sensor Fusion và phát triển các hệ thống UAV.",
                                ].map((goal, i) => (
                                    <li key={i} className="flex gap-4 items-center">
                                        <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center shrink-0">
                                            <Target className="w-5 h-5 text-gray-900" strokeWidth={1.5} />
                                        </div>
                                        <span className="text-gray-800 text-lg font-medium">{goal}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
