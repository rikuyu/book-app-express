import React, {useState} from "react";
import {FaSearch} from "react-icons/fa";
import {IoMenu} from "react-icons/io5";
import {IoMdSend} from "react-icons/io";
import {Book} from "./BookTable.tsx";
import {Link} from "react-router-dom";
import {useLogout} from "../utils/Logout.ts";
import {BASE_URL} from "../utils/Constants.ts";

const BookSearch: React.FC = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [searchText, setSearchText] = useState("");
    const [books, setBooks] = useState<Book[]>([]);
    const logout = useLogout();

    const toggleMenu = () => setMenuOpen(!menuOpen);

    const handleSearch = () => {
        if (searchText.length == 0) {
            alert("キーワードを入力してください");
            return;
        }

        fetch(`${BASE_URL}/books/search?keyword=${encodeURIComponent(searchText)}`, {
            method: "GET",
            credentials: "include",
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error(`HTTP error status: ${res.status}`);
                }
                return res.json();
            })
            .then((data: Book[]) => {
                if (data.length == 0) {
                    alert("本が見つけられませんでした");
                } else {
                    setBooks(data);
                }
            })
            .catch((error) => console.error(error))
            .finally(() => setSearchText(""));
    };


    return (
        <div className="min-h-screen bg-gray-100">
            <header className="bg-blue-600 text-white py-4 flex justify-between items-center px-5">
                <div className="flex items-center">
                    <FaSearch className="text-white w-6 h-6 mr-4"/>
                    <h1 className="text-2xl font-medium text-left">図書館の書籍検索</h1>
                </div>
                <div className="relative">
                    <button
                        onClick={toggleMenu}
                        className="p-2 text-white rounded-full focus:outline-none"
                    >
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
                                <Link to="/mypage">
                                    <li className="hover:bg-gray-100 px-5 py-4 cursor-pointer">マイページ</li>
                                </Link>
                                <li
                                    className="hover:bg-gray-100 px-5 py-4 cursor-pointer"
                                    onClick={logout}>
                                    ログアウト
                                </li>
                            </ul>
                        </div>
                    )}
                </div>
            </header>
            <div className="px-20 py-6">
                <div className="flex items-center border border-gray-400 rounded-lg overflow-hidden">
                    <FaSearch className="text-gray-500 mx-3 w-5 h-5"/>
                    <input
                        type="text"
                        placeholder="書籍を検索..."
                        className="w-full py-4 px-1 focus:outline-none"
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                    />
                    <button
                        onClick={handleSearch}
                        className="mx-3 bg-blue-500 text-white py-2 px-3 rounded-lg flex items-center whitespace-nowrap hover:bg-blue-600 focus:outline-none"
                    >
                        <IoMdSend className="text-white w-5 h-5 mr-2"/>
                        検索
                    </button>
                </div>
            </div>
            <div className="px-20 py-6">
                <table className="table-auto border-collapse border border-gray-800 w-full">
                    <thead>
                    <tr className="bg-gray-200">
                        <th className="border border-gray-300 px-0 py-3">ID</th>
                        <th className="border border-gray-300 px-4 py-3">タイトル</th>
                        <th className="border border-gray-300 px-4 py-3">状態</th>
                    </tr>
                    </thead>
                    <tbody>
                    {books.map((book) => (
                        <tr key={book._id}>
                            <td className="border border-gray-300 px-0 py-2 text-center">{book._id}</td>
                            <td className="border border-gray-300 px-4 py-2 text-center">{book.title}</td>
                            <td className="border border-gray-300 px-4 py-2 text-center">
                              <span
                                  className={`font-bold ${book.status === "available" ? "text-green-600" : "text-red-600"}`}>
                                {book.status === "available" ? "利用可能" : "貸出中"}
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

export default BookSearch;