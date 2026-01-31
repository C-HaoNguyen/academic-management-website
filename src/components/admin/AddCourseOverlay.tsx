import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Field = ({
    label,
    required,
    children,
    hint,
}: {
    label: string;
    required?: boolean;
    hint?: string;
    children: React.ReactNode;
}) => (
    <div className="space-y-1">
        <label className="text-sm font-medium text-gray-700">
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
        </label>
        {children}
        {hint && (
            <p className="text-xs text-gray-500">{hint}</p>
        )}
    </div>
);

interface AddCourseOverlayProps {
    open: boolean;
    onClose: () => void;
    onSubmit: (data: CreateCoursePayload) => void;
    instructors: { userId: number; fullName: string }[];
    categories: { categoryId: number; categoryName: string }[];
}

export interface CreateCoursePayload {
    title: string;
    description?: string;
    instructorId: number;
    categoryId?: number;
    price: number;
    thumbnail?: string;
    level: "beginner" | "intermediate" | "advanced";
    status: "draft" | "published" | "archived";
}

const AddCourseOverlay = ({
    open,
    onClose,
    onSubmit,
    instructors,
    categories,
}: AddCourseOverlayProps) => {
    const [form, setForm] = useState<CreateCoursePayload>({
        title: "",
        description: "",
        instructorId: instructors[0]?.userId ?? 0,
        categoryId: undefined,
        price: 0,
        thumbnail: "",
        level: "beginner",
        status: "draft",
    });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]:
                name === "price" || name === "instructorId" || name === "categoryId"
                    ? Number(value)
                    : value,
        }));
    };

    const handleSubmit = () => {
        onSubmit(form);
    };

    return (
        <AnimatePresence>
            {open && (
                <motion.div
                    className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <motion.div
                        className="bg-white rounded-xl shadow-xl w-[520px] max-h-[90vh] flex flex-col"
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        transition={{ duration: 0.25, ease: 'easeOut' }}
                    >
                        {/* Header */}
                        <div className="px-6 pt-6">
                            <h2 className="text-2xl font-semibold mb-1">
                                Thêm khóa học
                            </h2>
                            <p className="text-sm text-gray-500">
                                Nhập thông tin cơ bản để tạo khóa học mới
                            </p>
                        </div>

                        {/* Form */}
                        <div className="px-6 py-4 overflow-y-auto flex-1">
                            <div className="space-y-4">
                                <Field label="Tên khóa học" required>
                                    <input
                                        name="title"
                                        value={form.title}
                                        onChange={handleChange}
                                        className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                                        placeholder="VD: Lập trình React từ cơ bản"
                                    />
                                </Field>

                                <Field label="Mô tả khóa học" hint="Hiển thị ở trang chi tiết khóa học">
                                    <textarea
                                        name="description"
                                        value={form.description}
                                        onChange={handleChange}
                                        className="w-full border rounded-lg px-4 py-2 resize-none focus:ring-2 focus:ring-blue-500 outline-none"
                                        rows={3}
                                        placeholder="Mô tả ngắn gọn nội dung khóa học"
                                    />
                                </Field>

                                <Field label="Giảng viên phụ trách" required>
                                    <select
                                        name="instructorId"
                                        value={form.instructorId}
                                        onChange={handleChange}
                                        className="w-full border rounded-lg px-4 py-2"
                                    >
                                        {instructors.map((i) => (
                                            <option key={i.userId} value={i.userId}>
                                                {i.fullName}
                                            </option>
                                        ))}
                                    </select>
                                </Field>

                                <Field label="Danh mục">
                                    <select
                                        name="categoryId"
                                        value={form.categoryId}
                                        onChange={handleChange}
                                        className="w-full border rounded-lg px-4 py-2"
                                    >
                                        <option value="">-- Chưa phân loại --</option>
                                        {categories.map((c) => (
                                            <option key={c.categoryId} value={c.categoryId}>
                                                {c.categoryName}
                                            </option>
                                        ))}
                                    </select>
                                </Field>

                                <Field label="Giá khóa học (VNĐ)">
                                    <input
                                        name="price"
                                        type="number"
                                        value={form.price}
                                        onChange={handleChange}
                                        className="w-full border rounded-lg px-4 py-2"
                                        placeholder="VD: 499000"
                                    />
                                </Field>

                                <Field label="Thumbnail URL" hint="Ảnh đại diện cho khóa học">
                                    <input
                                        name="thumbnail"
                                        value={form.thumbnail}
                                        onChange={handleChange}
                                        className="w-full border rounded-lg px-4 py-2"
                                        placeholder="https://..."
                                    />
                                </Field>

                                <div className="flex gap-4">
                                    <Field label="Trình độ">
                                        <select
                                            name="level"
                                            value={form.level}
                                            onChange={handleChange}
                                            className="w-full border rounded-lg px-4 py-2"
                                        >
                                            <option value="beginner">Beginner</option>
                                            <option value="intermediate">Intermediate</option>
                                            <option value="advanced">Advanced</option>
                                        </select>
                                    </Field>

                                    <Field label="Trạng thái">
                                        <select
                                            name="status"
                                            value={form.status}
                                            onChange={handleChange}
                                            className="w-full border rounded-lg px-4 py-2"
                                        >
                                            <option value="draft">Draft</option>
                                            <option value="published">Published</option>
                                            <option value="archived">Archived</option>
                                        </select>
                                    </Field>
                                </div>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="px-6 py-4 border-t flex justify-end gap-3">
                            <button
                                onClick={onClose}
                                className="px-5 py-2 rounded-lg border text-gray-600 hover:bg-gray-100"
                            >
                                Hủy
                            </button>
                            <button
                                onClick={handleSubmit}
                                className="px-5 py-2 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700"
                            >
                                Thêm
                            </button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default AddCourseOverlay;
