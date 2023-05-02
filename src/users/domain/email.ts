export default class Email {
  private _email: string;
  private expression = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  constructor(email: string) {
    this._email = email;
    this.validate();
  }

  get value(): string {
    return this._email;
  }

  validate() {
    if (!this._email || !this.expression.test(this._email)) {
      throw new Error('Invalid Email');
    }
  }
}
