"use client";

import { useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "@vinauav/ui";
import { zodResolver } from "@vinauav/ui";
import { z } from "@vinauav/ui";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    Input,
    Button,
} from "@vinauav/ui";
import {
    Calendar,
    Upload,
    FileText,
    X,
    CheckCircle2,
    Send,
    User,
    Mail,
    Clock,
} from "lucide-react";

// ─────────────────────────────────────────────────────────────────────────────
// ZOD SCHEMA
// ─────────────────────────────────────────────────────────────────────────────

const bookingSchema = z.object({
    name: z.string().min(2, "Vui lòng nhập họ và tên (ít nhất 2 ký tự)."),
    email: z.string().email("Địa chỉ email không hợp lệ. Vui lòng kiểm tra lại."),
    preferredTime: z.string().min(1, "Vui lòng chọn thời gian mong muốn."),
});

type BookingFormValues = z.infer<typeof bookingSchema>;

// ─────────────────────────────────────────────────────────────────────────────
// FILE DROP ZONE
// ─────────────────────────────────────────────────────────────────────────────

interface FileDropZoneProps {
    file: File | null;
    onFile: (file: File | null) => void;
}

function FileDropZone({ file, onFile }: FileDropZoneProps) {
    const [isDragging, setIsDragging] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleDrop = useCallback(
        (e: React.DragEvent) => {
            e.preventDefault();
            setIsDragging(false);
            const dropped = e.dataTransfer.files[0];
            if (dropped) onFile(dropped);
        },
        [onFile],
    );

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    };
    const handleDragLeave = () => setIsDragging(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const picked = e.target.files?.[0];
        if (picked) onFile(picked);
    };

    return (
        <div>
            <motion.div
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onClick={() => inputRef.current?.click()}
                animate={{
                    borderColor: isDragging ? "#06b6d4" : file ? "#22d3ee80" : "#334155",
                    backgroundColor: isDragging
                        ? "rgba(6,182,212,0.08)"
                        : file
                            ? "rgba(6,182,212,0.04)"
                            : "rgba(15,23,42,0.6)",
                }}
                transition={{ duration: 0.2 }}
                className="relative rounded-xl border-2 border-dashed cursor-pointer p-6 text-center transition-shadow group"
                style={{
                    boxShadow: isDragging ? "0 0 20px -6px rgba(6,182,212,0.4)" : undefined,
                }}
                role="button"
                aria-label="Khu vực tải tệp cấu hình drone"
                tabIndex={0}
                onKeyDown={(e) => e.key === "Enter" && inputRef.current?.click()}
            >
                <input
                    ref={inputRef}
                    type="file"
                    className="hidden"
                    aria-hidden="true"
                    accept=".pdf,.doc,.docx,.txt,.json,.yaml,.yml"
                    onChange={handleInputChange}
                />

                <AnimatePresence mode="wait">
                    {file ? (
                        <motion.div
                            key="file-selected"
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -8 }}
                            className="flex items-center justify-between gap-3"
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center">
                                    <FileText className="w-5 h-5 text-cyan-400" />
                                </div>
                                <div className="text-left">
                                    <div className="text-white text-sm font-medium truncate max-w-[200px]">
                                        {file.name}
                                    </div>
                                    <div className="text-slate-500 text-xs">
                                        {(file.size / 1024).toFixed(1)} KB
                                    </div>
                                </div>
                            </div>
                            <button
                                type="button"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onFile(null);
                                    if (inputRef.current) inputRef.current.value = "";
                                }}
                                className="w-8 h-8 rounded-full bg-slate-800 hover:bg-red-500/20 border border-slate-700 hover:border-red-500/40 flex items-center justify-center text-slate-400 hover:text-red-400 transition-all shrink-0"
                                aria-label="Xóa tệp"
                            >
                                <X className="w-3.5 h-3.5" />
                            </button>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="drop-prompt"
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -8 }}
                            className="flex flex-col items-center gap-2"
                        >
                            <motion.div
                                animate={{ y: isDragging ? -4 : 0 }}
                                transition={{ duration: 0.2 }}
                                className="w-12 h-12 rounded-xl bg-slate-800 border border-slate-700 group-hover:border-cyan-500/40 flex items-center justify-center transition-colors"
                            >
                                <Upload className="w-5 h-5 text-slate-400 group-hover:text-cyan-400 transition-colors" />
                            </motion.div>
                            <div>
                                <p className="text-slate-300 text-sm font-medium">
                                    Kéo & thả tệp vào đây, hoặc{" "}
                                    <span className="text-cyan-400 underline underline-offset-2">
                                        chọn từ máy tính
                                    </span>
                                </p>
                                <p className="text-slate-500 text-xs mt-0.5">
                                    PDF, DOCX, TXT, JSON, YAML — tối đa 10MB
                                </p>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </div>
    );
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

