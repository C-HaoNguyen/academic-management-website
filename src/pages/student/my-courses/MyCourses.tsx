import { useEffect, useState } from "react";
import { getAccessToken } from "../../../utils/AuthUtils";

type MyCourse = {
    courseId: number;
    title: string;
    thumbnail?: string;
};

const MyCourses = () => {
    const [courses, setCourses] = useState<MyCourse[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchMyCourses();
    }, []);

    async function fetchMyCourses() {
        try {
            const res = await fetch(
                "http://localhost:8080/enrollments/student/me/courses",
                {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${getAccessToken()}`,
                    },
                }
            );
            const data = await res.json();
            setCourses(data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    }

    if (loading) {
        return <div className="py-20 text-center">Đang tải...</div>;
    }

    if (courses.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center bg-white rounded-xl p-12 border">
                <img
                    src="https://cdn-icons-png.flaticon.com/512/4076/4076504.png"
                    alt="empty"
                    className="w-32 mb-4 opacity-80"
                />
                <p className="text-gray-500 mb-4">
                    Bạn chưa đăng ký khóa học nào
                </p>
                <button
                    onClick={() => window.location.href = "/courses"}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg"
                >
                    Khám phá khóa học
                </button>
            </div>
        )
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {courses.map(course => (
                <div
                    key={course.courseId}
                    className="bg-white rounded-xl shadow p-4"
                >
                    <img
                        src={course.thumbnail}
                        className="h-40 w-full object-cover rounded-lg"
                    />
                    <h3 className="mt-3 font-semibold">
                        {course.title}
                    </h3>
                </div>
            ))}
        </div>
    );
};

export default MyCourses;
