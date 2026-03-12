'use client';

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/routing';
import { Languages } from 'lucide-react';
import { motion } from 'framer-motion';

export default function LocaleSwitcher() {
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();

    function onLanguageChange() {
        const nextLocale = locale === 'vi' ? 'en' : 'vi';
        router.replace(pathname, { locale: nextLocale });
    }

    return (
        <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={onLanguageChange}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-50 border border-gray-200 hover:border-gray-300 transition-colors group"
            aria-label={locale === 'vi' ? 'Switch to English' : 'Chuyển sang tiếng Việt'}
        >
            <Languages className="w-4 h-4 text-gray-500 group-hover:text-black transition-colors" />
            <span className="text-xs font-bold text-gray-700 uppercase tracking-wider">
                {locale}
            </span>
        </motion.button>
    );
}
