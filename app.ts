import express from "express";
import {Request, Response} from "express";
import {connectToDatabase} from "./infra/database/db";
import {bookRouter} from "./presentation/routes/bookRouter";
import {userRouter} from "./presentation/routes/userRouter";
import {borrowRecordRouter} from "./presentation/routes/borrowRecordRouter";
import errorHandler from "./presentation/middleware/errorHandler";
import requestLogger from "./presentation/middleware/requestLogger";

export const app = express();
const port = 8080;

app.use(requestLogger);
app.use(express.json());

app.use("/books", bookRouter);
app.use("/users", userRouter);
app.use("/borrow_records", borrowRecordRouter);

app.use(errorHandler);

async function start() {
    try {
        await connectToDatabase();
        app.listen(port, () => console.log(`✅  Server listening on port: 🚀 ${port}`));
    } catch (err) {
        console.log(`❌ error: ${err}`);
    }
}

start().catch(console.error);

app.get("/ping", (_: Request, res: Response) => {
    res.send("ok\n");
});
