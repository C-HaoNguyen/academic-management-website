import { Outlet, NavLink } from "react-router-dom";

const AdminLayout = () => {
    const linkClass = ({ isActive }: { isActive: boolean }) =>
        isActive
            ? "bg-blue-100 text-blue-600 font-medium"
            : "text-gray-600 hover:bg-gray-100";

    return (
        <div className="min-h-screen flex bg-gray-50">
            {/* Sidebar */}
            <aside className="w-64 bg-white border-r">
                <div className="p-4 text-xl font-bold">⚙️ Admin</div>
                <nav className="flex flex-col gap-1 px-2">
                    <NavLink to="/admin/dashboard" className={linkClass + " px-3 py-2 rounded-lg"}>
                        📊 Dashboard
                    </NavLink>
                    <NavLink to="/admin/users" className={linkClass + " px-3 py-2 rounded-lg"}>
                        👤 Users
                    </NavLink>
                    <NavLink to="/admin/courses" className={linkClass + " px-3 py-2 rounded-lg"}>
                        🎓 Courses
                    </NavLink>
                    <NavLink to="/admin/categories" className={linkClass + " px-3 py-2 rounded-lg"}>
                        🗂️ Categories
                    </NavLink>
                    <NavLink to="/admin/orders" className={linkClass + " px-3 py-2 rounded-lg"}>
                        💳 Orders
                    </NavLink>
                </nav>
            </aside>

            {/* Main content */}
            <div className="flex-1 flex flex-col">
                {/* Header */}
                <header className="h-14 bg-white border-b flex items-center justify-between px-6">
                    <h1 className="font-semibold">Admin Panel</h1>
                    <div className="text-sm text-gray-600">Xin chào, Admin</div>
                </header>

                {/* Page content */}
                <main className="flex-1 p-6">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;
