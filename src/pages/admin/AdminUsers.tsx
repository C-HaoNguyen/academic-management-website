const AdminUsers = () => {
    return (
        <div>
            <h2 className="text-2xl font-semibold mb-4">👤 User Management</h2>
            <div className="bg-white rounded-xl shadow p-4">
                <table className="w-full text-sm">
                    <thead className="border-b">
                        <tr className="text-left">
                            <th className="py-2">Name</th>
                            <th>Email</th>
                            <th>Role</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="border-b">
                            <td className="py-2">Nguyen Van A</td>
                            <td>a@gmail.com</td>
                            <td>Student</td>
                        </tr>
                        <tr>
                            <td className="py-2">Tran Thi B</td>
                            <td>b@gmail.com</td>
                            <td>Instructor</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminUsers;