import { NavLink, useNavigate } from "react-router-dom";
import {
    LayoutDashboard,
    BookOpen,
    FileText,
    BarChart3,
    ArrowLeft,
} from "lucide-react";

const Sidebar = () => {
    const navigate = useNavigate();

    const linkClass = ({ isActive }: any) =>
        `
        flex items-center gap-4
        px-4 py-5 rounded-2xl
        text-lg font-medium
        transition-all duration-200
        ${
            isActive
                ? "bg-blue-50 text-blue-600"
                : "text-gray-600 hover:bg-gray-100 hover:text-gray-800"
        }
    `;

    return (
        <aside className="w-64 bg-white border-r flex flex-col">
            {/* Main navigation */}
            <nav className="flex flex-col gap-3 px-2 py-3 flex-1">
                <NavLink to="/student/dashboard" className={linkClass}>
                    <LayoutDashboard
                        size={22}
                        className="shrink-0 transition-transform duration-200 group-hover:scale-105"
                    />
                    Tổng quan
                </NavLink>

                <NavLink to="/student/my-courses" className={linkClass}>
                    <BookOpen size={22} className="shrink-0" />
                    Khóa học của tôi
                </NavLink>

                <NavLink to="/student/test-practice" className={linkClass}>
                    <FileText size={22} className="shrink-0" />
                    Luyện đề
                </NavLink>

                <NavLink to="/student/learning-profile" className={linkClass}>
                    <BarChart3 size={22} className="shrink-0" />
                    Hồ sơ học tập
                </NavLink>
            </nav>

            {/* Back to home button */}
            <div className="p-3 border-t">
                <button
                    onClick={() => navigate("/")}
                    className="
                        group w-full flex items-center gap-3
                        px-4 py-2 rounded-lg text-lg font-medium
                        text-gray-600
                        hover:bg-gray-100 hover:text-gray-900
                        transition-all duration-200
                        active:scale-[0.97]
                    "
                >
                    <ArrowLeft
                        size={22}
                        className="transition-transform duration-200 group-hover:-translate-x-1"
                    />
                    Trở về trang chủ
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;
