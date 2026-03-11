import HeroMission from "@/components/landing/HeroMission";
import CoursesSection from "@/components/landing/CoursesSection";
import HardwareProducts from "@/components/landing/HardwareProducts";
import Documentation from "@/components/landing/Documentation";



export default function Home() {
    return (
        <>


            <HeroMission />

            <CoursesSection />

            <HardwareProducts />
            {/* Section 4 */}
            <Documentation />

            {/* Section 5 */}
        </>
    );
}
