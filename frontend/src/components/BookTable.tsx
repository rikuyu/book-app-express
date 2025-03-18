import React, {useEffect, useState} from "react";
import {IoMenu} from "react-icons/io5";
import {Link} from "react-router-dom";
import {MdMenuBook} from "react-icons/md";
import {useLogout} from "../utils/Logout.ts";
import {BASE_URL} from "../utils/Constants.ts";

export type Book = {
    _id: number;
    title: string;
    status: "available" | "borrowed";
};

const BookTable: React.FC = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const toggleMenu = () => setMenuOpen(!menuOpen);
    const [books, setBooks] = useState<Book[]>([]);
    const logout = useLogout();

    useEffect(() => {
        fetchBooks();
    }, []);

    const fetchBooks = () => {
        fetch(`${BASE_URL}/books`, {
            method: "GET",
            credentials: "include",
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }
                return res.json();
            })
            .then((data: Book[]) => setBooks(data))
            .catch((error) => {
                console.error("Error fetching books:", error);
            });
    };

    const handleBookDetails = (bookId: number) => {
        fetch(`${BASE_URL}/books/${bookId}`, {
            method: "GET",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }
                return res.json();
            })
            .then((b: Book) => alert(`${b._id}: ${b.title}`))
            .catch((error) => {
                alert(error);
                console.error("Error fetching books:", error);
            });
    };

    const handleBorrowBook = (bookId: number) => {
        fetch(`${BASE_URL}/borrow_records`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({bookId}),
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }
                fetchBooks();
            })
            .catch((error) => {
                alert(error);
                console.error("Error fetching books:", error);
            });
    };

    const handleReturnBook = (bookId: number) => {
        fetch(`${BASE_URL}/borrow_records/return`, {
            method: "PUT",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({bookId}),
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }
                fetchBooks();
            })
            .catch((error) => {
                alert(error);
                console.error("Error fetching books:", error);
            });
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <header className="bg-blue-600 text-white py-4 flex justify-between items-center px-5">
                <div className="flex items-center">
                    <MdMenuBook className="text-white w-8 h-8 mr-2"/>
                    <h1 className="text-2xl font-medium text-left">図書館の書籍一覧</h1>
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
                                <Link to="/popular">
                                    <li className="hover:bg-gray-100 px-5 py-4 cursor-pointer">人気の書籍</li>
                                </Link>
                                <Link to="/search">
                                    <li className="hover:bg-gray-100 px-5 py-4 cursor-pointer">書籍の検索</li>
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
                <table className="table-auto border-collapse border border-gray-800 w-full">
                    <thead>
                    <tr className="bg-gray-200">
                        <th className="border border-gray-300 px-0 py-3">ID</th>
                        <th className="border border-gray-300 px-4 py-3">タイトル</th>
                        <th className="border border-gray-300 px-4 py-3">状態</th>
                        <th className="border border-gray-300 px-4 py-3">貸出</th>
                    </tr>
                    </thead>
                    <tbody>
                    {books.map((book) => (
                        <tr key={book._id}>
                            <td className="border border-gray-300 px-0 py-2 text-center">{book._id}</td>
                            <td className="border border-gray-300 px-4 py-2 text-center">
                                <span
                                    className="font-medium hover:underline cursor-pointer"
                                    onClick={() => handleBookDetails(book._id)}
                                >
                                    {book.title}
                                </span>
                            </td>
                            <td className="border border-gray-300 px-4 py-2 text-center">
                              <span className={`font-bold ${book.status === "available" ? "text-green-600" : "text-red-600"}`}>
                                    {book.status === "available" ? "利用可能" : "貸出中"}
                              </span>
                            </td>
                            <td className="border border-gray-300 px-4 py-2 text-center">
                                <button
                                    className={`px-4 py-2 rounded text-white ${
                                        book.status === "available"
                                            ? "bg-blue-500 hover:bg-blue-600"
                                            : "bg-red-500 hover:bg-red-600"
                                    }`}
                                    onClick={() =>
                                        book.status === "available"
                                            ? handleBorrowBook(book._id)
                                            : handleReturnBook(book._id)
                                    }
                                >
                                    {book.status === "available" ? "貸出" : "返却"}
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default BookTable;