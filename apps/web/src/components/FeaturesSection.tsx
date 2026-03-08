"use client";

import { motion } from "framer-motion";
import { Crosshair, MonitorSmartphone, Wifi } from "lucide-react";

export default function FeaturesSection() {
    const features = [
        {
            title: "Bay Ổn Định & Giữ Vị Trí Chính Xác",
            description: "Sự kết hợp giữa cảm biến ICM20602 IMU, BMP388 barometer và module LiDAR quang lưu giúp drone có khả năng hover cực kỳ ổn định, giữ vị trí chính xác ngay cả trong điều kiện nhiễu động.",
            icon: <Crosshair className="w-8 h-8" />,
            color: "from-cyan-500/20 to-blue-500/20",
            iconColor: "text-cyan-400",
            borderColor: "group-hover:border-cyan-500/50",
            glowColor: "group-hover:shadow-[0_0_30px_-5px_rgba(6,182,212,0.3)]"
        },
        {
            title: "Hệ Sinh Thái “Cắm Là Bay”",
            description: "Ứng dụng thiết lập trên máy tính cho phép người dùng cấu hình PID và các thông số bay một cách trực quan, giúp drone sẵn sàng cất cánh mà không cần viết bất kỳ dòng code nào.",
            icon: <MonitorSmartphone className="w-8 h-8" />,
            color: "from-purple-500/20 to-pink-500/20",
            iconColor: "text-purple-400",
            borderColor: "group-hover:border-purple-500/50",
            glowColor: "group-hover:shadow-[0_0_30px_-5px_rgba(168,85,247,0.3)]"
        },
        {
            title: "Sức Mạnh Từ ESP32",
            description: "Sử dụng vi điều khiển ESP32 với xung nhịp cao, tích hợp WiFi và Bluetooth, mang lại khả năng xử lý mạnh mẽ trong khi vẫn giữ chi phí phần cứng ở mức rất hợp lý.",
            icon: <Wifi className="w-8 h-8" />,
            color: "from-emerald-500/20 to-cyan-500/20",
            iconColor: "text-emerald-400",
            borderColor: "group-hover:border-emerald-500/50",
            glowColor: "group-hover:shadow-[0_0_30px_-5px_rgba(16,185,129,0.3)]"
        }
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.2 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: "easeOut" as any }
        }
    };

    return (
        <section id="technology" aria-label="Công nghệ ESP32 drone flight controller - Tính năng nổi bật Vina Edu FC" className="py-24 relative bg-slate-900 border-t border-slate-800">
            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <div className="text-purple-400 font-mono text-sm tracking-widest uppercase mb-3">Năng Lực Công Nghệ</div>
                    <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
                        ESP32 Drone Flight Controller — Công Nghệ Hiện Đại
                    </h2>
                    <p className="text-slate-400 max-w-2xl mx-auto text-lg">
                        Được xây dựng trên nền tảng cảm biến tiên tiến, bộ vi xử lý ESP32 mạnh mẽ, mang đến hiệu năng đạt chuẩn chuyên nghiệp nhưng vẫn dễ tiếp cận cho cộng đồng maker, sinh viên và kỹ sư tại Việt Nam.
                    </p>

                </motion.div>

                <motion.div
                    className="grid md:grid-cols-3 gap-8"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                >
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            variants={itemVariants}
                            whileHover={{ y: -10 }}
                            className={`group glass p-8 rounded-3xl border border-slate-700 transition-all duration-300 relative overflow-hidden ${feature.borderColor} ${feature.glowColor}`}
                        >
                            <div className={`absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none ${feature.color}`}></div>

                            {/* Animated border effect */}
                            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/50 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>

                            <div className={`w-16 h-16 rounded-2xl bg-slate-800/80 flex items-center justify-center mb-6 shadow-lg border border-slate-700/50 ${feature.iconColor}`}>
                                {feature.icon}
                            </div>

                            <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-slate-400 transition-colors">
                                {feature.title}
                            </h3>

                            <p className="text-slate-400 leading-relaxed font-light group-hover:text-slate-300 transition-colors">
                                {feature.description}
                            </p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
