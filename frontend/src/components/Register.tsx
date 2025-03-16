import {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {BASE_URL} from "../utils/Constants.ts";

function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleRegister = () => {
        if (!name || !email || !password) {
            alert('ユーザーネーム、メールアドレス、パスワードを入力してください。');
            return;
        }

        fetch(`${BASE_URL}/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({name: name, email, password}),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Registration failed');
                }
                console.log('Registration Successful');
                alert('登録に成功しました。ログインページに移動します。');
                navigate('/login');
            })
            .catch((error) => {
                console.error('Error:', error);
                alert('登録に失敗しました。');
            });
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <div
                className="flex flex-col items-center space-y-6 p-8 bg-white shadow-xl rounded-lg w-100 border border-gray-200">
                <h1 className="text-2xl font-bold">Register Page</h1>
                <input
                    type="text"
                    placeholder="ユーザーネーム"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-80 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ring-blue-300"
                />
                <input
                    type="email"
                    placeholder="メールアドレス"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-80 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ring-blue-300"
                />
                <input
                    type="password"
                    placeholder="パスワード"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-80 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ring-blue-300"
                />
                <button
                    className="w-80 px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-500 transition"
                    onClick={handleRegister}
                >
                    新規登録
                </button>
                <Link to="/login">
                    <button
                        className="w-80 px-4 py-2 border border-gray-400 text-gray-700 rounded-lg hover:bg-gray-100 transition">
                        ログインへ戻る
                    </button>
                </Link>
            </div>
        </div>
    );
}

export default Register;
