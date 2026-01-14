import { NavLink } from "react-router-dom";

type Tab = {
    id: string;
    label: string;
    href: string;
};

function Header() {
    const tabs: Tab[] = [
        { id: "home", label: "Trang Chủ", href: "/" },
        { id: "courses", label: "Các Khóa Học", href: "/courses" },
        { id: "leturer", label: "Đội Ngũ", href: "/lecturer" },
        { id: "contact", label: "Liên Hệ", href: "/contact" },
    ];

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
                                    `relative px-4 py-2 text-sm font-medium rounded-xl transition-all duration-200
                                    ${isActive
                                        ? "bg-blue-100 text-blue-700 shadow-sm"
                                        : "text-gray-600 hover:bg-gray-100 hover:text-blue-600"}`
                                }
                            >
                                {tab.label}
                            </NavLink>
                        ))}
                    </nav>

                    {/* Auth buttons */}
                    <div className="flex items-center gap-3">
                        <NavLink
                            to="/login"
                            className="px-4 py-2 text-base font-medium text-gray-600 rounded-xl transition-all duration-200 hover:border-blue-100 hover:bg-gray-100 hover:text-blue-600"
                        >
                            Đăng nhập
                        </NavLink>

                        <NavLink
                            to="/signup"
                            className="px-4 py-2 text-base font-medium text-white bg-blue-600 rounded-xl transition-all duration-200
                   hover:bg-blue-700 shadow-sm"
                        >
                            Đăng ký
                        </NavLink>
                    </div>

                </div>
            </div>
        </header>
    );
}

export default Header;