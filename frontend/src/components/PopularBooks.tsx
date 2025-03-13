import React, {useEffect, useState} from 'react';
import {IoMenu} from "react-icons/io5";
import {Link} from "react-router-dom";
import {FaCrown, FaAward} from "react-icons/fa";
import {Book} from "./BookTable.tsx";
import {useLogout} from "../utils/Logout.ts";
import {BASE_URL} from "../utils/Constants.ts";

const PopularBooks: React.FC = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const toggleMenu = () => setMenuOpen(!menuOpen);
    const [books, setBooks] = useState<Book[]>([]);
    const logout = useLogout();

    useEffect(() => {
        fetchBooks()
    }, [])

    const fetchBooks = () => {
        fetch(`${BASE_URL}/books/popular`, {
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

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col">
            <header className="bg-blue-600 text-white py-4 flex justify-between items-center px-5">
                <div className="flex items-center">
                    <FaCrown className="text-white w-7 h-7 mr-2"/>
                    <h1 className="text-2xl font-medium text-left">図書館の人気書籍</h1>
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

            <div className="flex flex-grow items-center justify-center bg-gray-100">
                <div className="bg-white p-16 rounded-lg shadow-md w-1/2">
                    <ul className="space-y-8">
                        {books[0] && (
                            <li className="border-b pb-4 border-black">
                                <div className="flex items-center text-yellow-400 text-lg px-3">
                                    <FaCrown className="mr-4 w-8 h-8"/>
                                    <span className="text-2xl font-bold text-black">
                                    <span className="mr-3">1位</span>
                                        {books[0].title}
                                </span>
                                </div>
                            </li>
                        )}
                        {books[1] && (
                            <li className="border-b pb-4 border-black">
                                <div className="flex items-center text-slate-400 text-lg px-3">
                                    <FaCrown className="mr-4 w-8 h-8"/>
                                    <span className="text-2xl font-bold text-black">
                                    <span className="mr-3">2位</span>
                                        {books[1].title}
                                </span>
                                </div>
                            </li>
                        )}
                        {books[2] && (
                            <li className="border-b pb-4 border-black">
                                <div className="flex items-center text-yellow-700 text-lg px-3">
                                    <FaCrown className="mr-4 w-8 h-8"/>
                                    <span className="text-2xl font-bold text-black">
                                    <span className="mr-3">3位</span>
                                        {books[2].title}
                                </span>
                                </div>
                            </li>
                        )}
                        {books[3] && (
                            <li className="border-b pb-4 border-black">
                                <div className="flex items-center text-lg px-3">
                                    <FaAward className="text-blue-600 mr-4 w-8 h-8"/>
                                    <span className="text-2xl font-bold">
                                    <span className="mr-3">4位</span>
                                        {books[3].title}
                                </span>
                                </div>
                            </li>
                        )}
                        {books[4] && (
                            <li className="border-b pb-4 border-black">
                                <div className="flex items-center text-lg px-3">
                                    <FaAward className="text-blue-600 mr-4 w-8 h-8"/>
                                    <span className="text-2xl font-bold">
                                    <span className="mr-3">5位</span>
                                        {books[4].title}
                                </span>
                                </div>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default PopularBooks;
