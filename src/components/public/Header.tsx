import { useRef, useState, useEffect } from "react";
import { ChevronDown, LogOut, User } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { isLoggedIn } from "../../utils/AuthUtils";

type Tab = {
    id: string;
    label: string;
    href: string;
};

function Header() {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const tabs: Tab[] = [
        { id: "home", label: "Trang Chủ", href: "/" },
        { id: "courses", label: "Các Khóa Học", href: "/courses" },
        { id: "leturer", label: "Đội Ngũ", href: "/lecturer" },
        { id: "contact", label: "Liên Hệ", href: "/contact" },
    ];

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(e.target as Node)
            ) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <header className="w-full bg-white border-b border-gray-200 sticky top-0 z-50">
            <div className="mx-auto max-w-7xl px-6">
                <div className="flex h-16 items-center justify-between">

                    {/* Logo */}
                    <div className="text-xl font-bold text-blue-600">
                        Ademy
                    </div>

                    {/* Tabs */}
                    <nav className="flex items-center space-x-2">
                        {tabs.map((tab) => (
                            <NavLink
                                key={tab.id}
                                to={tab.href}
                                end={tab.href === "/"}
                                className={({ isActive }) =>
                                    `relative px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200
                                    ${isActive
                                        ? "bg-blue-100 text-blue-700 shadow-sm"
                                        : "text-gray-600 hover:bg-gray-100 hover:text-blue-600"}`
                                }
                            >
                                {tab.label}
                            </NavLink>
                        ))}
                    </nav>

                    {/* Auth section */}
                    <div className="flex items-center gap-4">
                        {!isLoggedIn() ? (
                            <>
                                <NavLink
                                    to="/login"
                                    className="px-4 py-2 text-base font-medium text-blue-600 rounded-xl transition-all duration-200 hover:bg-blue-100 hover:text-blue-800"
                                >
                                    Đăng nhập
                                </NavLink>

                                <NavLink
                                    to="/signup"
                                    className="px-4 py-2 text-base font-medium text-white bg-blue-600 rounded-xl transition-all duration-200 hover:bg-blue-700 shadow-sm"
                                >
                                    Đăng ký
                                </NavLink>
                            </>
                        ) : (
                            <>
                                {/* Start learning button */}
                                <button
                                    onClick={() => navigate("/student/dashboard")}
                                    className="px-4 py-2 rounded-xl
                                                text-sm font-semibold
                                                text-white bg-blue-600
                                                hover:bg-blue-700
                                                transition-all duration-200
                                                shadow-sm
                                                active:scale-[0.97]"
                                >
                                    Bắt đầu học
                                </button>
                                {/* Avatar dropdown */}
                                <div className="relative" ref={dropdownRef}>
                                    <button
                                        onClick={() => setOpen(!open)}
                                        className="flex items-center gap-2 px-2 py-1 rounded-full hover:bg-gray-100 transition-all"
                                    >
                                        <img
                                            src="https://cdn-icons-png.flaticon.com/512/8188/8188362.png"
                                            alt="avatar"
                                            className="w-8 h-8 rounded-full object-cover"
                                        />
                                        <ChevronDown
                                            size={16}
                                            className={`text-gray-500 transition-transform ${open ? "rotate-180" : ""}`}
                                        />
                                    </button>

                                    {open && (
                                        <div
                                            className="absolute right-0 mt-2 w-48 bg-white border rounded-xl shadow-lg overflow-hidden animate-dropdown"
                                        >
                                            <button
                                                className="w-full flex items-center gap-2 px-4 py-3 text-sm text-gray-700 hover:bg-gray-100"
                                                onClick={() => navigate("/student/profile")}
                                            >
                                                <User size={16} />
                                                Chỉnh sửa hồ sơ
                                            </button>

                                            <div className="h-px bg-gray-100" />

                                            <button
                                                className="w-full flex items-center gap-2 px-4 py-3 text-sm text-red-600 hover:bg-red-50"
                                                onClick={() => {
                                                    localStorage.removeItem("accessToken");
                                                    localStorage.removeItem("refreshToken");
                                                    navigate("/login");
                                                }}
                                            >
                                                <LogOut size={16} />
                                                Đăng xuất
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;