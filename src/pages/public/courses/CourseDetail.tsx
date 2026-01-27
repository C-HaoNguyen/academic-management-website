import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { getAccessToken } from "../../../utils/AuthUtils";

type CourseDetailType = {
    courseId: number;
    title: string;
    description: string;
    price: number;
    instructor: {
        username: string;
        fullName: string;
    };
    category?: {
        categoryId: number;
        name: string;
    };
    thumbnail?: string;
};

const CourseDetail = () => {
    const { courseId } = useParams();
    const navigate = useNavigate();
    const isLoggedIn = !!localStorage.getItem("accessToken");

    const [course, setCourse] = useState<CourseDetailType | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchCourseDetail();
    }, [courseId]);

    async function fetchCourseDetail() {
        try {
            const res = await fetch(
                `http://localhost:8080/courses/${courseId}`,
                {
                    headers: {
                        Authorization: `Bearer ${getAccessToken()}`,
                    },
                }
            );

            const data = await res.json();
            setCourse({
                ...data,
                price: Number(data.price),
            });
        } catch (error) {
            console.error("Load course detail failed", error);
        } finally {
            setLoading(false);
        }
    }

    const handleRegister = () => {
        if (!isLoggedIn) {
            navigate("/login");
        } else {
            navigate("/checkout", {
                state: { courseId: course?.courseId },
            });
        }
    };

    if (loading) {
        return <div className="text-center py-20">Đang tải dữ liệu...</div>;
    }

    if (!course) {
        return <div className="text-center py-20">Không tìm thấy khóa học</div>;
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 px-6 py-12">
            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-10">
                {/* ===== LEFT ===== */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="lg:col-span-2"
                >
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">
                        {course.title}
                    </h1>

                    <p className="text-gray-600 mb-6">
                        {course.description}
                    </p>

                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-6">
                        <span>Giảng viên: {course.instructor.fullName}</span>
                        {course.category && (
                            <span className="mb-3 px-3 py-1 text-xs bg-indigo-50 text-indigo-600 rounded-full">{course.category.name}</span>
                        )}
                    </div>

                    <div className="rounded-2xl bg-white p-6 shadow-sm">
                        <h2 className="text-xl font-semibold mb-4">
                            Bạn sẽ học được gì?
                        </h2>

                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-gray-700">
                            <li>✔️ Kiến thức nền tảng & nâng cao</li>
                            <li>✔️ Thực hành theo dự án</li>
                            <li>✔️ Tư duy hệ thống</li>
                            <li>✔️ Chuẩn bị đi làm</li>
                        </ul>
                    </div>
                </motion.div>

                {/* ===== RIGHT ===== */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="sticky top-24 h-fit rounded-2xl bg-white shadow-lg overflow-hidden"
                >
                    <img
                        src={course.thumbnail}
                        alt={course.title}
                        className="w-full h-48 object-cover"
                    />

                    <div className="p-6">
                        <div className="mb-4 text-3xl font-bold text-gray-900">
                            {course.price
                                ? `${course.price.toLocaleString()}₫`
                                : "Miễn phí"}
                        </div>

                        <button
                            onClick={handleRegister}
                            className="w-full rounded-xl bg-indigo-600 px-6 py-3
                                       font-semibold text-white hover:bg-indigo-700 transition"
                        >
                            Đăng ký khóa học
                        </button>

                        <p className="mt-4 text-center text-sm text-gray-500">
                            Hoàn tiền trong 30 ngày nếu không hài lòng
                        </p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default CourseDetail;
