"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { MapPin, Wallet, CreditCard, Truck, ChevronRight, Check, ShieldCheck, User, Phone, Home } from "lucide-react";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import { Product } from "@/lib/products";

interface Province {
    id_tinh: string;
    name_tinh: string;
}

interface District {
    id_quan: string;
    name_quan: string;
}

interface Ward {
    id_phuong: string;
    name_phuong: string;
}

interface FetchResponse<T> {
    error: number;
    data: T[];
}

const paymentMethods = [
    { id: "vietqr", name: "Chuyển khoản ngân hàng (VietQR)", icon: Wallet },
    { id: "ewallet", name: "Ví điện tử (Momo/ZaloPay)", icon: CreditCard },
    { id: "cod", name: "Thanh toán khi nhận hàng (COD)", icon: Truck },
];

export default function CheckoutClient({ matchedProduct }: { matchedProduct: Product }) {
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

    // Shipping Form State
    const [customerName, setCustomerName] = useState("");
    const [customerPhone, setCustomerPhone] = useState("");
    const [streetAddress, setStreetAddress] = useState("");

    const [provinces, setProvinces] = useState<Province[]>([]);
    const [districts, setDistricts] = useState<District[]>([]);
    const [wards, setWards] = useState<Ward[]>([]);

    const [selectedProvinceId, setSelectedProvinceId] = useState("");
    const [selectedDistrictId, setSelectedDistrictId] = useState("");
    const [selectedWardId, setSelectedWardId] = useState("");

    const [selectedProvinceName, setSelectedProvinceName] = useState("");
    const [selectedDistrictName, setSelectedDistrictName] = useState("");
    const [selectedWardName, setSelectedWardName] = useState("");

    const [formErrors, setFormErrors] = useState<Record<string, string>>({});

    // Fetch Provinces on Mount
    useEffect(() => {
        fetch('https://esgoo.net/api-tinhthanh/1/0.htm')
            .then(res => res.json())
            .then((data: FetchResponse<Province>) => {
                if (data.error === 0) setProvinces(data.data);
            })
            .catch(err => {
                console.error("Error fetching provinces:", err);
            });
    }, []);

    // Fetch Districts when Province changes
    useEffect(() => {
        if (!selectedProvinceId) {
            setDistricts([]);
            setWards([]);
            setSelectedDistrictId("");
            setSelectedWardId("");
            return;
        }
        fetch(`https://esgoo.net/api-tinhthanh/2/${selectedProvinceId}.htm`)
            .then(res => res.json())
            .then((data: FetchResponse<District>) => {
                if (data.error === 0) setDistricts(data.data);
            })
            .catch(err => {
                console.error("Error fetching districts:", err);
            });
    }, [selectedProvinceId]);

    // Fetch Wards when District changes
    useEffect(() => {
        if (!selectedDistrictId) {
            setWards([]);
            setSelectedWardId("");
            return;
        }
        fetch(`https://esgoo.net/api-tinhthanh/3/${selectedDistrictId}.htm`)
            .then(res => res.json())
            .then((data: FetchResponse<Ward>) => {
                if (data.error === 0) setWards(data.data);
            })
            .catch(err => {
                console.error("Error fetching wards:", err);
            });
    }, [selectedDistrictId]);

    // Validation
    const validateForm = () => {
        const errors: Record<string, string> = {};
        if (!customerName.trim()) errors.name = "Vui lòng nhập họ tên";
        if (!customerPhone.trim() || !/^[0-9]{10,11}$/.test(customerPhone)) errors.phone = "Số điện thoại không hợp lệ";
        if (!selectedProvinceId) errors.province = "Vui lòng chọn Tỉnh/Thành phố";
        if (!selectedDistrictId) errors.district = "Vui lòng chọn Quận/Huyện";
        if (!selectedWardId) errors.ward = "Vui lòng chọn Phường/Xã";
        if (!streetAddress.trim()) errors.street = "Vui lòng nhập địa chỉ cụ thể";
        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

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
        if (!validateForm()) {
            window.scrollTo({ top: 0, behavior: "smooth" });
            return;
        }

        setIsProcessing(true);
        try {
            const orderId = `VNAFC_${Math.floor(Math.random() * 10000)}`;
            const fullAddress = `${streetAddress}, ${selectedWardName}, ${selectedDistrictName}, ${selectedProvinceName}`;

            console.log("Order Placed:", {
                orderId,
                customer: { name: customerName, phone: customerPhone, address: fullAddress },
                total,
                paymentMethod: selectedPayment
            });

            // Simulate API delay
            await new Promise(resolve => setTimeout(resolve, 1500));

            alert(`Đặt hàng thành công!\nMã đơn: ${orderId}\nĐịa chỉ nhận: ${fullAddress}`);

            // In a real app, redirect:
            // window.location.href = `/checkout/success?orderId=${orderId}`;
        } catch (error) {
            console.error("Lỗi đặt hàng:", error);
        } finally {
            setIsProcessing(false);
        }
    };

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
                                <div className="flex items-center gap-2 text-blue-600 font-medium mb-6">
                                    <MapPin className="w-5 h-5" strokeWidth={2} />
                                    <h2 className="text-lg uppercase tracking-wider">Địa chỉ giao hàng</h2>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                    {/* Name Input */}
                                    <div className="space-y-1">
                                        <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                                            <User className="w-4 h-4 text-gray-400" /> Họ và tên
                                        </label>
                                        <input
                                            type="text"
                                            value={customerName}
                                            onChange={e => setCustomerName(e.target.value)}
                                            placeholder="VD: Nguyễn Văn A"
                                            className={`w-full px-4 py-2.5 rounded-lg border bg-gray-50 focus:bg-white transition-colors outline-none focus:ring-2 focus:ring-blue-100 ${formErrors.name ? 'border-red-400 focus:border-red-500' : 'border-gray-200 focus:border-blue-500'}`}
                                        />
                                        {formErrors.name && <p className="text-red-500 text-xs mt-1">{formErrors.name}</p>}
                                    </div>

                                    {/* Phone Input */}
                                    <div className="space-y-1">
                                        <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                                            <Phone className="w-4 h-4 text-gray-400" /> Số điện thoại
                                        </label>
                                        <input
                                            type="tel"
                                            value={customerPhone}
                                            onChange={e => setCustomerPhone(e.target.value)}
                                            placeholder="VD: 0912345678"
                                            className={`w-full px-4 py-2.5 rounded-lg border bg-gray-50 focus:bg-white transition-colors outline-none focus:ring-2 focus:ring-blue-100 ${formErrors.phone ? 'border-red-400 focus:border-red-500' : 'border-gray-200 focus:border-blue-500'}`}
                                        />
                                        {formErrors.phone && <p className="text-red-500 text-xs mt-1">{formErrors.phone}</p>}
                                    </div>
                                </div>

                                {/* Vietnam Address API Selectors */}
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                                    <div className="space-y-1">
                                        <label className="text-sm font-medium text-gray-700">Tỉnh/Thành phố</label>
                                        <select
                                            className={`w-full px-4 py-2.5 rounded-lg border bg-gray-50 focus:bg-white transition-colors outline-none focus:ring-2 focus:ring-blue-100 ${formErrors.province ? 'border-red-400' : 'border-gray-200'}`}
                                            value={selectedProvinceId}
                                            onChange={e => {
                                                setSelectedProvinceId(e.target.value);
                                                setSelectedProvinceName(e.target.options[e.target.selectedIndex]?.text || "");
                                            }}
                                        >
                                            <option value="">Chọn Tỉnh/Thành</option>
                                            {provinces.map((p: Province) => (
                                                <option key={p.id_tinh} value={p.id_tinh}>{p.name_tinh}</option>
                                            ))}
                                        </select>
                                        {formErrors.province && <p className="text-red-500 text-xs mt-1">{formErrors.province}</p>}
                                    </div>

                                    <div className="space-y-1">
                                        <label className="text-sm font-medium text-gray-700">Quận/Huyện</label>
                                        <select
                                            className={`w-full px-4 py-2.5 rounded-lg border bg-gray-50 focus:bg-white transition-colors outline-none focus:ring-2 focus:ring-blue-100 ${formErrors.district ? 'border-red-400' : 'border-gray-200'}`}
                                            value={selectedDistrictId}
                                            onChange={e => {
                                                setSelectedDistrictId(e.target.value);
                                                setSelectedDistrictName(e.target.options[e.target.selectedIndex]?.text || "");
                                            }}
                                            disabled={!selectedProvinceId}
                                        >
                                            <option value="">Chọn Quận/Huyện</option>
                                            {districts.map((d: District) => (
                                                <option key={d.id_quan} value={d.id_quan}>{d.name_quan}</option>
                                            ))}
                                        </select>
                                        {formErrors.district && <p className="text-red-500 text-xs mt-1">{formErrors.district}</p>}
                                    </div>

                                    <div className="space-y-1">
                                        <label className="text-sm font-medium text-gray-700">Phường/Xã</label>
                                        <select
                                            className={`w-full px-4 py-2.5 rounded-lg border bg-gray-50 focus:bg-white transition-colors outline-none focus:ring-2 focus:ring-blue-100 ${formErrors.ward ? 'border-red-400' : 'border-gray-200'}`}
                                            value={selectedWardId}
                                            onChange={e => {
                                                setSelectedWardId(e.target.value);
                                                setSelectedWardName(e.target.options[e.target.selectedIndex]?.text || "");
                                            }}
                                            disabled={!selectedDistrictId}
                                        >
                                            <option value="">Chọn Phường/Xã</option>
                                            {wards.map((w: Ward) => (
                                                <option key={w.id_phuong} value={w.id_phuong}>{w.name_phuong}</option>
                                            ))}
                                        </select>
                                        {formErrors.ward && <p className="text-red-500 text-xs mt-1">{formErrors.ward}</p>}
                                    </div>
                                </div>

                                <div className="space-y-1">
                                    <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                                        <Home className="w-4 h-4 text-gray-400" /> Tòa nhà, Tên đường...
                                    </label>
                                    <input
                                        type="text"
                                        value={streetAddress}
                                        onChange={e => setStreetAddress(e.target.value)}
                                        placeholder="VD: Số 1 Đường số 2, Tòa nhà ABC..."
                                        className={`w-full px-4 py-2.5 rounded-lg border bg-gray-50 focus:bg-white transition-colors outline-none focus:ring-2 focus:ring-blue-100 ${formErrors.street ? 'border-red-400 focus:border-red-500' : 'border-gray-200 focus:border-blue-500'}`}
                                    />
                                    {formErrors.street && <p className="text-red-500 text-xs mt-1">{formErrors.street}</p>}
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
                                                className={`relative flex flex-col items-center justify-center p-6 rounded-xl border-2 transition-all duration-300 ${isSelected
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
                                Nhấn &ldquo;Đặt hàng&rdquo; đồng nghĩa với việc bạn đồng ý tuân theo<br />
                                <Link href="#" className="text-blue-600 hover:underline">Điều khoản VinaUAV</Link>.
                            </p>
                        </motion.div>
                    </div>

                </div>
            </div>
        </div>
    );
}
