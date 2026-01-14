import { motion } from "framer-motion";

const courses = [
    {
        id: 1,
        title: "React from Zero to Hero",
        instructor: "Nguyễn Văn A",
        level: "Beginner",
        students: 1200,
        image: "https://source.unsplash.com/400x300/?coding,react",
    },
    {
        id: 2,
        title: "Java Spring Boot Masterclass",
        instructor: "Trần Thị B",
        level: "Intermediate",
        students: 980,
        image: "https://source.unsplash.com/400x300/?java,backend",
    },
    {
        id: 3,
        title: "UI/UX Design for Developers",
        instructor: "Lê Văn C",
        level: "All levels",
        students: 760,
        image: "https://source.unsplash.com/400x300/?ui,design",
    },
];

const CourseList = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 px-6 py-12">
            {/* ===== Hero Section ===== */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-6xl mx-auto mb-10"
            >
                <h1 className="text-4xl font-bold text-gray-900 mb-3">
                    Explore Our Courses 📚
                </h1>
                <p className="text-gray-600 text-lg">
                    Learn new skills, upgrade yourself and grow your career
                </p>

                {/* Search */}
                <div className="mt-6">
                    <input
                        type="text"
                        placeholder="Search courses..."
                        className="w-full md:w-2/3 rounded-xl border border-gray-300 px-5 py-3 
                                   focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                    />
                </div>
            </motion.div>

            {/* ===== Filter Bar ===== */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="max-w-6xl mx-auto mb-8 flex flex-wrap gap-4"
            >
                <select className="rounded-lg border px-4 py-2 text-gray-700">
                    <option>All Categories</option>
                    <option>Frontend</option>
                    <option>Backend</option>
                    <option>Design</option>
                </select>

                <select className="rounded-lg border px-4 py-2 text-gray-700">
                    <option>All Levels</option>
                    <option>Beginner</option>
                    <option>Intermediate</option>
                    <option>Advanced</option>
                </select>

                <select className="rounded-lg border px-4 py-2 text-gray-700">
                    <option>Most Popular</option>
                    <option>Newest</option>
                </select>
            </motion.div>

            {/* ===== Course Grid ===== */}
            <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {courses.map((course, index) => (
                    <motion.div
                        key={course.id}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ y: -6 }}
                        className="bg-white rounded-2xl shadow-md hover:shadow-xl transition overflow-hidden"
                    >
                        {/* Image */}
                        <div className="h-44 overflow-hidden">
                            <img
                                src={course.image}
                                alt={course.title}
                                className="h-full w-full object-cover hover:scale-105 transition duration-300"
                            />
                        </div>

                        {/* Content */}
                        <div className="p-5">
                            <h3 className="text-lg font-semibold text-gray-900 mb-1">
                                {course.title}
                            </h3>
                            <p className="text-sm text-gray-500 mb-3">
                                By {course.instructor}
                            </p>

                            <div className="flex items-center justify-between text-sm text-gray-600">
                                <span className="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full">
                                    {course.level}
                                </span>
                                <span>👥 {course.students}</span>
                            </div>

                            <button
                                className="mt-5 w-full rounded-xl bg-indigo-600 text-white py-2.5
                                           hover:bg-indigo-700 transition font-medium"
                            >
                                View course
                            </button>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default CourseList;

