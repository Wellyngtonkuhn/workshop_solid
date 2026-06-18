import { describe, expect, it } from "vitest";
import { PendingUserState } from "../pending-user.state.js";
import { EmailConfirmedState } from "../email-confirmed-user.state.js";

describe('PendingUserState',() => {
  const state = new PendingUserState()

  it("Should NOT allow login", () => {
    expect(state.canLogin()).toBe(false)
  })

  it("Should NOT allow update profile", () => {
    expect(state.canUpdateProfile()).toBe(false)
  })

  it("Should NOT allow send message", () => {
    expect(state.canSendMessage()).toBe(false)
  })

  it("Should NOT activate directly", () => {
    expect(() => state.activate()).toThrow("Usuário ainda não confirmou email")
  })

  it("Should NOT block directly", () => {
    expect(() => state.block()).toThrow("Usuário já está pendente de confirmação")
  })

  it("Should transition to EMAIL_CONFIRMED", () => {
    expect(state.register()).toBeInstanceOf(EmailConfirmedState)
  })
})