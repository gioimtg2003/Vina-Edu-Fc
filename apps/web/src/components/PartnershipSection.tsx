"use client";

import { motion } from "framer-motion";
import { Activity, Beaker, Briefcase, Lightbulb } from "lucide-react";

export default function PartnershipSection() {
    const audiences = [
        {
            title: "Nhà Đầu Tư Công Nghệ Phần Cứng",
            description: "Cùng mở rộng sản xuất công nghệ cao trong nước với nền tảng phần cứng đã được thiết kế để có khả năng mở rộng và thương mại hóa.",
            icon: <Briefcase className="w-8 h-8" />,
            color: "border-cyan-500/30 group-hover:border-cyan-400 group-hover:bg-cyan-500/5",
            iconColor: "text-cyan-400 bg-cyan-500/10",
        },
        {
            title: "Trường Đại Học & Cao Đẳng",
            description: "Ứng dụng nền tảng drone hiện đại vào giảng dạy, nghiên cứu và phòng thí nghiệm kỹ thuật hàng không – robotics.",
            icon: <Activity className="w-8 h-8" />,
            color: "border-purple-500/30 group-hover:border-purple-400 group-hover:bg-purple-500/5",
            iconColor: "text-purple-400 bg-purple-500/10",
        },
        {
            title: "Cộng Đồng Maker",
            description: "Tự do sáng tạo và phát triển drone, robot và các dự án công nghệ cá nhân trên hệ sinh thái mở, dễ tùy chỉnh.",
            icon: <Lightbulb className="w-8 h-8" />,
            color: "border-pink-500/30 group-hover:border-pink-400 group-hover:bg-pink-500/5",
            iconColor: "text-pink-400 bg-pink-500/10",
        },
        {
            title: "Phòng Thí Nghiệm Robotics",
            description: "Tăng tốc quá trình nghiên cứu và thử nghiệm drone tự hành với hệ thống điều khiển bay ổn định cùng sức mạnh từ ESP32.",
            icon: <Beaker className="w-8 h-8" />,
            color: "border-emerald-500/30 group-hover:border-emerald-400 group-hover:bg-emerald-500/5",
            iconColor: "text-emerald-400 bg-emerald-500/10",
        }
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.15 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
    };

    return (
        <section id="partnerships" aria-label="Đối tượng hợp tác phát triển Vina Edu FC" className="py-24 relative bg-slate-900 border-t border-slate-800">
            <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-slate-950 to-transparent pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <div className="text-pink-400 font-mono text-sm tracking-widest uppercase mb-3">Hợp Tác Phát Triển</div>
                    <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">Chúng Tôi Xây Dựng Cho Ai</h2>
                    <p className="text-slate-400 max-w-2xl mx-auto text-lg">
                        Vina Edu FC là một nền tảng linh hoạt, được thiết kế để phục vụ nhiều lĩnh vực trong hệ sinh thái công nghệ drone.
                    </p>
                </motion.div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
                >
                    {audiences.map((audience, index) => (
                        <motion.div
                            key={index}
                            variants={itemVariants}
                            whileHover={{ y: -5, scale: 1.02 }}
                            className={`group glass p-6 rounded-2xl border transition-all duration-300 cursor-pointer ${audience.color}`}
                        >
                            <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition-colors ${audience.iconColor}`}>
                                {audience.icon}
                            </div>
                            <h3 className="text-xl font-bold mb-3 text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-slate-300 transition-all">
                                {audience.title}
                            </h3>
                            <p className="text-slate-400 text-sm leading-relaxed">
                                {audience.description}
                            </p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
