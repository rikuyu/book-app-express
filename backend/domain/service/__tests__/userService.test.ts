import { describe, expect, it, vi } from "vitest";
import * as service from "../userService";
import User, { IUser } from "../../model/user";
import { NotFoundError } from "../../../shared/error/notFoundError";
import { InternalServerError } from "../../../shared/error/internalServerError";

describe("userService Test", () => {
    const mockUser1: Partial<IUser> = { name: "user1", email: "user1@test.com" };
    const mockUser2: Partial<IUser> = { name: "user2", email: "user2@test.com" };
    const mockUsers: Partial<IUser>[] = [mockUser1, mockUser2];

    describe("getUserById", () => {
        it("success", async () => {
            const execMock = vi.fn().mockResolvedValue(mockUser1);
            const findByIdMock = vi.fn().mockReturnValue({ exec: execMock });

            vi.spyOn(User, "findById").mockImplementation(findByIdMock);

            const actualUser = await service.getUserById("id");

            expect(actualUser.name).toEqual(mockUser1.name);
            expect(actualUser.email).toEqual(mockUser1.email);
        });

        it("fail with NotFoundError", async () => {
            const execMock = vi.fn().mockResolvedValue(null);
            const findByIdMock = vi.fn().mockReturnValue({ exec: execMock });

            vi.spyOn(User, "findById").mockImplementation(findByIdMock);

            await expect(service.getUserById("id")).rejects.toThrow(NotFoundError);
        });
    });

    describe("getUsers", () => {
        it("success", async () => {
            vi.spyOn(User, "find").mockResolvedValue(mockUsers);

            const actualUsers = await service.getUsers();

            expect(actualUsers.length).toEqual(2);
            expect(actualUsers[0].name).toEqual(mockUser1.name);
            expect(actualUsers[0].email).toEqual(mockUser1.email);
        });

        it("fail with InternalServerError", async () => {
            const err = new InternalServerError("something went wrong");
            vi.spyOn(User, "find").mockRejectedValue(err);

            await expect(service.getUsers()).rejects.toThrow(InternalServerError);
        });
    });

    describe("getUserByEmail", () => {
        it("success", async () => {
            vi.spyOn(User, "findOne").mockResolvedValue(mockUser1);

            const actualUser = await service.getUserByEmail("user1@test.com");

            expect(actualUser.name).toEqual(mockUser1.name);
            expect(actualUser.email).toEqual(mockUser1.email);
        });

        it("fail with NotFoundError", async () => {
            vi.spyOn(User, "findOne").mockResolvedValue(null);
            await expect(service.getUserByEmail("invalid email")).rejects.toThrow(
                NotFoundError
            );
        });
    });

    describe("deleteUser", () => {
        it("success", async () => {
            const execMock = vi.fn().mockResolvedValue(mockUser1);
            const findOneAndDeleteMock = vi.fn().mockReturnValue({ exec: execMock });

            vi.spyOn(User, "findOneAndDelete").mockImplementation(findOneAndDeleteMock);

            const actualUser = await service.deleteUser("id");

            expect(actualUser.name).toEqual(mockUser1.name);
            expect(actualUser.email).toEqual(mockUser1.email);
        });

        it("fail with NotFoundError", async () => {
            const execMock = vi.fn().mockResolvedValue(null);
            const findOneAndDeleteMock = vi.fn().mockReturnValue({ exec: execMock });

            vi.spyOn(User, "findOneAndDelete").mockImplementation(findOneAndDeleteMock);
            await expect(service.deleteUser("invalid id")).rejects.toThrow(NotFoundError);
        });
    });
});
