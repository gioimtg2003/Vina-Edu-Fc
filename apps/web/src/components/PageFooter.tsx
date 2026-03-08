"use client";

import { motion } from "framer-motion";

export default function PageFooter() {
    const footerLinks = [
        { name: "Công nghệ", href: "#technology", title: "ESP32 Drone Flight Controller Technology" },
        { name: "Giáo dục", href: "#education", title: "Educational Drone Platform" },
        { name: "Đối tác", href: "#partnerships", title: "Drone Development Partnerships" },
        { name: "Liên hệ", href: "#contact", title: "Contact Vina Edu FC" },
    ];

    return (
        <footer
            role="contentinfo"
            aria-label="Footer - VINA EDU FC - Open Source Drone Flight Controller Vietnam"
            className="border-t border-slate-800/60 bg-slate-900/80 mt-20 relative z-10 overflow-hidden"
        >
            {/* Subtle glow effect in footer */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-2xl h-[1px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" aria-hidden="true"></div>

            <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col items-center text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-6"
                >
                    <div className="text-2xl font-bold tracking-tighter opacity-80 mb-2">
                        VINA EDU FC
                    </div>
                    <p className="text-slate-400 text-sm max-w-md mx-auto mb-4">
                        Tiếp sức cho thế hệ kỹ sư drone Việt Nam — mạch điều khiển drone mã nguồn mở, nền tảng drone nghiên cứu lý tưởng cho sinh viên và kỹ sư.
                    </p>
                    {/* Internal navigation links for SEO */}
                    <nav aria-label="Footer navigation" className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm">
                        {footerLinks.map((link) => (
                            <a
                                key={link.href}
                                href={link.href}
                                title={link.title}
                                className="text-slate-500 hover:text-cyan-400 transition-colors"
                            >
                                {link.name}
                            </a>
                        ))}
                    </nav>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="text-xs text-slate-500 font-mono"
                >
                    © {new Date().getFullYear()} Vina Edu FC · Open Source Drone Flight Controller · Made in Vietnam. Mọi quyền được bảo lưu.
                </motion.div>
            </div>
        </footer>
    );
}

