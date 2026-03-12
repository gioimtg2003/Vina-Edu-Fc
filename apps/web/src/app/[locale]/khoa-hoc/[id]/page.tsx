import { COURSES } from "@/lib/courses";
import { getTranslations, setRequestLocale } from "next-intl/server";
import CourseDetailClient from "./CourseDetailClient";
import { Link } from "@/i18n/routing";

export const runtime = 'edge';

export default async function CourseDetailPage({
    params,
}: {
    params: Promise<{ id: string; locale: string }>;
}) {
    const { locale, id } = await params;
    setRequestLocale(locale);

    const t = await getTranslations("common.courses");

    // Find course or fallback
    const matchedCourse = COURSES.find(c => c.id === id);

    if (!matchedCourse) {
        return (
            <div className="min-h-screen bg-slate-50 pt-32 pb-20 text-center font-sans">
                <h1 className="text-2xl font-bold text-gray-900 mb-4">{t("not_found")}</h1>
                <p className="text-gray-500 mb-8">{t("not_found_desc")}</p>
                <Link href="/#courses" className="text-blue-600 hover:underline">{t("back_to_list")}</Link>
            </div>
        );
    }

    return <CourseDetailClient matchedCourse={matchedCourse} />;
}
