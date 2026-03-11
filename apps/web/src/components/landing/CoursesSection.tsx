"use client";

import { motion } from "framer-motion";
import { Wrench, Cpu, MapPin, GraduationCap } from "lucide-react";

const fadeUpVariant = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: { delay: i * 0.15, duration: 0.6, ease: "easeOut" },
    }),
};

const courses = [
    {
        title: "Khóa học Setup Drone (Pixhawk & Mission Planner)",
        description:
            "Hướng dẫn lắp ráp phần cứng, đấu nối thiết bị, cấu hình Mission Planner, calibrate cảm biến và setup các chế độ bay tiêu chuẩn. (Phù hợp cho người mới bắt đầu).",
        icon: Wrench,
    },
    {
        title: "Khóa học Lập trình bay cân bằng",
        description:
            "Phân tích nguyên lý hoạt động, đọc dữ liệu thô từ IMU, thiết kế thuật toán PID và lập trình bay cân bằng trực tiếp trên Arduino IDE.",
        icon: Cpu,
    },
    {
        title: "Khóa học Lập trình bay giữ vị trí",
        description:
            "Tích hợp Optical Flow, xử lý kết hợp dữ liệu (IMU + Optical flow) và thiết kế thuật toán giữ vị trí tĩnh ngoài trời.",
        icon: MapPin,
    },
    {
        title: "Khóa học Tổng hợp (Autopilot Development)",
        description:
            "Cung cấp kiến thức toàn diện để thiết kế và lập trình một hệ thống điều khiển bay (Autopilot) hoàn chỉnh từ con số không.",
        icon: GraduationCap,
    },
];

export default function CoursesSection() {
    return (
        <section className="relative py-32 bg-slate-50 text-gray-900 border-t border-slate-200">
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
                        Khóa học lập trình Drone
                    </motion.h2>
                    <motion.p
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-50px" }}
                        variants={fadeUpVariant}
                        custom={1}
                        className="text-lg md:text-xl text-gray-500 font-light leading-relaxed"
                    >
                        VinaUAV cung cấp các khóa học thực hành 1 kèm 1, giúp sinh viên và kỹ sư nắm vững hệ thống
                        UAV từ phần cứng đến thuật toán phần mềm.
                    </motion.p>
                </div>

                {/* Courses Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                    {courses.map((course, i) => (
                        <motion.div
                            key={i}
                            custom={i + 2}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-50px" }}
                            variants={fadeUpVariant}
                            whileHover={{ y: -8, transition: { duration: 0.3 } }}
                            className="group bg-white rounded-3xl p-10 shadow-sm hover:shadow-xl border border-slate-100 transition-all duration-300"
                        >
                            <div className="w-14 h-14 rounded-2xl bg-gray-50 flex items-center justify-center mb-8 group-hover:bg-slate-900 group-hover:text-white transition-colors duration-500">
                                <course.icon className="w-7 h-7" strokeWidth={1.5} />
                            </div>
                            <h3 className="text-2xl font-bold tracking-tight mb-4 group-hover:text-slate-900">
                                {course.title}
                            </h3>
                            <p className="text-gray-500 font-light leading-relaxed text-lg">
                                {course.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
