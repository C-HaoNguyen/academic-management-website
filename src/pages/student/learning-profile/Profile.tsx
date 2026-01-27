import { useState } from "react";

const Profile = () => {
    const [isEditing, setIsEditing] = useState(false);

    const user = {
        avatar: "https://i.pravatar.cc/40",
        fullName: "Nguyễn Văn A",
        username: "nguyenvana",
        email: "nguyenvana@gmail.com",
        phone: "0123 456 789",
        role: "Student",
        joinedAt: "01/09/2024",
    };

    return (
        <div className="min-h-screen bg-white flex items-center justify-center p-2">
            <div className="w-full max-w-4xl bg-white/70 backdrop-blur-lg rounded-3xl shadow-2xl p-8 relative overflow-hidden">
                {/* Header */}
                <div className="relative flex flex-col md:flex-row items-center gap-8">
                    {/* Avatar */}
                    <div className="relative group">
                        <img
                            src={user.avatar}
                            alt="avatar"
                            className="w-32 h-32 rounded-full object-cover ring-4 ring-blue-400 group-hover:scale-105 transition-transform duration-300"
                        />
                        <span className="absolute bottom-1 right-1 w-4 h-4 bg-green-500 rounded-full ring-2 ring-white" />
                    </div>

                    {/* Basic info */}
                    <div className="text-center md:text-left">
                        <h1 className="text-3xl font-bold text-gray-800">
                            {user.fullName}
                        </h1>
                        <p className="text-gray-500">@{user.username}</p>

                        <span className="inline-block mt-2 px-4 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-600">
                            {user.role}
                        </span>
                    </div>

                    {/* Action */}
                    <div className="md:ml-auto flex gap-3">
                        {isEditing && (
                            <button
                                onClick={() => setIsEditing(false)}
                                className="px-6 py-2 rounded-xl border border-gray-300
                       text-gray-600 font-medium
                       hover:bg-gray-100 hover:scale-105
                       transition-all"
                            >
                                Hủy
                            </button>
                        )}

                        <button
                            onClick={() => setIsEditing(!isEditing)}
                            className="px-6 py-2 rounded-xl
                   bg-gradient-to-r from-blue-500 to-purple-500
                   text-white font-medium shadow-lg
                   hover:shadow-xl hover:scale-105
                   transition-all"
                        >
                            {isEditing ? "Lưu thay đổi" : "Chỉnh sửa"}
                        </button>
                    </div>
                </div>

                {/* Divider */}
                <div className="my-8 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent" />

                {/* Info grid */}
                <div className="relative grid grid-cols-1 md:grid-cols-2 gap-6">
                    <InfoItem label="Email" value={user.email} editable={isEditing} />
                    <InfoItem label="Số điện thoại" value={user.phone} editable={isEditing} />
                    <InfoItem label="Vai trò" value={user.role} />
                    <InfoItem label="Ngày tham gia" value={user.joinedAt} />
                </div>
            </div>
        </div>
    );
};

interface InfoItemProps {
    label: string;
    value: string;
    editable?: boolean;
}

const InfoItem = ({ label, value, editable = false }: InfoItemProps) => {
    return (
        <div className="bg-white rounded-2xl p-5 shadow-md hover:shadow-lg transition-shadow">
            <p className="text-sm text-gray-400 mb-1">{label}</p>
            {editable ? (
                <input
                    defaultValue={value}
                    className="w-full text-gray-800 font-medium outline-none border-b-2 border-blue-400 focus:border-purple-400 transition-colors"
                />
            ) : (
                <p className="text-gray-800 font-medium">{value}</p>
            )}
        </div>
    );
};

export default Profile;
