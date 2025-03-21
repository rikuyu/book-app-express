import { describe, it, expect } from "vitest";
import request from "supertest";
import { app } from "../../../app";

describe("GET /ping", () => {
    it("should return status 200 and ok message", async () => {
        const response = await request(app).get("/ping");

        expect(response.status).toBe(200);
        expect(response.text).toBe("ok\n");
    });
});
