import { describe, expect, it } from "vitest"
import { BlockedUserState } from "../blocked-user.state.js"

describe("BlockedUserState", () => {

  const state = new BlockedUserState()

  it("should NOT allow anything", () => {
    expect(state.canLogin()).toBe(true)
    expect(state.canUpdateProfile()).toBe(false)
    expect(state.canSendMessage()).toBe(false)
  })

  it("should remain blocked", () => {
    expect(() => state.register()).toThrow("Usuário bloqueado não pode ser registrado")
  })

  it("should NOT activate", () => {
    expect(() => state.activate()).toThrow("Usuário bloqueado não pode ser ativado")
  })

  it("should NOT activate", () => {
    expect(() => state.block()).toThrow("Usuário já está bloqueado")
  })
})