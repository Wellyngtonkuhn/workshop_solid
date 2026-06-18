import { UserState } from "./user.state.js";
import { BlockedUserState } from "./blocked-user.state.js";

export class VerifiedUserState implements UserState {

  register(): UserState {
    throw new Error("Usuário já verificado")
  }

  activate(): UserState {
    throw new Error("Usuário já verificado")
  }

  block(): UserState {
    return new BlockedUserState()
  }

  canLogin(): boolean {
    return true
  }

  canUpdateProfile(): boolean {
    return true
  }

  canSendMessage(): boolean {
    return true
  }

  getName() {
    return "VERIFIED"
  }
}