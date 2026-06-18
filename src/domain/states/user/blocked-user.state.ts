import { UserState } from "./user.state.js"

export class BlockedUserState implements UserState {
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
    throw new Error("Usuário bloqueado não pode ser registrado")
  }

  activate(): UserState {
    throw new Error("Usuário bloqueado não pode ser ativado")
  }

  block(): UserState {
    throw new Error("Usuário já está bloqueado")
  }

  getName(): string {
    return "BLOCKED"
  }
}