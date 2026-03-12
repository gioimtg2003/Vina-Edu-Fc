import { BlogPost } from "@/types/blog";

export const BLOG_POSTS: BlogPost[] = [
  {
    id: "fc-board-overview",
    title: "Hướng dẫn chi tiết về FC Board - Trái tim của Drone",
    excerpt: "Khám phá cấu tạo, nguyên lý hoạt động và cách tối ưu hóa mạch điều khiển bay (Flight Controller) cho các dòng UAV hiện đại.",
    content: `
      <h2>1. Giới thiệu về Flight Controller (FC)</h2>
      <p>Mạch điều khiển bay (Flight Controller - FC) là "bộ não" của mọi chiếc máy bay không người lái (UAV). Nó nhận tín hiệu từ người điều khiển, xử lý dữ liệu từ các cảm biến (gyroscope, accelerometer, barometer, GPS) và đưa ra lệnh điều khiển cho các ESC để điều chỉnh tốc độ động cơ.</p>
      
      <p>Một chiếc FC tốt không chỉ giúp máy bay ổn định mà còn cho phép thực hiện các chế độ bay phức tạp như tự động quay về (RTH), bay theo hành trình GPS, hay giữ độ cao ổn định.</p>

      <h2>2. Cấu tạo cơ bản của một Board mạch FC</h2>
      <p>Thông thường, một board mạch FC hiện đại sẽ bao gồm các thành phần sau:</p>
      <ul>
        <li><strong>Vi xử lý (MCU):</strong> Thường là các dòng STM32 (F4, F7, H7).</li>
        <li><strong>IMU (Inertial Measurement Unit):</strong> Cảm biến gia tốc và con quay hồi chuyển.</li>
        <li><strong>Barometer:</strong> Cảm biến áp suất để giữ độ cao.</li>
        <li><strong>OSD Chip:</strong> Hiển thị thông số bay lên màn hình.</li>
        <li><strong>Blackbox:</strong> Lưu trữ dữ liệu chuyến bay để phân tích.</li>
      </ul>

      <blockquote>
        "Lựa chọn một chiếc FC phù hợp là bước quan trọng nhất khi bắt đầu xây dựng một chiếc UAV chuyên nghiệp."
      </blockquote>

      <h2>3. Cách tối ưu hóa hiệu suất bay</h2>
      <pre><code class="language-cpp">
// Ví dụ mã nguồn đơn giản để đọc dữ liệu cảm biến
void readSensors() {
  float accX = getAccelerationX();
  float accY = getAccelerationY();
  float accZ = getAccelerationZ();
  
  // Xử lý dữ liệu PID tại đây
  updatePID(accX, accY, accZ);
}
      </code></pre>

      <p>Để UAV đạt được sự ổn định tuyệt đối, việc Tuning PID là không thể thiếu. Chúng tôi sẽ có một bài viết riêng sâu hơn về chủ đề này.</p>
    `,
    coverImage: "/fc_board.jpg",
    category: "Kiến thức UAV",
    date: "2024-03-12",
    readTime: "8 phút",
    author: "Nguyen Cong Gioi",
    featured: true,
  },
  {
    id: "vinauav-launch",
    title: "VinaUAV chính thức ra mắt hệ sinh thái đào tạo UAV",
    excerpt: "Sứ mệnh của VinaUAV trong việc phổ cập kiến thức drone và hỗ trợ cộng đồng nghiên cứu UAV tại Việt Nam.",
    content: "<p>Nội dung đang được cập nhật...</p>",
    coverImage: "/fc_board.jpg",
    category: "Tin tức VinaUAV",
    date: "2024-03-10",
    readTime: "5 phút",
    author: "Nguyen Cong Gioi",
  },
  {
    id: "dron-laws-2024",
    title: "Cập nhật Nghị định mới nhất về quản lý tàu bay không người lái",
    excerpt: "Những thay đổi quan trọng trong quy định đăng ký và xin phép bay dành cho cá nhân và tổ chức năm 2024.",
    content: "<p>Nội dung đang được cập nhật...</p>",
    coverImage: "/fc_board.jpg",
    category: "Luật bay Việt Nam",
    date: "2024-03-05",
    readTime: "10 phút",
    author: "Nguyen Cong Gioi",
  },
  {
    id: "student-project-vtol",
    title: "Dự án VTOL của sinh viên Bách Khoa đạt giải nhất",
    excerpt: "Hành trình từ ý tưởng đến sản phẩm UAV cất hạ cánh thẳng đứng của nhóm sinh viên tài năng.",
    content: "<p>Nội dung đang được cập nhật...</p>",
    coverImage: "/fc_board.jpg",
    category: "Dự án sinh viên",
    date: "2024-02-28",
    readTime: "12 phút",
    author: "Nguyen Cong Gioi",
  },
  {
    id: "pid-tuning-guide",
    title: "Cẩm nang Tuning PID cho người mới bắt đầu",
    excerpt: "Làm thế nào để drone bay ổn định hơn? Các bước cơ bản để làm quen với các thông số P, I, D.",
    content: "<p>Nội dung đang được cập nhật...</p>",
    coverImage: "/fc_board.jpg",
    category: "Kiến thức UAV",
    date: "2024-02-20",
    readTime: "15 phút",
    author: "Nguyen Cong Gioi",
  },
  {
    id: "vinauav-workshop",
    title: "Workshop: Tự chế Drone từ linh kiện giá rẻ",
    excerpt: "Sự kiện thu hút hơn 100 học viên tham gia trải nghiệm lắp ráp và cấu hình drone thực tế.",
    content: "<p>Nội dung đang được cập nhật...</p>",
    coverImage: "/fc_board.jpg",
    category: "Tin tức VinaUAV",
    date: "2024-02-15",
    readTime: "6 phút",
    author: "Nguyen Cong Gioi",
  }
];
