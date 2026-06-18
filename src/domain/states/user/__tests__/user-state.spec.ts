import { describe, expect, it } from "vitest"
import { User, UserStatus } from "../../../entities/User.js"
import { PendingUserState } from "../pending-user.state.js"

describe("User + State integration", () => {

  it("should sync state name with entity", () => {

    const user = new User(
      {
        id: "1",
        name: "John",
        age: 20,
        email: "john@test.com",
        password: "123",
        phoneNumber: "999",
        preferredMarketingChannel: "email",
        status: UserStatus.PENDING
      },
      new PendingUserState()
    )

    expect(user.getStatus()).toBe("PENDING")
  })

})