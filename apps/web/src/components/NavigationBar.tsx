"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Search, User, ShoppingCart } from "lucide-react";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function NavigationBar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        // Initial check
        handleScroll();
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { name: "Sản phẩm", href: "#products" },
        { name: "Khóa học", href: "#courses" },
        { name: "Tài liệu", href: "#docs" },
        { name: "Hỗ trợ", href: "#support" },
    ];

    return (
        <nav
            aria-label="Điều hướng chính"
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white/70 ${scrolled ? "bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-sm" : "bg-transparent"
                }`}
        >
            <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between relative">
                {/* Logo Area */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="flex-shrink-0 flex items-center"
                >
                    <Link href="/" className="text-2xl font-black tracking-tighter" aria-label="VinaUAV - Trang chủ">
                        <span className={`transition-colors duration-300 text-gray-900`}>Vina</span>
                        <span className={`transition-colors duration-300 text-gray-500`}>UAV</span>
                    </Link>
                </motion.div>

                {/* Desktop Nav Center */}
                <div className="hidden md:flex items-center justify-center space-x-10 absolute left-1/2 -translate-x-1/2">
                    {navLinks.map((link, i) => (
                        <motion.a
                            key={link.name}
                            href={link.href}
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1, duration: 0.5 }}
                            className={`text-sm font-medium transition-colors hover:text-black ${scrolled ? 'text-gray-600' : 'text-gray-800'
                                }`}
                        >
                            {link.name}
                        </motion.a>
                    ))}
                </div>

                {/* Desktop Right Utilities */}
                <div className="hidden md:flex items-center space-x-6 justify-end">
                    <button aria-label="Tìm kiếm" className={`hover:text-black transition-colors ${scrolled ? 'text-gray-600' : 'text-gray-800'}`}>
                        <Search className="w-5 h-5" strokeWidth={1.5} />
                    </button>
                    <button aria-label="Giỏ hàng" className={`hover:text-black transition-colors ${scrolled ? 'text-gray-600' : 'text-gray-800'}`}>
                        <ShoppingCart className="w-5 h-5" strokeWidth={1.5} />
                    </button>
                    <button aria-label="Tài khoản" className={`hover:text-black transition-colors ${scrolled ? 'text-gray-600' : 'text-gray-800'}`}>
                        <User className="w-5 h-5" strokeWidth={1.5} />
                    </button>
                </div>

                {/* Mobile menu button */}
                <div className="md:hidden flex items-center">
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className={`transition-colors ${scrolled ? 'text-gray-900' : 'text-gray-900'}`}
                        aria-label={isOpen ? "Đóng menu" : "Mở menu điều hướng"}
                        aria-expanded={isOpen}
                    >
                        {isOpen ? <X size={24} strokeWidth={1.5} /> : <Menu size={24} strokeWidth={1.5} />}
                    </button>
                </div>
            </div>

            {/* Mobile Nav Dropdown */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="md:hidden bg-white border-b border-gray-100 overflow-hidden"
                        role="menu"
                    >
                        <div className="px-6 py-4 flex flex-col space-y-6">
                            {navLinks.map((link) => (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    onClick={() => setIsOpen(false)}
                                    className="text-lg text-gray-800 font-medium hover:text-black transition-colors"
                                    role="menuitem"
                                >
                                    {link.name}
                                </a>
                            ))}
                            <div className="flex items-center gap-6 pt-6 border-t border-gray-100">
                                <button aria-label="Tìm kiếm" className="text-gray-600 hover:text-black transition-colors">
                                    <Search className="w-6 h-6" strokeWidth={1.5} />
                                </button>
                                <button aria-label="Giỏ hàng" className="text-gray-600 hover:text-black transition-colors">
                                    <ShoppingCart className="w-6 h-6" strokeWidth={1.5} />
                                </button>
                                <button aria-label="Tài khoản" className="text-gray-600 hover:text-black transition-colors">
                                    <User className="w-6 h-6" strokeWidth={1.5} />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
