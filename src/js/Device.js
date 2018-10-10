export default class Device {
  constructor(maker, color) {
    this._maker = maker;
    this._color = color;
    this._isOn = false;
  }
  turnOn() {
    if (!this._isOn) {
      this._isOn = true;
    }
  }
  turnOff() {
    if (this._isOn) {
      this._isOn = false;
    }
  }
}
