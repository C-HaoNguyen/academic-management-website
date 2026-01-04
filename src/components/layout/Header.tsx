import { useState } from "react";

type Tab = {
    id: string;
    label: string;
    href: string;
};

function Header() {
    const tabs: Tab[] = [
        { id: "home", label: "Home", href: "/" },
        { id: "courses", label: "Courses", href: "/courses" },
        { id: "my-courses", label: "My Courses", href: "/student/courses" },
        { id: "dashboard", label: "Dashboard", href: "/student/dashboard" },
    ];

    const [activeTab, setActiveTab] = useState("home");

    return (
        <header className="w-full bg-white border-b border-gray-200">
            <div className="mx-auto max-w-7xl px-6">
                <div className="flex h-16 items-center justify-between">

                    {/* Logo */}
                    <div className="text-xl font-bold text-blue-600">
                        Ademy
                    </div>

                    {/* Tabs */}
                    <nav className="flex space-x-8">
                        {tabs.map((tab) => {
                            const isActive = activeTab === tab.id;

                            return (
                                <a
                                    key={tab.id}
                                    href={tab.href}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`relative pb-1 text-sm font-medium transition
                                        ${isActive
                                            ? "text-blue-600"
                                            : "text-gray-600 hover:text-blue-500"}
                                            `}
                                >
                                    {tab.label}

                                    {/* underline */}
                                    {isActive && (
                                        <span className="absolute left-0 -bottom-1 h-0.5 w-full bg-blue-600 rounded"></span>
                                    )}
                                </a>
                            );
                        })}
                    </nav>

                    {/* User */}
                    <div className="text-sm text-gray-700">
                        Hi, Student 👋
                    </div>

                </div>
            </div>
        </header>
    );
}

export default Header;