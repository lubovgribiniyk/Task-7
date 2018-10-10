import Device from "./Device";

export default class VacuumCleaner extends Device {
  constructor(maker, color) {
    super(maker, color);
    this._mode = "";
    this._isCharged = false;
    this._garbage = false;
  }
  turnOn() {
    if (this._mode && this._isCharged && !this._garbage) {
      super.turnOn();
    }
  }
  turnOff() {
    super.turnOff();
    this._isCharged = false;
    this._garbage = true;
  }
  set mode(mode) {
    this._mode = mode;
  }
  get mode() {
    return this._mode;
  }
  charge() {
    this._isCharged = true;
  }
  cleanGarbage() {
    if (this._garbage) {
      this._garbage = false;
    }
  }
}
