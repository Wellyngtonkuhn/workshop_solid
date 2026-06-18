import { UserRepository } from "../../../domain/repositories/user-repository.js";
import { PasswordDoNotMatchError, UserCreationError } from "../../errors/index.js";
import bcrypt from "bcrypt"
import { NotificationService } from "../../services/Notification.service.js";
import { CreateUserInputDTO } from "./create-user-input.js";
import { CreateUserOutputDTO } from "./create-user-output.js";
import { NotificationChannel } from "../../ports/notification-provider.js";
import { User, UserStatus } from "../../../domain/entities/User.js";
import { PendingUserState } from "../../../domain/states/user/pending-user.state.js";

export class CreateUser {
  // aqui é invertido a dependencia usando o D do SOLID, esse módulo de alto nível depende apenas da abstração do módulo de baixo nível
  constructor(
    private userRepository: UserRepository,
    private notificationService: NotificationService
  ){}

  async execute(body: CreateUserInputDTO): Promise<CreateUserOutputDTO>{
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
      preferredMarketingChannel: body.preferredMarketingChannel,
      status: UserStatus.PENDING
    })

    if (!userCreated) {
      throw new UserCreationError()
    }
    
    await this.notificationService.send(userCreated.preferredMarketingChannel as NotificationChannel, 'payload teste')

    return {
      id: userCreated.id,
      name: userCreated.name,
      age: userCreated.age,
      email: userCreated.email,
      phoneNumber: userCreated.phoneNumber,
      preferredMarketingChannel: userCreated.preferredMarketingChannel
    }
  }
}