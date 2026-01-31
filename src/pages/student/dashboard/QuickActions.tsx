import { useNavigate } from "react-router-dom";

const QuickActions = () => {
    const navigate = useNavigate();

    return (
        <div className="card">
            <h2 className="text-lg font-semibold mb-4">
                ⚡ Thao tác nhanh
            </h2>

            <div className="flex flex-col gap-3">
                <button
                    className="btn-primary"
                    onClick={() => navigate("/my-courses")}
                >
                    Tiếp tục học
                </button>

                <button
                    className="btn-outline"
                    onClick={() => navigate("/courses")}
                >
                    Tìm khóa học mới
                </button>

                <button
                    className="btn-outline"
                    onClick={() => navigate("/profile")}
                >
                    Hồ sơ cá nhân
                </button>
            </div>
        </div>
    );
};

export default QuickActions;