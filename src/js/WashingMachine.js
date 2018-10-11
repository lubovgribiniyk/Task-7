import Device from "./Device";

export default class WashMachine extends Device {
  constructor(maker, color) {
    super(maker, color);
    this._mode = WashMachine.SUPPORTED_MODES[0];
    this._powder = false;
    this._clothes = 0;
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
    if (WashMachine.SUPPORTED_MODES.indexOf(mode) !== -1) {
      this._mode = mode;
    }
  }
  get mode() {
    return this._mode;
  }
  addClothes(weight) {
    this._clothes += weight;
  }
  removeClothes() {
    this._clothes = 0;
  }
  get clothes() {
    return this._clothes;
  }
}

WashMachine.SUPPORTED_MODES = ["color", "manual", "white"];
