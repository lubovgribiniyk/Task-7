import Device from "./Device";

export default class VacuumCleaner extends Device {
  static get SUPPORTED_MODES() {
    return ["dry", "wet", "carpet"];
  }

  constructor(maker, color) {
    super(maker, color);
    this._mode = VacuumCleaner.SUPPORTED_MODES[0];
    this._isCharged = false;
    this._hasHarbage = false;
  }
  turnOn() {
    if (this._mode && this._isCharged && !this._hasHarbage) {
      super.turnOn();
    }
  }
  turnOff() {
    super.turnOff();
    this._isCharged = false;
    this._hasHarbage = true;
  }
  set mode(mode) {
    if (VacuumCleaner.SUPPORTED_MODES.indexOf(mode) !== -1) {
      this._mode = mode;
    }
  }
  get mode() {
    return this._mode;
  }
  charge() {
    this._isCharged = true;
  }
  get isCharged() {
    return this._isCharged;
  }
  get hasHarbage() {
    return this._hasHarbage;
  }
  cleanGarbage() {
    if (this._hasHarbage) {
      this._hasHarbage = false;
    }
  }
}
