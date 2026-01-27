const MyCourses = () => {
    return (
        <div>
            <h1 className="text-2xl font-semibold mb-2">Khóa học của tôi</h1>
            <p className="text-gray-600 mb-6">
                Danh sách các khóa học bạn đã đăng ký
            </p>

            {/* Empty state */}
            <div className="flex flex-col items-center justify-center bg-white rounded-xl p-12 border">
                <img
                    src="https://cdn-icons-png.flaticon.com/512/4076/4076504.png"
                    alt="empty"
                    className="w-32 mb-4 opacity-80"
                />
                <p className="text-gray-500 mb-4">
                    Bạn chưa đăng ký khóa học nào
                </p>
                <button
                    onClick={() => window.location.href = "/courses"}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg"
                >
                    Khám phá khóa học
                </button>
            </div>
        </div>
    );
};

export default MyCourses;
