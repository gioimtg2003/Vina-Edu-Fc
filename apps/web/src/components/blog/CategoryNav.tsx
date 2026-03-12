"use client";

import { BlogCategory } from "@/types/blog";
import { motion } from "framer-motion";

interface CategoryNavProps {
  categories: BlogCategory[];
  activeCategory: BlogCategory;
  onCategoryChange: (category: BlogCategory) => void;
}

export default function CategoryNav({
  categories,
  activeCategory,
  onCategoryChange,
}: CategoryNavProps) {
  return (
    <div className="mb-12">
      <div className="flex overflow-x-auto pb-4 gap-3 no-scrollbar mask-fade-right -mx-2 px-2">
        {categories.map((category) => (
          <motion.button
            key={category}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onCategoryChange(category)}
            className={`px-6 py-2.5 rounded-full text-sm font-semibold whitespace-nowrap border transition-all duration-300 ${
              activeCategory === category
                ? "bg-slate-900 border-slate-900 text-white shadow-lg"
                : "bg-white border-slate-200 text-gray-500 hover:border-slate-900 hover:text-slate-900 shadow-sm"
            }`}
          >
            {category}
          </motion.button>
        ))}
      </div>
    </div>
  );
}
