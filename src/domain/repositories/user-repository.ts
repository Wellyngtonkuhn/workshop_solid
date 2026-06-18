// abstração (Os módulos de alto nível dependem desta abstração/interface) isso é o D do SOLID

import { UserEntity, UserStatus } from "../entities/User.js"

export interface CreateUserRepositoryInput {
  name: string
  age: number
  email: string
  password: string
  phoneNumber: string
  preferredMarketingChannel: string
  status: UserStatus
}

export interface UserRepository {
  findByEmail(email: string): Promise<UserEntity | null>
  createUser(body: CreateUserRepositoryInput): Promise<UserEntity>
}