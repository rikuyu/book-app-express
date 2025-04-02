import { useState } from "react";
import { IoMenu } from "react-icons/io5";
import { Link } from "react-router-dom";
import { FaBookOpen } from "react-icons/fa";
import { BASE_URL } from "../utils/Constants.ts";

const menuItems = [
    {to: "/books", label: "すべての書籍"},
    {to: "/popular", label: "人気の書籍"},
    {to: "/search", label: "書籍の検索"},
    {to: "/mypage", label: "マイページ"},
];

const AddBook = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [title, setTitle] = useState("");
    const toggleMenu = () => setMenuOpen((prev) => !prev);

    const submitBook = () => {
        if (!title.trim()) {
            alert("書籍タイトルを入力してください。");
            return;
        }

        fetch(`${BASE_URL}/books`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({title}),
            credentials: "include",
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`Failed to add book. Status: ${response.status}`);
                }
                alert("書籍が正常に追加されました！");
                setTitle("");
            })
            .catch((error) => {
                console.error("Error:", error);
                alert("書籍の追加に失敗しました。");
            });
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <header className="bg-blue-600 text-white py-4 flex justify-between items-center px-5">
                <div className="flex items-center">
                    <FaBookOpen className="text-white w-6 h-6 mr-2"/>
                    <h1 className="text-2xl font-medium">【管理者用】書籍の追加</h1>
                </div>
                <div className="relative">
                    <button onClick={toggleMenu} className="p-2 text-white rounded-full focus:outline-none">
                        <IoMenu className="text-white mx-3 w-7 h-7"/>
                    </button>
                    {menuOpen && (
                        <div className="absolute right-0 mt-2 w-48 bg-white rounded shadow-lg z-10">
                            <ul className="text-gray-800">
                                {menuItems.map(({to, label}) => (
                                    <Link key={to} to={to}>
                                        <li className="hover:bg-gray-100 px-5 py-4 cursor-pointer">{label}</li>
                                    </Link>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </header>

            <main className="flex-grow flex items-start justify-center min-h-screen pt-24">
                <div className="bg-white p-10 rounded-lg shadow-md max-w-lg w-full">
                    <h2 className="text-xl font-semibold mb-6">新しい書籍を追加</h2>
                    <input
                        type="text"
                        placeholder="書籍タイトルを入力..."
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full px-4 py-2 mb-6 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
                    />
                    <button
                        onClick={submitBook}
                        className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
                    >
                        書籍を追加
                    </button>
                </div>
            </main>
        </div>
    );
};

export default AddBook;
