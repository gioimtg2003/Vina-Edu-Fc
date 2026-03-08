"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Cpu,
    ChevronRight,
    ChevronLeft,
    CheckCircle2,
    Zap,
    Radio,
    Package,
    ShoppingCart,
} from "lucide-react";
import { Button } from "@vinauav/ui";

// ─────────────────────────────────────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────────────────────────────────────

const ECOSYSTEM_INFO =
    "Hệ sinh thái bo mạch VinaFC được tối ưu hóa cho quá trình học tập, đi kèm hệ thống thư viện hỗ trợ tương thích với Arduino IDE.";

interface PricingOption {
    label: string;
    price: string;
    priceRaw: number;
}

interface Product {
    id: string;
    name: string;
    badge: string;
    description: string;
    specs: { label: string; value: string }[];
    pricing: PricingOption[];
    accentColor: string;
    glowColor: string;
}

const PRODUCTS: Product[] = [
    {
        id: "vinafc-1",
        name: "Bộ điều khiển bay VinaFC 1",
        badge: "Bản Cơ bản",
        description:
            "Nền tảng khởi đầu giúp sinh viên thực hành thuật toán PID, Sensor Fusion và bay tự động cơ bản.",
        specs: [
            { label: "Vi điều khiển", value: "ESP32 (Dual core 240MHz)" },
            { label: "Cảm biến", value: "IMU ICM20602 (Accel + Gyro), Baro BMP388" },
            {
                label: "Giao tiếp ngoại vi",
                value: "2 cổng UART, hỗ trợ phần cứng GPS và Optical Flow (MTF01 / chuẩn MAVLink APM)",
            },
        ],
        pricing: [
            {
                label: "Bản mạch PCB",
                price: "250.000 VNĐ",
                priceRaw: 250000,
                // subtitle removed — kept minimal
            } as PricingOption & { subtitle?: string },
            {
                label: "Bản hoàn thiện",
                price: "600.000 VNĐ",
                priceRaw: 600000,
            },
        ],
        accentColor: "cyan",
        glowColor: "rgba(6,182,212,0.25)",
    },
    {
        id: "vinafc-1-plus",
        name: "Bộ điều khiển bay VinaFC 1 Plus",
        badge: "Bản Nâng cấp",
        description:
            "Cải thiện độ ổn định và độ tin cậy của dữ liệu với cảm biến chuẩn công nghiệp.",
        specs: [
            { label: "Vi điều khiển", value: "ESP32 (Dual core 240MHz)" },
            { label: "Cảm biến", value: "IMU BMI088 (Chuẩn công nghiệp), Baro BMP388" },
            {
                label: "Giao tiếp ngoại vi",
                value: "2 cổng UART, hỗ trợ phần cứng GPS và Optical Flow",
            },
        ],
        pricing: [
            { label: "Bản mạch PCB", price: "250.000 VNĐ", priceRaw: 250000 },
            { label: "Bản hoàn thiện", price: "700.000 VNĐ", priceRaw: 700000 },
        ],
        accentColor: "purple",
        glowColor: "rgba(168,85,247,0.25)",
    },
    {
        id: "vinafc-1-pro",
        name: "Bộ điều khiển bay VinaFC 1 Pro",
        badge: "Bản Chuyên sâu",
        description:
            "Phiên bản hiệu năng cao, trang bị hệ thống IMU kép, đáp ứng yêu cầu xử lý các thuật toán hàng không phức tạp và đồ án chuyên sâu.",
        specs: [
            { label: "Vi điều khiển", value: "Teensy 4.1 (Tốc độ xử lý 600MHz)" },
            { label: "Cảm biến kép", value: "BMI088 + ICM45686, Baro BMP388" },
            {
                label: "Giao tiếp ngoại vi",
                value: "7 cổng UART (Dễ dàng mở rộng đa thiết bị ngoại vi), hỗ trợ GPS và Optical Flow",
            },
        ],
        pricing: [{ label: "Bản hoàn thiện", price: "3.000.000 VNĐ", priceRaw: 3000000 }],
        accentColor: "amber",
        glowColor: "rgba(251,191,36,0.2)",
    },
];

