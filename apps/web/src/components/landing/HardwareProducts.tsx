"use client";

import { motion, Variants } from "framer-motion";
import { ChevronRight, Cpu } from "lucide-react";
import Image from "next/image";

const products = [
    {
        name: "VinaFC 1",
        version: "Bản Cơ bản",
        description:
            "Nền tảng khởi đầu giúp sinh viên thực hành thuật toán PID, Sensor Fusion và bay tự động cơ bản.",
        specs: [
            { label: "Vi điều khiển", value: "ESP32 (Dual core 240MHz)" },
            { label: "Cảm biến", value: "IMU ICM20602 (Accel + Gyro), Baro BMP388" },
            { label: "Ngoại vi", value: "2 cổng UART, hỗ trợ phần cứng GPS và Optical Flow (MTF01/MAVLink APM)" },
        ],
        price: "Mạch PCB: 250k | Hoàn thiện: 600k",
        image: "/fc_board.jpg",
    },
    {
        name: "VinaFC 1 Plus",
        version: "Bản Nâng cấp",
        description:
            "Cải thiện độ ổn định và độ tin cậy của dữ liệu với cảm biến chuẩn công nghiệp, đáp ứng môi trường phức tạp.",
        specs: [
            { label: "Vi điều khiển", value: "ESP32 (Dual core 240MHz)" },
            { label: "Cảm biến", value: "IMU BMI088 (Chuẩn CN), Baro BMP388" },
            { label: "Ngoại vi", value: "2 cổng UART, hỗ trợ phần cứng GPS và Optical Flow" },
        ],
        price: "Mạch PCB: 250k | Hoàn thiện: 700k",
        image: "/fc_board.jpg",
    },
    {
        name: "VinaFC 1 Pro",
        version: "Bản Chuyên sâu",
        description:
            "Phiên bản hiệu năng cao, trang bị hệ thống IMU kép, đáp ứng yêu cầu xử lý đồ án chuyên sâu và UAV phức tạp.",
        specs: [
            { label: "Vi điều khiển", value: "Teensy 4.1 (600MHz)" },
            { label: "Cảm biến kép", value: "BMI088 + ICM45686, Baro BMP388" },
            { label: "Ngoại vi", value: "7 cổng UART, hỗ trợ GPS và Optical Flow" },
        ],
        price: "Hoàn thiện: 3.000.000 VNĐ",
        image: "/fc_board.jpg",
    },
];

const fadeUp: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

export default function HardwareProducts() {
    return (
        <section className="relative py-32 bg-white text-gray-900 border-t border-slate-200 overflow-hidden">
            <div className="container mx-auto px-6 max-w-7xl">
                {/* Header */}
                <div className="text-center mb-24 max-w-3xl mx-auto">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={fadeUp}
                    >
                        <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-8 text-gray-900">
                            Sản phẩm & Phần cứng
                        </h2>
                        <p className="text-xl text-gray-500 font-light leading-relaxed">
                            Hệ sinh thái bo mạch VinaFC được tối ưu hóa cho quá trình học tập, đi kèm hệ thống thư
                            viện hỗ trợ tương thích với Arduino IDE.
                        </p>
                    </motion.div>
                </div>

                {/* Products Array */}
                <div className="space-y-32">
                    {products.map((product, index) => {
                        const isEven = index % 2 === 0;

                        return (
                            <motion.div
                                key={product.name}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, margin: "-100px" }}
                                variants={fadeUp}
                                className={`flex flex-col md:flex-row items-center gap-12 lg:gap-20 ${isEven ? "" : "md:flex-row-reverse"
                                    }`}
                            >
                                {/* Image Half */}
                                <div className="w-full md:w-1/2 group relative">
                                    <div className="absolute inset-0 bg-slate-100 rounded-3xl transform group-hover:scale-105 transition-transform duration-700 ease-out -z-10" />
                                    <div className="relative aspect-square md:aspect-[4/3] w-full rounded-3xl overflow-hidden bg-slate-50 flex items-center justify-center p-8">
                                        {/* Mock image container to mimic DJI product shot */}
                                        <div className="relative w-full h-full transform group-hover:scale-110 transition-transform duration-1000 ease-out">
                                            <Image
                                                src={product.image}
                                                alt={product.name}
                                                fill
                                                className="object-contain filter drop-shadow-2xl"
                                                sizes="(max-width: 768px) 100vw, 50vw"
                                                priority={index === 0}
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Text Half */}
                                <div className="w-full md:w-1/2 flex flex-col justify-center">
                                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100/80 text-gray-600 text-sm font-medium mb-6 w-fit">
                                        <Cpu className="w-4 h-4" />
                                        <span>Flight Controller / C/C++</span>
                                    </div>

                                    <h3 className="text-4xl lg:text-5xl font-bold tracking-tight mb-2 text-gray-900">
                                        {product.name}
                                    </h3>
                                    <p className="text-xl font-light text-gray-500 mb-6 uppercase tracking-wider">
                                        {product.version}
                                    </p>

                                    <p className="text-lg text-gray-600 font-light leading-relaxed mb-8">
                                        {product.description}
                                    </p>

                                    {/* Tech Specs Bento-style */}
                                    <div className="grid grid-cols-1 gap-4 mb-10">
                                        {product.specs.map((spec, i) => (
                                            <div
                                                key={i}
                                                className="flex flex-col py-3 border-b border-gray-100"
                                            >
                                                <span className="text-sm font-medium text-gray-900 mb-1 tracking-wider uppercase">
                                                    {spec.label}
                                                </span>
                                                <span className="text-gray-500 font-light">{spec.value}</span>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                                        <div className="flex flex-col">
                                            <span className="text-sm font-medium text-gray-500 uppercase tracking-widest mb-1">
                                                Giá bán lẻ
                                            </span>
                                            <span className="text-xl font-bold text-gray-900">
                                                {product.price}
                                            </span>
                                        </div>
                                        <button className="flex items-center justify-center gap-2 bg-gray-900 text-white px-8 py-4 rounded-full font-medium hover:bg-black transition-colors hover:shadow-lg group">
                                            MUA NGAY
                                            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
