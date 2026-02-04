type CreateUserProps = {
    show: boolean;
    newUser: {
        username: string;
        fullName: string;
        email: string;
        password: string;
        role: string;
        active: boolean;
    };
    setNewUser: React.Dispatch<
        React.SetStateAction<{
            username: string;
            fullName: string;
            email: string;
            password: string;
            role: string;
            active: boolean;
        }>
    >;
    onClose: () => void;
    onSubmit: () => void;
};

const AddUserOverlay = ({
    show,
    newUser,
    setNewUser,
    onClose,
    onSubmit,
}: CreateUserProps) => {
    if (!show) return null;

    return (
        <div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm
                       flex items-center justify-center z-50 animate-overlayFade"
            onClick={onClose}
        >
            <div
                className="bg-white rounded-xl shadow-xl w-[500px] p-6 animate-modalPop"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <h2 className="text-2xl font-semibold text-blue-600 mb-6">
                    Thêm người dùng
                </h2>

                {/* Content */}
                <div className="space-y-4 text-sm">
                    {/* Username */}
                    <div>
                        <label className="block mb-1 text-gray-600 font-medium">
                            Tên đăng nhập
                        </label>
                        <input
                            type="text"
                            value={newUser.username}
                            onChange={(e) =>
                                setNewUser({ ...newUser, username: e.target.value })
                            }
                            className="w-full px-4 py-2.5 rounded-lg border
                                       focus:ring-2 focus:ring-blue-500 outline-none"
                            placeholder="VD: nguyenvana"
                        />
                    </div>

                    {/* Full name */}
                    <div>
                        <label className="block mb-1 text-gray-600 font-medium">
                            Họ và tên
                        </label>
                        <input
                            type="text"
                            value={newUser.fullName}
                            onChange={(e) =>
                                setNewUser({ ...newUser, fullName: e.target.value })
                            }
                            className="w-full px-4 py-2.5 rounded-lg border
                                       focus:ring-2 focus:ring-blue-500 outline-none"
                            placeholder="VD: Nguyễn Văn A"
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block mb-1 text-gray-600 font-medium">
                            Email
                        </label>
                        <input
                            type="email"
                            value={newUser.email}
                            onChange={(e) =>
                                setNewUser({ ...newUser, email: e.target.value })
                            }
                            className="w-full px-4 py-2.5 rounded-lg border
                                       focus:ring-2 focus:ring-blue-500 outline-none"
                            placeholder="email@example.com"
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block mb-1 text-gray-600 font-medium">
                            Mật khẩu
                        </label>
                        <input
                            type="password"
                            value={newUser.password}
                            onChange={(e) =>
                                setNewUser({ ...newUser, password: e.target.value })
                            }
                            className="w-full px-4 py-2.5 rounded-lg border
                                       focus:ring-2 focus:ring-blue-500 outline-none"
                            placeholder="••••••••"
                        />
                    </div>

                    {/* Role + Status */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block mb-1 text-gray-600 font-medium">
                                Quyền
                            </label>
                            <select
                                value={newUser.role}
                                onChange={(e) =>
                                    setNewUser({ ...newUser, role: e.target.value })
                                }
                                className="w-full px-4 py-2.5 rounded-lg border bg-white
                                           focus:ring-2 focus:ring-blue-500 outline-none"
                            >
                                <option value="STUDENT">STUDENT</option>
                                <option value="INSTRUCTOR">INSTRUCTOR</option>
                                <option value="ADMIN">ADMIN</option>
                            </select>
                        </div>

                        <div>
                            <label className="block mb-1 text-gray-600 font-medium">
                                Trạng thái
                            </label>
                            <select
                                value={String(newUser.active)}
                                onChange={(e) =>
                                    setNewUser({
                                        ...newUser,
                                        active: e.target.value === "true",
                                    })
                                }
                                className="w-full px-4 py-2.5 rounded-lg border bg-white
                                           focus:ring-2 focus:ring-blue-500 outline-none"
                            >
                                <option value="true">Hoạt động</option>
                                <option value="false">Bị khóa</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="flex justify-end gap-3 pt-5 mt-6 border-t">
                    <button
                        onClick={onClose}
                        className="px-5 py-2.5 rounded-lg border text-gray-600
                                   hover:bg-gray-100 transition"
                    >
                        Hủy
                    </button>
                    <button
                        onClick={onSubmit}
                        className="px-5 py-2.5 rounded-lg bg-emerald-600 text-white
                                   hover:bg-emerald-700 transition"
                    >
                        Tạo người dùng
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddUserOverlay;