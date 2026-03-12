import { Course } from "@/types/course";

export const COURSES: Course[] = [
    {
        id: "setup-drone",
        name: "Khóa học Setup Drone (Pixhawk & Mission Planner)",
        description: "Hướng dẫn lắp ráp phần cứng, đấu nối thiết bị, cấu hình Mission Planner, calibrate cảm biến và setup các chế độ bay tiêu chuẩn.",
        details: [
            "Lắp ráp drone hoàn chỉnh",
            "Cấu hình Mission Planner",
            "Calibrate cảm biến chuyên sâu",
            "Tối ưu hóa PID mặc định"
        ],
        duration: "4 buổi (3h/buổi)",
        viewCount: 100,
        price: "Thương lượng",
        content: "Phần 1: Tổng quan về linh kiện Drone. Phần 2: Kỹ năng hàn và lắp ráp. Phần 3: Cài đặt Firmware ArduPilot. Phần 4: Cấu hình và bay thử.",
        iconName: "Wrench"
    },
    {
        id: "balancing-drone",
        name: "Khóa học Lập trình bay cân bằng",
        description: "Phân tích nguyên lý hoạt động, đọc dữ liệu thô từ IMU, thiết kế thuật toán PID và lập trình bay cân bằng trực tiếp trên Arduino IDE.",
        details: [
            "Đọc dữ liệu IMU (MPU6050/ICM20602)",
            "Thuật toán lọc Complementary/Kalman",
            "Thiết kế bộ điều khiển PID",
            "Lập trình trên Arduino/ESP32"
        ],
        duration: "8 buổi (3h/buổi)",
        viewCount: 100,
        price: "Thương lượng",
        content: "Nắm vững toán học đằng sau sự cân bằng. Lập trình từ zero-to-hero hệ thống bay cân bằng của riêng bạn.",
        iconName: "Cpu"
    },
    {
        id: "position-hold",
        name: "Khóa học Lập trình bay giữ vị trí",
        description: "Tích hợp Optical Flow, xử lý kết hợp dữ liệu (IMU + Optical flow) và thiết kế thuật toán giữ vị trí tĩnh ngoài trời.",
        details: [
            "Giao tiếp cảm biến Optical Flow",
            "Xử lý dữ liệu vận tốc",
            "Kết hợp dữ liệu đa cảm biến",
            "Thuật toán giữ vị trí (Loiter)"
        ],
        duration: "6 buổi (3h/buổi)",
        viewCount: 100,
        price: "Thương lượng",
        content: "Nâng cấp drone của bạn với khả năng giữ vị trí thông minh bằng cảm biến quang học.",
        iconName: "MapPin"
    },
    {
        id: "autopilot-dev",
        name: "Khóa học Tổng hợp (Autopilot Development)",
        description: "Cung cấp kiến thức toàn diện để thiết kế và lập trình một hệ thống điều khiển bay (Autopilot) hoàn chỉnh từ con số không.",
        details: [
            "Kiến trúc phần mềm Autopilot",
            "Xử lý ngắt và Task Scheduling",
            "Giao thức MAVLink",
            "Tích hợp GPS và hạ cánh tự động"
        ],
        duration: "12 buổi (3h/buổi)",
        viewCount: 100,
        price: "Thương lượng",
        content: "Dành cho những người muốn trở thành kỹ sư UAV thực thụ. Xây dựng bộ não cho drone từ phần cứng đến phần mềm.",
        iconName: "GraduationCap"
    }
];
