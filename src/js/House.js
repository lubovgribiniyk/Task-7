export default class House {
  constructor(address, floor) {
    this._address = address;
    this._floor = floor;
    this._devices = [];
  }
  get floor() {
    return this._floor;
  }
  get address() {
    return this._address;
  }
  addDevice(device) {
    this._devices.push(device);
  }
  removeDevice(device) {
    const index = this._devices.indexOf(device);
    if (index !== -1) {
      this._devices.splice(index, 1);
    }
  }
  turnOffAllDEvices() {
    this._devices.forEach(device => device.turnOff());
  }
  getActiveDevices() {
    return this._devices.filter(device => device.isOn);
  }
}
