"use client";

import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    const navLinks = [
        { name: "Công nghệ", href: "#technology" },
        { name: "Giáo dục", href: "#education" },
        { name: "Đối tác", href: "#partnerships" },
        { name: "Liên hệ", href: "#contact" },
    ];

    return (
        <nav aria-label="Điều hướng chính" className="fixed top-0 left-0 right-0 z-50 glass border-b shadow-lg shadow-cyan-900/10">
            <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between relative">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-2xl font-bold tracking-tighter"
                >
                    <a href="#hero" aria-label="VINA EDU FC - Trang chủ">
                        <span className="text-white">VINA EDU</span>
                        <span className="text-cyan-400 ml-1">FC</span>
                    </a>
                </motion.div>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center space-x-8">
                    {navLinks.map((link, i) => (
                        <motion.a
                            key={link.name}
                            href={link.href}
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="text-sm font-medium text-slate-300 hover:text-cyan-400 transition-colors"
                        >
                            {link.name}
                        </motion.a>
                    ))}
                    <motion.a
                        href="#contact"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.4 }}
                        className="px-5 py-2 cursor-pointer rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/50 hover:bg-cyan-500/20 hover:shadow-[0_0_15px_-3px_rgba(6,182,212,0.4)] transition-all font-medium text-sm"
                        aria-label="Đăng ký nhận hàng trước"
                    >
                        Đặt hàng trước
                    </motion.a>
                </div>

                {/* Mobile menu button */}
                <div className="md:hidden">
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="text-slate-300"
                        aria-label={isOpen ? "Đóng menu" : "Mở menu điều hướng"}
                        aria-expanded={isOpen}
                    >
                        {isOpen ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
                    </button>
                </div>
            </div>

            {/* Mobile Nav Dropdown */}
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="md:hidden absolute top-full left-0 right-0 glass border-b p-4 flex flex-col space-y-4 shadow-xl"
                    role="menu"
                >
                    {navLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            onClick={() => setIsOpen(false)}
                            className="text-slate-300 hover:text-cyan-400 font-medium px-4 py-2"
                            role="menuitem"
                        >
                            {link.name}
                        </a>
                    ))}
                </motion.div>
            )}
        </nav>
    );
}
