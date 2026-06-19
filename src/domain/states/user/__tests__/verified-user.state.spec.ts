import { describe, expect, it } from "vitest"
import { VerifiedUserState } from "../verified-user.state.js"
import { BlockedUserState } from "../blocked-user.state.js"

describe("VerifiedUserState", () => {

  const state = new VerifiedUserState()

  it("Permissions", () => {
    expect(state.canLogin()).toBe(true)
    expect(state.canUpdateProfile()).toBe(true)
    expect(state.canSendMessage()).toBe(true)
  })

  it("should NOT activate again", () => {
    expect(() => state.activate())
      .toThrow("Usuário já verificado")
  })

  it("should transition to BLOCKED", () => {
    expect(state.block()).toBeInstanceOf(BlockedUserState)
  })

})