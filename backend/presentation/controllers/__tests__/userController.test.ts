import { describe, expect, it, vi } from "vitest";
import { NextFunction, Request, Response } from "express";
import { getUsers, getUserById, deleteUser } from "../userController";
import * as service from "../../../domain/service/userService";
import { IUser } from "../../../domain/model/user";

describe("userController Test", () => {
    describe("getUsers", () => {
        const jsonMock = vi.fn();
        const statusMock = vi.fn().mockReturnValue({ json: jsonMock });
        const res = { status: statusMock } as unknown as Response;

        it("success with 200 & users", async () => {
            const mockUsers: Partial<IUser>[] = [
                { name: "user1", email: "user1@example.com" },
                { name: "user2", email: "user2@example.com" },
            ];

            vi.spyOn(service, "getUsers").mockResolvedValue(mockUsers as IUser[]);

            await getUsers({} as Request, res, vi.fn());

            expect(statusMock).toHaveBeenCalledWith(200);
            expect(jsonMock).toHaveBeenCalledWith(mockUsers);
        });

        it("fail with error", async () => {
            const error = new Error("Internal Server Error");
            vi.spyOn(service, "getUsers").mockRejectedValue(error);

            const next = vi.fn() as NextFunction;
            await getUsers({} as Request, res, next);

            expect(next).toHaveBeenCalledWith(error);
        });
    });

    describe("getUserById", () => {
        const jsonMock = vi.fn();
        const statusMock = vi.fn().mockReturnValue({ json: jsonMock });

        const req = { params: { id: "1" } } as Request<{ id: string }>;
        const res = { status: statusMock } as unknown as Response;

        it("success with 200 & users", async () => {
            const mockUser: Partial<IUser> = {
                name: "user1",
                email: "user1@example.com",
            };

            vi.spyOn(service, "getUserById").mockResolvedValue(mockUser as IUser);

            await getUserById(req, res, vi.fn());

            expect(statusMock).toHaveBeenCalledWith(200);
            expect(jsonMock).toHaveBeenCalledWith(mockUser);
        });

        it("fail with error", async () => {
            const error = new Error("Internal Server Error");
            vi.spyOn(service, "getUserById").mockRejectedValue(error);

            const next = vi.fn() as NextFunction;
            await getUserById(req, res, next);

            expect(next).toHaveBeenCalledWith(error);
        });
    });

    describe("deleteUser", () => {
        const jsonMock = vi.fn();
        const statusMock = vi.fn().mockReturnValue({ json: jsonMock });

        const req = { params: { id: "1" } } as Request<{ id: string }>;
        const res = { status: statusMock } as unknown as Response;

        it("success with 200 & users", async () => {
            const mockUser: Partial<IUser> = {
                name: "user1",
                email: "user1@example.com",
            };

            vi.spyOn(service, "deleteUser").mockResolvedValue(mockUser as IUser);

            await deleteUser(req, res, vi.fn());

            expect(statusMock).toHaveBeenCalledWith(200);
            expect(jsonMock).toHaveBeenCalledWith(mockUser);
        });

        it("fail with error", async () => {
            const error = new Error("Internal Server Error");
            vi.spyOn(service, "deleteUser").mockRejectedValue(error);

            const next = vi.fn() as NextFunction;
            await deleteUser(req, res, next);

            expect(next).toHaveBeenCalledWith(error);
        });
    });
});
