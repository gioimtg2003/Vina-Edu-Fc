"use client";

import { motion } from "framer-motion";
import { Mail, Phone } from "lucide-react";
import Link from "next/link";

export default function FooterContact() {
    return (
        <footer id="support" className="relative bg-white text-gray-900 border-t border-slate-100 py-24">
            <div className="container mx-auto px-6 max-w-6xl">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-8 items-center">
                    
                    {/* Left Column: CTA */}
                    <div className="col-span-1">
                        <motion.div 
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <h2 className="text-3xl lg:text-4xl font-bold tracking-tight mb-6">Liên hệ & Trợ giúp</h2>
                            <p className="text-lg text-gray-500 font-light leading-relaxed max-w-md mb-8">
                                Để nhận hỗ trợ về kỹ thuật lập trình, tư vấn linh kiện hoặc đăng ký khóa học, vui lòng liên hệ đội ngũ VinaUAV:
                            </p>
                            
                            <div className="space-y-6">
                                <a 
                                    href="mailto:quymom941478@gmail.com"
                                    className="flex items-center gap-4 group"
                                >
                                    <div className="w-12 h-12 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center group-hover:bg-gray-900 group-hover:text-white transition-colors duration-300">
                                        <Mail className="w-5 h-5" strokeWidth={1.5} />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-400 uppercase tracking-widest font-medium mb-1">Email</p>
                                        <p className="text-lg font-medium text-gray-800 group-hover:text-gray-900 transition-colors">quymom941478@gmail.com</p>
                                    </div>
                                </a>
                                
                                <a 
                                    href="tel:0817550271"
                                    className="flex items-center gap-4 group"
                                >
                                    <div className="w-12 h-12 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center group-hover:bg-gray-900 group-hover:text-white transition-colors duration-300">
                                        <Phone className="w-5 h-5" strokeWidth={1.5} />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-400 uppercase tracking-widest font-medium mb-1">SĐT / Zalo</p>
                                        <p className="text-lg font-medium text-gray-800 group-hover:text-gray-900 transition-colors">0817.550.271</p>
                                    </div>
                                </a>
                            </div>
                        </motion.div>
                    </div>

                    {/* Right Column: Clean Logo Area */}
                    <div className="col-span-1 flex flex-col items-start md:items-end justify-center">
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="bg-slate-50 py-16 px-12 rounded-3xl w-full max-w-md border border-slate-100 flex flex-col items-center justify-center text-center"
                        >
                            <h3 className="text-4xl font-black tracking-tighter text-gray-900 mb-4">VinaUAV</h3>
                            <p className="text-gray-500 font-light max-w-[200px]">Nền tảng học lập trình Drone dành cho sinh viên</p>
                        </motion.div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-24 pt-8 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between text-sm text-gray-400 font-light">
                    <p>© {new Date().getFullYear()} VinaUAV. Vietnam Open-source Flight Controller.</p>
                    <div className="flex gap-6 mt-4 md:mt-0">
                        <Link href="#" className="hover:text-gray-900 transition-colors">Chính sách bảo mật</Link>
                        <Link href="#" className="hover:text-gray-900 transition-colors">Điều khoản dịch vụ</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
