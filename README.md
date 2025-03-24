# 📚 書籍管理アプリ
## 🍖 使用技術
| 💚 Backend        | 💙 Frontend    | 💛 その他        |
|-------------------|---------------|-----------------|
| NodeJS            | React         | Github Actions  |
| Express           | React Router  | ESLint          |
| TypeScript        | TypeScript    | Prettier        |
| MongoDB           | Tailwind CSS  | Vitest          |

## 🌈 データ関係

```
+-------------------+       +---------------------+       +-------------------+
|       Users       |       |    BorrowRecords    |       |       Books       |
+-------------------+       +---------------------+       +-------------------+
| _id: ObjectId     |<-┐    | _id: ObjectId       |  ┌--->| _id: ObjectId     |
| name: String      |  └----| user_id: ObjectId   |  |    | title: String     |
| email: String     |       | book_id: ObjectId   |--┘　  | status: Enum      |
| password: String  |       | borrowed_date: Date |       |  - available      |
| role: Enum        |       | returned_date: Date |       |  - borrowed       |
|  - admin          |       |                     |       |                   |
|  - user           |       |                     |       |                   |
+-------------------+       +---------------------+       +-------------------+
```

## 🏹 API
### 📘 書籍系
- `GET /books` ... 全ての本のリストを取得
- `GET /books/{id}` ... 特定の本の詳細を取得
- `POST /books` ... 新しい本を追加
- `DELETE /books/{id}` ... 特定の本を削除
- `GET /books/popular` ... 人気ランキング
- `GET /books/search?keyword="hoge"` ... 本の検索

### 🙎‍♂️ 会員系
- `GET /users` ... 全ての利用者のリストを取得
- `GET /users/{id}` ... 特定の利用者の詳細を取得
- `DELETE /users/{id}` ... 特定の利用者を削除
- `POST /users/image` ... プロフィール写真のアップロード  
- `GET /users/me` ... 認証済みの自分の情報取得

### 📜 貸出記録系
- `GET /borrow_records` ... 全ての貸出記録を取得
- `GET /borrow_records/books` ... 全ての貸出記録を本で取得
- `GET /borrow_records/users` ... 全ての貸出記録を利用者で取得
- `POST /borrow_records` ... 貸出記録を追加（本の貸し出し）
- `PUT /borrow_records/return` ... 貸出記録を更新（本の返却）

### 🔐 認証系
JWT認証を採用
- `POST /register` ... 新規登録
- `POST /login` ... ログイン
- `POST /logout` ... ログアウト
- `POST /reset_password` ... パスワードの再設定
- `PUT /reset_password/{token}` ... 新しいパスワードの設定

## 🥑 画面
### 🍉 新規登録
<img width="300" alt="register" src="https://github.com/user-attachments/assets/fbabd230-7f51-4875-b718-055bf47fa9a8" />

### 🚀 ログイン
<img width="300" alt="login" src="https://github.com/user-attachments/assets/ece48e40-2bd2-4349-8b90-a8e9d7885f48" />

### 🍤 マイページ
<img width="900" alt="マイページ" src="https://github.com/user-attachments/assets/85c6b1b4-751b-4e72-8657-89313fbe1356" />

### 🐝 パスワード再設定
<img width="1500" alt="パスワード再設定" src="https://github.com/user-attachments/assets/a50cd04e-7651-4b0b-a217-14c803bda342" />

### 🚗 書籍一覧
<img width="1500" alt="書籍一覧" src="https://github.com/user-attachments/assets/f906e610-5991-4281-be2b-b250ea0f4586" />

### 🦖 書籍の検索
<img width="1500" alt="書籍の検索" src="https://github.com/user-attachments/assets/f6e08bca-ae5a-48e2-98a7-7bd2ae2e7475" />

### 🐶 書籍の人気ランキング
<img width="1500" alt="人気ランキング" src="https://github.com/user-attachments/assets/e4919d5d-1ca3-4fad-9b40-c68d00061fdd" />

### 🍋 【管理者用】 書籍の追加
<img width="1500" alt="【管理者用】 書籍の追加" src="https://github.com/user-attachments/assets/aadbe529-8fab-497f-a795-78b6861a72dc" />

### 🐙 【管理者用】 会員一覧
<img width="1500" alt="【管理者用】 利用者一覧" src="https://github.com/user-attachments/assets/d3e71436-8e3b-4e51-98e9-8d5bbe96cd9d" />

### 🍙 【管理者用】 貸出記録一覧
<img width="1500" alt="【管理者用】 貸出記録一覧" src="https://github.com/user-attachments/assets/74415519-537b-43ac-bee7-bbadcb791ddb" />


