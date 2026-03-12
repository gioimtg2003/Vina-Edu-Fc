import { PRODUCTS } from "@/lib/products";
import { setRequestLocale } from "next-intl/server";
import ProductDetailClient from "./ProductDetailClient";
import { Link } from "@/i18n/routing";

export const runtime = 'edge';

export default async function ProductDetailPage({
    params,
}: {
    params: Promise<{ id: string; locale: string }>;
}) {
    const { locale, id } = await params;
    setRequestLocale(locale);

    // Find product or fallback
    const matchedProduct = PRODUCTS.find(p => p.id === id);

    if (!matchedProduct) {
        return (
            <div className="min-h-screen bg-slate-50 pt-32 pb-20 text-center font-sans">
                <h1 className="text-2xl font-bold text-gray-900 mb-4">Không tìm thấy sản phẩm</h1>
                <p className="text-gray-500 mb-8">Sản phẩm bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.</p>
                <Link href="/#products" className="text-blue-600 hover:underline">Quay lại danh sách sản phẩm</Link>
            </div>
        );
    }

    return <ProductDetailClient matchedProduct={matchedProduct} PRODUCTS={PRODUCTS} />;
}
