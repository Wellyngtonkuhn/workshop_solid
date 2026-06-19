import { EmailConfirmedState } from "../email-confirmed-user.state.js"
import { VerifiedUserState } from "../verified-user.state.js"
import { BlockedUserState } from "../blocked-user.state.js"
import { describe, expect, it } from "vitest"

describe("EmailConfirmedState", () => {

  const state = new EmailConfirmedState()

  it("Permissions", () => {
    expect(state.canLogin()).toBe(false)
    expect(state.canSendMessage()).toBe(false)
    expect(state.canUpdateProfile()).toBe(true)
  })

  it("should transition to VERIFIED", () => {
    expect(state.activate()).toBeInstanceOf(VerifiedUserState)
  })

  it("should transition to BLOCKED", () => {
    expect(state.block()).toBeInstanceOf(BlockedUserState)
  })

})