"use client";

import { motion, Variants } from "framer-motion";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

export default function HeroMission() {
    return (
        <section className="relative w-full bg-white text-gray-900 pb-20">
            <div className="relative w-full h-screen min-h-[700px] overflow-hidden bg-[#111] flex flex-col justify-end pb-32">
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover opacity-80"
                >
                    <source src="/video1.mp4" type="video/mp4" />
                </video>

                {/* Overlay text bottom aligned (DJI style) */}
                <div className="relative z-10 w-full flex flex-col items-center justify-center text-center px-6 mt-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="mb-8"
                    >
                        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-4 drop-shadow-lg">
                            VinaUAV
                        </h1>
                        <p className="text-xl md:text-3xl text-gray-200 font-light drop-shadow-md">
                            Nền tảng học lập trình Drone dành cho sinh viên
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="flex flex-col sm:flex-row gap-6 mt-4"
                    >
                        <Link
                            href="#products"
                            className="group flex items-center justify-center gap-2 bg-white text-gray-900 px-8 py-3 rounded-full font-medium hover:bg-gray-100 transition-colors duration-300"
                        >
                            Khám phá sản phẩm
                            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <Link
                            href="#courses"
                            className="group flex items-center justify-center gap-2 bg-transparent text-white border border-white px-8 py-3 rounded-full font-medium hover:bg-white/10 transition-colors duration-300"
                        >
                            Tìm hiểu thêm
                            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </motion.div>
                </div>
            </div>

            {/* Mission Details Section (Scroll Reveal) */}
            <div className="container mx-auto px-6 mt-32 max-w-5xl text-center">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={fadeInUp}
                    className="max-w-4xl mx-auto"
                >
                    <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-8">Kiến tạo tương lai UAV Việt Nam</h2>
                    <p className="text-xl text-gray-500 font-light leading-relaxed mb-16">
                        Việc tiếp cận các hệ sinh thái UAV như PX4 hay ArduPilot thường gặp rào cản do kiến trúc phần mềm phức tạp. VinaUAV giải quyết bài toán này bằng việc cung cấp nền tảng Flight Controller phục vụ giáo dục với phần cứng tối ưu và thư viện lập trình C/C++ trực tiếp qua Arduino IDE.
                    </p>
                </motion.div>

                {/* Grid Layout mimicking DJI's feature highlights */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left mt-12">
                    {/* Bento Box 1 */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={fadeInUp}
                        className="bg-slate-50 rounded-3xl p-10 md:p-14 h-full flex flex-col justify-center border border-slate-100 transition-all hover:bg-slate-100"
                    >
                        <h3 className="text-2xl font-bold tracking-tight mb-4">Đặc điểm thiết kế</h3>
                        <p className="text-gray-600 mb-6 font-light leading-relaxed">
                            Lập trình trực tiếp bằng ngôn ngữ C/C++ trên Arduino IDE. Mã nguồn cấu trúc rõ ràng, tập trung vào thấu hiểu thuật toán cốt lõi thay vì sử dụng các hệ thống &quot;hộp đen&quot;.
                        </p>
                        <Link href="#docs" className="text-gray-900 font-medium inline-flex items-center gap-1 hover:underline mt-auto">
                            Xem tài liệu <ChevronRight className="w-4 h-4" />
                        </Link>
                    </motion.div>

                    {/* Bento Box 2 */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={fadeInUp}
                        className="bg-gray-900 text-white rounded-3xl p-10 md:p-14 h-full flex flex-col justify-center transition-all hover:bg-black"
                    >
                        <h3 className="text-2xl font-bold tracking-tight mb-4 text-white">Mục tiêu đào tạo</h3>
                        <p className="text-gray-300 mb-6 font-light leading-relaxed">
                            Nắm vững lý thuyết phản hồi P-I-D, xử lý Sensor Fusion, lập trình thuật toán cân bằng (Stabilize) và giữ vị trí tĩnh (Position Hold) kết hợp GPS hoặc Optical Flow.
                        </p>
                        <Link href="#courses" className="text-white font-medium inline-flex items-center gap-1 hover:underline mt-auto">
                            Khám phá khóa học <ChevronRight className="w-4 h-4" />
                        </Link>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
