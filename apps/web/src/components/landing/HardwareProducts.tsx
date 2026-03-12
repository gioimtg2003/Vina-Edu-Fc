"use client";

import { motion, Variants } from "framer-motion";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import { PRODUCTS } from "@/lib/products";

const fadeUp: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

export default function HardwareProducts() {
    return (
        <section id="products" className="relative py-24 bg-white text-gray-900 border-t border-slate-200 overflow-hidden">
            <div className="container mx-auto px-6 max-w-7xl">
                {/* Header */}
                <div className="text-center mb-16 max-w-3xl mx-auto">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={fadeUp}
                    >
                        <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 text-gray-900">
                            Sản phẩm & Phần cứng
                        </h2>
                        <p className="text-xl text-gray-500 font-light leading-relaxed">
                            Hệ sinh thái bo mạch VinaFC được tối ưu hóa cho quá trình học tập, đi kèm hệ thống thư
                            viện hỗ trợ tương thích với Arduino IDE.
                        </p>
                    </motion.div>
                </div>

                {/* Products Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {PRODUCTS.map((product, index) => (
                        <Link href={`/san-pham/${product.id}`} key={product.id} className="block group">
                            <motion.div
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, margin: "-50px" }}
                                variants={fadeUp}
                                whileHover={{ scale: 1.03 }}
                                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 flex flex-col h-[450px] border border-slate-100"
                            >
                                {/* Image Half - 70% Height */}
                                <div className="h-[70%] w-full relative bg-slate-50 flex items-center justify-center p-8">
                                    <div className="relative w-full h-full transform group-hover:scale-110 transition-transform duration-700 ease-out">
                                        <Image
                                            src="/fc_board.jpg"
                                            alt={product.name}
                                            fill
                                            className="object-contain drop-shadow-xl"
                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                            priority={index === 0}
                                        />
                                    </div>
                                </div>

                                {/* Content Half - 30% Height */}
                                <div className="h-[30%] p-6 flex flex-col items-center justify-center gap-4 bg-white">
                                    <h3 className="tracking-tight text-gray-900 text-center text-lg">
                                        {product.name}
                                    </h3>
                                    <span className="font-bold">
                                        Xem ngay
                                    </span>
                                </div>
                            </motion.div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
