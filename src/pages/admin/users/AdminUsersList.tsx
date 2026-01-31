import { User, Pencil, Plus, UserX, UserCheck, Unlock } from "lucide-react";
import { useEffect, useState } from "react";
import { getAccessToken } from "../../../utils/AuthUtils";
import CreateUser from "../../../components/admin/AddUserOverlay";

const AdminUsersList = () => {
    const [showOverlayAddUser, setShowOverlayAddUser] = useState(false);
    const [showOverlayDeleteUser, setShowOverlayDeleteUser] = useState(false);

    const [newUser, setNewUser] = useState({
        username: "",
        fullName: "",
        email: "",
        password: "",
        role: "STUDENT",
        active: true,
    });

    const [users, setUsers] = useState<
        {
            userId: number;
            username: string;
            fullName: string;
            email: string;
            passwordHash: string;
            role: string;
            createdAt: string;
            updatedAt: string;
            active: boolean;
        }[]
    >([]);

    const [deletedUser, setDeletedUser] = useState<{
        userId: number;
        username: string
    } | null>(null);

    useEffect(() => {
        refreshUsersList();
    }, []);

    async function refreshUsersList() {
        try {
            const token = getAccessToken();

            const res = await fetch("http://localhost:8080/admin/users", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!res.ok) {
                console.error("API error:", res.status);
                return;
            }

            const data = await res.json();
            setUsers(data);
        } catch (err) {
            console.error(err);
        }
    }

    async function handleToggleUser(user: any) {
        const token = getAccessToken();

        const url = user.active
            ? `/admin/users/${user.userId}/lock`
            : `/admin/users/${user.userId}/unlock`;

        await fetch(`http://localhost:8080${url}`, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        refreshUsersList();
    }

    const handleDeleteUser = async () => {
        if (!deletedUser) return;

        try {
            const token = getAccessToken();

            const res = await fetch(
                `http://localhost:8080/admin/deleted-user`,
                {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        userId: deletedUser.userId,
                    }),
                }
            );

            if (!res.ok) {
                console.error("Delete failed:", res.status);
                return;
            }

            // Đóng overlay
            setShowOverlayDeleteUser(false);
            setDeletedUser(null);

            // Refresh lại bảng
            refreshUsersList();
        } catch (err) {
            console.error(err);
        }
    };

    // TODO: gắn API sau
    const handleEditUser = (userId: number) => {
        console.log("Edit user:", userId);
    };

    return (
        <div>
            <h2 className="flex items-center text-2xl text-blue-600 font-semibold mb-4 gap-3">
                <User size={24} />
                Quản lý người dùng
            </h2>

            <CreateUser
                show={showOverlayAddUser}
                newUser={newUser}
                setNewUser={setNewUser}
                onClose={() => setShowOverlayAddUser(false)}
                onSubmit={() => {
                    // TODO: gọi API tạo user
                    console.log("Create user:", newUser);
                    setShowOverlayAddUser(false);
                }}
            />

            {
                showOverlayDeleteUser && deletedUser && (
                    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 animate-overlayFade">
                        <div className="bg-white rounded-xl shadow-xl w-[440px] p-6 animate-modalPop">
                            {/* Header */}
                            <h2 className="text-2xl font-semibold text-red-600 mb-3">
                                Xóa người dùng
                            </h2>

                            {/* Content */}
                            <p className="text-gray-700 leading-relaxed mb-6">
                                Bạn sắp xóa người dùng{" "}
                                <span className="font-semibold text-red-600">
                                    {deletedUser.username}
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
                                    onClick={() => setShowOverlayDeleteUser(false)}
                                    className="px-5 py-2.5 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100 transition"
                                >
                                    Hủy
                                </button>

                                <button
                                    onClick={handleDeleteUser}
                                    className="px-5 py-2.5 rounded-lg bg-red-600 text-white hover:bg-red-700 transition"
                                >
                                    Xóa
                                </button>
                            </div>
                        </div>
                    </div>
                )
            }

            <div className="flex items-center justify-start mb-4">
                <button
                    onClick={() => setShowOverlayAddUser(true)}
                    className="group flex items-center gap-2 px-2 py-2 rounded-xl bg-emerald-600
                                text-white text-sm font-semibold shadow-md shadow-emerald-600/20 hover:shadow-lg hover:shadow-emerald-600/30
                                hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
                >
                    <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-white/20 group-hover:bg-white/30 transition">
                        <Plus size={16} />
                    </span>
                    Thêm người dùng
                </button>
            </div>

            <div className="bg-white rounded-xl shadow overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full table-fixed text-sm">
                        <colgroup>
                            <col className="w-16" />
                            <col className="w-48" />
                            <col className="w-40" />
                            <col className="w-1/3" />
                            <col className="w-32" />
                            <col className="w-32" />
                            <col className="w-40" />
                            <col className="w-32" /> {/* Action */}
                        </colgroup>

                        <thead className="bg-gray-50 border-b">
                            <tr className="text-center text-gray-600">
                                <th className="px-4 py-3 font-medium">ID</th>
                                <th className="px-4 py-3 font-medium">Họ và tên</th>
                                <th className="px-4 py-3 font-medium">Tên người dùng</th>
                                <th className="px-4 py-3 font-medium">Email</th>
                                <th className="px-4 py-3 font-medium">Quyền</th>
                                <th className="px-4 py-3 font-medium">Trạng thái</th>
                                <th className="px-4 py-3 font-medium">Ngày tạo tài khoản</th>
                                <th className="px-4 py-3 font-medium">Thao tác</th>
                            </tr>
                        </thead>

                        <tbody>
                            {
                                [...users]
                                    .sort((a, b) => a.userId - b.userId)
                                    .map((user) => (
                                        <tr
                                            key={user.userId}
                                            className="border-b hover:bg-gray-50 transition"
                                        >
                                            <td className="text-center px-4 py-3">{user.userId}</td>
                                            <td className="text-center px-4 py-3 truncate">
                                                {user.fullName}
                                            </td>
                                            <td className="text-center px-4 py-3 truncate">
                                                {user.username}
                                            </td>
                                            <td className="text-center px-4 py-3 truncate">
                                                {user.email}
                                            </td>
                                            <td className="text-center px-4 py-3">
                                                <span className="px-2 py-1 rounded-full text-xs bg-purple-100 text-purple-700">
                                                    {user.role}
                                                </span>
                                            </td>
                                            <td className="text-center px-4 py-3">
                                                <span
                                                    className={`px-2 py-1 rounded-full text-xs ${user.active
                                                        ? "bg-green-100 text-green-700"
                                                        : "bg-red-100 text-red-700"
                                                        }`}
                                                >
                                                    {user.active ? "Active" : "Locked"}
                                                </span>
                                            </td>
                                            <td className="text-center px-4 py-3 text-gray-500">
                                                {user.createdAt}
                                            </td>

                                            {/* Action */}
                                            <td className="px-4 py-3">
                                                <div className="flex items-center justify-center gap-2">
                                                    <button
                                                        onClick={() => handleToggleUser(user)}
                                                        className={`p-2 rounded-lg transition ${user.active
                                                            ? "text-red-600 hover:bg-red-50"
                                                            : "text-green-600 hover:bg-green-50"
                                                            }`}
                                                        title={user.active ? "Vô hiệu hóa" : "Mở khóa"}
                                                    >
                                                        {user.active ? <UserX size={16} /> : <UserCheck size={16} />}
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminUsersList;
