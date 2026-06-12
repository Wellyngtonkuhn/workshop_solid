import { UserRepository } from "../../domain/repositories/user-repository.js";
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
  // aqui é invertido a dependencia usando o D do SOLID, esse módulo de alto nível depende apenas da abstração do módulo de baixo nível
  constructor(private userRepository: UserRepository){}

  async execute(body: InputDTO): Promise<OutputDTO>{
    if (body.password !== body.passwordConfirmation) {
     throw new PasswordDoNotMatchError()
    }

    const existingUser = await this.userRepository.findByEmail(body.email)

    if (existingUser) {
      throw new UserCreationError()
    }

    const userCreated = await this.userRepository.createUser({
      name: body.name,
      age: body.age,
      email: body.email,
      password: await bcrypt.hash(body.password, 10),
      phoneNumber: body.phoneNumber,
      proferredMarketingChannel: body.preferredMarketingChannel,
    })

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