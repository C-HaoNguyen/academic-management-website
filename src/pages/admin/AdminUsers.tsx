import { User } from "lucide-react";
import { useEffect, useState } from "react";
import { getAccessToken } from "../../utils/AuthUtils";

const AdminUsers = () => {
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

    return (
        <div>
            <h2 className="flex items-center text-2xl text-blue-600 font-semibold mb-4 gap-3">
                <User size={24} />
                Quản lý người dùng
            </h2>

            <div className="bg-white rounded-xl shadow overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full table-fixed text-sm">
                        {/* Độ rộng cột */}
                        <colgroup>
                            <col className="w-16" />
                            <col className="w-48" />
                            <col className="w-40" />
                            <col className="w-1/3" />
                            <col className="w-32" />
                            <col className="w-32" />
                            <col className="w-40" />
                        </colgroup>

                        <thead className="bg-gray-50 border-b">
                            <tr className="text-center text-gray-600">
                                <th className="px-4 py-3 font-medium">ID</th>
                                <th className="px-4 py-3 font-medium">Full name</th>
                                <th className="px-4 py-3 font-medium">Username</th>
                                <th className="px-4 py-3 font-medium">Email</th>
                                <th className="px-4 py-3 font-medium">Role</th>
                                <th className="px-4 py-3 font-medium">Status</th>
                                <th className="px-4 py-3 font-medium">Created at</th>
                            </tr>
                        </thead>

                        <tbody>
                            {users.map((user) => (
                                <tr key={user.userId} className="border-b hover:bg-gray-50 transition">
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
                                        <span className={`px-2 py-1 rounded-full text-xs ${user.active ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                                            {user.active ? "🟢 Active" : "🔴 Locked"}
                                        </span>
                                    </td>
                                    <td className="text-center px-4 py-3 text-gray-500">
                                        {user.createdAt}
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

export default AdminUsers;
