import { UserStatus } from "../../domain/entities/User.js"
import { UserStateMap } from "../../domain/maps/user-state.map.js"
import { UserState } from "../../domain/states/user/user.state.js"

export class UserStateFactory {

  static create(status: UserStatus): UserState {
    const StateClass = UserStateMap[status]

    if (!StateClass) {
      throw new Error(`Invalid UserStatus: ${status}`)
    }

    return new StateClass()
  }
}