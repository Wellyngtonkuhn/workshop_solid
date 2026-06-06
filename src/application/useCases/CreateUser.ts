import { eq } from "drizzle-orm";
import { db } from "../../resources/db/client.js";
import { usersTable } from "../../resources/db/schema.js";
import { PasswordDoNotMatchError, UserCreationError } from "../errors/index.js";
import bcrypt from "bcrypt"

interface InputDTO  {
  name: string;
  age: number;
  phoneNumber: string;
  email: string;
  password: string;
  passwordConfirmation: string;
  preferredMarketingChannel: string;
}

interface OutputDTO {
  id: string;
  name: string;
  age: number;
  phoneNumber: string;
  email: string;
  preferredMarketingChannel: string;
}

export class CreateUser {
  async execute(body: InputDTO): Promise<OutputDTO>{

    if (body.password !== body.passwordConfirmation) {
     throw new PasswordDoNotMatchError()
    }

    const [existingUser] = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, body.email));

    if (existingUser) {
      throw new UserCreationError()
    }

    const [userCreated] = await db
      .insert(usersTable)
      .values({
        name: body.name,
        age: body.age,
        email: body.email,
        password: await bcrypt.hash(body.password, 10),
        phoneNumber: body.phoneNumber,
        proferredMarketingChannel: body.preferredMarketingChannel,
      })
      .returning();

    if (!userCreated) {
      throw new UserCreationError()
    }

    return {
      id: userCreated.id,
      name: userCreated.name,
      age: userCreated.age,
      email: userCreated.email,
      phoneNumber: userCreated.phoneNumber,
      preferredMarketingChannel: userCreated.proferredMarketingChannel
    }
  }
}