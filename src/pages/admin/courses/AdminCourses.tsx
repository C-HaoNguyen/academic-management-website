import { useEffect, useState } from "react";
import { getAccessToken } from "../../../utils/AuthUtils";
import { Notebook, Pencil, Trash2, Plus } from "lucide-react";
import { authFetch } from "../../../utils/AuthFetch";
import AddCourseOverlay from "../../../components/admin/AddCourseOverlay";
import Toast from "../../../components/common/Toast";

const AdminCourses = () => {
    const [showAddCourseOverlay, setShowAddCourseOverlay] = useState(false);
    const [showDeleteCourseOverlay, setShowDeleteCourseOverlay] = useState(false);
    type ToastType = "success" | "error";

    const [toast, setToast] = useState<{
        message: string;
        type: ToastType;
    } | null>(null);

    const [deletedCourse, setDeletedCourse] = useState<{
        courseId: number;
        title: string
    } | null>(null);

    const [courses, setCourses] = useState<
        {
            courseId: number;
            title: string;
            description: string | null;
            thumbnail: string | null;
            price: number;
            level: string;
            status: string;
            createdAt: string;
            updatedAt: string;

            instructor: {
                userId: number;
                username: string;
                fullName: string;
            };

            category: {
                categoryId: number;
                categoryName: string;
            } | null;
        }[]
    >([]);

    const [instructors, setInstructors] = useState<
        { userId: number; fullName: string }[]
    >([]);

    const [categories, setCategories] = useState<
        { categoryId: number; categoryName: string }[]
    >([]);

    useEffect(() => {
        fetchInstructors();
        refreshCoursesList();
    }, []);

    async function fetchInstructors() {
        const token = getAccessToken();

        const res = await fetch("http://localhost:8080/admin/instructors", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (!res.ok) return;

        const data = await res.json();
        setInstructors(data);
    }

    async function refreshCoursesList() {
        try {
            const token = getAccessToken();

            const res = await fetch("http://localhost:8080/admin/courses", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!res.ok) {
                console.error("API error:", res.status);
                return;
            }

            const data = await res.json();
            setCourses(data);
        } catch (err) {
            console.error(err);
        }
    }

    const handleCreateCourse = async (formData: any) => {
        try {
            const token = getAccessToken();

            const res = await authFetch(
                "http://localhost:8080/admin/courses/add",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify(formData),
                }
            );

            // đọc body trước để lấy message từ backend
            const data = await res.json().catch(() => null);

            if (!res.ok) {
                setToast({
                    type: "error",
                    message: data?.message || "Thêm khóa học thất bại",
                });

                setTimeout(() => setToast(null), 3000);
                return;
            }

            setToast({
                type: "success",
                message: "Thêm khóa học thành công!",
            });

            setShowAddCourseOverlay(false);
            refreshCoursesList();

            setTimeout(() => setToast(null), 3000);

        } catch (err) {
            console.error(err);

            setToast({
                type: "error",
                message: "Lỗi kết nối server",
            });

            setTimeout(() => setToast(null), 3000);
        }
    };

    const handleDeleteCourse = async () => {
        if (!deletedCourse) return;

        try {
            const token = getAccessToken();

            const res = await authFetch(
                `http://localhost:8080/admin/deleted-course`,
                {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        userId: deletedCourse.courseId,
                    }),
                }
            );

            if (!res.ok) {
                console.error("Delete failed:", res.status);
                return;
            }

            // Đóng overlay
            setShowDeleteCourseOverlay(false);
            setDeletedCourse(null);

            // Refresh lại bảng
            refreshCoursesList();
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div>
            <h2 className="flex items-center text-2xl text-blue-600 font-semibold mb-4 gap-3">
                <Notebook size={24} />
                Quản lý khóa học
            </h2>

            <AddCourseOverlay
                open={showAddCourseOverlay}
                onClose={() => setShowAddCourseOverlay(false)}
                onSubmit={handleCreateCourse}
                instructors={instructors}
                categories={categories}
            />

            <div className="flex items-center justify-start mb-4">
                <button
                    onClick={() => setShowAddCourseOverlay(true)}
                    className="group flex items-center gap-2 px-2 py-2 rounded-xl bg-emerald-600
                                text-white text-sm font-semibold shadow-md shadow-emerald-600/20 hover:shadow-lg hover:shadow-emerald-600/30
                                hover:scale-[1.02] active:scale-[0.98] transition-all duration-200
                            "
                >
                    <span className="
                                flex items-center justify-center w-8 h-8 rounded-lg bg-white/20 group-hover:bg-white/30
                                transition
                            ">
                        <Plus size={16} />
                    </span>

                    Thêm khóa học
                </button>
            </div>

            {
                showDeleteCourseOverlay && deletedCourse && (
                    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
                        <div className="bg-white rounded-xl shadow-xl w-[440px] p-6 animate-fadeIn">
                            {/* Header */}
                            <h2 className="text-2xl font-semibold text-red-600 mb-3">
                                Xóa khóa học
                            </h2>

                            {/* Content */}
                            <p className="text-gray-700 leading-relaxed mb-6">
                                Bạn sắp xóa khóa học{" "}
                                <span className="font-semibold text-red-600">
                                    {deletedCourse.title}
                                </span>
                                .
                                <br />
                                <span className="text-sm text-gray-500">
                                    Hành động này sẽ <b>không thể hoàn tác</b>. Bạn có chắc chắn muốn tiếp tục?
                                </span>
                            </p>

                            {/* Footer */}
                            <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                                <button
                                    onClick={() => setShowDeleteCourseOverlay(false)}
                                    className="px-5 py-2.5 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100 transition"
                                >
                                    Hủy
                                </button>

                                <button
                                    onClick={handleDeleteCourse}
                                    className="px-5 py-2.5 rounded-lg bg-red-600 text-white hover:bg-red-700 transition"
                                >
                                    Xóa
                                </button>
                            </div>
                        </div>
                    </div>
                )
            }

            <div className="bg-white rounded-xl shadow overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full table-fixed text-sm">
                        <colgroup>
                            <col className="w-16" />
                            <col className="w-[320px]" />
                            <col className="w-32" />
                            <col className="w-40" />
                            <col className="w-44" />
                            <col className="w-28" />
                            <col className="w-32" />
                            <col className="w-32" />
                            <col className="w-48" />
                            <col className="w-24" />
                        </colgroup>

                        <thead className="bg-gray-50 border-b">
                            <tr className="text-center text-gray-600">
                                <th className="px-4 py-3 font-medium">ID</th>
                                <th className="px-4 py-3 font-medium">Tên khóa học</th>
                                <th className="px-4 py-3 font-medium">Hình ảnh</th>
                                <th className="px-4 py-3 font-medium">Phân loại</th>
                                <th className="px-4 py-3 font-medium">Tên giáo viên</th>
                                <th className="px-4 py-3 font-medium">Mức độ</th>
                                <th className="px-4 py-3 font-medium">Giá</th>
                                <th className="px-4 py-3 font-medium">Trạng thái</th>
                                <th className="px-4 py-3 font-medium text-center">
                                    <div className="leading-tight">
                                        <div>Created at</div>
                                        <div>Updated at</div>
                                    </div>
                                </th>
                                <th className="px-4 py-3 font-medium">Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {courses.map((course) => (
                                <tr
                                    key={course.courseId}
                                    className="border-b hover:bg-gray-50 transition"
                                >
                                    <td className="text-center px-4 py-3">{course.courseId}</td>
                                    <td className="px-4 py-3 align-middle">
                                        <div className="flex items-center justify-center h-full">
                                            <p className="line-clamp-2 font-medium text-gray-800 text-center">
                                                {course.title}
                                            </p>
                                        </div>
                                    </td>
                                    <td className="text-center px-4 py-3">
                                        {course.thumbnail ? (
                                            <img
                                                src={course.thumbnail}
                                                alt={course.title}
                                                className="w-20 h-12 object-contain rounded-md mx-auto"
                                            />
                                        ) : (
                                            <span className="text-xs text-gray-400 italic">No image</span>
                                        )}
                                    </td>
                                    <td className="text-center px-4 py-3 truncate">
                                        {course.category?.categoryName}
                                    </td>
                                    <td className="text-center px-4 py-3 truncate">
                                        {course.instructor.fullName}
                                    </td>
                                    <td className="text-center px-4 py-3">
                                        <span className="px-2 py-1 rounded text-xs bg-gray-100 text-gray-700">
                                            {course.level}
                                        </span>
                                    </td>
                                    <td className="text-center px-4 py-3 font-medium">
                                        {course.price.toLocaleString()} đ
                                    </td>
                                    <td className="text-center px-4 py-3">
                                        <span
                                            className={`px-2 py-1 rounded-full text-xs font-medium ${course.status === "published"
                                                ? "bg-green-100 text-green-700"
                                                : course.status === "draft"
                                                    ? "bg-yellow-100 text-yellow-700"
                                                    : "bg-red-100 text-red-700"
                                                }`}
                                        >
                                            {course.status === "published"
                                                ? "Published"
                                                : course.status === "draft"
                                                    ? "Draft"
                                                    : "Archived"}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3 text-xs text-center text-gray-500">
                                        <div>{course.createdAt}</div>
                                        <div className="mt-1 text-purple-600">{course.updatedAt}</div>
                                    </td>

                                    {/* Action */}
                                    <td className="px-4 py-3">
                                        <div className="flex items-center justify-center gap-1">
                                            <button
                                                className="p-2 rounded-lg text-blue-600 hover:bg-blue-50 transition"
                                                title="Edit"
                                            >
                                                <Pencil size={16} />
                                            </button>
                                            <button
                                                onClick={() => {
                                                    setDeletedCourse(course);
                                                    setShowDeleteCourseOverlay(true);
                                                }}
                                                className="p-2 rounded-lg text-red-600 hover:bg-red-50 transition"
                                                title="Delete"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            {toast && <Toast message={toast.message} type={toast.type} />}
        </div>
    );
};

export default AdminCourses;