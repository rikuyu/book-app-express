import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import Login from "./components/Login.tsx";
import Register from "./components/Register.tsx";
import BookTable from "./components/BookTable.tsx";
import PopularBooks from "./components/PopularBooks.tsx";
import BookSearch from "./components/BookSearch.tsx";
import MyPage from "./components/MyPage.tsx";
import UserTable from "./components/UserTable.tsx";
import BorrowRecordTable from "./components/BorowRecordTable.tsx";
import AddBook from "./components/AddBook.tsx";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navigate to="/books" replace/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="/books" element={<BookTable />}/>
                <Route path="/popular" element={<PopularBooks/>}/>
                <Route path="/search" element={<BookSearch/>}/>
                <Route path="/mypage" element={<MyPage/>}/>
                <Route path="/admin/users" element={<UserTable/>}/>
                <Route path="/admin/borrow_records" element={<BorrowRecordTable/>}/>
                <Route path="/admin/add_book" element={<AddBook/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default App
