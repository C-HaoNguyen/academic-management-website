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
                       flex items-center justify-center z-50
                       animate-overlayFade"
            onClick={onClose}
        >
            <div
                className="bg-white rounded-xl shadow-xl w-[480px] p-6
                           animate-modalPop"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <h2 className="text-2xl font-semibold text-blue-600 mb-4">
                    Thêm người dùng
                </h2>

                {/* Content */}
                <div className="space-y-4">
                    <input
                        type="text"
                        placeholder="Username"
                        value={newUser.username}
                        onChange={(e) =>
                            setNewUser({ ...newUser, username: e.target.value })
                        }
                        className="w-full px-4 py-2.5 rounded-lg border focus:ring-2 focus:ring-blue-500 outline-none"
                    />

                    <input
                        type="text"
                        placeholder="Full name"
                        value={newUser.fullName}
                        onChange={(e) =>
                            setNewUser({ ...newUser, fullName: e.target.value })
                        }
                        className="w-full px-4 py-2.5 rounded-lg border focus:ring-2 focus:ring-blue-500 outline-none"
                    />

                    <input
                        type="email"
                        placeholder="Email"
                        value={newUser.email}
                        onChange={(e) =>
                            setNewUser({ ...newUser, email: e.target.value })
                        }
                        className="w-full px-4 py-2.5 rounded-lg border focus:ring-2 focus:ring-blue-500 outline-none"
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        value={newUser.password}
                        onChange={(e) =>
                            setNewUser({ ...newUser, password: e.target.value })
                        }
                        className="w-full px-4 py-2.5 rounded-lg border focus:ring-2 focus:ring-blue-500 outline-none"
                    />

                    <div className="flex gap-3">
                        <select
                            value={newUser.role}
                            onChange={(e) =>
                                setNewUser({ ...newUser, role: e.target.value })
                            }
                            className="flex-1 px-4 py-2.5 rounded-lg border bg-white focus:ring-2 focus:ring-blue-500 outline-none"
                        >
                            <option value="STUDENT">STUDENT</option>
                            <option value="INSTRUCTOR">INSTRUCTOR</option>
                            <option value="ADMIN">ADMIN</option>
                        </select>

                        <select
                            value={String(newUser.active)}
                            onChange={(e) =>
                                setNewUser({
                                    ...newUser,
                                    active: e.target.value === "true",
                                })
                            }
                            className="flex-1 px-4 py-2.5 rounded-lg border bg-white focus:ring-2 focus:ring-blue-500 outline-none"
                        >
                            <option value="true">Active</option>
                            <option value="false">Locked</option>
                        </select>
                    </div>
                </div>

                {/* Footer */}
                <div className="flex justify-end gap-3 pt-5 mt-6 border-t">
                    <button
                        onClick={onClose}
                        className="px-5 py-2.5 rounded-lg border text-gray-600 hover:bg-gray-100 transition"
                    >
                        Hủy
                    </button>
                    <button
                        onClick={onSubmit}
                        className="px-5 py-2.5 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
                    >
                        Tạo người dùng
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddUserOverlay;