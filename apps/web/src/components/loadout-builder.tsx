'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@vinauav/ui'
import { Check, ChevronRight, Cpu, Microscope, Settings, ShieldCheck, Zap } from 'lucide-react'

const PRODUCTS = [
    {
        id: 'vinafc-1',
        name: 'Bộ điều khiển bay VinaFC 1 (Bản Cơ bản)',
        description: 'Nền tảng khởi đầu giúp sinh viên thực hành thuật toán PID, Sensor Fusion và bay tự động cơ bản.',
        specs: [
            { label: 'Vi điều khiển', value: 'ESP32 (Dual core 240MHz)', icon: <Cpu className="h-4 w-4 text-primary" /> },
            { label: 'Cảm biến', value: 'IMU ICM20602 (Accel + Gyro), Baro BMP388', icon: <Microscope className="h-4 w-4 text-accent" /> },
            { label: 'Ngoại vi', value: '2 cổng UART, hỗ trợ phần cứng GPS và Optical Flow (MTF01 / chuẩn MAVLink APM)', icon: <Zap className="h-4 w-4 text-primary" /> },
        ],
        pricing: [
            { id: 'v1-pcb', label: 'Bản mạch PCB (Chưa kèm MCU & cảm biến - tự hàn)', price: 250000 },
            { id: 'v1-full', label: 'Bản hoàn thiện (Cắm là chạy)', price: 600000 },
        ],
    },
    {
        id: 'vinafc-1-plus',
        name: 'Bộ điều khiển bay VinaFC 1 Plus (Bản Nâng cấp)',
        description: 'Cải thiện độ ổn định và độ tin cậy của dữ liệu với cảm biến chuẩn công nghiệp.',
        specs: [
            { label: 'Vi điều khiển', value: 'ESP32 (Dual core 240MHz)', icon: <Cpu className="h-4 w-4 text-primary" /> },
            { label: 'Cảm biến', value: 'IMU BMI088 (Chuẩn công nghiệp), Baro BMP388', icon: <ShieldCheck className="h-4 w-4 text-accent" /> },
            { label: 'Ngoại vi', value: '2 cổng UART, hỗ trợ phần cứng GPS và Optical Flow', icon: <Zap className="h-4 w-4 text-primary" /> },
        ],
        pricing: [
            { id: 'v1plus-pcb', label: 'Bản mạch PCB', price: 250000 },
            { id: 'v1plus-full', label: 'Bản hoàn thiện', price: 700000 },
        ],
    },
    {
        id: 'vinafc-1-pro',
        name: 'Bộ điều khiển bay VinaFC 1 Pro (Bản Chuyên sâu)',
        description: 'Phiên bản hiệu năng cao, trang bị hệ thống IMU kép, đáp ứng yêu cầu xử lý các thuật toán hàng không phức tạp và đồ án chuyên sâu.',
        specs: [
            { label: 'Vi điều khiển', value: 'Teensy 4.1 (Tốc độ xử lý 600MHz)', icon: <Cpu className="h-4 w-4 text-primary" /> },
            { label: 'Cảm biến kép', value: 'BMI088 + ICM45686, Baro BMP388', icon: <Microscope className="h-4 w-4 text-accent" /> },
            { label: 'Ngoại vi', value: '7 cổng UART (Dễ dàng mở rộng đa thiết bị), hỗ trợ GPS và Optical Flow', icon: <Zap className="h-4 w-4 text-primary" /> },
        ],
        pricing: [
            { id: 'v1pro-full', label: 'Bản hoàn thiện', price: 3000000 },
        ],
    },
]

// --- Format Currency ---
const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount)
}