export default function BookingSection() {
    const [craftFile, setCraftFile] = useState<File | null>(null);
    const [submitted, setSubmitted] = useState(false);

    const form = useForm<BookingFormValues>({
        resolver: zodResolver(bookingSchema),
        defaultValues: { name: "", email: "", preferredTime: "" },
    });

    function onSubmit(values: BookingFormValues) {
        // In production, send values + craftFile to your backend / Zalo webhook
        console.log("Booking submitted:", values, craftFile);
        setSubmitted(true);
    }

    return (
        <section
            id="dat-hang"
            aria-label="Đặt hàng và đặt lịch tư vấn 1-on-1 cùng đội ngũ VinaFC"
            className="py-24 relative overflow-hidden bg-slate-900 border-t border-slate-800/60"
        >
            {/* Glows */}
            <div
                className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-purple-900/15 rounded-full blur-[120px] pointer-events-none"
                aria-hidden="true"
            />
            <div
                className="absolute bottom-0 right-0 w-[400px] h-[300px] bg-cyan-900/10 rounded-full blur-[100px] pointer-events-none"
                aria-hidden="true"
            />

            <div className="max-w-4xl mx-auto px-6 relative z-10">

                {/* Section header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-300 text-xs font-mono font-medium mb-4 uppercase tracking-wider">
                        <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
                        1-on-1 Setup Booking
                    </div>
                    <h2 className="text-4xl md:text-5xl font-black tracking-tight text-white mb-3">
                        Đặt Hàng &{" "}
                        <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                            Tư Vấn Trực Tiếp
                        </span>
                    </h2>
                    <p className="text-slate-400 max-w-xl mx-auto leading-relaxed">
                        Điền form bên dưới để đặt hàng hoặc đặt lịch tư vấn 1:1 cùng đội ngũ kỹ
                        sư VinaFC. Chúng tôi sẽ liên hệ xác nhận qua Zalo / Email trong 24h.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="relative rounded-3xl border border-slate-700/60 bg-slate-900/70 backdrop-blur-xl overflow-hidden shadow-[0_0_60px_-20px_rgba(168,85,247,0.15)]"
                >
                    {/* Top accent line */}
                    <div className="h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />

                    <div className="p-6 md:p-10">
                        <AnimatePresence mode="wait">
                            {submitted ? (
                                <motion.div
                                    key="success"
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ type: "spring", stiffness: 260, damping: 20 }}
                                    className="text-center py-16"
                                >
                                    <motion.div
                                        initial={{ scale: 0, rotate: -30 }}
                                        animate={{ scale: 1, rotate: 0 }}
                                        transition={{
                                            type: "spring",
                                            stiffness: 300,
                                            damping: 18,
                                            delay: 0.1,
                                        }}
                                        className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-emerald-500/10 border-2 border-emerald-500/40 mb-6"
                                    >
                                        <CheckCircle2 className="w-9 h-9 text-emerald-400" />
                                    </motion.div>
                                    <h3 className="text-white font-bold text-2xl mb-3">
                                        Đặt hàng thành công! 🎉
                                    </h3>
                                    <p className="text-slate-400 max-w-sm mx-auto">
                                        Cảm ơn bạn đã tin tưởng VinaFC. Đội ngũ kỹ sư sẽ liên hệ
                                        với bạn trong vòng 24h qua Zalo hoặc Email.
                                    </p>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setSubmitted(false);
                                            form.reset();
                                            setCraftFile(null);
                                        }}
                                        className="mt-6 text-sm text-cyan-400 hover:text-cyan-300 underline underline-offset-2 transition-colors"
                                    >
                                        Gửi thêm yêu cầu khác
                                    </button>
                                </motion.div>
                            ) : (
                                <motion.div key="form" initial={{ opacity: 1 }} exit={{ opacity: 0 }}>
                                    <Form {...form}>
                                        <form
                                            onSubmit={form.handleSubmit(onSubmit)}
                                            className="space-y-6"
                                            noValidate
                                        >
                                            <div className="grid md:grid-cols-2 gap-6">
                                                {/* Họ và tên */}
                                                <FormField
                                                    control={form.control}
                                                    name="name"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel className="flex items-center gap-2 text-slate-300 font-medium text-sm">
                                                                <User className="w-4 h-4 text-purple-400" />
                                                                Họ và tên
                                                                <span className="text-red-400">*</span>
                                                            </FormLabel>
                                                            <FormControl>
                                                                <Input
                                                                    {...field}
                                                                    id="booking-name"
                                                                    placeholder="Nguyễn Văn A"
                                                                    autoComplete="name"
                                                                    className="bg-slate-800/60 border-slate-700 text-white placeholder:text-slate-500 focus:border-purple-500/60 focus:ring-purple-500/20 rounded-xl h-11"
                                                                />
                                                            </FormControl>
                                                            <FormMessage className="text-red-400 text-xs" />
                                                        </FormItem>
                                                    )}
                                                />

                                                {/* Email */}
                                                <FormField
                                                    control={form.control}
                                                    name="email"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel className="flex items-center gap-2 text-slate-300 font-medium text-sm">
                                                                <Mail className="w-4 h-4 text-purple-400" />
                                                                Email
                                                                <span className="text-red-400">*</span>
                                                            </FormLabel>
                                                            <FormControl>
                                                                <Input
                                                                    {...field}
                                                                    id="booking-email"
                                                                    type="email"
                                                                    placeholder="email@example.com"
                                                                    autoComplete="email"
                                                                    className="bg-slate-800/60 border-slate-700 text-white placeholder:text-slate-500 focus:border-purple-500/60 focus:ring-purple-500/20 rounded-xl h-11"
                                                                />
                                                            </FormControl>
                                                            <FormMessage className="text-red-400 text-xs" />
                                                        </FormItem>
                                                    )}
                                                />
                                            </div>

                                            {/* Thời gian mong muốn */}
                                            <FormField
                                                control={form.control}
                                                name="preferredTime"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel className="flex items-center gap-2 text-slate-300 font-medium text-sm">
                                                            <Clock className="w-4 h-4 text-purple-400" />
                                                            Thời gian mong muốn
                                                            <span className="text-red-400">*</span>
                                                        </FormLabel>
                                                        <FormControl>
                                                            <div className="relative">
                                                                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none" />
                                                                <Input
                                                                    {...field}
                                                                    id="booking-time"
                                                                    type="datetime-local"
                                                                    className="bg-slate-800/60 border-slate-700 text-white placeholder:text-slate-500 focus:border-purple-500/60 focus:ring-purple-500/20 rounded-xl h-11 pl-9 [color-scheme:dark]"
                                                                />
                                                            </div>
                                                        </FormControl>
                                                        <FormMessage className="text-red-400 text-xs" />
                                                    </FormItem>
                                                )}
                                            />

                                            {/* Drag-and-drop file upload */}
                                            <div className="space-y-2">
                                                <label className="flex items-center gap-2 text-slate-300 font-medium text-sm">
                                                    <Upload className="w-4 h-4 text-purple-400" />
                                                    Tải lên thông số kỹ thuật drone của bạn
                                                    <span className="text-slate-500 font-normal">
                                                        (Craft specs upload)
                                                    </span>
                                                    <span className="ml-auto text-xs text-slate-600 font-normal">
                                                        Không bắt buộc
                                                    </span>
                                                </label>
                                                <FileDropZone file={craftFile} onFile={setCraftFile} />
                                            </div>

                                            {/* Divider */}
                                            <div className="h-px bg-slate-800" />

                                            {/* Submit */}
                                            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                                                <p className="text-slate-500 text-xs max-w-xs leading-relaxed">
                                                    Thông tin của bạn được bảo mật tuyệt đối. Chỉ dùng để liên hệ xác nhận đơn hàng.
                                                </p>
                                                <motion.div
                                                    whileHover={{ scale: 1.02 }}
                                                    whileTap={{ scale: 0.98 }}
                                                >
                                                    <Button
                                                        type="submit"
                                                        disabled={form.formState.isSubmitting}
                                                        className="px-8 py-3 h-auto bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-white font-bold rounded-xl shadow-[0_0_30px_-8px_rgba(168,85,247,0.5)] hover:shadow-[0_0_40px_-6px_rgba(168,85,247,0.7)] transition-all gap-2 whitespace-nowrap"
                                                    >
                                                        <Send className="w-4 h-4" />
                                                        Gửi yêu cầu đặt hàng
                                                    </Button>
                                                </motion.div>
                                            </div>
                                        </form>
                                    </Form>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </motion.div>

                {/* Trust indicators */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                    className="mt-6 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-600"
                >
                    {["Phản hồi trong 24h", "Hỗ trợ qua Zalo & Email", "Giao hàng toàn quốc"].map(
                        (item) => (
                            <div key={item} className="flex items-center gap-1.5">
                                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-500/60" />
                                {item}
                            </div>
                        ),
                    )}
                </motion.div>
            </div>
        </section>
    );
}
