import { FastifyInstance } from "fastify";
import { buildApp } from "./app.js";
import { beforeAll, afterAll, beforeEach, describe, it, expect } from "vitest";
import { db } from "../resources/database/drizzle/client.js";
import { usersTable } from "../resources/database/schema/user-table.js";
import request from 'supertest'

let app: FastifyInstance;

beforeAll(async () => {
  app = buildApp();
  await app.ready();
});

afterAll(async () => {
  await app.close();
});

beforeEach(async () => {
  await db.delete(usersTable);
});

const validBody = {
  name: "João Pedro",
  age: 45,
  phoneNumber: "+555483997874455",
  email: "joao.pedro@gmail.com",
  password: "123456789",
  passwordConfirmation: "123456789",
  preferredMarketingChannel: "email",
};

describe('POST /users', () => {
  it('it should return status 201 if user is created', async () => {
    const response = await request(app.server).post('/users').send(validBody)
    expect(response.status).toBe(201)
  })
})
