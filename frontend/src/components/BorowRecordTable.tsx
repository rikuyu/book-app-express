import {useEffect, useState} from 'react';
import {IoMenu} from "react-icons/io5";
import {Link} from "react-router-dom";
import {MdHistory} from "react-icons/md";
import {BASE_URL} from "../utils/Constants.ts";

type BorrowRecord = {
    id: number;
    user_id: number;
    book_id: number;
    borrowed_date: string;
    returned_date: string | null;
};

const BorrowRecordTable = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const toggleMenu = () => setMenuOpen(!menuOpen);
    const [records, setRecords] = useState<BorrowRecord[]>([]);

    useEffect(() => {
        fetchRecords();
    }, []);

    const fetchRecords = () => {
        fetch(`${BASE_URL}/borrow_records`, {
            method: "GET",
            credentials: "include",
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }
                return res.json();
            })
            .then((data: BorrowRecord[]) => setRecords(data))
            .catch((error) => {
                console.error("Error fetching borrow records:", error);
            });
    };

    const formatDate = (dateString: string): string => {
        const date = new Date(dateString);
        const yyyy = date.getFullYear();
        const mm = String(date.getMonth() + 1).padStart(2, "0");
        const dd = String(date.getDate()).padStart(2, "0");
        const hh = String(date.getHours()).padStart(2, "0");
        const min = String(date.getMinutes()).padStart(2, "0");
        const ss = String(date.getSeconds()).padStart(2, "0");

        return `${yyyy}/${mm}/${dd}  ${hh}:${min}:${ss}`;
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <header className="bg-green-600 text-white py-4 flex justify-between items-center px-5">
                <div className="flex items-center">
                    <MdHistory className="text-white w-7 h-7 mr-2"/>
                    <h1 className="text-2xl font-medium">【管理者用】貸出記録一覧</h1>
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
                        <th className="border border-gray-300 px-2 py-3">user id</th>
                        <th className="border border-gray-300 px-2 py-3">book id</th>
                        <th className="border border-gray-300 px-4 py-3">貸出日</th>
                        <th className="border border-gray-300 px-4 py-3">返却日</th>
                    </tr>
                    </thead>
                    <tbody>
                    {records.map((record) => (
                        <tr key={record.id}>
                            <td className="border border-gray-300 px-2 py-2 text-center">{record.id}</td>
                            <td className="border border-gray-300 px-4 py-2 text-center">{record.user_id}</td>
                            <td className="border border-gray-300 px-4 py-2 text-center">{record.book_id}</td>
                            <td className="border border-gray-300 px-4 py-2 text-center">{formatDate(record.borrowed_date)}</td>
                            <td className="border border-gray-300 px-4 py-2 text-center">
                                {record.returned_date ? (
                                    <span className="text-black">{formatDate(record.returned_date)}</span>
                                ) : (
                                    <span className="text-black">貸出中</span>
                                )}
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default BorrowRecordTable;
