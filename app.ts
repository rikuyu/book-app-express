import express from "express";
import {Request, Response} from "express";

const app = express();
const port = 8080;

app.listen(port, () => console.log(`✅ Server listening on port: 🚀${port}`));

app.get("/ping", (_: Request, res: Response) => {
    res.send("ok\n");
});