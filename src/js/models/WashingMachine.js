import Device from "./Device";

export default class WashingMachine extends Device {
  static get SUPPORTED_MODES() {
    return ["color", "white", "manual"];
  }

  static get SUPPORTED_MODES_TIME() {
    return {
      color: 5,
      white: 10,
      manual: 15
    };
  }

  constructor(maker, color) {
    super(maker, color);
    this._mode = WashingMachine.SUPPORTED_MODES[0];
    this._powder = false;
    this._clothes = [];
    this._offTimer = null;
  }
  turnOn() {
    if (this._mode) {
      super.turnOn();
      this._powder = false;
      return new Promise(resolve => {
        this._offTimer = setTimeout(() => {
          this.turnOff();
          resolve();
        }, WashingMachine.SUPPORTED_MODES_TIME[this.mode] * 1000);
      });
    }
  }
  turnOff() {
    this.clearOffTimer();
    super.turnOff();
  }
  clearOffTimer() {
    if (this._offTimer) {
      clearTimeout(this._offTimer);
      this._offTimer = null;
    }
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
