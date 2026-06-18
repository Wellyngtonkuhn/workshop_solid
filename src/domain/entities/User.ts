import { PendingUserState } from "../states/user/pending-user.state.js";
import { UserState } from "../states/user/user.state.js";

export interface UserEntity {
  id: string;
  name: string;
  age: number;
  phoneNumber: string;
  email: string;
  password: string;
  preferredMarketingChannel: string;
  status: UserStatus
}

export enum UserStatus {
  PENDING = "PENDING",
  EMAIL_CONFIRMED = "EMAIL_CONFIRMED",
  VERIFIED = "VERIFIED",
  BLOCKED = "BLOCKED"
}

export class User {
  constructor(
    private props: UserEntity,
    private state: UserState
  ) {}

  static create(user: UserEntity){
    return new User(user, new PendingUserState())
  }

  // comportamento do domínio
  activate() {
    this.state = this.state.activate()
    this.syncStatus()
  }

  block() {
    this.state = this.state.block()
    this.syncStatus()
  }

  register() {
    this.state = this.state.register()
    this.syncStatus()
  }

  // exemplo de regra de domínio
  canLogin(): boolean {
    return this.state.canLogin()
  }

  canUpdateProfile(): boolean {
    return this.state.canUpdateProfile()
  }

  canSendMessage(): boolean {
    return this.state.canSendMessage()
  }

  getStatus(){
    return this.props.status
  }

  private syncStatus() {
    this.props.status =
      this.state.getName() as UserStatus
  }

  get propsData() {
    return this.props
  }


}