import {useEffect, useRef, useState} from "react";
import {IoMenu} from "react-icons/io5";
import {FaKey} from "react-icons/fa";
import {Link, useLocation} from "react-router-dom";
import {useLogout} from "../utils/Logout.ts";
import {BASE_URL} from "../utils/Constants.ts";

function ResetPassword() {
    const [menuOpen, setMenuOpen] = useState(false);
    const toggleMenu = () => setMenuOpen(!menuOpen);
    const logout = useLogout();

    const [token, setToken] = useState("");
    const [newPassword, setNewPassword] = useState("");

    const location = useLocation();
    const email = location.state?.email || "";

    const hasRequested = useRef(false);

    useEffect(() => {
        if (email && !hasRequested.current) {
            forgotPassword(email);
            hasRequested.current = true;
        }
    }, [email]);

    const forgotPassword = (email: string) => {
        fetch(`${BASE_URL}/auth/reset_password`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({email}),
        })
            .catch((error) => console.error("Error Reset Token:", error));
    };

    const resetPassword = () => {
        fetch(`${BASE_URL}/auth/reset_password/${token}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({newPassword}),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to fetch user data");
                }
                if (window.confirm("パスワードの再設定を行いました。\nログイン画面に移動します。")) {
                    logout();
                }
            })
            .catch((error) => console.error("Error Reset Token:", error));
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col">
            <header className="bg-blue-600 text-white py-4 flex justify-between items-center px-5">
                <div className="flex items-center relative">
                    <div className="flex items-center">
                        <FaKey className="text-white w-6 h-6 mr-3"/>
                        <h1 className="text-2xl font-medium text-left">パスワード変更</h1>
                    </div>
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
                                <Link to="/search">
                                    <li className="hover:bg-gray-100 px-5 py-4 cursor-pointer">書籍の検索</li>
                                </Link>
                                <Link to="/mypage">
                                    <li className="hover:bg-gray-100 px-5 py-4 cursor-pointer">マイページ</li>
                                </Link>
                                <li className="hover:bg-gray-100 px-5 py-4 cursor-pointer" onClick={logout}>
                                    ログアウト
                                </li>
                            </ul>
                        </div>
                    )}
                </div>
            </header>

            <main className="flex flex-col items-center justify-center flex-grow">
                <div className="bg-white p-10 rounded shadow-md w-110">
                    <h1 className="mb-6">メールに記載されたトークンと新しいパスワードを入力してください。</h1>
                    <div className="mb-2">
                        <input
                            type="text"
                            placeholder="トークン"
                            value={token}
                            onChange={(e) => setToken(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 ring-blue-200 mb-3"
                        />
                    </div>
                    <div className="mb-5">
                        <input
                            type="text"
                            placeholder="新しいパスワード"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 ring-blue-200 mb-4"
                        />
                    </div>
                    <button
                        className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-500 transition"
                        onClick={resetPassword}
                    >
                        送信
                    </button>
                </div>
            </main>
        </div>
    );
}

export default ResetPassword;
