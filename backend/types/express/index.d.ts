import express from "express"; // eslint-disable-line @typescript-eslint/no-unused-vars

declare module "express" {
    export interface Request {
        userId?: string;
        userRole?: "admin" | "user";
    }
}
