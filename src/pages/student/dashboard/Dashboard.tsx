import {
    BookOpen,
    Clock,
    CheckCircle,
    TrendingUp,
    PlayCircle,
    Zap,
    Activity,
} from "lucide-react";
import { useEffect, useState } from "react";
import { getAccessToken } from "../../../utils/AuthUtils";

const StatCard = ({
    icon,
    label,
    value,
}: {
    icon: React.ReactNode;
    label: string;
    value: string | number;
}) => (
    <div className="bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition">
        <div className="flex items-center justify-between">
            <div>
                <p className="text-sm text-gray-500">{label}</p>
                <p className="text-2xl font-bold text-gray-800 mt-1">
                    {value}
                </p>
            </div>
            <div className="p-3 rounded-lg bg-blue-50 text-blue-600">
                {icon}
            </div>
        </div>
    </div>
);

const Dashboard = () => {

    const [totalCourses, setTotalCourses] = useState<number>(0);

    useEffect(() => {
        fetch("http://localhost:8080/enrollments/student/me/summary", {
            headers: {
                Authorization: `Bearer ${getAccessToken()}`,
            },
        })
            .then((res) => res.json())
            .then((data) => {
                setTotalCourses(data.totalCourses);
            })
            .catch((err) => {
                console.error("Failed to load dashboard summary", err);
            });
    }, []);

    return (
        <div className="space-y-8">
            {/* Title */}
            <div>
                <h2 className="text-2xl font-semibold text-gray-800">
                    Student Dashboard
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                    Theo dõi tiến độ học tập và hoạt động gần đây
                </p>
            </div>

            {/* Overview */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard
                    icon={<BookOpen size={22} />}
                    label="Khóa học đã đăng ký"
                    value={totalCourses}
                />
                <StatCard
                    icon={<CheckCircle size={22} />}
                    label="Khóa học hoàn thành"
                    value={2}
                />
                <StatCard
                    icon={<Clock size={22} />}
                    label="Giờ học đã học"
                    value="32h"
                />
                <StatCard
                    icon={<TrendingUp size={22} />}
                    label="Tiến độ trung bình"
                    value="64%"
                />
            </div>

            {/* Middle section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Current courses */}
                <div className="bg-white rounded-xl p-5 shadow-sm">
                    <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                        <PlayCircle size={18} />
                        Khóa học đang học
                    </h3>

                    <ul className="space-y-4 text-sm">
                        <li>
                            <div className="flex justify-between mb-1">
                                <span className="text-gray-600">
                                    React Basics
                                </span>
                                <span className="font-medium">70%</span>
                            </div>
                            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                                <div className="h-full bg-blue-600 w-[70%]" />
                            </div>
                        </li>

                        <li>
                            <div className="flex justify-between mb-1">
                                <span className="text-gray-600">
                                    Spring Boot
                                </span>
                                <span className="font-medium">45%</span>
                            </div>
                            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                                <div className="h-full bg-blue-600 w-[45%]" />
                            </div>
                        </li>
                    </ul>
                </div>

                {/* Learning stats */}
                <div className="bg-white rounded-xl p-5 shadow-sm">
                    <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                        <Activity size={18} />
                        Thống kê học tập
                    </h3>

                    <ul className="space-y-3 text-sm">
                        <li className="flex justify-between">
                            <span className="text-gray-600">
                                Bài học đã hoàn thành
                            </span>
                            <span className="font-medium text-green-600">
                                48
                            </span>
                        </li>
                        <li className="flex justify-between">
                            <span className="text-gray-600">
                                Bài kiểm tra đã làm
                            </span>
                            <span className="font-medium">
                                6
                            </span>
                        </li>
                        <li className="flex justify-between">
                            <span className="text-gray-600">
                                Streak học tập
                            </span>
                            <span className="font-medium text-blue-600">
                                5 ngày
                            </span>
                        </li>
                    </ul>
                </div>
            </div>

            {/* Quick actions */}
            <div className="bg-white rounded-xl p-5 shadow-sm">
                <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <Zap size={18} />
                    Quick Actions
                </h3>

                <div className="flex flex-wrap gap-3">
                    <button className="px-4 py-2 rounded-lg bg-blue-600 text-white text-sm hover:bg-blue-700 transition">
                        Tiếp tục học
                    </button>
                    <button className="px-4 py-2 rounded-lg bg-green-600 text-white text-sm hover:bg-green-700 transition">
                        Khám phá khóa học
                    </button>
                    <button className="px-4 py-2 rounded-lg bg-gray-700 text-white text-sm hover:bg-gray-800 transition">
                        Hồ sơ cá nhân
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;

