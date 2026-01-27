import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";

const HomePage = () => {
    return (
        <div className="bg-gray-50">
            {/* HERO SECTION */}
            <section className="relative overflow-hidden">
                <div className="mx-auto max-w-7xl px-4 py-20 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

                    {/* Left content */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                            Nền tảng quản lý & học tập <br />
                            <span className="text-blue-600 text-5xl">trực tuyến toàn diện</span>
                        </h1>

                        <p className="mt-6 text-gray-600 text-lg">
                            Ademy giúp học viên và giảng viên có thể theo dõi
                            tiến trình học tập, quản lý khóa học và nâng cao hiệu quả đào tạo.
                        </p>

                        <div className="mt-8 flex gap-4">
                            <NavLink
                                to="/courses"
                                className="px-6 py-3 rounded-xl bg-blue-600 text-white
                                           font-medium hover:bg-blue-700 transition shadow-sm"
                            >
                                Khám phá khóa học
                            </NavLink>

                            <NavLink
                                to="/signup"
                                className="px-6 py-3 rounded-xl border border-gray-300
                                           text-gray-700 hover:bg-gray-100 transition"
                            >
                                Bắt đầu miễn phí
                            </NavLink>
                        </div>
                    </motion.div>

                    {/* Right illustration */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="relative"
                    >
                        <div className="rounded-2xl bg-white shadow-xl p-6">
                            <div className="h-4 w-24 bg-gray-200 rounded mb-4" />
                            <div className="space-y-3">
                                <div className="h-3 bg-gray-200 rounded" />
                                <div className="h-3 bg-gray-200 rounded w-5/6" />
                                <div className="h-3 bg-gray-200 rounded w-4/6" />
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* FEATURES */}
            <section className="py-20">
                <div className="mx-auto max-w-7xl px-6">
                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="text-3xl font-bold text-center text-gray-900"
                    >
                        Vì sao chọn Ademy?
                    </motion.h2>

                    <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                title: "Quản lý khóa học thông minh",
                                desc: "Tạo, chỉnh sửa và theo dõi khóa học dễ dàng."
                            },
                            {
                                title: "Theo dõi tiến độ học tập",
                                desc: "Thống kê, báo cáo chi tiết cho từng học viên."
                            },
                            {
                                title: "Trải nghiệm học tập hiện đại",
                                desc: "Giao diện tối ưu cho mọi thiết bị."
                            },
                        ].map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: index * 0.1 }}
                                className="bg-white p-6 rounded-2xl shadow-sm
                                           hover:shadow-md transition"
                            >
                                <h3 className="text-lg font-semibold text-gray-900">
                                    {item.title}
                                </h3>
                                <p className="mt-3 text-gray-600">
                                    {item.desc}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* STATS */}
            <section className="bg-blue-600 py-16">
                <div className="mx-auto max-w-7xl px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
                    {[
                        { value: "2,000+", label: "Học viên" },
                        { value: "120+", label: "Khóa học" },
                        { value: "35+", label: "Giảng viên" },
                        { value: "4.8★", label: "Đánh giá" },
                    ].map((stat, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: index * 0.1 }}
                        >
                            <div className="text-3xl font-bold">
                                {stat.value}
                            </div>
                            <div className="mt-2 text-blue-100">
                                {stat.label}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* CTA */}
            <section className="py-20">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="mx-auto max-w-3xl px-6 text-center"
                >
                    <h2 className="text-3xl font-bold text-gray-900">
                        Sẵn sàng bắt đầu hành trình học tập?
                    </h2>
                    <p className="mt-4 text-gray-600">
                        Tham gia Ademy ngay hôm nay để quản lý và học tập hiệu quả hơn.
                    </p>
                    <NavLink
                        to="/signup"
                        className="inline-block mt-8 px-8 py-3 rounded-xl
                                   bg-blue-600 text-white font-medium
                                   hover:bg-blue-700 transition shadow-sm"
                    >
                        Đăng ký miễn phí
                    </NavLink>
                </motion.div>
            </section>
        </div>
    );
};

export default HomePage;
