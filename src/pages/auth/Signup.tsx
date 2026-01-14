import { useState } from "react";

const Signup = () => {
    const [fullName, setFullName] = useState("");
    const [username, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleSignup = async () => {
        if (password !== confirmPassword) {
            alert("Mật khẩu xác nhận không khớp!");
            return;
        }

        const payload = {
            fullName,
            username,
            email,
            password,
        };

        console.log("Signup payload:", payload);

        // TODO: gọi API backend sau
        alert("Đăng ký thành công (demo)");
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <form
                onSubmit={(e) => e.preventDefault()}
                className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md"
            >
                <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">
                    Đăng ký tài khoản
                </h2>

                {/* Full name */}
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">
                        Họ và tên
                    </label>
                    <input
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="w-full px-4 py-2 border rounded-lg
                                   focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Nguyễn Văn A"
                    />
                </div>

                {/* Username */}
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">
                        Username
                    </label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUserName(e.target.value)}
                        className="w-full px-4 py-2 border rounded-lg
                                   focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Tên đăng nhập..."
                    />
                </div>

                {/* Email */}
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">
                        Email
                    </label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-2 border rounded-lg
                                   focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="example@email.com"
                    />
                </div>

                {/* Password */}
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">
                        Mật khẩu
                    </label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-4 py-2 border rounded-lg
                                   focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Nhập mật khẩu..."
                    />
                </div>

                {/* Confirm password */}
                <div className="mb-6">
                    <label className="block text-gray-700 mb-2">
                        Xác nhận mật khẩu
                    </label>
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full px-4 py-2 border rounded-lg
                                   focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Nhập lại mật khẩu..."
                    />
                </div>

                {/* Submit */}
                <button
                    type="button"
                    onClick={handleSignup}
                    className="w-full bg-blue-600 text-white py-2 rounded-lg
                               hover:bg-blue-700 transition"
                >
                    Đăng ký
                </button>

                {/* Redirect login */}
                <p className="text-sm text-center text-gray-600 mt-4">
                    Đã có tài khoản?{" "}
                    <a
                        href="/login"
                        className="text-blue-600 hover:underline"
                    >
                        Đăng nhập
                    </a>
                </p>
            </form>
        </div>
    );
};

export default Signup;
