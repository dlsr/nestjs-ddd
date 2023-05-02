import ExternalId from './external-id';

export default class Photo {
  private _userExternalId: ExternalId;
  private _hash: string;

  constructor(userExternalId: ExternalId, hash: string) {
    this._userExternalId = userExternalId;
    this._hash = hash;
    this.validate();
  }

  get userExternalId(): number {
    return this._userExternalId.id;
  }

  get hash(): string {
    return this._hash;
  }

  validate() {
    if (!this._hash) {
      throw new Error('Hash is required');
    }

    if (!this._userExternalId) {
      throw new Error('UserExternalId is required');
    }
  }
}
