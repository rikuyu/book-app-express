import {useNavigate} from 'react-router-dom';
import {BASE_URL} from "./Constants.ts";

export const useLogout = () => {
    const navigate = useNavigate();

    return () => {
        fetch(`${BASE_URL}/logout`, {
            method: 'POST',
            credentials: 'include',
        })
            .then((response) => {
                if (response.ok) {
                    navigate('/login');
                } else {
                    alert('ログアウトに失敗しました。');
                }
            })
            .catch((error) => {
                alert('ネットワークエラーが発生しました。');
                console.error('Logout error:', error);
            });
    };
};

