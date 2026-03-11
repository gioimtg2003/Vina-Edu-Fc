"use client";


import { motion } from "framer-motion";
import {
    ShoppingCart,
    CreditCard,
    ShieldCheck,
    Truck,
    CheckCircle2,
    ChevronRight,
    Home
} from "lucide-react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
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

export default function ProductDetailPage() {
    const params = useParams();
    const router = useRouter();
    const productId = Array.isArray(params.id) ? params.id[0] : params.id;

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
                <a href="/#products" className="text-blue-600 hover:underline">Quay lại danh sách sản phẩm</a>
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

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
                    
                    {/* 2. Left Column (Media) */}
                    <div className="lg:col-span-7 space-y-4">
                        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-4 md:p-8 aspect-square relative flex items-center justify-center overflow-hidden">
                            <Carousel className="w-full max-w-lg mx-auto">
                                <CarouselContent>
                                    {[1, 2, 3].map((_, index) => (
                                        <CarouselItem key={index}>
                                            <div className="relative w-full aspect-square flex items-center justify-center p-4">
                                                <Image
                                                    src="/fc_board.jpg"
                                                    alt={`${matchedProduct.name} - Image ${index + 1}`}
                                                    fill
                                                    className="object-contain mix-blend-multiply transition-transform duration-500 hover:scale-105"
                                                    priority={index === 0}
                                                />
                                            </div>
                                        </CarouselItem>
                                    ))}
                                </CarouselContent>
                                <CarouselPrevious className="left-2 hidden md:flex" />
                                <CarouselNext className="right-2 hidden md:flex" />
                            </Carousel>
                        </div>
                        
                        {/* Thumbnail Previews */}
                        <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-none">
                            {[1, 2, 3].map((_, index) => (
                                <button
                                    key={index}
                                    className={`relative w-24 h-24 rounded-xl border-2 overflow-hidden shrink-0 bg-white ${index === 0 ? 'border-blue-600' : 'border-transparent hover:border-gray-200'}`}
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
                    </div>

                    {/* 3. Right Column (Specs & Purchase) */}
                    <div className="lg:col-span-5 relative">
                        <div className="sticky top-24 space-y-6 lg:space-y-8 bg-white lg:bg-transparent p-6 lg:p-0 rounded-2xl shadow-sm border border-slate-200 lg:border-none lg:shadow-none">
                            <div className="space-y-2">
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="inline-block px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-xs font-semibold uppercase tracking-wider mb-2"
                                >
                                    Phiên bản: {matchedProduct.version}
                                </motion.div>
                                <motion.h1
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1 }}
                                    className="text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900"
                                >
                                    {matchedProduct.name}
                                </motion.h1>
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 }}
                                    className="pt-4"
                                >
                                    <span className="text-3xl font-bold text-red-600">
                                        {formatVND(matchedProduct.basePrice)}
                                    </span>
                                </motion.div>
                            </div>

                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.3 }}
                                className="space-y-4 pt-4 border-t border-gray-200 lg:border-gray-300/60"
                            >
                                <h3 className="font-semibold text-gray-900">{'Đặc điểm nổi bật:'}</h3>
                                <ul className="space-y-3">
                                    {matchedProduct.specs.map((spec, idx) => (
                                        <li key={idx} className="flex gap-3 text-gray-600">
                                            <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                                            <span>
                                                <strong className="text-gray-800">{spec.label}:</strong> {spec.value}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                                className="pt-6 flex flex-col sm:flex-row gap-4"
                            >
                                <Button 
                                    onClick={handleBuyNow} 
                                    className="flex-1 py-6 text-lg font-bold bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg shadow-blue-600/20 transition-all hover:scale-[1.02]"
                                >
                                    <CreditCard className="w-5 h-5 mr-2" />
                                    {'Mua ngay'}
                                </Button>
                                <Button 
                                    variant="outline" 
                                    className="flex-1 py-6 text-lg font-semibold rounded-full border-gray-300 text-gray-700 hover:bg-gray-50 transition-all hover:scale-[1.02]"
                                >
                                    <ShoppingCart className="w-5 h-5 mr-2" />
                                    {'Thêm vào giỏ hàng'}
                                </Button>
                            </motion.div>

                            <motion.div 
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.5 }}
                                className="pt-6 grid grid-cols-2 gap-4 text-sm text-gray-500"
                            >
                                <div className="flex items-center gap-2">
                                    <ShieldCheck className="w-5 h-5 text-green-600" />
                                    <span>{'Bảo hành 12 tháng'}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Truck className="w-5 h-5 text-blue-600" />
                                    <span>{'Giao hàng toàn quốc'}</span>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>

                {/* 4. Detailed Section (Bottom Tabs) */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="mt-16 bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8"
                >
                    <Tabs defaultValue="specs" className="w-full">
                        <TabsList className="mb-6 w-full justify-start overflow-x-auto rounded-none border-b border-gray-200 bg-transparent h-auto p-0 scrollbar-none">
                            <TabsTrigger 
                                value="specs" 
                                className="data-[state=active]:border-blue-600 data-[state=active]:text-blue-600 border-b-2 border-transparent rounded-none px-4 py-3 text-base font-semibold data-[state=active]:shadow-none data-[state=active]:bg-transparent"
                            >
                                {'Thông số kỹ thuật'}
                            </TabsTrigger>
                            <TabsTrigger 
                                value="features" 
                                className="data-[state=active]:border-blue-600 data-[state=active]:text-blue-600 border-b-2 border-transparent rounded-none px-4 py-3 text-base font-semibold data-[state=active]:shadow-none data-[state=active]:bg-transparent"
                            >
                                {'Tính năng nổi bật'}
                            </TabsTrigger>
                            <TabsTrigger 
                                value="documents" 
                                className="data-[state=active]:border-blue-600 data-[state=active]:text-blue-600 border-b-2 border-transparent rounded-none px-4 py-3 text-base font-semibold data-[state=active]:shadow-none data-[state=active]:bg-transparent"
                            >
                                {'Tài liệu đi kèm'}
                            </TabsTrigger>
                        </TabsList>
                        
                        <TabsContent value="specs" className="prose max-w-none prose-blue">
                            <h3 className="text-lg font-bold text-gray-900 mb-4">{'Chi tiết thông số kỹ thuật'}</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                                {matchedProduct.specs.map((spec, idx) => (
                                    <div key={idx} className="flex justify-between py-3 border-b border-gray-100 last:border-0 md:last:border-b-0">
                                        <span className="text-gray-500 font-medium">{spec.label}</span>
                                        <span className="text-gray-900 text-right">{spec.value}</span>
                                    </div>
                                ))}
                            </div>
                        </TabsContent>
                        
                        <TabsContent value="features" className="prose max-w-none prose-blue">
                            <h3 className="text-lg font-bold text-gray-900 mb-4">{'Mô tả tổng hành'}</h3>
                            <p className="text-gray-600 leading-relaxed mb-6">
                                {matchedProduct.description}
                            </p>
                            <p className="text-gray-600 leading-relaxed">
                                {'Sản phẩm hỗ trợ tốt nhất cho các dự án nghiên cứu và phát triển Drone tự động, đáp ứng mọi thử thách của môi trường thực tế.'}
                            </p>
                        </TabsContent>

                        <TabsContent value="documents" className="prose max-w-none prose-blue">
                            <h3 className="text-lg font-bold text-gray-900 mb-4">{'Tài liệu & Hướng dẫn'}</h3>
                            <ul className="space-y-3">
                                <li>
                                    <a href="#" className="flex items-center gap-2 text-blue-600 hover:underline">
                                        <ChevronRight className="w-4 h-4" />
                                        {'Hướng dẫn cài đặt nhanh (Quick Start Guide)'}
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="flex items-center gap-2 text-blue-600 hover:underline">
                                        <ChevronRight className="w-4 h-4" />
                                        {'Sơ đồ chân (Pinout Diagram)'}
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="flex items-center gap-2 text-blue-600 hover:underline">
                                        <ChevronRight className="w-4 h-4" />
                                        {'Tài liệu cấu hình PID'}
                                    </a>
                                </li>
                            </ul>
                        </TabsContent>
                    </Tabs>
                </motion.div>

            </div>
        </div>
    );
}
