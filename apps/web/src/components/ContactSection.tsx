"use client";

import { motion } from "framer-motion";
import { Mail, MessageCircle, PenTool, Cpu } from "lucide-react";

export default function ContactSection() {
    return (
        <section id="contact" aria-label="Liên hệ hợp tác Vina Edu FC - drone controller Vietnam" className="py-24 relative bg-slate-950 border-t border-slate-800/50">


            {/* Intense background glow for contact section */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-[400px] bg-cyan-900/10 rounded-[100%] blur-[120px] pointer-events-none"></div>

            <div className="max-w-5xl mx-auto px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="glass border border-cyan-500/20 rounded-3xl p-8 md:p-12 shadow-[0_0_50px_-20px_rgba(6,182,212,0.3)] relative overflow-hidden"
                >
                    {/* Decorative lines */}
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[url('https://cdn.pixabay.com/photo/2021/11/20/03/17/grid-bg-6810793_1280.png')] opacity-10 mix-blend-overlay rotate-12"></div>

                    <div className="grid md:grid-cols-2 gap-12 relative z-10">
                        <div>
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 text-xs font-mono font-medium mb-6">
                                <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
                                Kết nối với chúng tôi
                            </div>
                            <h2 className="text-4xl font-bold tracking-tight mb-4 text-white">Hãy Cùng Nhau Xây Dựng Tương Lai.</h2>
                            <p className="text-slate-400 mb-8 max-w-sm">
                                Bạn quan tâm đến việc đồng hành cùng sứ mệnh của chúng tôi, muốn trải nghiệm sản phẩm sớm, hoặc thiết lập quan hệ hợp tác? Hãy liên hệ trực tiếp với đội ngũ kỹ sư của chúng tôi để cùng trao đổi và khám phá những cơ hội phát triển trong tương lai.                            </p>

                            <div className="space-y-6">
                                <div className="flex items-center gap-4 group">
                                    <div className="w-12 h-12 rounded-full border border-slate-700 bg-slate-800 flex items-center justify-center group-hover:border-cyan-500 group-hover:text-cyan-400 transition-colors">
                                        <MessageCircle className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <div className="text-xs text-slate-500 font-mono mb-1 uppercase tracking-wider">Zalo</div>
                                        <div className="text-lg font-medium text-slate-200">0817 550 271</div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4 group">
                                    <div className="w-12 h-12 rounded-full border border-slate-700 bg-slate-800 flex items-center justify-center group-hover:border-purple-500 group-hover:text-purple-400 transition-colors">
                                        <Mail className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <div className="text-xs text-slate-500 font-mono mb-1 uppercase tracking-wider">Email</div>
                                        <a href="mailto:quymom941478@gmail.com" className="text-lg font-medium text-slate-200 hover:text-purple-400 transition-colors">
                                            quymom941478@gmail.com
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-slate-900/80 rounded-2xl border border-slate-700/50 p-8 backdrop-blur-xl relative">
                            <div className="absolute -top-4 -right-4 w-20 h-20 bg-cyan-500/10 blur-xl rounded-full"></div>

                            <h3 className="text-xl font-bold mb-6 text-white border-b border-slate-800 pb-4">Core Team</h3>

                            <div className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <div className="mt-1 p-2 bg-slate-800 rounded-lg text-slate-400">
                                        <PenTool className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <div className="text-white font-medium">UAV Engineer</div>
                                        <div className="text-sm text-cyan-400 font-mono mt-1">Project Lead</div>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="mt-1 p-2 bg-slate-800 rounded-lg text-slate-400">
                                        <FileCode2 className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <div className="text-white font-medium">Nguyen Van Quy</div>
                                        <div className="text-sm text-purple-400 font-mono mt-1">Firmware & Software</div>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="mt-1 p-2 bg-slate-800 rounded-lg text-slate-400">
                                        <Cpu className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <div className="text-white font-medium">Nguyen Phuc Van</div>
                                        <div className="text-sm text-emerald-400 font-mono mt-1">Hardware Design</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

// Add FileCode2 locally since it wasn't imported from lucide-react above
function FileCode2(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M4 22h14a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v4" />
            <path d="M14 2v4a2 2 0 0 0 2 2h4" />
            <path d="m9 18 3-3-3-3" />
            <path d="m14 18-3-3 3-3" />
        </svg>
    );
}
