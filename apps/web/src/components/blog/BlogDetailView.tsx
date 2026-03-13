"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import {
    Calendar,
    Clock,
    User,
    ChevronRight,
    Home,
    Facebook,
    Twitter,
    Link as LinkIcon,
    Check
} from "lucide-react";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import { BlogPost } from "@/types/blog";
import {
    Button,
    Breadcrumb,
    BreadcrumbList,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbPage,
    BreadcrumbSeparator,
    Badge
} from "@vinauav/ui";

interface BlogDetailViewProps {
    post: BlogPost;
    relatedPosts: BlogPost[];
}

export default function BlogDetailView({ post, relatedPosts }: BlogDetailViewProps) {
    const [copied, setCopied] = useState(false);
    const contentRef = useRef<HTMLDivElement>(null);
    const [toc, setToc] = useState<{ id: string; text: string; level: number }[]>([]);

    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    useEffect(() => {
        if (contentRef.current) {
            // TOC Logic
            const headings = Array.from(contentRef.current.querySelectorAll("h2, h3"));
            const tocItems = headings.map((heading, index) => {
                const id = heading.id || `heading-${index}`;
                heading.id = id;
                return {
                    id,
                    text: heading.textContent || "",
                    level: parseInt(heading.tagName.substring(1))
                };
            });
            setToc(tocItems);

            // Code Copy Logic
            const preBlocks = contentRef.current.querySelectorAll("pre");
            preBlocks.forEach((pre) => {
                if (pre.querySelector(".copy-button")) return;

                const button = document.createElement("button");
                button.className = "copy-button absolute top-3 right-3 p-2 rounded-md bg-white/10 hover:bg-white/20 text-white/50 hover:text-white transition-all opacity-0 group-hover:opacity-100";
                button.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>';

                pre.style.position = "relative";
                pre.classList.add("group");
                pre.appendChild(button);

                button.onclick = () => {
                    const code = pre.querySelector("code")?.innerText || "";
                    void navigator.clipboard.writeText(code);
                    button.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>';
                    setTimeout(() => {
                        button.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>';
                    }, 2000);
                };
            });
        }
    }, [post.content]);

    const handleCopyLink = () => {
        void navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            const yOffset = -100;
            const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
            window.scrollTo({ top: y, behavior: 'smooth' });
        }
    };

    return (
        <div className="min-h-screen bg-white pt-24 pb-20 text-gray-900 font-sans selection:bg-blue-100 selection:text-blue-900">
            {/* Reading Progress Bar */}
            <motion.div
                className="fixed top-0 left-0 right-0 h-1 bg-primary z-[60] origin-left"
                style={{ scaleX }}
            />

            <div className="container mx-auto px-4 max-w-7xl">
                {/* 1. Breadcrumbs */}
                <div className="mb-8 lg:mb-12">
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                <BreadcrumbLink href="/" className="flex items-center gap-1">
                                    <Home className="w-4 h-4" />
                                    <span>{'Trang chủ'}</span>
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbLink href="/tin-tuc">{'Tin tức'}</BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbPage className="font-medium text-gray-900 max-w-[200px] truncate">
                                    {post.title}
                                </BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </div>

                {/* 2. Article Header */}
                <header className="max-w-4xl mx-auto text-center mb-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="space-y-6"
                    >
                        <Badge variant="outline" className="px-4 py-1 text-xs font-bold uppercase tracking-widest border-primary text-primary rounded-none">
                            {post.category}
                        </Badge>

                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-black leading-tight">
                            {post.title}
                        </h1>

                        <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-500 font-medium">
                            <div className="flex items-center gap-2">
                                <User className="w-4 h-4" />
                                <span>{post.author}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4" />
                                <span>{post.date}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Clock className="w-4 h-4" />
                                <span>{post.readTime}</span>
                            </div>
                        </div>
                    </motion.div>
                </header>

                {/* 3. Featured Image */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                    className="relative w-full aspect-[21/9] rounded-none overflow-hidden mb-16 shadow-2xl"
                >
                    <Image
                        src={post.coverImage || "/fc-board.png"}
                        alt={post.title}
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 xl:gap-20">
                    {/* 4. Left Sidebar (Share Bar - Desktop) */}
                    <aside className="hidden lg:block lg:col-span-1">
                        <div className="sticky top-32 flex flex-col items-center gap-4">
                            <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 [writing-mode:vertical-lr] rotate-180 mb-4">
                                Chia sẻ
                            </span>
                            <Button variant="ghost" size="icon" className="rounded-full hover:bg-blue-50 hover:text-blue-600 transition-colors">
                                <Facebook className="w-5 h-5" />
                            </Button>
                            <Button variant="ghost" size="icon" className="rounded-full hover:bg-sky-50 hover:text-sky-500 transition-colors">
                                <Twitter className="w-5 h-5" />
                            </Button>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={handleCopyLink}
                                className={`rounded-full transition-colors ${copied ? 'bg-green-50 text-green-600' : 'hover:bg-gray-100'}`}
                            >
                                {copied ? <Check className="w-5 h-5" /> : <LinkIcon className="w-5 h-5" />}
                            </Button>
                        </div>
                    </aside>

                    {/* 5. Main Content Area */}
                    <main className="lg:col-span-8 xl:col-span-7">
                        <article
                            ref={contentRef}
                            className="prose prose-slate lg:prose-xl max-w-none 
                            prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-black
                            prose-p:text-gray-600 prose-p:leading-relaxed
                            prose-strong:text-black prose-strong:font-bold
                            prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:bg-slate-50 prose-blockquote:py-2 prose-blockquote:px-6 prose-blockquote:italic
                            prose-code:text-primary prose-code:bg-blue-50 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:before:content-none prose-code:after:content-none
                            prose-pre:rounded-none prose-pre:bg-[#1e1e1e] prose-pre:p-0"
                            dangerouslySetInnerHTML={{ __html: post.content || "" }}
                        />

                        {/* Author Bio */}
                        <div className="mt-20 p-8 md:p-12 bg-slate-50 border border-slate-100 flex flex-col md:flex-row gap-8 items-center md:items-start text-center md:text-left transition-all hover:shadow-lg">
                            <div className="relative w-24 h-24 rounded-full overflow-hidden shrink-0 ring-4 ring-white shadow-md">
                                <Image
                                    src="/fc-board.png"
                                    alt={post.author}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <div className="space-y-4">
                                <div>
                                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary mb-1">Tác giả</p>
                                    <h3 className="text-xl font-bold text-black">{post.author}</h3>
                                    <p className="text-sm text-gray-500 mt-1">{"Founder of VinaUAV & UAV Specialist"}</p>
                                </div>
                                <p className="text-gray-600 text-sm leading-relaxed max-w-xl">
                                    {"Với hơn 10 năm kinh nghiệm trong lĩnh vực nghiên cứu và chế tạo máy bay không người lái, Nguyen Cong Gioi luôn tâm huyết với việc xây dựng và phát triển cộng đồng UAV tại Việt Nam thông qua hệ sinh thái VinaUAV."}
                                </p>
                            </div>
                        </div>

                        {/* Social Share (Mobile) */}
                        <div className="lg:hidden mt-12 pt-8 border-t border-gray-100 flex items-center justify-between">
                            <span className="text-sm font-bold text-gray-900 uppercase tracking-widest">Chia sẻ bài viết</span>
                            <div className="flex gap-4">
                                <Button variant="ghost" size="icon" className="rounded-full bg-slate-50">
                                    <Facebook className="w-5 h-5 text-blue-600" />
                                </Button>
                                <Button variant="ghost" size="icon" className="rounded-full bg-slate-50">
                                    <Twitter className="w-5 h-5 text-sky-500" />
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={handleCopyLink}
                                    className={`rounded-full transition-colors ${copied ? 'bg-green-50 text-green-600' : 'bg-slate-50'}`}
                                >
                                    {copied ? <Check className="w-5 h-5" /> : <LinkIcon className="w-5 h-5" />}
                                </Button>
                            </div>
                        </div>
                    </main>

                    {/* 6. Right Sidebar (TOC) */}
                    <aside className="lg:col-span-3 xl:col-span-3">
                        <div className="sticky top-32 space-y-12">
                            {toc.length > 0 && (
                                <div className="space-y-6">
                                    <div className="flex items-center gap-3">
                                        <div className="w-1 h-6 bg-primary" />
                                        <h3 className="text-sm font-bold uppercase tracking-widest text-black">Mục lục</h3>
                                    </div>
                                    <nav className="flex flex-col gap-4 border-l border-gray-100 ml-0.5">
                                        {toc.map((item) => (
                                            <button
                                                key={item.id}
                                                onClick={() => scrollToSection(item.id)}
                                                className={`text-left text-sm transition-all hover:text-primary pl-4 border-l-2 -ml-[1px] ${item.level === 3 ? 'ml-4 font-normal text-gray-400' : 'font-medium text-gray-500'
                                                    } border-transparent hover:border-primary`}
                                            >
                                                {item.text}
                                            </button>
                                        ))}
                                    </nav>
                                </div>
                            )}

                            {/* Newsletter / CTA */}
                            <div className="p-6 bg-black text-white space-y-6">
                                <h3 className="text-lg font-bold leading-tight">{"Đăng ký nhận tin UAV mới nhất"}</h3>
                                <p className="text-xs text-gray-400 leading-relaxed font-light">
                                    {"Nhận các cập nhật về công nghệ, quy định và dự án UAV ngay trong hộp thư của bạn."}
                                </p>
                                <div className="space-y-3">
                                    <input
                                        type="email"
                                        placeholder="Email của bạn"
                                        className="w-full bg-white/10 border border-white/20 px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors text-white placeholder:text-gray-500"
                                    />
                                    <Button className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-6 rounded-none uppercase text-xs tracking-widest transition-all">
                                        {"Đăng ký ngay"}
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </aside>
                </div>

                {/* 7. Related Posts */}
                <section className="mt-32 pt-20 border-t border-gray-100">
                    <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-12">
                        <div className="space-y-2">
                            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary">Kiến thức bổ ích</p>
                            <h2 className="text-3xl font-bold text-black tracking-tighter">Bài viết liên quan</h2>
                        </div>
                        <Link href="/tin-tuc" className="group flex items-center gap-2 text-sm font-bold text-black uppercase tracking-widest hover:text-primary transition-colors">
                            {"Xem tất cả"}
                            <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                        </Link>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {relatedPosts.map((post) => (
                            <Link
                                key={post.id}
                                href={`/tin-tuc/${post.id}`}
                                className="group block space-y-4"
                            >
                                <div className="relative aspect-[16/10] overflow-hidden bg-gray-100">
                                    <Image
                                        src={post.coverImage || "/fc-board.png"}
                                        alt={post.title}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute top-4 left-4">
                                        <Badge className="bg-white/90 text-black border-none text-[10px] font-bold uppercase backdrop-blur-sm rounded-none">
                                            {post.category}
                                        </Badge>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <h3 className="text-lg font-bold text-black leading-tight group-hover:text-primary transition-colors line-clamp-2">
                                        {post.title}
                                    </h3>
                                    <div className="flex items-center gap-4 text-xs text-gray-400">
                                        <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {post.date}</span>
                                        <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {post.readTime}</span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
}
