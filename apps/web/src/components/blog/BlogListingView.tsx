"use client";

import { useState } from "react";
import { BlogCategory, BlogPost } from "@/types/blog";
import FeaturedPost from "@/components/blog/FeaturedPost";
import CategoryNav from "@/components/blog/CategoryNav";
import PostGrid from "@/components/blog/PostGrid";
import NewsletterOptIn from "@/components/blog/NewsletterOptIn";
import { motion } from "framer-motion";

const CATEGORIES: BlogCategory[] = [
  "Tất cả",
  "Kiến thức UAV",
  "Tin tức VinaUAV",
  "Luật bay Việt Nam",
  "Dự án sinh viên",
];

interface BlogListingViewProps {
  initialPosts: BlogPost[];
}

export default function BlogListingView({ initialPosts }: BlogListingViewProps) {
  const [activeCategory, setActiveCategory] = useState<BlogCategory>("Tất cả");

  const featuredPost = initialPosts.find((post) => post.featured) || initialPosts[0];
  const otherPosts = initialPosts.filter((post) => post.id !== featuredPost?.id);

  const filteredPosts = activeCategory === "Tất cả"
    ? otherPosts
    : otherPosts.filter((post) => post.category === activeCategory);

  return (
    <div className="min-h-screen bg-white pt-32 pb-20 font-sans selection:bg-slate-900 selection:text-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h2 className="text-blue-600 font-mono text-sm tracking-widest uppercase mb-4">
            {"TIN TỨC & KIẾN THỨC"}
          </h2>
          <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 tracking-tight">
            VinaUAV {"Insights"}
          </h1>
        </motion.div>

        {/* Featured Post */}
        {featuredPost && <FeaturedPost post={featuredPost} />}

        {/* Categories Navigation */}
        <CategoryNav
          categories={CATEGORIES}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />

        {/* Post Grid */}
        <PostGrid posts={filteredPosts} />

        {/* Newsletter Section */}
        <NewsletterOptIn />
      </div>

      {/* Background Decorative Elements - Subtle gradients for light theme */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-50/50 rounded-full blur-[120px] -mr-96 -mt-96" />
        <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-slate-50/50 rounded-full blur-[120px] -ml-96 -mb-96" />
      </div>
    </div>
  );
}
