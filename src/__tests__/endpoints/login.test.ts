// login.test.ts
import { expect, describe, it, vi, beforeEach } from 'vitest';

const { API_ENDPOINT, X_POL_RFX_SECRET } = import.meta.env;

async function login({ email, password }: {email: string, password: string}) {
    const response = await fetch(`${API_ENDPOINT}/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "x-pol-rfx-secret": X_POL_RFX_SECRET
        },
        body: JSON.stringify({ email, password })
    });
    return response;
}

describe('Login endpoint', () => {
    beforeEach(() => {
        vi.resetAllMocks(); 
    });

    describe("Authentication attempts", () => {
        it("should succeed with correct credentials", async () => {
            vi.spyOn(global, 'fetch').mockResolvedValue({
                status: 200,
                json: async () => ({ message: "Login successful" })
            } as Response);

            const response = await login({ email: "correct-email@email.com", password: "correct-password" });
            expect(response.status).toBe(200);
            const responseBody = await response.json();
            expect(responseBody).toMatchObject({ message: "Login successful" });
        });

        it("should fail with incorrect credentials", async () => {
            vi.spyOn(global, 'fetch').mockResolvedValue({
                status: 400,
                json: async () => ({ message: "Login failed. Try again." })
            } as Response);

            const response = await login({ email: "wrong-email@email.com", password: "wrong-password" });
            expect(response.status).toBe(400);
            const responseBody = await response.json();
            expect(responseBody).toMatchObject({ message: "Login failed. Try again." });
        });
    });
});
