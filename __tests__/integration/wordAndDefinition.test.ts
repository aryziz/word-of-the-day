import request from "supertest";
import express, { Application } from 'express';
import dotenv from "dotenv";
import { wordAndDefinitionApi } from "../../src/controllers/api-handlers";

dotenv.config();

const app: Application = express();

app.get("/api/test/random-word-definition", wordAndDefinitionApi);

describe("GET /api/test/random-word-definition", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("Should return a random word and its definition", async () => {
        const response = await request(app).get("/api/test/random-word-definition");

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("definitionResponse");
        expect(response.body).toHaveProperty("definitionResponse.word");
        expect(response.body).toHaveProperty("definitionResponse.definition");
    });
});