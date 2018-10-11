export default class House {
  constructor(address, floor, owner) {
    this._owner = owner;
    this._address = address;
    this._floor = floor;
    this._devices = new Map();
  }
  get devices() {
    return this._devices;
  }
  get floor() {
    return this._floor;
  }
  get address() {
    return this._address;
  }
  get owner() {
    return this._owner;
  }
  set owner(owner) {
    this._owner = owner;
  }
  addDevice(device) {
    this._devices.set(device.id, device);
  }
  removeDevice(device) {
    if (this._devices.has(device.id)) {
      this._devices.delete(device.id);
    }
  }
  turnOffAllDEvices() {
    this._devices.forEach(device => device.turnOff());
  }
  getActiveDevices() {
    return Array.from(this._devices.values()).filter(device => device.isOn);
  }
  getDeviceById(id) {
    return this._devices.get(id) || null;
  }
  getDevicesByMaker(maker) {
    return Array.from(this._devices.values()).filter(
      device => device.maker.indexOf(maker) !== -1
    );
  }
}
