import NavigationBar from "@/components/NavigationBar";
import HeroMission from "@/components/landing/HeroMission";
import CoursesSection from "@/components/landing/CoursesSection";
import HardwareProducts from "@/components/landing/HardwareProducts";
import Documentation from "@/components/landing/Documentation";
import FooterContact from "@/components/landing/FooterContact";

const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
        {
            "@type": "WebSite",
            "@id": "https://vinauav.com/#website",
            url: "https://vinauav.com",
            name: "VinaUAV",
            description: "Nền tảng học lập trình Drone dành cho sinh viên - VinaUAV Flight Controller",
            inLanguage: ["vi", "en"],
        },
        {
            "@type": "Organization",
            "@id": "https://vinauav.com/#organization",
            name: "VinaUAV",
            url: "https://vinauav.com",
            description: "Vietnamese open-source drone flight controller for education.",
            foundingLocation: {
                "@type": "Country",
                name: "Vietnam",
            },
            areaServed: "Worldwide",
            contactPoint: {
                "@type": "ContactPoint",
                email: "quymom941478@gmail.com",
                telephone: "0817550271",
                contactType: "customer support",
                availableLanguage: ["Vietnamese", "English"],
            },
        },
    ],
};

export default function Home() {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            {/* The main container uses Light theme (white/gray) following DJI aesthetic */}
            <main className="min-h-screen relative bg-white text-gray-900 selection:bg-slate-200 selection:text-gray-900 overflow-hidden font-sans">
                {/* 
                 NavigationBar is kept for routing compatibility, but the sections 
                 below provide the new DJI-style high-end look.
                */}
                <NavigationBar />
                
                {/* Section 1 */}
                <HeroMission />
                
                {/* Section 2 */}
                <CoursesSection />
                
                {/* Section 3 */}
                <HardwareProducts />
                
                {/* Section 4 */}
                <Documentation />
                
                {/* Section 5 */}
                <FooterContact />
            </main>
        </>
    );
}
