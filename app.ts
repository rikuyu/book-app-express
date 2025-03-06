import express from "express";
import {Request, Response} from "express";
import {connectToDatabase} from "./infra/database/db";

const app = express();
const port = 8080;

app.get("/ping", (_: Request, res: Response) => {
    res.send("ok\n");
});

async function start() {
    try {
        await connectToDatabase();
        app.listen(port, () => console.log(`✅ Server listening on port: 🚀${port}`));
    } catch (err) {
        console.log(`❌ error: ${err}`);
    }
}

start().catch(console.error);