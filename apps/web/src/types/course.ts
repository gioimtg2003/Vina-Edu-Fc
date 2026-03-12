export interface Course {
    id: string;
    name: string;
    description: string;
    details: string[]; // List of specific highlights/features
    duration: string;
    viewCount: number; // Fixed at 100 for now
    price: string; // Default: "Thương lượng"
    content: string; // Detailed course curriculum/content
    iconName?: string; // Optional icon identifier
}
