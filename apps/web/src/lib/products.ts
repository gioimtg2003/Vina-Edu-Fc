export interface ProductSpec {
    label: string;
    value: string;
}

export interface Product {
    id: string;
    name: string;
    version: string;
    description: string;
    specs: ProductSpec[];
    price: string;
    basePrice: number;
    image: string;
}

export const PRODUCTS: Product[] = [
    {
        id: "vinafc-1",
        name: "VinaFC 1",
        version: "Bản Cơ bản",
        description:
            "Nền tảng khởi đầu giúp sinh viên thực hành thuật toán PID, Sensor Fusion và bay tự động cơ bản.",
        specs: [
            { label: "Vi điều khiển", value: "ESP32 (Dual core 240MHz)" },
            { label: "Cảm biến", value: "IMU ICM20602 (Accel + Gyro), Baro BMP388" },
            { label: "Ngoại vi", value: "2 cổng UART, hỗ trợ phần cứng GPS và Optical Flow (MTF01/MAVLink APM)" },
        ],
        price: "Mạch PCB: 250k | Hoàn thiện: 600k",
        basePrice: 600000,
        image: "/fc-board.png",
    },
    {
        id: "vinafc-1-plus",
        name: "VinaFC 1 Plus",
        version: "Bản Nâng cấp",
        description:
            "Cải thiện độ ổn định và độ tin cậy của dữ liệu với cảm biến chuẩn công nghiệp, đáp ứng môi trường phức tạp.",
        specs: [
            { label: "Vi điều khiển", value: "ESP32 (Dual core 240MHz)" },
            { label: "Cảm biến", value: "IMU BMI088 (Chuẩn CN), Baro BMP388" },
            { label: "Ngoại vi", value: "2 cổng UART, hỗ trợ phần cứng GPS và Optical Flow" },
        ],
        price: "Mạch PCB: 250k | Hoàn thiện: 700k",
        basePrice: 700000,
        image: "/fc-board.png",
    },
    {
        id: "vinafc-1-pro",
        name: "VinaFC 1 Pro",
        version: "Bản Chuyên sâu",
        description:
            "Phiên bản hiệu năng cao, trang bị hệ thống IMU kép, đáp ứng yêu cầu xử lý đồ án chuyên sâu và UAV phức tạp.",
        specs: [
            { label: "Vi điều khiển", value: "Teensy 4.1 (600MHz)" },
            { label: "Cảm biến kép", value: "BMI088 + ICM45686, Baro BMP388" },
            { label: "Ngoại vi", value: "7 cổng UART, hỗ trợ GPS và Optical Flow" },
        ],
        price: "Hoàn thiện: 3.000.000 VNĐ",
        basePrice: 3000000,
        image: "/fc-board.png",
    },
];
