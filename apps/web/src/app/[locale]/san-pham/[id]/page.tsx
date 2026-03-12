"use client";


import { motion } from "framer-motion";
import {
    CreditCard,
    ShieldCheck,
    Truck,
    ChevronRight,
    Home
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { PRODUCTS } from "@/lib/products";

import {
    Button,
    Breadcrumb,
    BreadcrumbList,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbPage,
    BreadcrumbSeparator,
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
    Tabs,
    TabsList,
    TabsTrigger,
    TabsContent
} from "@vinauav/ui";
import Link from "next/link";

export const runtime = 'edge';

import { setRequestLocale } from "next-intl/server";

export default async function ProductDetailPage({
    params,
}: {
    params: Promise<{ id: string; locale: string }>;
}) {
    const { locale, id } = await params;
    setRequestLocale(locale);

    const router = useRouter();
    const productId = id;

    // Find product or fallback
    const matchedProduct = PRODUCTS.find(p => p.id === productId);

    const formatVND = (amount: number) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
    };

    if (!matchedProduct) {
        return (
            <div className="min-h-screen bg-slate-50 pt-32 pb-20 text-center font-sans">
                <h1 className="text-2xl font-bold text-gray-900 mb-4">Không tìm thấy sản phẩm</h1>
                <p className="text-gray-500 mb-8">Sản phẩm bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.</p>
                <Link href="/#products" className="text-blue-600 hover:underline">Quay lại danh sách sản phẩm</Link>
            </div>
        );
    }

    const handleBuyNow = () => {
        router.push(`/checkout/${matchedProduct.id}`);
    };

    return (
        <div className="min-h-screen bg-slate-50 pt-24 pb-20 text-gray-900 font-sans selection:bg-blue-100 selection:text-blue-900">
            <div className="container mx-auto px-4 max-w-6xl">

                {/* 1. Breadcrumbs */}
                <div className="mb-6 lg:mb-10">
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
                                <BreadcrumbLink href="/#products">{'Sản phẩm'}</BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbPage className="font-medium text-gray-900">{matchedProduct.name}</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">

                    {/* 2. Left Column (Media) */}
                    <div className="lg:col-span-12 xl:col-span-7 flex flex-col-reverse lg:flex-row gap-4 lg:gap-6">
                        {/* Thumbnail Strip (Vertical on Desktop) */}
                        <div className="flex lg:flex-col gap-3 lg:w-20 overflow-x-auto lg:overflow-y-auto pb-2 lg:pb-0 scrollbar-none">
                            {[1, 2, 3].map((_, index) => (
                                <button
                                    key={index}
                                    className={`relative w-20 h-20 rounded-sm border-2 overflow-hidden shrink-0 bg-white transition-all ${index === 0 ? 'border-primary ring-1 ring-primary' : 'border-transparent hover:border-gray-300'}`}
                                >
                                    <Image
                                        src="/fc_board.jpg"
                                        alt={`Thumbnail ${index + 1}`}
                                        fill
                                        className="object-contain p-2 mix-blend-multiply"
                                    />
                                </button>
                            ))}
                        </div>

                        {/* Main Image Slider */}
                        <div className="flex-1 bg-white rounded-none shadow-none border border-slate-100 p-4 md:p-8 aspect-square relative flex items-center justify-center overflow-hidden">
                            <Carousel className="w-full max-w-2xl mx-auto">
                                <CarouselContent>
                                    {[1, 2, 3].map((_, index) => (
                                        <CarouselItem key={index}>
                                            <div className="relative w-full aspect-square flex items-center justify-center">
                                                <Image
                                                    src="/fc_board.jpg"
                                                    alt={`${matchedProduct.name} - Image ${index + 1}`}
                                                    fill
                                                    className="object-contain transition-transform duration-700 hover:scale-110"
                                                    priority={index === 0}
                                                />
                                            </div>
                                        </CarouselItem>
                                    ))}
                                </CarouselContent>
                                <CarouselPrevious className="left-4 hidden md:flex border-none bg-black/5 hover:bg-black/10" />
                                <CarouselNext className="right-4 hidden md:flex border-none bg-black/5 hover:bg-black/10" />
                            </Carousel>
                        </div>
                    </div>

                    {/* 3. Right Column (Specs & Purchase Panel - Sticky) */}
                    <div className="lg:col-span-12 xl:col-span-5 relative lg:sticky lg:top-32 h-fit">
                        <div className="space-y-6 lg:space-y-8">
                            <div className="space-y-3">
                                <motion.div
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className="inline-block px-2 py-0.5 border border-primary text-primary text-[10px] font-bold uppercase tracking-[0.2em]"
                                >
                                    VinaUAV Original
                                </motion.div>
                                <motion.h1
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="text-2xl md:text-3xl font-bold tracking-tight text-black leading-tight"
                                >
                                    {matchedProduct.name}
                                </motion.h1>
                                <motion.div
                                    initial={{ opacity: 0, y: 5 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1 }}
                                    className="flex items-baseline gap-2 pt-2"
                                >
                                    <span className="text-2xl font-bold text-black font-mono">
                                        {formatVND(matchedProduct.basePrice)}
                                    </span>
                                </motion.div>
                            </div>

                            {/* Variant Selector (from DJI Analysis) */}
                            <div className="space-y-4 pt-6 border-t border-gray-100">
                                <div className="flex justify-between items-center text-xs font-bold uppercase text-gray-400">
                                    <span>Phiên bản ưu chọn</span>
                                    <span className="text-blue-600 cursor-pointer hover:underline">Hướng dẫn chọn</span>
                                </div>
                                <div className="grid grid-cols-1 gap-3">
                                    {[
                                        { id: 'standard', name: matchedProduct.name, price: matchedProduct.basePrice, desc: 'Bản cơ bản đầy đủ phụ kiện' },
                                        { id: 'combo', name: `${matchedProduct.name} Combo`, price: matchedProduct.basePrice * 1.4, desc: 'Bao gồm thêm 3 pin & trạm sạc' }
                                    ].map((variant, i) => (
                                        <button
                                            key={variant.id}
                                            className={`group flex items-center justify-between p-4 border text-left transition-all ${i === 0 ? 'border-primary ring-1 ring-primary bg-white' : 'border-gray-200 bg-gray-50/50 hover:bg-white hover:border-gray-400'}`}
                                        >
                                            <div className="space-y-1">
                                                <div className="text-sm font-bold text-black">{variant.name}</div>
                                                <div className="text-[10px] text-gray-500">{variant.desc}</div>
                                            </div>
                                            <div className="text-sm font-mono font-bold text-black">
                                                {formatVND(variant.price)}
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="pt-8 flex flex-col gap-3"
                            >
                                <Button
                                    onClick={handleBuyNow}
                                    className="w-full py-7 text-sm font-bold bg-[#000000] hover:bg-gray-800 text-white rounded-none tracking-[0.1em] uppercase"
                                >
                                    <CreditCard className="w-4 h-4 mr-3" />
                                    Mua ngay
                                </Button>
                            </motion.div>

                            {/* Trust badges */}
                            <div className="pt-8 grid grid-cols-2 gap-y-4 gap-x-6 border-t border-gray-100">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-gray-50 rounded-full">
                                        <ShieldCheck className="w-4 h-4 text-black" />
                                    </div>
                                    <div className="text-[11px] font-bold text-gray-900 uppercase tracking-tighter">Bảo hành 12 tháng</div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-gray-50 rounded-full">
                                        <Truck className="w-4 h-4 text-black" />
                                    </div>
                                    <div className="text-[11px] font-bold text-gray-900 uppercase tracking-tighter">Giao hàng 24h</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 4. Detailed Section (Bottom Tabs with Sticky Nav) */}
                <div className="mt-24 space-y-16">
                    <Tabs defaultValue="specs" className="w-full">
                        {/* Sticky Tab Header */}
                        <div className="sticky top-20 z-10 bg-slate-50/80 backdrop-blur-md border-b border-gray-200">
                            <TabsList className="container mx-auto max-w-6xl justify-start overflow-x-auto rounded-none bg-transparent h-auto p-0 scrollbar-none gap-8">
                                <TabsTrigger
                                    value="features"
                                    className="data-[state=active]:border-black data-[state=active]:text-black border-b-2 border-transparent rounded-none px-0 py-5 text-xs font-bold uppercase tracking-widest data-[state=active]:shadow-none data-[state=active]:bg-transparent transition-all"
                                >
                                    Mô tả tổng hành
                                </TabsTrigger>
                                <TabsTrigger
                                    value="specs"
                                    className="data-[state=active]:border-black data-[state=active]:text-black border-b-2 border-transparent rounded-none px-0 py-5 text-xs font-bold uppercase tracking-widest data-[state=active]:shadow-none data-[state=active]:bg-transparent transition-all"
                                >
                                    Thông số kỹ thuật
                                </TabsTrigger>
                                <TabsTrigger
                                    value="documents"
                                    className="data-[state=active]:border-black data-[state=active]:text-black border-b-2 border-transparent rounded-none px-0 py-5 text-xs font-bold uppercase tracking-widest data-[state=active]:shadow-none data-[state=active]:bg-transparent transition-all"
                                >
                                    Tài liệu & Hướng dẫn
                                </TabsTrigger>
                            </TabsList>
                        </div>

                        <div className="pt-12">
                            <TabsContent value="features" className="focus-visible:outline-none">
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                                    <div className="space-y-6">
                                        <h2 className="text-3xl font-bold text-black leading-tight italic uppercase tracking-tighter">Sức mạnh vượt trội.<br />Kiểm soát tối ưu.</h2>
                                        <p className="text-gray-600 leading-relaxed text-lg italic">
                                            {matchedProduct.description}
                                        </p>
                                        <p className="text-gray-600 leading-relaxed">
                                            Sản phẩm hỗ trợ tốt nhất cho các dự án nghiên cứu và phát triển Drone tự động, đáp ứng mọi thử thách của môi trường thực tế. Với công nghệ FlightControl tiên tiến nhất từ VinaUAV, bạn hoàn toàn làm chủ bầu trời.
                                        </p>
                                    </div>
                                    <div className="relative aspect-video bg-gray-100 rounded-none overflow-hidden group">
                                        <Image
                                            src="/fc_board.jpg"
                                            alt="Feature highlight"
                                            fill
                                            className="object-cover transition-transform duration-1000 group-hover:scale-105"
                                        />
                                        <div className="absolute inset-0 bg-black/10 transition-opacity group-hover:opacity-0" />
                                    </div>
                                </div>
                            </TabsContent>

                            <TabsContent value="specs" className="focus-visible:outline-none">
                                <div className="max-w-4xl mx-auto">
                                    <h3 className="text-xl font-bold text-black mb-8 uppercase tracking-[0.2em] border-l-4 border-black pl-4">Thông số kỹ thuật</h3>
                                    <div className="bg-white border border-gray-100 divide-y divide-gray-100">
                                        {matchedProduct.specs.map((spec, idx) => (
                                            <div key={idx} className="flex justify-between items-center py-5 px-6 group hover:bg-gray-50 transition-colors">
                                                <span className="text-gray-400 text-xs font-bold uppercase tracking-wider">{spec.label}</span>
                                                <span className="text-black font-mono font-medium">{spec.value}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </TabsContent>

                            <TabsContent value="documents" className="focus-visible:outline-none">
                                <div className="max-w-4xl mx-auto space-y-8">
                                    <h3 className="text-xl font-bold text-black uppercase tracking-[0.2em] border-l-4 border-black pl-4">Tài liệu hướng dẫn</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {[
                                            'Hướng dẫn cài đặt nhanh (Quick Start Guide)',
                                            'Sơ đồ chân (Pinout Diagram)',
                                            'Tài liệu cấu hình PID',
                                            'Firmware v.2.4.0 (Latest)'
                                        ].map((doc, i) => (
                                            <Link
                                                key={i}
                                                href="#"
                                                className="flex items-center justify-between p-6 bg-white border border-gray-100 hover:border-black transition-all group"
                                            >
                                                <span className="text-sm font-bold text-gray-700 tracking-tight">{doc}</span>
                                                <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-black transition-colors" />
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            </TabsContent>
                        </div>
                    </Tabs>

                    {/* 5. Related Products (As per DJI Analysis) */}
                    <section className="pt-24 border-t border-gray-100">
                        <div className="flex justify-between items-end mb-12">
                            <div>
                                <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400 mb-2">Hệ sinh thái VinaUAV</p>
                                <h2 className="text-3xl font-bold text-black tracking-tighter">Sản phẩm liên quan</h2>
                            </div>
                            <Button variant="link" className="text-black font-bold p-0 group">
                                Xem tất cả <ChevronRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
                            </Button>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                            {PRODUCTS.filter(p => p.id !== matchedProduct.id).slice(0, 4).map((product) => (
                                <motion.div
                                    key={product.id}
                                    whileHover={{ y: -5 }}
                                    onClick={() => router.push(`/san-pham/${product.id}`)}
                                    className="group cursor-pointer"
                                >
                                    <div className="aspect-square bg-white border border-gray-100 p-6 relative overflow-hidden flex items-center justify-center mb-4 transition-all group-hover:border-gray-200">
                                        <Image
                                            src="/fc_board.jpg"
                                            alt={product.name}
                                            fill
                                            className="object-contain p-4 transition-transform duration-500 group-hover:scale-110"
                                        />
                                    </div>
                                    <h3 className="text-sm font-bold text-black mb-1 group-hover:text-primary transition-colors">{product.name}</h3>
                                    <div className="text-sm font-mono text-gray-500">{formatVND(product.basePrice)}</div>
                                </motion.div>
                            ))}
                        </div>
                    </section>
                </div>

            </div>
        </div>
    );
}