// ─────────────────────────────────────────────────────────────────────────────
// ANIMATION VARIANTS
// ─────────────────────────────────────────────────────────────────────────────

const stepVariants = {
    enter: (direction: number) => ({
        x: direction > 0 ? 60 : -60,
        opacity: 0,
    }),
    center: { x: 0, opacity: 1 },
    exit: (direction: number) => ({
        x: direction > 0 ? -60 : 60,
        opacity: 0,
    }),
};

const transition = { duration: 0.35, ease: [0.4, 0, 0.2, 1] as [number, number, number, number] };

// ─────────────────────────────────────────────────────────────────────────────
// ACCENT COLOR HELPERS  (Tailwind safe-lists not needed — using inline styles)
// ─────────────────────────────────────────────────────────────────────────────

type AccentClasses = { border: string; bg: string; text: string; ring: string };

const ACCENT_MAP: Record<string, (selected: boolean) => AccentClasses> = {
    cyan: (s) => ({
        border: s ? "border-cyan-400" : "border-slate-700 hover:border-cyan-500/60",
        bg: s ? "bg-cyan-500/10" : "bg-slate-900/60 hover:bg-cyan-500/5",
        text: "text-cyan-400",
        ring: "ring-cyan-500/40",
    }),
    purple: (s) => ({
        border: s ? "border-purple-400" : "border-slate-700 hover:border-purple-500/60",
        bg: s ? "bg-purple-500/10" : "bg-slate-900/60 hover:bg-purple-500/5",
        text: "text-purple-400",
        ring: "ring-purple-500/40",
    }),
    amber: (s) => ({
        border: s ? "border-amber-400" : "border-slate-700 hover:border-amber-500/60",
        bg: s ? "bg-amber-500/10" : "bg-slate-900/60 hover:bg-amber-500/5",
        text: "text-amber-400",
        ring: "ring-amber-500/40",
    }),
};

function accentClasses(color: string, selected: boolean): AccentClasses {
    const fn = ACCENT_MAP[color] ?? ACCENT_MAP["cyan"]!;
    return fn(selected);
}

// ─────────────────────────────────────────────────────────────────────────────
// STEP COMPONENTS
// ─────────────────────────────────────────────────────────────────────────────

