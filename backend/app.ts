import express from "express";
import cors from "cors";
import { Request, Response } from "express";
import { connectToDatabase } from "./infra/database/db";
import { authRouter } from "./presentation/routes/authRouter";
import { bookRouter } from "./presentation/routes/bookRouter";
import { userRouter } from "./presentation/routes/userRouter";
import { borrowRecordRouter } from "./presentation/routes/borrowRecordRouter";
import errorHandler from "./presentation/middleware/errorHandler";
import requestLogger from "./presentation/middleware/requestLogger";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import { verifyJwt } from "./presentation/middleware/verifyJwt";
import mongoSanitize from "express-mongo-sanitize";
import helmet from "helmet";
import { rateLimit } from "express-rate-limit";

export const app = express();
export const port = 8080;

app.get("/ping", (_: Request, res: Response) => {
    res.send("ok\n");
});

dotenv.config();

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 100,
    standardHeaders: true,
    legacyHeaders: false,
});
app.use(limiter);

app.use(helmet());

app.use(requestLogger);

const corsOption = {
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    exposedHeaders: ["Authorization"],
    maxAge: 60, // 1 minute
    preflightContinue: false,
    optionsSuccessStatus: 204,
};
app.use(cors(corsOption));

app.use(express.json());
app.use(cookieParser());

app.use(mongoSanitize());

app.use("/auth", authRouter);

app.use(verifyJwt);

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
