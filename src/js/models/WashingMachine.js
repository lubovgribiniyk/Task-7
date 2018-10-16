import Device from "./Device";

export default class WashingMachine extends Device {
  static get SUPPORTED_MODES() {
    return ["color", "manual", "white"];
  }

  constructor(maker, color) {
    super(maker, color);
    this._mode = WashingMachine.SUPPORTED_MODES[0];
    this._powder = false;
    this._clothes = [];
  }
  turnOn() {
    if (this._mode) {
      super.turnOn();
    }
    this._powder = false;
  }
  addPowder() {
    this._powder = true;
  }
  get powder() {
    return this._powder;
  }
  set mode(mode) {
    if (WashingMachine.SUPPORTED_MODES.indexOf(mode) !== -1) {
      this._mode = mode;
    }
  }
  get mode() {
    return this._mode;
  }
  addClothes(cloth) {
    if (this._clothes.length < 12) {
      this._clothes.push(cloth);
    }
  }
  removeClothes() {
    this._clothes = [];
  }
  get clothes() {
    return this._clothes;
  }
  isEmpty() {
    return this._clothes.length === 0;
  }
}
