"use client";

import { BlogPost } from "@/types/blog";
import { motion } from "framer-motion";
import Image from "next/image";
import { Link } from "@/i18n/routing";

interface FeaturedPostProps {
  post: BlogPost;
}

export default function FeaturedPost({ post }: FeaturedPostProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="relative w-full h-[500px] md:h-[600px] overflow-hidden rounded-[2.5rem] group mb-12 shadow-2xl"
    >
      <div className="absolute inset-0">
        <Image
          src={post.coverImage}
          alt={post.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          priority
        />
        {/* Overlay: DJI/Apple style - subtle gradient from bottom */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="flex items-center gap-3 mb-6"
          >
            <span className="px-4 py-1.5 text-[10px] font-bold tracking-widest text-white uppercase bg-blue-600 rounded-full">
              {post.category}
            </span>
            <span className="text-gray-300 text-sm font-medium">
              {post.date}
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-3xl md:text-5xl font-extrabold text-white mb-6 leading-tight tracking-tight"
          >
            {post.title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-lg md:text-xl text-gray-200 mb-10 line-clamp-2 md:line-clamp-none font-light leading-relaxed"
          >
            {post.excerpt}
          </motion.p>

          <Link
            href={`/tin-tuc/${post.id}`}
            className="px-10 py-4 bg-white text-slate-900 font-bold rounded-2xl transition-all shadow-xl active:scale-[0.98] inline-block hover:bg-gray-50"
          >
            {"Đọc tiếp"}
          </Link>
        </div>
      </div>
    </motion.section>
  );
}
