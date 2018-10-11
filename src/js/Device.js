export default class Device {
  constructor(maker, color) {
    this._maker = maker;
    this._color = color;
    this._isOn = false;
    this._id = Math.round(Math.random() * 10e6);
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
  get maker() {
    return this._maker;
  }
  get color() {
    return this._color;
  }
  get isOn() {
    return this._isOn;
  }
  get id() {
    return this._id;
  }
}
