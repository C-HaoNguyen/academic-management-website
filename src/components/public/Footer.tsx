import { motion } from "framer-motion";

const Footer = () => {
    return (
        <motion.footer
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-br from-slate-900 to-slate-800 text-slate-300"
        >
            <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-1 md:grid-cols-4 gap-10">
                {/* Brand */}
                <div>
                    <h2 className="text-2xl font-bold text-white mb-3">
                        Ademy
                    </h2>
                    <p className="text-sm leading-relaxed text-slate-400">
                        Academic Management System helping students and instructors
                        manage learning effectively in the digital era.
                    </p>
                </div>

                {/* Links */}
                <div>
                    <h3 className="text-white font-semibold mb-4">Về Ademy</h3>
                    <ul className="space-y-2 text-sm">
                        <li className="hover:text-white transition cursor-pointer">Các khóa học</li>
                        <li className="hover:text-white transition cursor-pointer">Đội ngũ giảng dạy</li>
                        <li className="hover:text-white transition cursor-pointer">Liên hệ</li>
                    </ul>
                </div>

                <div>
                    <h3 className="text-white font-semibold mb-4">Dịch vụ</h3>
                    <ul className="space-y-2 text-sm">
                        <li className="hover:text-white transition cursor-pointer">Trung tâm hỗ trợ</li>
                        <li className="hover:text-white transition cursor-pointer">Chính sách bảo mật</li>
                        <li className="hover:text-white transition cursor-pointer">Điều khoản dịch vụ</li>
                    </ul>
                </div>

                {/* Contact */}
                <div>
                    <h3 className="text-white font-semibold mb-4">Liên hệ</h3>
                    <ul className="space-y-2 text-sm">
                        <li>Email: support@ademy.edu</li>
                        <li>Phone: +84 123 456 789</li>
                        <li className="flex gap-4 mt-4">
                            <span className="hover:text-white cursor-pointer transition">🌐</span>
                            <span className="hover:text-white cursor-pointer transition">🐦</span>
                            <span className="hover:text-white cursor-pointer transition">📘</span>
                        </li>
                    </ul>
                </div>
            </div>

            {/* Bottom */}
            <div className="border-t border-slate-700 py-4 text-center text-sm text-slate-400">
                © {new Date().getFullYear()} Ademy. All rights reserved.
            </div>
        </motion.footer>
    );
};

export default Footer;
