"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X } from "lucide-react";

const ZALO_OA_URL = "https://zalo.me/4165197110217329861";

export default function ZaloAssistantButton() {
    const [showTooltip, setShowTooltip] = useState(true);

    return (
        <div className="fixed bottom-6 right-6 z-[100] flex items-end gap-3">
            {/* Tooltip bubble */}
            <AnimatePresence>
                {showTooltip && (
                    <motion.div
                        initial={{ opacity: 0, x: 20, scale: 0.8 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        exit={{ opacity: 0, x: 20, scale: 0.8 }}
                        transition={{ type: "spring", stiffness: 300, damping: 25 }}
                        className="relative bg-white rounded-2xl shadow-lg border border-gray-100 px-4 py-3 max-w-[220px] mb-2"
                    >
                        <button
                            onClick={() => setShowTooltip(false)}
                            className="absolute -top-2 -right-2 w-5 h-5 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors"
                            aria-label="Đóng"
                        >
                            <X className="w-3 h-3 text-gray-500" />
                        </button>
                        <p className="text-sm text-gray-700 font-medium leading-snug">
                            👋 Cần hỗ trợ?
                            <br />
                            <span className="text-gray-500 font-normal text-xs">
                                Chat với VinaUAV Bot qua Zalo!
                            </span>
                        </p>
                        {/* Arrow pointing right */}
                        <div className="absolute top-1/2 -right-2 -translate-y-1/2 w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-l-[8px] border-l-white" />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Floating button */}
            <motion.a
                href={ZALO_OA_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Chat với VinaUAV trên Zalo"
                id="zalo-assistant-btn"
                className="relative group"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.5 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
            >
                {/* Pulse ring */}
                <span className="absolute inset-0 rounded-full bg-blue-500 animate-ping opacity-20" />

                {/* Button body */}
                <span className="relative flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 shadow-xl shadow-blue-500/30 hover:shadow-blue-500/50 transition-shadow duration-300">
                    {/* Zalo-style icon */}
                    <MessageCircle className="w-6 h-6 text-white" strokeWidth={2} />
                </span>

                {/* Hover label */}
                <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 whitespace-nowrap bg-gray-900 text-white text-xs font-medium px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none shadow-lg">
                    Chat trên Zalo
                </span>
            </motion.a>
        </div>
    );
}
