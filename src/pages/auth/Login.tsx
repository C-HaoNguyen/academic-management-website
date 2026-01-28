import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {

    const navigate = useNavigate();
    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    async function handleLogin() {
        try {
            const response = await fetch("http://localhost:8080/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username,
                    password,
                }),
            });

            if (!response.ok) {
                const errorText = await response.text();
                alert(errorText);
                return;
            }

            const data = await response.json();

            localStorage.setItem("accessToken", data.accessToken);
            localStorage.setItem("refreshToken", data.refreshToken);
            localStorage.setItem("userRole", data.role);
            localStorage.setItem("username", data.username);

            if (data.role === "admin") {
                navigate("/admin/dashboard", { replace: true });
            } else {
                navigate("/student/dashboard", { replace: true });
            }
            
        } catch (error) {
            console.error("Login error:", error);
            alert("Không thể kết nối server");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <form
                onSubmit={(e) => e.preventDefault()}
                className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md"
            >
                <Link
                    to="/"
                    className="flex items-center justify-center gap-2 mb-4 text-gray-800 hover:text-blue-600 transition"
                >
                    <div className="w-10 h-10 rounded-full bg-blue-600
                        flex items-center justify-center
                        text-white font-bold text-lg">
                        A
                    </div>
                    <span className="text-xl font-semibold text-blue-500">
                        Ademy
                    </span>
                </Link>

                <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">
                    Đăng nhập ngay!
                </h2>

                <div className="mb-4">
                    <label htmlFor="username" className="block text-gray-700 mb-2">
                        Tên đăng nhập
                    </label>
                    <input
                        type="text"
                        id="username"
                        onChange={(e) => setUserName(e.target.value)}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Nhập tên đăng nhập..."
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="password" className="block text-gray-700 mb-2">
                        Mật khẩu
                    </label>

                    <div className="relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-2 pr-10 border rounded-lg
                       focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Nhập mật khẩu..."
                        />

                        {/* Eye icon */}
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                        >
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                    </div>
                </div>

                <div className="flex items-center justify-between mb-4 text-sm">
                    {/* Forgot password */}
                    <Link
                        to="/forgot-password"
                        className="text-blue-600 hover:underline"
                    >
                        Quên mật khẩu?
                    </Link>
                </div>

                <button
                    type="button"
                    className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                    onClick={handleLogin}
                >
                    Đăng nhập
                </button>

                {/* Signup */}
                <p className="text-sm text-center text-gray-600 mt-4">
                    Bạn mới biết đến Ademy?{" "}
                    <Link
                        to={"/signup"}
                        className="text-blue-600 hover:underline"
                    >
                        Đăng ký ngay
                    </Link>
                </p>
            </form>
        </div>
    );
};

export default Login;