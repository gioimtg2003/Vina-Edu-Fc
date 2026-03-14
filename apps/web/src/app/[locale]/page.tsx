import HeroMission from "@/components/landing/HeroMission";
import CoursesSection from "@/components/landing/CoursesSection";
import HardwareProducts from "@/components/landing/HardwareProducts";
import Documentation from "@/components/landing/Documentation";
import DesktopAppSection from "@/components/landing/DesktopAppSection";
import { setRequestLocale } from "next-intl/server";

export const runtime = 'edge';

export default async function Home({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    setRequestLocale(locale);

    return (
        <>


            <HeroMission />

            <CoursesSection />

            <HardwareProducts />
            <Documentation />
            <DesktopAppSection />
        </>
    );
}
