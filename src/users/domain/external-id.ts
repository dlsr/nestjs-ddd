export default class ExternalId {
  private _id: number;

  constructor(id: number) {
    this._id = id;
    this.validate();
  }

  get id(): number {
    return this._id;
  }

  validate() {
    if (!this._id || !(typeof this._id === 'number')) {
      throw new Error('Invalid External Id');
    }
  }
}