function StepSelectProduct({
    selected,
    onSelect,
}: {
    selected: string | null;
    onSelect: (id: string) => void;
}) {
    return (
        <div className="space-y-4">
            <p className="text-slate-400 text-sm leading-relaxed border-l-2 border-cyan-500/50 pl-3 mb-6">
                {ECOSYSTEM_INFO}
            </p>
            <div className="grid md:grid-cols-3 gap-4">
                {PRODUCTS.map((product) => {
                    const isSelected = selected === product.id;
                    const cls = accentClasses(product.accentColor, isSelected);
                    return (
                        <motion.button
                            key={product.id}
                            onClick={() => onSelect(product.id)}
                            whileHover={{ scale: 1.02, y: -2 }}
                            whileTap={{ scale: 0.98 }}
                            className={`relative text-left rounded-2xl border p-5 cursor-pointer transition-all duration-300 ${cls.border} ${cls.bg} ${isSelected ? `ring-1 ${cls.ring} shadow-lg` : ""}`}
                            style={{ boxShadow: isSelected ? `0 0 24px -6px ${product.glowColor}` : undefined }}
                            aria-pressed={isSelected}
                        >
                            {isSelected && (
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    className="absolute top-3 right-3"
                                >
                                    <CheckCircle2 className={`w-5 h-5 ${cls.text}`} />
                                </motion.div>
                            )}

                            <div className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-mono font-semibold mb-3 bg-current/10 ${cls.text} border border-current/20`}>
                                <span className="w-1.5 h-1.5 rounded-full bg-current" />
                                {product.badge}
                            </div>

                            <h3 className="text-white font-bold text-sm leading-snug mb-2">
                                {product.name}
                            </h3>
                            <p className="text-slate-400 text-xs leading-relaxed mb-4">
                                {product.description}
                            </p>

                            <ul className="space-y-1.5">
                                {product.specs.map((spec) => (
                                    <li key={spec.label} className="flex gap-2 text-xs">
                                        <span className="text-slate-500 shrink-0">{spec.label}:</span>
                                        <span className="text-slate-300">{spec.value}</span>
                                    </li>
                                ))}
                            </ul>

                            <div className={`mt-4 pt-3 border-t border-slate-700/60 text-xs ${cls.text} font-medium`}>
                                Từ {product.pricing[0]?.price}
                            </div>
                        </motion.button>
                    );
                })}
            </div>
        </div>
    );
}

function StepSelectVariant({
    product,
    selected,
    onSelect,
}: {
    product: Product;
    selected: number | null;
    onSelect: (idx: number) => void;
}) {
    const cls = accentClasses(product.accentColor, false);
    return (
        <div className="space-y-6">
            <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg bg-slate-800 ${cls.text}`}>
                    <Cpu className="w-5 h-5" />
                </div>
                <div>
                    <div className={`text-xs font-mono ${cls.text} mb-0.5`}>{product.badge}</div>
                    <div className="text-white font-bold">{product.name}</div>
                </div>
            </div>

            <p className="text-slate-400 text-sm">{product.description}</p>

            <div className="grid sm:grid-cols-2 gap-4">
                {product.pricing.map((option, idx) => {
                    const isSelected = selected === idx;
                    const varCls = accentClasses(product.accentColor, isSelected);
                    return (
                        <motion.button
                            key={idx}
                            onClick={() => onSelect(idx)}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className={`relative text-left rounded-2xl border p-6 cursor-pointer transition-all duration-300 ${varCls.border} ${varCls.bg} ${isSelected ? `ring-1 ${varCls.ring}` : ""}`}
                            style={{ boxShadow: isSelected ? `0 0 20px -6px ${product.glowColor}` : undefined }}
                            aria-pressed={isSelected}
                        >
                            {isSelected && (
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    className="absolute top-4 right-4"
                                >
                                    <CheckCircle2 className={`w-5 h-5 ${varCls.text}`} />
                                </motion.div>
                            )}
                            <div className="flex items-center gap-2 mb-3">
                                {idx === 0 ? (
                                    <Package className="w-4 h-4 text-slate-400" />
                                ) : (
                                    <Zap className={`w-4 h-4 ${varCls.text}`} />
                                )}
                                <span className="text-white font-semibold text-sm">
                                    {option.label}
                                </span>
                            </div>
                            {idx === 0 && (
                                <p className="text-xs text-slate-500 mb-3">
                                    Dành cho người tự hàn linh kiện (Chưa kèm MCU và cảm biến)
                                </p>
                            )}
                            {idx === 1 && (
                                <p className="text-xs text-slate-500 mb-3">
                                    Cắm là chạy — đã kiểm thử và hiệu chỉnh sẵn
                                </p>
                            )}
                            <div className={`text-2xl font-black tracking-tight ${varCls.text}`}>
                                {option.price}
                            </div>
                        </motion.button>
                    );
                })}
            </div>
        </div>
    );
}

function StepConfirm({
    product,
    variantIdx,
}: {
    product: Product;
    variantIdx: number;
}) {
    const cls = accentClasses(product.accentColor, true);
    const variant = product.pricing[variantIdx]!;

    return (
        <div className="space-y-6">
            <div className="text-center">
                <motion.div
                    initial={{ scale: 0, rotate: -20 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-cyan-500/10 border border-cyan-500/30 mb-4"
                >
                    <ShoppingCart className="w-7 h-7 text-cyan-400" />
                </motion.div>
                <h3 className="text-white font-bold text-xl mb-1">Xác nhận đơn hàng</h3>
                <p className="text-slate-400 text-sm">Kiểm tra lại cấu hình của bạn trước khi đặt hàng.</p>
            </div>

            <div
                className={`rounded-2xl border ${cls.border} bg-slate-900/80 p-6 space-y-4`}
                style={{ boxShadow: `0 0 30px -10px ${product.glowColor}` }}
            >
                <div className="flex items-start justify-between gap-4">
                    <div>
                        <div className={`text-xs font-mono ${cls.text} mb-1`}>{product.badge}</div>
                        <div className="text-white font-bold">{product.name}</div>
                    </div>
                    <div className={`text-right ${cls.text} font-black text-xl shrink-0`}>
                        {variant.price}
                    </div>
                </div>

                <div className="border-t border-slate-800 pt-4">
                    <div className="text-xs font-mono text-slate-500 mb-2 uppercase tracking-wider">
                        Phiên bản
                    </div>
                    <div className="flex items-center gap-2">
                        <Zap className={`w-4 h-4 ${cls.text}`} />
                        <span className="text-slate-200 font-medium">{variant.label}</span>
                    </div>
                </div>

                <div className="border-t border-slate-800 pt-4 space-y-2">
                    <div className="text-xs font-mono text-slate-500 mb-2 uppercase tracking-wider">
                        Thông số kỹ thuật
                    </div>
                    {product.specs.map((spec) => (
                        <div key={spec.label} className="flex gap-2 text-xs">
                            <span className="text-slate-500 shrink-0">{spec.label}:</span>
                            <span className="text-slate-300">{spec.value}</span>
                        </div>
                    ))}
                </div>

                <div className="border-t border-slate-800 pt-4 flex items-center gap-2 text-xs text-slate-400">
                    <Radio className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span>
                        Hỗ trợ Arduino IDE, tích hợp sẵn thư viện VinaFC. Giao hàng toàn quốc.
                    </span>
                </div>
            </div>

            <motion.a
                href="#dat-hang"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center justify-center gap-2 w-full py-4 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-sm transition-all shadow-[0_0_30px_-8px_rgba(6,182,212,0.6)] hover:shadow-[0_0_40px_-6px_rgba(6,182,212,0.8)]"
            >
                <ShoppingCart className="w-4 h-4" />
                Đặt hàng ngay — Điền form bên dưới
            </motion.a>
        </div>
    );
}

// ─────────────────────────────────────────────────────────────────────────────
// STEPPER INDICATOR
// ─────────────────────────────────────────────────────────────────────────────

const STEPS = ["Chọn sản phẩm", "Chọn phiên bản", "Xác nhận"];

function StepIndicator({ current }: { current: number }) {
    return (
        <div className="flex items-center gap-0 mb-8">
            {STEPS.map((label, i) => {
                const done = i < current;
                const active = i === current;
                return (
                    <div key={i} className="flex items-center flex-1 last:flex-none">
                        <div className="flex flex-col items-center gap-1.5">
                            <motion.div
                                animate={{
                                    scale: active ? 1.15 : 1,
                                    backgroundColor: done
                                        ? "#22d3ee"
                                        : active
                                            ? "#06b6d4"
                                            : "#1e293b",
                                    borderColor: done || active ? "#06b6d4" : "#334155",
                                }}
                                className="w-8 h-8 rounded-full border-2 flex items-center justify-center text-xs font-bold transition-colors"
                                style={{ color: done || active ? "#fff" : "#64748b" }}
                            >
                                {done ? <CheckCircle2 className="w-4 h-4" /> : i + 1}
                            </motion.div>
                            <span
                                className={`text-[10px] font-mono whitespace-nowrap ${active ? "text-cyan-400" : done ? "text-cyan-500/70" : "text-slate-600"}`}
                            >
                                {label}
                            </span>
                        </div>
                        {i < STEPS.length - 1 && (
                            <div className="flex-1 h-px mx-3 mb-5 relative">
                                <div className="absolute inset-0 bg-slate-700" />
                                <motion.div
                                    className="absolute inset-0 bg-cyan-500"
                                    initial={false}
                                    animate={{ scaleX: done ? 1 : 0 }}
                                    style={{ transformOrigin: "left" }}
                                    transition={{ duration: 0.4 }}
                                />
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

export default function LoadoutBuilder() {
    const [step, setStep] = useState(0);
    const [direction, setDirection] = useState(1);
    const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
    const [selectedVariantIdx, setSelectedVariantIdx] = useState<number | null>(null);

    const selectedProduct = PRODUCTS.find((p) => p.id === selectedProductId) ?? null;

    function goTo(next: number) {
        setDirection(next > step ? 1 : -1);
        setStep(next);
    }

    function handleProductSelect(id: string) {
        setSelectedProductId(id);
        setSelectedVariantIdx(null); // reset variant when product changes
    }

    return (
        <section
            id="shop"
            aria-label="VinaFC Loadout Builder - Cấu hình và đặt mua bộ điều khiển bay"
            className="py-24 relative overflow-hidden bg-slate-950"
        >
            {/* Background glows */}
            <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-cyan-900/10 rounded-full blur-[120px] pointer-events-none"
                aria-hidden="true"
            />
            <div
                className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-purple-900/10 rounded-full blur-[100px] pointer-events-none"
                aria-hidden="true"
            />

            <div className="max-w-5xl mx-auto px-6 relative z-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-300 text-xs font-mono font-medium mb-4 uppercase tracking-wider">
                        <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                        Loadout Builder
                    </div>
                    <h2 className="text-4xl md:text-5xl font-black tracking-tight text-white mb-3">
                        Cấu Hình{" "}
                        <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                            Bo Mạch
                        </span>{" "}
                        Của Bạn
                    </h2>
                    <p className="text-slate-400 max-w-xl mx-auto">
                        Chọn bộ điều khiển bay phù hợp với nhu cầu học tập và nghiên cứu của bạn.
                        Hỗ trợ toàn quốc.
                    </p>
                </motion.div>

                {/* Wizard card */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="relative rounded-3xl border border-slate-700/60 bg-slate-900/70 backdrop-blur-xl p-6 md:p-10 shadow-[0_0_60px_-20px_rgba(6,182,212,0.15)] overflow-hidden"
                >
                    {/* Decorative corner */}
                    <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

                    <StepIndicator current={step} />

                    {/* Step content with AnimatePresence */}
                    <div className="relative overflow-hidden min-h-[420px]">
                        <AnimatePresence mode="wait" custom={direction}>
                            <motion.div
                                key={step}
                                custom={direction}
                                variants={stepVariants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                transition={transition}
                                className="absolute inset-0 overflow-y-auto"
                            >
                                {step === 0 && (
                                    <StepSelectProduct
                                        selected={selectedProductId}
                                        onSelect={handleProductSelect}
                                    />
                                )}
                                {step === 1 && selectedProduct && (
                                    <StepSelectVariant
                                        product={selectedProduct}
                                        selected={selectedVariantIdx}
                                        onSelect={setSelectedVariantIdx}
                                    />
                                )}
                                {step === 2 && selectedProduct && selectedVariantIdx !== null && (
                                    <StepConfirm
                                        product={selectedProduct}
                                        variantIdx={selectedVariantIdx}
                                    />
                                )}
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Navigation buttons */}
                    <div className="flex items-center justify-between mt-8 pt-6 border-t border-slate-800">
                        <Button
                            variant="ghost"
                            onClick={() => goTo(step - 1)}
                            disabled={step === 0}
                            className="text-slate-400 hover:text-white disabled:opacity-30"
                        >
                            <ChevronLeft className="w-4 h-4 mr-1" />
                            Quay lại
                        </Button>

                        {step < 2 && (
                            <Button
                                onClick={() => goTo(step + 1)}
                                disabled={
                                    (step === 0 && !selectedProductId) ||
                                    (step === 1 && selectedVariantIdx === null)
                                }
                                className="bg-cyan-600 hover:bg-cyan-500 text-white px-6 disabled:opacity-30 disabled:cursor-not-allowed"
                            >
                                Tiếp theo
                                <ChevronRight className="w-4 h-4 ml-1" />
                            </Button>
                        )}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
