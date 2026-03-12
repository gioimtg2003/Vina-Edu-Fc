"use client";

import { BlogPost } from "@/types/blog";
import { motion } from "framer-motion";
import Image from "next/image";
import { Link } from "@/i18n/routing";

interface PostCardProps {
  post: BlogPost;
  index: number;
}

function PostCard({ post, index }: PostCardProps) {
  return (
    <Link href={`/tin-tuc/${post.id}`} className="block">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        className="group bg-white border border-slate-100 rounded-[2rem] overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 h-full"
      >
        <div className="relative h-56 overflow-hidden">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute top-6 left-6">
            <span className="px-4 py-1.5 text-[10px] font-bold tracking-widest text-slate-900 uppercase bg-white/90 backdrop-blur-md border border-slate-200 rounded-lg shadow-sm">
              {post.category}
            </span>
          </div>
        </div>

        <div className="p-8">
          <h3 className="text-2xl font-bold text-slate-900 mb-4 line-clamp-2 leading-tight tracking-tight group-hover:text-blue-600 transition-colors">
            {post.title}
          </h3>
          <p className="text-gray-500 text-base mb-8 line-clamp-2 font-light leading-relaxed">
            {post.excerpt}
          </p>

          <div className="flex items-center justify-between pt-6 border-t border-slate-50">
            <div className="flex flex-col">
              <span className="text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-1">{"Ngày đăng"}</span>
              <span className="text-sm text-slate-900 font-medium">{post.date}</span>
            </div>
            <div className="flex flex-col items-end">
              <span className="text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-1">{"Thời gian đọc"}</span>
              <span className="text-sm text-slate-900 font-medium">{post.readTime}</span>
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}

interface PostGridProps {
  posts: BlogPost[];
}

export default function PostGrid({ posts }: PostGridProps) {
  if (posts.length === 0) {
    return (
      <div className="py-20 text-center text-gray-400 font-light text-xl">
        {"Không tìm thấy bài viết nào."}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-24">
      {posts.map((post, index) => (
        <PostCard key={post.id} post={post} index={index} />
      ))}
    </div>
  );
}
