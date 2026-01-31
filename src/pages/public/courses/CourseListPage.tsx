import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import CourseCard from "../../../components/public/CourseCard";
import { getAccessToken } from "../../../utils/AuthUtils";

const toggleValue = (
    value: string,
    _list: string[],
    setList: React.Dispatch<React.SetStateAction<string[]>>
) => {
    setList((prev) =>
        prev.includes(value)
            ? prev.filter((item) => item !== value)
            : [...prev, value]
    );
};

type Course = {
    courseId: number;
    title: string;
    description?: string;
    price?: number;
    thumbnail?: string;
    level?: string;
    instructor?: {
        username?: string;
        fullName?: string;
    };
    category?: {
        categoryId: number;
        categoryName?: string;
    };
};

const CourseList = () => {

    const [allCourses, setAllCourses] = useState<Course[]>([]);
    const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);
    const [filterValue, setFilterValue] = useState("");

    const ITEMS_PER_PAGE = 9;
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(filteredCourses.length / ITEMS_PER_PAGE);
    const paginatedCourses = filteredCourses.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    const [categoryOptions, setCategoryOptions] = useState<string[]>([]);
    const [levelOptions, setLevelOptions] = useState<string[]>([]);
    type DropdownType = "category" | "level" | null;
    const [activeDropdown, setActiveDropdown] = useState<DropdownType>(null);
    const [categories, setCategories] = useState<string[]>([]);
    const [levels, setLevels] = useState<string[]>([]);

    useEffect(() => {
        refreshCourseList();
    }, []);

    useEffect(() => {
        let result = [...allCourses];

        // Search
        if (filterValue.trim()) {
            const keyword = filterValue.toLowerCase();
            result = result.filter((c) =>
                c.title.toLowerCase().includes(keyword) ||
                c.description?.toLowerCase().includes(keyword) ||
                c.instructor?.fullName?.toLowerCase().includes(keyword)
            );
        }

        // Category
        if (categories.length > 0) {
            result = result.filter(
                (c) =>
                    c.category?.categoryName &&
                    categories.includes(c.category.categoryName)
            );
        }

        // Level
        if (levels.length > 0) {
            result = result.filter(
                (c) =>
                    c.level &&
                    levels.includes(c.level)
            );
        }

        setFilteredCourses(result);
        setCurrentPage(1);
    }, [filterValue, categories, levels, allCourses]);

    async function refreshCourseList() {
        const response = await fetch("http://localhost:8080/courses", {
            headers: {
                Authorization: `Bearer ${getAccessToken()}`,
            },
        });
        const data = await response.json();
        const mappedCourses: Course[] = data.map((item: any) => ({
            courseId: item.courseId,
            title: item.title,
            description: item.description,
            price: item.price,
            thumbnail: item.thumbnail,
            level: item.level,
            instructor: {
                username: item.instructor?.username,
                fullName: item.instructor?.fullName,
            },
            category: item.category
                ? {
                    categoryId: item.category.categoryId,
                    categoryName: item.category.categoryName?.toLowerCase(),
                }
                : undefined,
        }));
        const sortedCourses = [...mappedCourses].sort((a, b) =>
            a.title.localeCompare(b.title)
        );
        const categories = Array.from(
            new Set(
                mappedCourses
                    .map((c) => c.category?.categoryName)
                    .filter((name): name is string => typeof name === "string")
            )
        );
        const levels = Array.from(
            new Set(
                mappedCourses
                    .map((c) => c.level)
                    .filter((level): level is string => typeof level === "string")
            )
        );
        setAllCourses(sortedCourses);
        setFilteredCourses(sortedCourses);
        setCategoryOptions(categories);
        setLevelOptions(levels);
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 px-6 py-12">
            {/* ===== Hero Section ===== */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-6xl mx-auto mb-10"
            >
                <h1 className="text-4xl font-bold text-blue-600 mb-3">
                    Khám phá khóa học của chúng tôi!
                </h1>
                <p className="text-gray-600 text-lg">
                    Học hỏi kỹ năng mới, nâng cấp bản thân và phát triển sự nghiệp
                </p>
            </motion.div>

            {/* ===== Filter Bar ===== */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="max-w-6xl mx-auto mb-8 flex flex-wrap md:flex-nowrap items-center justify-between gap-4"
            >
                {/* ===== Search (LEFT) ===== */}
                <div className="w-full md:max-w-md">
                    <input
                        type="text"
                        placeholder="Tìm kiếm khóa học..."
                        value={filterValue}
                        onChange={(e) => setFilterValue(e.target.value)}
                        className="w-full rounded-xl border border-gray-300 px-5 py-3
                                    focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                    />
                </div>

                <div className="flex flex-wrap items-center gap-4 justify-end">
                    {/* Label */}
                    <div className="flex items-center text-sm text-gray-600">
                        Lọc:
                    </div>

                    {/* ===== Category Multi Select ===== */}
                    <div className="relative w-56">
                        <button
                            onClick={() =>
                                setActiveDropdown(
                                    activeDropdown === "category" ? null : "category"
                                )
                            }
                            className="flex min-h-[40px] w-full flex-wrap items-center gap-2
                                    rounded-xl border border-gray-200 bg-white
                                    px-3 py-2 text-sm text-gray-700
                                    hover:bg-gray-100 transition"
                        >
                            {categories.length === 0 ? (
                                <span className="text-gray-400">Phân loại</span>
                            ) : (
                                categories.map((item) => (
                                    <span
                                        key={item}
                                        className="rounded-lg bg-blue-100 px-2 py-1
                                   text-xs text-blue-600"
                                    >
                                        {item}
                                    </span>
                                ))
                            )}
                            <span className="ml-auto text-gray-400">▼</span>
                        </button>

                        {activeDropdown === "category" && (
                            <ul className="absolute z-20 mt-2 w-full rounded-xl border border-gray-200 bg-white shadow-lg overflow-hidden">
                                {categoryOptions.map((item) => {
                                    const active = categories.includes(item);
                                    return (
                                        <li
                                            key={item}
                                            onClick={() =>
                                                toggleValue(item, categories, setCategories)
                                            }
                                            className={`flex cursor-pointer items-center justify-between
                                        px-4 py-2 text-sm transition
                                        ${active
                                                    ? "bg-blue-50 text-blue-600"
                                                    : "text-gray-700 hover:bg-gray-100"
                                                }`}
                                        >
                                            {item}
                                            {active && <span>✓</span>}
                                        </li>
                                    );
                                })}
                            </ul>
                        )}
                    </div>

                    {/* ===== Level Multi Select ===== */}
                    <div className="relative w-56">
                        <button
                            onClick={() =>
                                setActiveDropdown(
                                    activeDropdown === "level" ? null : "level"
                                )
                            }
                            className="flex min-h-[40px] w-full flex-wrap items-center gap-2
                                    rounded-xl border border-gray-200 bg-white
                                    px-3 py-2 text-sm text-gray-700
                                    hover:bg-gray-100 transition"
                        >
                            {levels.length === 0 ? (
                                <span className="text-gray-400">Trình độ</span>
                            ) : (
                                levels.map((item) => (
                                    <span
                                        key={item}
                                        className="rounded-lg bg-indigo-100 px-2 py-1
                                   text-xs text-indigo-600"
                                    >
                                        {item}
                                    </span>
                                ))
                            )}
                            <span className="ml-auto text-gray-400">▼</span>
                        </button>

                        {activeDropdown === "level" && (
                            <ul className="absolute z-20 mt-2 w-full rounded-xl border border-gray-200 bg-white shadow-lg overflow-hidden">
                                {levelOptions.map((item) => {
                                    const active = levels.includes(item);
                                    return (
                                        <li
                                            key={item}
                                            onClick={() =>
                                                toggleValue(item, levels, setLevels)
                                            }
                                            className={`flex cursor-pointer items-center justify-between
                                        px-4 py-2 text-sm transition
                                        ${active
                                                    ? "bg-indigo-50 text-indigo-600"
                                                    : "text-gray-700 hover:bg-gray-100"
                                                }`}
                                        >
                                            {item}
                                            {active && <span>✓</span>}
                                        </li>
                                    );
                                })}
                            </ul>
                        )}
                    </div>

                    {/* ===== Sort (giữ select native) ===== */}
                    <div className="relative">
                        <select
                            className="appearance-none cursor-pointer rounded-xl border border-gray-200 bg-white 
                                        px-3 py-2 pr-10 text-sm text-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-100
                                        hover:bg-gray-100 transition"
                        >
                            <option>Phổ biến nhất</option>
                            <option>Mới nhất</option>
                        </select>
                        <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                            ▼
                        </span>
                    </div>
                </div>
            </motion.div>

            {/* ===== Course Grid ===== */}
            <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                {paginatedCourses.map((course, index) => (
                    <CourseCard
                        key={course.courseId}
                        course={course}
                        index={index}
                    />
                ))}
            </div>

            {/* ===== Pagination ===== */}
            <div className="mt-12 flex items-center justify-center gap-2">
                {/* Prev */}
                <button
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage((p) => p - 1)}
                    className={`rounded-lg px-3 py-2 text-sm font-medium transition
            ${currentPage === 1
                            ? "cursor-not-allowed bg-gray-100 text-gray-400"
                            : "bg-white border border-gray-300 hover:bg-gray-100"
                        }`}
                >
                    ‹
                </button>

                {/* Page Numbers */}
                {Array.from({ length: totalPages }).map((_, i) => {
                    const page = i + 1;
                    const active = page === currentPage;

                    return (
                        <button
                            key={page}
                            onClick={() => setCurrentPage(page)}
                            className={`rounded-lg px-4 py-2 text-sm font-medium transition
                    ${active
                                    ? "bg-blue-600 text-white"
                                    : "bg-white border border-gray-300 hover:bg-gray-100"
                                }`}
                        >
                            {page}
                        </button>
                    );
                })}

                {/* Next */}
                <button
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage((p) => p + 1)}
                    className={`rounded-lg px-3 py-2 text-sm font-medium transition
            ${currentPage === totalPages
                            ? "cursor-not-allowed bg-gray-100 text-gray-400"
                            : "bg-white border border-gray-300 hover:bg-gray-100"
                        }`}
                >
                    ›
                </button>
            </div>
        </div>
    );
};

export default CourseList;