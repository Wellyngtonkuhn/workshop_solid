import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import Fastify, { FastifyError, FastifyReply, FastifyRequest } from "fastify";
import {
  hasZodFastifySchemaValidationErrors,
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
  ZodTypeProvider,
} from "fastify-type-provider-zod";
import { z } from "zod";
import { EmailAlreadyExistsError, InvalidMarketingPreferredChannelError, PasswordDoNotMatchError } from "../application/errors/index.js";
import { CreateUser } from "../application/useCases/CreateUser.js";
import { DrizzelUserRepository } from "../resources/repositories/drizzle/UserRepository.js";

export const buildApp = () => {
  const app = Fastify();

  app.setErrorHandler((error: FastifyError, request: FastifyRequest, reply: FastifyReply) => {
    if (hasZodFastifySchemaValidationErrors(error)) {
      return reply.status(400).send({
        error: "Validation Error",
        details: error.validation,
      });
    }

    return reply.status(error.statusCode ?? 500).send({
      error: error.message,
    });
    }
  );

  app.setValidatorCompiler(validatorCompiler);
  app.setSerializerCompiler(serializerCompiler);

  app.register(fastifySwagger, {
    openapi: {
      info: {
        title: "Workshop Solid",
        description: "Teste",
        version: "1.0.0",
      },
      servers: [],
    },
    transform: jsonSchemaTransform,
  });

  app.register(fastifySwaggerUi, {
    routePrefix: "docs",
  });

  app.after(() => {
    app.withTypeProvider<ZodTypeProvider>().route({
      method: "POST",
      url: "/users",
      schema: {
        body: z.object({
          name: z.string().trim().min(1),
          age: z.number().int().min(18).max(100),
          phoneNumber: z.string().startsWith("+55", { message: 'O número precisa começar com +55' }).trim().min(1),
          email: z.email(),
          password: z.string().min(8),
          passwordConfirmation: z.string().min(8),
          preferredMarketingChannel: z.enum(["email", "sms", "push", "whatsapp"]),
        }),
        response: {
          201: z.object({
            id: z.uuid(),
          }),
          400: z.object({
            error: z.string(),
          }),
          409: z.object({
            error: z.string(),
          }),
          500: z.object({
            error: z.string(),
          }),
        },
      },
      handler: async (request, reply) => {
        try {
          const createUser = new CreateUser(new DrizzelUserRepository)
          const output = await createUser.execute(request.body)
          return reply.status(201).send(output)
        } catch (error) {
          if (error instanceof PasswordDoNotMatchError) {
            return reply.status(400).send({ error: "Passwords do not match" });
          }
          if (error instanceof EmailAlreadyExistsError) {
            return reply.status(409).send({ error: "E-mail já cadastrado" });
          }
          if (error instanceof InvalidMarketingPreferredChannelError) {
            return reply
              .status(400)
              .send({ error: "Invalid marketing preferred channel" });
          }
          return reply.status(500).send({ error: "Erro ao criar usuário" });
        }
      },
    });
  });

  return app;
};
