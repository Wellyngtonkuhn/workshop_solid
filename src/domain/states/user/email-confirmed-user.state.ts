import { UserState } from "./user.state.js";
import { BlockedUserState } from "./blocked-user.state.js";
import { VerifiedUserState } from "./verified-user.state.js";

export class EmailConfirmedState implements UserState {

  register(): UserState {
    throw new Error("Já registrado")
  }

  activate(): UserState {
    return new VerifiedUserState()
  }

  block(): UserState {
    return new BlockedUserState()
  }

  canLogin(): boolean {
    return false
  }

  canUpdateProfile(): boolean {
    return true
  }

  canSendMessage(): boolean {
    return false
  }

  getName() {
    return "EMAIL_CONFIRMED"
  }
}