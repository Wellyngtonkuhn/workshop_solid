import { UserStatus } from "../entities/User.js";
import { BlockedUserState } from "../states/user/blocked-user.state.js";
import { EmailConfirmedState } from "../states/user/email-confirmed-user.state.js";
import { PendingUserState } from "../states/user/pending-user.state.js";
import { UserState } from "../states/user/user.state.js";
import { VerifiedUserState } from "../states/user/verified-user.state.js";

type EnsureAllStatusesHandled = {
  [K in UserStatus]: new () => UserState
}

export const UserStateMap: EnsureAllStatusesHandled = {
  [UserStatus.PENDING]: PendingUserState,
  [UserStatus.EMAIL_CONFIRMED]: EmailConfirmedState,
  [UserStatus.VERIFIED]: VerifiedUserState,
  [UserStatus.BLOCKED]: BlockedUserState,
}