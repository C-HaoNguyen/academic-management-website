import { Outlet } from 'react-router-dom';
import Header from './Header';

const Layout = () => {
    return (
        <div className="flex min-h-screen">
            {/* Header */}
            <Header />

            {/* Sidebar */}
            <aside className="w-64 bg-gray-800 text-white p-4">
                <h2 className="text-lg font-bold">Academic System</h2>
                <ul className="mt-4 space-y-2">
                    <li>Dashboard</li>
                    <li>Courses</li>
                </ul>
            </aside>

            {/* Main content */}
            <main className="flex-1 bg-gray-100 p-6">
                <Outlet />
            </main>
        </div>
    );
};

export default Layout;