export function LoadoutBuilder() {
    // Step 1: Select Flight Controller
    // Step 2: Select Edition (PCB vs Full)
    // Step 3: Upsell 1-on-1 Session & Checkout
    const [step, setStep] = useState(1)
    const [selectedFcId, setSelectedFcId] = useState<string | null>(null)
    const [selectedEditionId, setSelectedEditionId] = useState<string | null>(null)
    const [wantsSetup, setWantsSetup] = useState(false)

    const selectedProduct = PRODUCTS.find((p) => p.id === selectedFcId)
    const selectedEdition = selectedProduct?.pricing.find((p) => p.id === selectedEditionId)

    const handleNext = () => {
        if (step === 1 && selectedFcId) setStep(2)
        else if (step === 2 && selectedEditionId) setStep(3)
        // Step 3 triggers the actual "buy" flow
    }

    const handleBack = () => {
        if (step > 1) {
            setStep(step - 1)
            if (step === 2) setSelectedEditionId(null)
            if (step === 3) setWantsSetup(false)
        }
    }

    return (
        <section id="loadout-builder" className="relative min-h-screen bg-black py-24">
            {/* Background Glow */}
            <div className="absolute left-1/2 top-1/4 -z-10 h-[600px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-[150px] pointer-events-none" />

            <div className="container mx-auto px-6">
                <div className="mb-16 text-center">
                    <h2 className="font-display text-4xl font-bold tracking-tight text-white sm:text-5xl">
                        Xây Dựng <span className="text-primary">Mô Hình Của Bạn</span>
                    </h2>
                    <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
                        Hệ sinh thái bo mạch VinaFC được tối ưu hóa cho quá trình học tập, đi kèm hệ thống thư viện hỗ trợ tương thích với Arduino IDE.
                    </p>
                </div>

                {/* Progress HUD */}
                <div className="mx-auto mb-12 flex max-w-3xl items-center justify-between">
                    {[1, 2, 3].map((s) => (
                        <div key={s} className="flex flex-col items-center">
                            <div
                                className={`flex h-10 w-10 items-center justify-center rounded-full border-2 font-mono text-sm transition-colors duration-300 ${step >= s
                                    ? 'border-primary bg-primary/20 text-primary shadow-glow'
                                    : 'border-white/20 bg-transparent text-muted-foreground'
                                    }`}
                            >
                                {step > s ? <Check className="h-5 w-5" /> : s}
                            </div>
                            <span className={`mt-2 font-mono text-xs uppercase tracking-wider ${step >= s ? 'text-primary' : 'text-muted-foreground'}`}>
                                {s === 1 ? 'Chọn Bo Mạch' : s === 2 ? 'Phiên Bản' : 'Tổng Kết'}
                            </span>
                        </div>
                    ))}
                    {/* Connecting lines */}
                    <div className="absolute left-1/2 top-[242px] -z-10 h-0.5 w-full max-w-[500px] -translate-x-1/2 bg-white/10 hidden md:block">
                        <div
                            className="h-full bg-primary transition-all duration-500 ease-in-out"
                            style={{ width: `${((step - 1) / 2) * 100}%` }}
                        />
                    </div>
                </div>

                {/* Wizard Canvas */}
                <div className="mx-auto max-w-4xl relative overflow-hidden rounded-2xl border border-white/10 bg-card/30 p-8 backdrop-blur-xl shadow-hud-lg min-h-[500px]">
                    <AnimatePresence mode="wait">
                        {/* STEP 1: Select Flight Controller */}
                        {step === 1 && (
                            <motion.div
                                key="step1"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="grid grid-cols-1 gap-6 md:grid-cols-3"
                            >
                                {PRODUCTS.map((product) => (
                                    <div
                                        key={product.id}
                                        onClick={() => setSelectedFcId(product.id)}
                                        className={`group relative cursor-pointer rounded-xl border p-6 transition-all duration-300 ${selectedFcId === product.id
                                            ? 'border-primary bg-primary/10 shadow-hud'
                                            : 'border-white/10 bg-black/40 hover:border-white/30 hover:bg-white/5'
                                            }`}
                                    >
                                        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-white/5">
                                            <Cpu className={`h-6 w-6 ${selectedFcId === product.id ? 'text-primary' : 'text-muted-foreground'}`} />
                                        </div>
                                        <h3 className="mb-2 font-display text-lg font-bold text-foreground">
                                            {product.name}
                                        </h3>
                                        <p className="mb-6 text-sm text-muted-foreground">
                                            {product.description}
                                        </p>

                                        <div className="space-y-3 border-t border-white/10 pt-4">
                                            {product.specs.map((spec, i) => (
                                                <div key={i} className="flex flex-col gap-1">
                                                    <span className="flex items-center gap-2 font-mono text-xs uppercase text-accent">
                                                        {spec.icon} {spec.label}
                                                    </span>
                                                    <span className="text-xs text-foreground/80">{spec.value}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </motion.div>
                        )}

                        {/* STEP 2: Select Edition */}
                        {step === 2 && selectedProduct && (
                            <motion.div
                                key="step2"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="flex flex-col items-center justify-center pt-8"
                            >
                                <h3 className="mb-8 font-display text-2xl font-bold text-foreground text-center">
                                    Chọn Phiên Bản cho <br />
                                    <span className="text-primary">{selectedProduct.name}</span>
                                </h3>

                                <div className="grid w-full max-w-2xl grid-cols-1 gap-4 sm:grid-cols-2">
                                    {selectedProduct.pricing.map((option) => (
                                        <div
                                            key={option.id}
                                            onClick={() => setSelectedEditionId(option.id)}
                                            className={`flex cursor-pointer flex-col items-center justify-center gap-4 rounded-xl border p-8 text-center transition-all ${selectedEditionId === option.id
                                                ? 'border-primary bg-primary/10 shadow-hud'
                                                : 'border-white/10 bg-black/40 hover:border-white/30'
                                                }`}
                                        >
                                            <Settings className={`h-8 w-8 ${selectedEditionId === option.id ? 'text-primary' : 'text-muted-foreground'}`} />
                                            <span className="font-semibold text-foreground">{option.label}</span>
                                            <span className="font-mono text-xl text-accent">{formatCurrency(option.price)}</span>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        )}

                        {/* STEP 3: Setup Upsell & Summary */}
                        {step === 3 && selectedProduct && selectedEdition && (
                            <motion.div
                                key="step3"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="mx-auto max-w-2xl px-4 py-8"
                            >
                                <div className="mb-8 rounded-xl border border-primary/20 bg-primary/5 p-6">
                                    <h3 className="mb-4 font-display text-xl font-bold text-foreground border-b border-primary/20 pb-4">
                                        Đơn Yêu Cầu Của Bạn
                                    </h3>
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-muted-foreground">{selectedProduct.name}</span>
                                    </div>
                                    <div className="flex justify-between items-center mb-4 text-sm text-foreground/80 pl-4 border-l-2 border-white/10">
                                        <span>Phiên bản: {selectedEdition.label}</span>
                                        <span className="font-mono text-accent">{formatCurrency(selectedEdition.price)}</span>
                                    </div>

                                    {wantsSetup && (
                                        <div className="flex justify-between items-center border-t border-white/10 pt-4 mt-4">
                                            <span className="text-primary font-medium">Khóa Hướng Dẫn Setup 1-1</span>
                                            <span className="font-mono text-accent">{formatCurrency(500000)}</span>
                                        </div>
                                    )}

                                    <div className="flex justify-between items-center border-t border-primary/20 pt-4 mt-4">
                                        <span className="text-lg font-bold">Tổng Cộng</span>
                                        <span className="font-mono text-2xl text-primary font-bold">
                                            {formatCurrency(selectedEdition.price + (wantsSetup ? 500000 : 0))}
                                        </span>
                                    </div>
                                </div>

                                <div
                                    onClick={() => setWantsSetup(!wantsSetup)}
                                    className={`mb-8 flex cursor-pointer items-start gap-4 rounded-xl border p-6 transition-all ${wantsSetup ? 'border-accent bg-accent/10 shadow-glow' : 'border-white/10 bg-black/40 hover:border-white/30'
                                        }`}
                                >
                                    <div className={`mt-1 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded border ${wantsSetup ? 'border-accent bg-accent text-black' : 'border-white/30'}`}>
                                        {wantsSetup && <Check className="h-4 w-4" />}
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-foreground">Bạn cần hỗ trợ Setup Chuyên Sâu? (+500.000đ)</h4>
                                        <p className="mt-1 text-sm text-muted-foreground">
                                            Gói hỗ trợ 1 kèm 1 với kỹ sư VinaUAV. Bao gồm kiểm tra rớt tín hiệu, hướng dẫn hàn mạch an toàn, tuning cơ bản bằng Configurator và thiết lập OSD.
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Navigation Buttons */}
                    <div className="absolute bottom-0 left-0 right-0 flex justify-between border-t border-white/10 bg-background/50 p-6 backdrop-blur-md">
                        <Button
                            variant="ghost"
                            onClick={handleBack}
                            disabled={step === 1}
                            className="text-muted-foreground hover:text-foreground"
                        >
                            Quay lại
                        </Button>
                        <Button
                            variant={step === 3 ? "accent" : "default"}
                            onClick={handleNext}
                            disabled={(step === 1 && !selectedFcId) || (step === 2 && !selectedEditionId)}
                            className="font-bold tracking-wide"
                        >
                            {step === 3 ? 'Xác Nhận Đặt Hàng' : 'Tiếp Tục'}
                            {step < 3 && <ChevronRight className="ml-2 h-4 w-4" />}
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    )
}
