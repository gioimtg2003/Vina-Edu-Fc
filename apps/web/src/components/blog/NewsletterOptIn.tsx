"use client";

import { motion } from "framer-motion";

export default function NewsletterOptIn() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-slate-900 text-white rounded-[2.5rem] p-10 md:p-20 text-center shadow-2xl relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/20 rounded-full blur-[100px] -mr-48 -mt-48" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-600/10 rounded-full blur-[100px] -ml-48 -mb-48" />
      
      <div className="relative z-10">
        <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6 tracking-tight">
          {"Cập nhật công nghệ UAV mới nhất"}
        </h2>
        <p className="text-gray-300 text-lg md:text-xl mb-12 max-w-2xl mx-auto font-light leading-relaxed">
          {"Đăng ký để nhận thông tin về các dự án UAV mới nhất, kiến thức kỹ thuật và tin tức từ VinaUAV trực tiếp vào hộp thư của bạn."}
        </p>

        <form className="flex flex-col md:flex-row gap-4 max-w-xl mx-auto" onSubmit={(e) => e.preventDefault()}>
          <input
            type="email"
            placeholder="Email của bạn"
            className="flex-1 px-8 py-5 bg-white/10 border border-white/10 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:border-white/30 transition-all backdrop-blur-md"
            required
          />
          <motion.button
            whileHover={{ scale: 1.02, backgroundColor: "#ffffff", color: "#0f172a" }}
            whileTap={{ scale: 0.98 }}
            className="px-10 py-5 bg-white text-slate-900 font-bold rounded-2xl transition-all shadow-xl"
          >
            {"Đăng ký"}
          </motion.button>
        </form>
      </div>
    </motion.section>
  );
}
