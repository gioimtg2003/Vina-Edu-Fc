import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import FeaturesSection from "@/components/FeaturesSection";
import EducationSection from "@/components/EducationSection";
import LoadoutBuilder from "@/components/LoadoutBuilder";
import BookingSection from "@/components/BookingSection";
import PartnershipSection from "@/components/PartnershipSection";
import ContactSection from "@/components/ContactSection";
import NavigationBar from "@/components/NavigationBar";
import PageFooter from "@/components/PageFooter";


const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
        {
            "@type": "WebSite",
            "@id": "https://vinauav.com/#website",
            url: "https://vinauav.com",
            name: "VINA UAV",
            description: "Vietnam's open-source ESP32 drone flight controller for education and research.",
            inLanguage: ["vi", "en"],
        },
        {
            "@type": "Organization",
            "@id": "https://vinauav.com/#organization",
            name: "Vina UAV",
            url: "https://vinauav.com",
            description: "Vietnamese drone technology company creating open-source flight controllers for education.",
            foundingLocation: {
                "@type": "Country",
                name: "Vietnam",
            },
            areaServed: "Worldwide",
            knowsAbout: [
                "Drone flight controller",
                "ESP32 microcontroller",
                "Open source drone technology",
                "UAV research platform",
                "Educational robotics",
            ],
            contactPoint: {
                "@type": "ContactPoint",
                email: "quymom941478@gmail.com",
                contactType: "customer support",
                availableLanguage: ["Vietnamese", "English"],
            },
        },
        {
            "@type": "Product",
            "@id": "https://vinauav.com/#product",
            name: "VINA UAV",
            alternateName: ["Vina UAV Flight Controller", "ESP32 Drone Controller Vietnam"],
            description:
                "An open-source ESP32-based drone flight controller designed and built in Vietnam. Perfect for drone research, education, university labs, maker communities, and robotics engineers. Mạch điều khiển drone mã nguồn mở cho sinh viên và kỹ sư.",
            brand: {
                "@type": "Brand",
                name: "VINA UAV",
            },
            manufacturer: {
                "@type": "Organization",
                name: "Vina UAV",
                address: {
                    "@type": "PostalAddress",
                    addressCountry: "VN",
                },
            },
            category: "Drone Flight Controller",
            audience: {
                "@type": "Audience",
                audienceType: "Drone enthusiasts, robotics engineers, universities, maker communities",
            },
            offers: {
                "@type": "Offer",
                availability: "https://schema.org/PreOrder",
                priceCurrency: "VND",
                seller: {
                    "@type": "Organization",
                    name: "Vina UAV",
                },
            },
            keywords:
                "drone flight controller, ESP32 flight controller, open source drone controller, Vietnam drone technology, educational drone platform, mạch điều khiển drone",
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
            <main className="min-h-screen relative bg-slate-950 text-slate-50 selection:bg-cyan-500/30 overflow-hidden">
                <NavigationBar />
                <HeroSection />
                <AboutSection />
                <FeaturesSection />
                <EducationSection />
                <LoadoutBuilder />
                <BookingSection />
                <PartnershipSection />
                <ContactSection />
                <PageFooter />
                {/* <Footer /> */}
            </main>
        </>
    );
}
