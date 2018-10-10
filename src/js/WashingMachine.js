import Device from "./Device";

const SUPPORTED_MODES = ["color", "manual", "white"];

export default class WashMachine extends Device {
  constructor(maker, color) {
    super(maker, color);
    this._supportedModes = SUPPORTED_MODES;
    this._mode = "";
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
  set mode(mode) {
    if (this._supportedModes.indexOf(mode) !== -1) {
      this._mode = mode;
    }
  }
  get mode() {
    return this._mode;
  }
  get supportedModes() {
    return this._supportedModes;
  }
  addClothes(weight) {
    this._clothes += weight;
  }
  removeClothes() {
    this._clothes = 0;
  }
}
