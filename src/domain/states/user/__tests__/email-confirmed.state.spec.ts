import { EmailConfirmedState } from "../email-confirmed-user.state.js"
import { VerifiedUserState } from "../verified-user.state.js"
import { BlockedUserState } from "../blocked-user.state.js"
import { describe, expect, it } from "vitest"

describe("EmailConfirmedState", () => {

  const state = new EmailConfirmedState()

  it("should allow update profile", () => {
    expect(state.canUpdateProfile()).toBe(true)
  })

  it("should allow send message", () => {
    expect(state.canSendMessage()).toBe(false)
  })

  it("should NOT allow login yet", () => {
    expect(state.canLogin()).toBe(false)
  })

  it("should transition to VERIFIED", () => {
    expect(state.activate()).toBeInstanceOf(VerifiedUserState)
  })

  it("should transition to BLOCKED", () => {
    expect(state.block()).toBeInstanceOf(BlockedUserState)
  })

})