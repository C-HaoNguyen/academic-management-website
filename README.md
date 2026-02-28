# Academic Management Website

Một nền tảng quản lý học tập toàn diện được xây dựng bằng React, TypeScript và Tailwind CSS.

## 📋 Mục Đích

Nền tảng này cung cấp một hệ thống quản lý học tập hiện đại cho phép:
- **Sinh viên**: Xem khóa học, nộp bài tập, theo dõi tiến độ học tập
- **Giảng viên**: Quản lý khóa học, tạo bài tập, chấm điểm
- **Quản trị viên**: Quản lý người dùng, khóa học, và hệ thống

## 🛠️ Công Nghệ

- **Frontend**: React 18+ với TypeScript
- **Styling**: Tailwind CSS + PostCSS
- **Build Tool**: Vite
- **Routing**: React Router v6
- **Icons**: Lucide React
- **Linting**: ESLint
- **Môi trường**: Node.js

## 📁 Cấu Trúc Dự Án

```
src/
├── components/        # Các component React
│   ├── admin/        # Component cho giao diện admin
│   ├── checkout/     # Component checkout
│   ├── common/       # Các component dùng chung
│   ├── loading/      # Component loading
│   ├── public/       # Component công khai (Header, Footer)
│   └── student/      # Component cho sinh viên
├── pages/            # Các trang (pages)
│   ├── admin/
│   ├── auth/
│   ├── public/
│   ├── student/
│   └── teacher/
├── routes/           # Định tuyến ứng dụng
├── types/            # TypeScript types
├── utils/            # Các hàm tiện ích
├── config/           # Cấu hình ứng dụng
├── assets/           # Hình ảnh, biểu tượng
├── App.tsx          # Component root
├── main.tsx         # Entry point
└── index.css        # Styles toàn cục
```

## 🚀 Bắt Đầu

### Yêu Cầu
- Node.js 16+ và npm/yarn

### Cài Đặt

```bash
# Clone repository
git clone <repository-url>

# Cài đặt dependencies
npm install

# Khởi động server phát triển
npm run dev

# Build cho production
npm run build

# Preview build
npm run preview
```

## 📖 Hướng Dẫn Sử Dụng

### Đăng Nhập
- Truy cập `/login` để đăng nhập
- Hoặc đăng ký tài khoản mới tại `/signup`

### Cho Sinh Viên
- **Dashboard**: `/student/dashboard` - Xem khóa học và tiến độ
- **Hồ Sơ**: `/student/profile` - Chỉnh sửa thông tin cá nhân

### Cho Giảng Viên
- **Quản lý Khóa Học**: `/teacher/courses`
- **Chấm Điểm**: `/teacher/grading`

### Cho Quản Trị Viên
- **Quản lý Người Dùng**: `/admin/users`
- **Quản lý Khóa Học**: `/admin/courses`

## 🔐 Xác Thực

Ứng dụng sử dụng JWT tokens cho xác thực:
- `accessToken`: Lưu trữ trong localStorage
- `refreshToken`: Dùng để làm mới token hết hạn

Xem [`AuthUtils.ts`](src/utils/AuthUtils.ts) để biết chi tiết.

## 🎨 Styling

Dự án sử dụng Tailwind CSS. Các styles toàn cục được định nghĩa trong:
- [`index.css`](src/index.css) - Styles chính
- [`App.css`](src/App.css) - Styles ứng dụng

## 📝 Công Thức Toán

Nếu có tính toán điểm:
$$\text{GPA} = \frac{\sum (\text{Điểm} \times \text{Tín chỉ})}{\sum \text{Tín chỉ}}$$

## 🤝 Đóng Góp

1. Tạo branch mới (`git checkout -b feature/AmazingFeature`)
2. Commit thay đổi (`git commit -m 'Add some AmazingFeature'`)
3. Push lên branch (`git push origin feature/AmazingFeature`)
4. Mở Pull Request

## 📜 License

Dự án này được cấp phép dưới MIT License.

## 👥 Tác Giả

**YOUR_NAME** - Academic Management Website

## 📞 Liên Hệ

- **Email**: your.email@example.com
- **Website**: https://your-website.com

## 🐛 Báo Cáo Lỗi

Nếu tìm thấy lỗi, vui lòng tạo Issue trong repository.

---

**Lần cập nhật cuối**: $(date)