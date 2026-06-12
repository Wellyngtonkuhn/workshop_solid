import { eq } from "drizzle-orm";
import { UserRepository } from "../../../domain/repositories/user-repository.js";
import { db } from "../../database/drizzle/client.js";
import { usersTable } from "../../database/schema/user-table.js";

export class DrizzelUserRepository implements UserRepository {
  async findByEmail(email: string): Promise<any> {
    const [existingUser] = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, email));
    return existingUser;
  }

  async createUser(body: any): Promise<any> {
    const [userCreated] = await db
      .insert(usersTable)
      .values({
        name: body.name,
        age: body.age,
        email: body.email,
        password: body.password,
        phoneNumber: body.phoneNumber,
        proferredMarketingChannel: body.preferredMarketingChannel,
      })
      .returning();

    return userCreated;
  }
}
