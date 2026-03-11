"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Wallet, CreditCard, Truck, ChevronRight, Check, ShieldCheck } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { PRODUCTS } from "@/lib/products";

const paymentMethods = [
    { id: "vietqr", name: "Chuyển khoản ngân hàng (VietQR)", icon: Wallet },
    { id: "ewallet", name: "Ví điện tử (Momo/ZaloPay)", icon: CreditCard },
    { id: "cod", name: "Thanh toán khi nhận hàng (COD)", icon: Truck },
];

export default function CheckoutPage() {
    const params = useParams();
    const productId = Array.isArray(params.id) ? params.id[0] : params.id;
    
    // Find product or fallback
    const matchedProduct = PRODUCTS.find(p => p.id === productId);
    
    const cartItems = matchedProduct ? [
        {
            id: matchedProduct.id,
            name: matchedProduct.name,
            variant: matchedProduct.version,
            price: matchedProduct.basePrice,
            quantity: 1,
            image: matchedProduct.image,
        }
    ] : [];

    const [selectedPayment, setSelectedPayment] = useState("vietqr");
    const [isProcessing, setIsProcessing] = useState(false);
    
    // Summary Calculations
    const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const shippingFee = subtotal > 0 ? 30000 : 0;
    const discount = 0;
    const total = subtotal + shippingFee - discount;

    const formatVND = (amount: number) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
    };

    const handlePlaceOrder = async () => {
        if (total === 0) return;
        setIsProcessing(true);
        try {
            const orderId = `VNAFC_${Math.floor(Math.random() * 10000)}`;
            console.log("Order Placed. Creating record in D1...", orderId);
            
            // Simulate API delay
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            alert(`Đặt hàng thành công! Mã đơn: ${orderId}`);
            
            // In a real app, redirect:
            // window.location.href = `/checkout/success?orderId=${orderId}`;
        } catch (error) {
            console.error("Lỗi đặt hàng:", error);
        } finally {
            setIsProcessing(false);
        }
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

    return (
        <div className="min-h-screen bg-slate-50 pt-24 pb-20 text-gray-900 font-sans selection:bg-blue-100 selection:text-blue-900">
            <div className="container mx-auto px-4 max-w-6xl">
                {/* Modern DJI-style Checkout Header */}
                <motion.div 
                    initial={{ opacity: 0, y: -10 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    className="mb-8 flex items-center gap-3"
                >
                    <ShieldCheck className="w-8 h-8 text-blue-600" strokeWidth={1.5} />
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900">Thanh toán an toàn</h1>
                </motion.div>

                <div className="flex flex-col lg:flex-row gap-8">
                    
                    {/* Left Column: Details */}
                    <div className="w-full lg:w-2/3 space-y-6">
                        
                        {/* 1. Shipping Address Section */}
                        <motion.section 
                            initial={{ opacity: 0, y: 20 }} 
                            animate={{ opacity: 1, y: 0 }} 
                            transition={{ delay: 0.1 }}
                            className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden"
                        >
                            {/* Shopee-style stripped border top */}
                            <div className="h-1 w-full bg-gradient-to-r from-blue-500 via-transparent to-red-500 opacity-20" />
                            <div className="p-6 md:p-8">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center gap-2 text-blue-600 font-medium">
                                        <MapPin className="w-5 h-5" strokeWidth={2} />
                                        <h2 className="text-lg uppercase tracking-wider">Địa chỉ nhận hàng</h2>
                                    </div>
                                    <button className="text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors">
                                        Thay đổi
                                    </button>
                                </div>
                                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 text-base">
                                    <div className="font-bold text-gray-900 whitespace-nowrap">
                                        Nguyễn Văn A (+84) 912 345 678
                                    </div>
                                    <div className="text-gray-600 font-light flex-1">
                                        Tòa nhà Innovation, Khu Công Nghệ Cao, Tân Phú, Quận 9, TP. Hồ Chí Minh
                                    </div>
                                    <div className="inline-flex px-2 py-0.5 border border-blue-600 text-blue-600 text-xs font-medium rounded-sm whitespace-nowrap w-fit">
                                        Mặc định
                                    </div>
                                </div>
                            </div>
                        </motion.section>

                        {/* 2. Product List Section */}
                        <motion.section 
                            initial={{ opacity: 0, y: 20 }} 
                            animate={{ opacity: 1, y: 0 }} 
                            transition={{ delay: 0.2 }}
                            className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden"
                        >
                            <div className="p-6 md:p-8">
                                <h2 className="text-xl font-bold tracking-tight text-gray-900 mb-6">Sản phẩm</h2>
                                
                                {/* Header Row (Desktop only) */}
                                <div className="hidden md:grid grid-cols-12 gap-4 text-sm font-medium text-gray-400 uppercase tracking-wider mb-4 pb-2 border-b border-gray-100">
                                    <div className="col-span-6">Sản phẩm</div>
                                    <div className="col-span-2 text-center">Đơn giá</div>
                                    <div className="col-span-2 text-center">Số lượng</div>
                                    <div className="col-span-2 text-right">Thành tiền</div>
                                </div>

                                {/* Items */}
                                <div className="space-y-6">
                                    {cartItems.map((item) => (
                                        <div key={item.id} className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center group">
                                            <div className="col-span-1 md:col-span-6 flex items-start gap-4">
                                                <div className="relative w-24 h-24 rounded-xl overflow-hidden bg-slate-50 border border-slate-100 shrink-0">
                                                    <Image 
                                                        src={item.image} 
                                                        alt={item.name} 
                                                        fill 
                                                        className="object-contain p-2 mix-blend-multiply transition-transform duration-500 group-hover:scale-110"
                                                    />
                                                </div>
                                                <div className="flex flex-col justify-center py-2 text-left">
                                                    <span className="font-medium text-gray-900 text-base">{item.name}</span>
                                                    <span className="text-sm font-light text-gray-500 mt-1">Phân loại: {item.variant}</span>
                                                </div>
                                            </div>
                                            
                                            {/* Mobile layout helpers */}
                                            <div className="col-span-1 md:hidden flex justify-between items-center text-sm">
                                                <span className="text-gray-500">Đơn giá:</span>
                                                <span>{formatVND(item.price)}</span>
                                            </div>
                                            <div className="col-span-1 md:hidden flex justify-between items-center text-sm">
                                                <span className="text-gray-500">Số lượng:</span>
                                                <span>{item.quantity}</span>
                                            </div>

                                            {/* Desktop layout */}
                                            <div className="hidden md:block col-span-2 text-center text-gray-600 font-light">
                                                {formatVND(item.price)}
                                            </div>
                                            <div className="hidden md:block col-span-2 text-center text-gray-900 font-medium">
                                                {item.quantity}
                                            </div>
                                            <div className="col-span-1 md:col-span-2 text-right text-gray-900 font-medium">
                                                <span className="md:hidden text-gray-500 text-sm mr-2 font-normal">Thành tiền:</span>
                                                {formatVND(item.price * item.quantity)}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.section>

                        {/* 3. Payment Method Section */}
                        <motion.section 
                            initial={{ opacity: 0, y: 20 }} 
                            animate={{ opacity: 1, y: 0 }} 
                            transition={{ delay: 0.3 }}
                            className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden"
                        >
                            <div className="p-6 md:p-8">
                                <h2 className="text-xl font-bold tracking-tight text-gray-900 mb-6">Phương thức thanh toán</h2>
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                    {paymentMethods.map((method) => {
                                        const isSelected = selectedPayment === method.id;
                                        return (
                                            <button
                                                key={method.id}
                                                onClick={() => setSelectedPayment(method.id)}
                                                className={`relative flex flex-col items-center justify-center p-6 rounded-xl border-2 transition-all duration-300 ${
                                                    isSelected 
                                                        ? "border-blue-600 bg-blue-50/30 text-blue-900 shadow-sm" 
                                                        : "border-gray-100 hover:border-gray-200 hover:bg-gray-50 text-gray-600"
                                                }`}
                                            >
                                                {isSelected && (
                                                    <div className="absolute top-3 right-3 text-blue-600">
                                                        <Check className="w-5 h-5" strokeWidth={3} />
                                                    </div>
                                                )}
                                                <method.icon className={`w-8 h-8 mb-3 ${isSelected ? "text-blue-600" : "text-gray-400"}`} strokeWidth={1.5} />
                                                <span className="text-sm font-medium text-center">{method.name}</span>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        </motion.section>

                    </div>

                    {/* Right Column: Order Summary & Action */}
                    <div className="w-full lg:w-1/3">
                        <motion.div 
                            initial={{ opacity: 0, x: 20 }} 
                            animate={{ opacity: 1, x: 0 }} 
                            transition={{ delay: 0.4 }}
                            className="sticky top-24 bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8"
                        >
                            <h2 className="text-xl font-bold tracking-tight text-gray-900 mb-6 border-b border-gray-100 pb-4">Tổng thanh toán</h2>
                            
                            <div className="space-y-4 mb-6">
                                <div className="flex justify-between text-gray-600 font-light">
                                    <span>Tổng tiền hàng</span>
                                    <span>{formatVND(subtotal)}</span>
                                </div>
                                <div className="flex justify-between text-gray-600 font-light">
                                    <span>Phí vận chuyển</span>
                                    <span>{formatVND(shippingFee)}</span>
                                </div>
                                <div className="flex justify-between text-gray-600 font-light">
                                    <span>Giảm giá</span>
                                    <span>- {formatVND(discount)}</span>
                                </div>
                            </div>

                            <div className="border-t border-gray-100 pt-6 mb-8">
                                <div className="flex justify-between items-end">
                                    <span className="text-gray-900 font-medium">Tổng số tiền</span>
                                    <span className="text-3xl font-bold text-blue-600 tracking-tight">
                                        {formatVND(total)}
                                    </span>
                                </div>
                                <div className="text-right text-sm text-gray-400 mt-1 font-light">
                                    (Đã bao gồm VAT nếu có)
                                </div>
                            </div>

                            <button 
                                onClick={handlePlaceOrder}
                                disabled={isProcessing || total === 0}
                                className="w-full py-4 rounded-full bg-blue-600 text-white font-bold text-lg shadow-lg shadow-blue-600/20 hover:bg-blue-700 hover:shadow-blue-600/40 transition-all duration-300 disabled:opacity-70 flex justify-center items-center gap-2 group"
                            >
                                {isProcessing ? (
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                ) : (
                                    <>
                                        Đặt hàng
                                        <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                    </>
                                )}
                            </button>

                            <p className="text-xs text-gray-400 text-center mt-6 font-light leading-relaxed">
                                Nhấn "Đặt hàng" đồng nghĩa với việc bạn đồng ý tuân theo<br/>
                                <a href="#" className="text-blue-600 hover:underline">Điều khoản VinaUAV</a>.
                            </p>
                        </motion.div>
                    </div>

                </div>
            </div>
        </div>
    );
}
