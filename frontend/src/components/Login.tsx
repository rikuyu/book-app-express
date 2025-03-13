import {Link, useNavigate} from "react-router-dom";
import {useState} from "react";
import {BASE_URL} from "../utils/Constants.ts";

function Login() {
    const [id, setId] = useState("1");
    const [password, setPassword] = useState("pw");
    const navigate = useNavigate();

    const handleLogin = () => {
        if (!id || !password) {
            alert("ユーザーIDとパスワードを入力してください。");
            return;
        }

        fetch(`${BASE_URL}/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({id, password}),
            credentials: "include",
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Login failed");
                }
                console.log("Login Success");
                navigate("/books");
            })
            .catch((error) => {
                console.error(error);
                alert("ログイン失敗");
            });
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <div
                className="flex flex-col items-center space-y-6 p-8 bg-white shadow-xl rounded-lg w-100 border border-gray-200">
                <h1 className="text-2xl font-bold">Login Page</h1>
                <input
                    type="text"
                    placeholder="ユーザーID"
                    value={id}
                    onChange={(e) => setId(e.target.value)}
                    className="w-80 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ring-blue-200"
                />
                <input
                    type="password"
                    placeholder="パスワード"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-80 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ring-blue-200"
                />
                <button
                    className="w-80 px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-500 transition"
                    onClick={handleLogin}>
                    ログイン
                </button>
                <Link to="/register">
                    <button
                        className="w-80 px-4 py-2 border border-gray-400 text-gray-700 rounded-lg hover:bg-gray-100 transition">
                        新規登録
                    </button>
                </Link>
            </div>
        </div>
    );
}

export default Login;