import Email from './email';
import ExternalId from './external-id';
import UserId from './user-id';

export default class User {
  private _userId?: UserId;
  private _email: Email;
  private _firstName?: string;
  private _lastName?: string;
  private _avatar?: string;
  private _externalId?: ExternalId;

  constructor(
    email: Email,
    userId?: UserId,
    externalId?: ExternalId,
    firstName?: string,
    lastName?: string,
    avatar?: string,
  ) {
    this._userId = userId;
    this._email = email;
    this._firstName = firstName;
    this._lastName = lastName;
    this._avatar = avatar;
    this._externalId = externalId;
    this.validate();
  }

  get id(): string {
    return this._userId.id;
  }

  get externalId(): number {
    return this._externalId.id;
  }

  get email(): string {
    return this._email.value;
  }

  get firstName(): string {
    return this._firstName;
  }
  get lastName(): string {
    return this._lastName;
  }

  get avatar(): string {
    return this._avatar;
  }

  validate() {
    if (!this._email) {
      throw new Error('Email is required');
    }
  }
}
