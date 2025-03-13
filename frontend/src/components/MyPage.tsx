import React, {useEffect, useState} from 'react';
import {MdAccountCircle} from 'react-icons/md';
import {IoMenu} from 'react-icons/io5';
import {Link} from 'react-router-dom';
import {useLogout} from "../utils/Logout.ts";
import {IoMdSettings} from "react-icons/io";
import {BASE_URL} from "../utils/Constants.ts";

function MyPage() {
    const [menuOpen, setMenuOpen] = useState(false);
    const toggleMenu = () => setMenuOpen(!menuOpen);
    const [adminMenuOpen, setAdminMenuOpen] = useState(false);
    const toggleAdminMenu = () => setAdminMenuOpen(!adminMenuOpen);
    const logout = useLogout();
    const [userData, setUserData] = useState({
        id: '',
        name: '',
        email: '',
        isAdmin: false,
    });
    const [profileImage, setProfileImage] = useState<string | null>(null);

    useEffect(() => {
        fetchMe()
    }, []);

    const fetchMe = () => {
        fetch(`${BASE_URL}/users/me`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: "include",
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Failed to fetch user data');
                }
                return response.json();
            })
            .then((data) => {
                setUserData({
                    id: data.id,
                    name: data.name,
                    email: data.email,
                    isAdmin: data.isAdmin,
                });
            })
            .catch((error) => {
                console.error('Error fetching user data:', error);
            });
    }

    const selectImage = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setProfileImage(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const uploadImage = (file: File) => {
        const formData = new FormData();
        formData.append('file', file);

        fetch('http://localhost:8080/users/image', {
            method: 'POST',
            body: formData,
            credentials: 'include',
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`Failed to upload image. Status: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                console.log('Image uploaded successfully:', data);
                alert('プロフィール画像を更新しました。');
            })
            .catch((error) => {
                console.error('Error uploading image:', error);
                alert('画像のアップロードに失敗しました。');
            });
    };


    return (
        <div className="min-h-screen bg-gray-100 flex flex-col">
            <header className="bg-blue-600 text-white py-4 flex justify-between items-center px-5">
                <div className="flex items-center relative">
                    <div className="flex items-center">
                        <MdAccountCircle className="text-white w-7 h-7 mr-2" />
                        <h1 className="text-2xl font-medium text-left">マイページ</h1>
                    </div>
                    {userData.isAdmin && (
                        <>
                            <button
                                onClick={toggleAdminMenu}
                                className="p-2 rounded-full focus:outline-none"
                            >
                                <IoMdSettings className="text-white mx-3 w-7 h-7" />
                            </button>
                            {adminMenuOpen && (
                                <div className="absolute top-full right-[-220px] mt-1 w-68 bg-white rounded shadow-lg z-10">
                                    <ul className="text-gray-800">
                                        <Link to="/admin/borrow_records">
                                            <li className="hover:bg-gray-100 px-5 py-4 cursor-pointer">【管理者用】すべての貸出記録</li>
                                        </Link>
                                        <Link to="/admin/users">
                                            <li className="hover:bg-gray-100 px-5 py-4 cursor-pointer">【管理者用】すべてのユーザー</li>
                                        </Link>
                                        <Link to="/admin/add_book">
                                            <li className="hover:bg-gray-100 px-5 py-4 cursor-pointer">【管理者用】書籍の追加</li>
                                        </Link>
                                    </ul>
                                </div>
                            )}
                        </>
                    )}
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
                                <li className="hover:bg-gray-100 px-5 py-4 cursor-pointer" onClick={logout}>
                                    ログアウト
                                </li>
                            </ul>
                        </div>
                    )}
                </div>
            </header>

            <main className="flex-grow flex items-center justify-center">
                <div className="bg-white p-10 rounded-lg shadow-md max-w-lg w-full">
                    <div className="flex items-center mb-7">
                        <h2 className="text-xl font-bold">ユーザー情報</h2>
                        {userData.isAdmin && (
                            <span className="ml-4 bg-red-500 text-white text-sm font-semibold py-1 px-2 rounded-md">
                              管理者
                            </span>
                        )}
                    </div>
                    <div className="mb-10 text-center">
                        <div
                            className="w-40 h-40 mx-auto rounded-full overflow-hidden bg-gray-200 border border-gray-300">
                            {profileImage ? (
                                <img src={profileImage} alt="Profile" className="w-full h-full object-cover"/>
                            ) : (
                                <span className="text-gray-500 flex items-center justify-center h-full">画像なし</span>
                            )}
                        </div>
                        <label htmlFor="file-upload"
                               className="mt-6 inline-block bg-blue-600 text-white font-medium py-1.5 px-3 rounded-lg cursor-pointer hover:bg-blue-700 mr-3">
                            画像を選択
                        </label>
                        <input id="file-upload" type="file" onChange={selectImage} className="hidden"/>
                        <button
                            className={`py-1.5 px-3 rounded-lg font-medium mt-4 ${
                                profileImage ? 'bg-blue-600 text-white hover:bg-blue-700 cursor-pointer' : 'bg-gray-300 text-gray-800 cursor-not-allowed'
                            }`}
                            disabled={!profileImage}
                            onClick={() => {
                                const inputElement = document.getElementById('file-upload') as HTMLInputElement;
                                if (inputElement.files?.[0]) {
                                    uploadImage(inputElement.files[0]);
                                }
                            }}
                        >
                            送信
                        </button>
                    </div>
                    <div className="mb-8 border-b pb-1 border-black">
                        <span className="font-medium text-gray-700 text-xl">id:</span>
                        <span className="ml-2 text-xl">{userData.id}</span>
                    </div>
                    <div className="mb-8 border-b pb-1 border-black">
                        <span className="font-medium text-gray-700 text-xl">ユーザー名:</span>
                        <span className="ml-2 text-xl">{userData.name}</span>
                    </div>
                    <div className="mb-3 border-b pb-1 border-black">
                        <span className="font-medium text-gray-700 text-xl">メールアドレス:</span>
                        <span className="ml-2 text-xl">{userData.email}</span>
                    </div>
                </div>
            </main>
        </div>

    );
}

export default MyPage;
