import { BlockedUserState } from "./blocked-user.state.js"
import { UserState } from "./user.state.js"
import { VerifiedUserState } from "./verified-user.state.js"

export class RegisteredUserState implements UserState {
  canLogin(): boolean {
    return true
  }
  canUpdateProfile(): boolean {
    return false
  }
  canSendMessage(): boolean {
    return false
  }
  register(): UserState {
    throw new Error("Usuário já está registrado")
  }

  activate(): UserState {
    return new VerifiedUserState()
  }

  block(): UserState {
    return new BlockedUserState()
  }

  getName(): string {
    return "REGISTERED"
  }
}