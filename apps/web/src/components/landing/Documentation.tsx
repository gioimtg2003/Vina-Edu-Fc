"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, BookOpen } from "lucide-react";

const docs = [
    {
        title: "Hướng dẫn lắp ráp phần cứng",
        content: "Sơ đồ kết nối khung (Frame), ESC, Motor và Flight Controller chi tiết từng bước, giúp đảm bảo tính tương thích và an toàn cho hệ thống chuẩn UAV.",
    },
    {
        title: "Hướng dẫn cấu hình phần mềm",
        content: "Cài đặt Driver, kết nối bo mạch với phần mềm VinaUAV GCS và thiết lập thông số ban đầu (thay vì Mission Planner gốc để đơn giản hóa quá trình học tập).",
    },
    {
        title: "Hướng dẫn Tune PID",
        content: "Phân tích nguyên lý phản hồi P-I-D, quy trình tinh chỉnh thông số trực giao và tối ưu hóa độ ổn định của hệ thống trên Arduino IDE.",
    },
    {
        title: "Hệ thống thư viện lập trình",
        content: "Thư viện VinaUAV mã nguồn mở được tối ưu hoàn toàn cho C/C++ giúp sinh viên dễ dàng gọi hàm điều khiển động cơ, đọc IMU mà không cần tốn nhiều tuần để nghiên cứu datasheet.",
    },
];

export default function Documentation() {
    const [activeIndex, setActiveIndex] = useState<number | null>(0);

    return (
        <section id="docs" className="relative py-32 bg-slate-50 text-gray-900 border-t border-slate-200">
            <div className="container mx-auto px-6 max-w-4xl">
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="inline-flex items-center justify-center p-4 rounded-full bg-white shadow-sm mb-6"
                    >
                        <BookOpen className="w-8 h-8 text-gray-800" strokeWidth={1.5} />
                    </motion.div>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-4xl font-bold tracking-tight mb-6"
                    >
                        Tài liệu kỹ thuật
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-lg text-gray-500 font-light"
                    >
                        Hệ thống tài liệu mở hỗ trợ người học trong quá trình triển khai dự án:
                    </motion.p>
                </div>

                <div className="space-y-4">
                    {docs.map((doc, index) => {
                        const isActive = activeIndex === index;
                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className={`bg-white border rounded-2xl overflow-hidden transition-all duration-300 ${
                                    isActive ? "border-slate-300 shadow-md" : "border-slate-100 hover:border-slate-200"
                                }`}
                            >
                                <button
                                    onClick={() => setActiveIndex(isActive ? null : index)}
                                    className="w-full flex items-center justify-between p-6 md:p-8 text-left focus:outline-none"
                                >
                                    <span className={`text-xl font-bold tracking-tight transition-colors ${isActive ? 'text-gray-900' : 'text-gray-600'}`}>
                                        {doc.title}
                                    </span>
                                    {isActive ? (
                                        <Minus className="w-5 h-5 text-gray-400 shrink-0" />
                                    ) : (
                                        <Plus className="w-5 h-5 text-gray-400 shrink-0" />
                                    )}
                                </button>
                                <AnimatePresence initial={false}>
                                    {isActive && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3, ease: "easeInOut" }}
                                        >
                                            <div className="px-6 pb-8 md:px-8 text-lg font-light text-gray-500 leading-relaxed border-t border-slate-50 pt-4">
                                                {doc.content}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
