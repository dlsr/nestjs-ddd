export default class UserId {
  private _id: string;

  constructor(id: string) {
    this._id = id;
    this.validate();
  }

  get id(): string {
    return this._id;
  }

  validate() {
    if (!this._id || !(typeof this._id === 'string')) {
      throw new Error('Invalid User Id');
    }
  }
}
