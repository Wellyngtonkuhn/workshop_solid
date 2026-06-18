import { EmailConfirmedState } from "./email-confirmed-user.state.js"
import { UserState } from "./user.state.js"

export class PendingUserState implements UserState {
  canLogin(): boolean {
    return false
  }

  canUpdateProfile(): boolean {
    return false
  }

  canSendMessage(): boolean {
    return false
  }

  register(): UserState {
    return new EmailConfirmedState()
  }

  activate(): UserState {
    throw new Error("Usuário ainda não confirmou email")
  }

  block(): UserState {
    throw new Error("Usuário já está pendente de confirmação")
  }

  getName(): string {
    return "PENDING"
  }
}