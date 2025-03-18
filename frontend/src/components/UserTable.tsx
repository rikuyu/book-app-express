import React, {useEffect, useState} from 'react';
import {IoMenu} from "react-icons/io5";
import {Link} from "react-router-dom";
import {MdGroup} from "react-icons/md";
import {BASE_URL} from "../utils/Constants.ts";

type User = {
    id: number;
    name: string;
    email: string;
    role: 'user' | 'admin';
};

const UserTable: React.FC = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const toggleMenu = () => setMenuOpen(!menuOpen);
    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = () => {
        fetch(`${BASE_URL}/users`, {
            method: "GET",
            credentials: "include",
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }
                return res.json();
            })
            .then((data: User[]) => setUsers(data))
            .catch((error) => {
                console.error("Error fetching users:", error);
            });
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <header className="bg-blue-600 text-white py-4 flex justify-between items-center px-5">
                <div className="flex items-center">
                    <MdGroup className="text-white w-8 h-8 mr-2"/>
                    <h1 className="text-2xl font-medium">【管理者用】すべてのユーザー</h1>
                </div>
                <div className="relative">
                    <button onClick={toggleMenu} className="p-2 text-white rounded-full focus:outline-none">
                        <IoMenu className="text-white mx-3 w-7 h-7"/>
                    </button>
                    {menuOpen && (
                        <div className="absolute right-0 mt-2 w-48 bg-white rounded shadow-lg z-10">
                            <ul className="text-gray-800">
                                <Link to="/books">
                                    <li className="hover:bg-gray-100 px-5 py-4 cursor-pointer">すべての書籍</li>
                                </Link>
                                <Link to="/popular">
                                    <li className="hover:bg-gray-100 px-5 py-4 cursor-pointer">人気の書籍</li>
                                </Link>
                                <Link to="/search">
                                    <li className="hover:bg-gray-100 px-5 py-4 cursor-pointer">書籍の検索</li>
                                </Link>
                                <Link to="/mypage">
                                    <li className="hover:bg-gray-100 px-5 py-4 cursor-pointer">マイページ</li>
                                </Link>
                            </ul>
                        </div>
                    )}
                </div>
            </header>
            <div className="px-20 py-6">
                <table className="table-auto border-collapse border border-gray-800 w-full">
                    <thead>
                    <tr className="bg-gray-200">
                        <th className="border border-gray-300 px-2 py-3">id</th>
                        <th className="border border-gray-300 px-4 py-3">名前</th>
                        <th className="border border-gray-300 px-4 py-3">メールアドレス</th>
                        <th className="border border-gray-300 px-4 py-3">Role</th>
                    </tr>
                    </thead>
                    <tbody>
                    {users.map((user) => (
                        <tr key={user.id}>
                            <td className="border border-gray-300 px-2 py-3 text-center">{user.id}</td>
                            <td className="border border-gray-300 px-4 py-3 text-center">{user.name}</td>
                            <td className="border border-gray-300 px-4 py-3 text-center">{user.email}</td>
                            <td className="border border-gray-300 px-4 py-3 text-center">
                              <span className={`font-bold ${user.role === 'user' ? 'text-blue-600' : 'text-red-600'}`}>
                                {user.role}
                              </span>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default UserTable;
