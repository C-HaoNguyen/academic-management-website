const AdminDashboard = () => {
    return (
        <div>
            <h2 className="text-2xl font-semibold mb-4">📊 Dashboard</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white p-4 rounded-xl shadow">👤 Users: 120</div>
                <div className="bg-white p-4 rounded-xl shadow">🎓 Courses: 35</div>
                <div className="bg-white p-4 rounded-xl shadow">💳 Orders: 560</div>
            </div>
        </div>
    );
};


export default AdminDashboard;