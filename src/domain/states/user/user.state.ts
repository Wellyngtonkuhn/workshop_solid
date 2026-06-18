export interface UserState {
  register(): UserState;
  activate(): UserState;
  block(): UserState;

  canLogin(): boolean;
  canUpdateProfile(): boolean;
  canSendMessage(): boolean;

  getName(): string;
}