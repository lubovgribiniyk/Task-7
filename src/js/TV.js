import Device from "./Device";

const MIN_VOLUME = 0;
const MAX_VOLUME = 10;
const DEFAULT_VOLUME = 5;
const DEFAULT_CHANNELS = ["BBC", "SkyNews", "Sport"];

export default class TV extends Device {
  constructor(maker, color) {
    super(maker, color);
    this._channels = DEFAULT_CHANNELS;
    this._currentChannel = this._channels[0];
    this._volume = DEFAULT_VOLUME;
  }
  changeCurrentChannel(channel) {
    if (this._channels.indexOf(channel) !== -1) {
      this._currentChannel = channel;
    }
  }
  get currentChannel() {
    return this._currentChannel;
  }
  _getCurrentChannelIndex() {
    return this._channels.indexOf(this._currentChannel);
  }
  toPrevChannel() {
    const index = this._getCurrentChannelIndex();
    this.changeCurrentChannel(this._channels[index - 1]);
  }
  toNextChannel() {
    const index = this._getCurrentChannelIndex();
    this.changeCurrentChannel(this._channels[index + 1]);
  }
  upVolume() {
    if (this._volume < MAX_VOLUME) {
      this._volume += 1;
    }
  }
  downVolume() {
    if (this._volume > MIN_VOLUME) {
      this._volume -= 1;
    }
  }
  setOffTimer(time) {
    setTimeout(() => {
      this.turnOff();
    }, time * 1000);
  }
}
