import mongoose from "mongoose";
import User from "../domain/model/user";
import Book from "../domain/model/book";
import BorrowRecord from "../domain/model/borrowRecord";

import dotenv from "dotenv";

const seed = async () => {
    dotenv.config();
    await mongoose.connect(process.env.DB_URL as string);

    await User.deleteMany({});
    await User.create(users);

    await Book.deleteMany({});
    await Book.create(books);

    await BorrowRecord.deleteMany({});
    await BorrowRecord.create(borrowRecords);

    await mongoose.disconnect();
    console.log("🌱 Seed data inserted successfully");
};

seed().catch(console.error);

const createId = (suffix: string): mongoose.Types.ObjectId => {
    const padded = suffix.padStart(24, "0").slice(-24);
    return new mongoose.Types.ObjectId(padded);
};

const users = [
    {
        _id: createId("1"),
        name: "Alice Johnson",
        email: "alice@example.com",
        password: "test",
    },
    {
        _id: createId("2"),
        name: "Bob Smith",
        email: "bobsmith@example.com",
        password: "test"
    },
    {
        _id: createId("3"),
        name: "綾瀬あみ",
        email: "ayase@example.com",
        password: "test",
    },
    {
        _id: createId("4"),
        name: "David Miller",
        email: "david@example.com",
        password: "test",
    },
    {
        _id: createId("5"),
        name: "高倉健",
        email: "takakura@example.com",
        password: "test",
    },
    {
        _id: createId("6"),
        name: "Frank Wilson",
        email: "frank@example.com",
        password: "test",
    },
    {
        _id: createId("7"),
        name: "Grace Taylor",
        email: "grace@example.com",
        password: "test",
    },
    {
        _id: createId("8"),
        name: "山田 太郎",
        email: "taro.yamada@example.com",
        password: "test",
    },
    {
        _id: createId("9"),
        name: "佐藤 花子",
        email: "hanako.sato@example.com",
        password: "test",
    },
    {
        _id: createId("10"),
        name: "高橋 光",
        email: "hikari.takahashi@example.com",
        password: "test",
    },
];

const books = [
    { _id: createId("1"), title: "吾輩は猫である", status: "available" },
    { _id: createId("2"), title: "インターネットの基礎知識", status: "available" },
    { _id: createId("3"), title: "雪国の記憶", status: "borrowed" },
    { _id: createId("4"), title: "ノルウェイの森", status: "borrowed" },
    { _id: createId("5"), title: "そして誰もいなくなった", status: "available" },
    { _id: createId("6"), title: "JavaScript入門", status: "available" },
    { _id: createId("7"), title: "風の歌を聴け", status: "available" },
    { _id: createId("8"), title: "森田博士の愛した数式", status: "available" },
    { _id: createId("9"), title: "Java & Spring Boot の徹底解説", status: "available" },
    { _id: createId("10"), title: "インターネットの歴史", status: "borrowed" },
];

const borrowRecords = [
    {
        user_id: createId("1"),
        book_id: createId("1"),
        borrowed_date: new Date("2025-03-01T10:00:00.000+00:00"),
        returned_date: new Date("2025-03-11T10:00:00.000+00:00"),
    },
    {
        user_id: createId("2"),
        book_id: createId("2"),
        borrowed_date: new Date("2025-03-02T11:30:00.000+00:00"),
        returned_date: new Date("2025-03-05T09:00:00.000+00:00"),
    },
    {
        user_id: createId("3"),
        book_id: createId("3"),
        borrowed_date: new Date("2025-03-03T14:45:00.000+00:00"),
        returned_date: new Date("2025-03-13T14:45:00.000+00:00"),
    },
    {
        user_id: createId("4"),
        book_id: createId("4"),
        borrowed_date: new Date("2025-03-04T13:00:00.000+00:00"),
        returned_date: new Date("2025-03-07T08:20:00.000+00:00"),
    },
    {
        user_id: createId("5"),
        book_id: createId("5"),
        borrowed_date: new Date("2025-02-05T16:15:00.000+00:00"),
        returned_date: new Date("2025-03-05T16:15:00.000+00:00"),
    },
    {
        user_id: createId("6"),
        book_id: createId("6"),
        borrowed_date: new Date("2025-03-06T10:30:00.000+00:00"),
        returned_date: new Date("2025-03-10T12:00:00.000+00:00"),
    },
    {
        user_id: createId("7"),
        book_id: createId("7"),
        borrowed_date: new Date("2025-01-07T09:45:00.000+00:00"),
        returned_date: new Date("2025-03-07T09:45:00.000+00:00"),
    },
    {
        user_id: createId("8"),
        book_id: createId("8"),
        borrowed_date: new Date("2025-02-08T15:00:00.000+00:00"),
        returned_date: new Date("2025-03-08T15:00:00.000+00:00"),
    },
    {
        user_id: createId("9"),
        book_id: createId("9"),
        borrowed_date: new Date("2025-03-09T13:30:00.000+00:00"),
        returned_date: new Date("2025-03-11T10:00:00.000+00:00"),
    },
    {
        user_id: createId("10"),
        book_id: createId("10"),
        borrowed_date: new Date("2025-02-10T11:15:00.000+00:00"),
        returned_date: null,
    },
    {
        user_id: createId("6"),
        book_id: createId("1"),
        borrowed_date: new Date("2025-03-16T11:20:00.000+00:00"),
        returned_date: new Date("2025-03-17T14:00:00.000+00:00"),
    },
    {
        user_id: createId("7"),
        book_id: createId("2"),
        borrowed_date: new Date("2025-02-17T10:00:00.000+00:00"),
        returned_date: new Date("2025-03-17T10:00:00.000+00:00"),
    },
    {
        user_id: createId("8"),
        book_id: createId("3"),
        borrowed_date: new Date("2025-03-18T13:45:00.000+00:00"),
        returned_date: null,
    },
    {
        user_id: createId("9"),
        book_id: createId("4"),
        borrowed_date: new Date("2025-03-18T15:13:56.052+00:00"),
        returned_date: null,
    },
];
