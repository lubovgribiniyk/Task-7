import Device from "./Device";

export default class TV extends Device {
  constructor(maker, color, channels = TV.DEFAULT_CHANNELS) {
    super(maker, color);
    this._channels = channels;
    this._currentChannel = this._channels[0];
    this._volume = TV.DEFAULT_VOLUME;
    this._offTimer = null;
  }
  turnOff() {
    this.clearOffTimer();
    super.turnOff();
  }
  get channels() {
    return this._channels;
  }
  get currentChannel() {
    return this._currentChannel;
  }
  changeCurrentChannel(channel) {
    if (this._channels.indexOf(channel) !== -1) {
      this._currentChannel = channel;
    }
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
    if (this._volume < TV.MAX_VOLUME) {
      this._volume++;
    }
  }
  downVolume() {
    if (this._volume > TV.MIN_VOLUME) {
      this._volume--;
    }
  }
  get volume() {
    return this._volume;
  }
  setOffTimer(time) {
    this._offTimer = setTimeout(() => {
      this.turnOff();
    }, time * 1000);
  }
  clearOffTimer() {
    if (this._offTimer) {
      clearTimeout(this._offTimer);
      this._offTimer = null;
    }
  }
  isOffTimerActive() {
    return !!this._offTimer;
  }
}

TV.MIN_VOLUME = 0;
TV.MAX_VOLUME = 10;
TV.DEFAULT_VOLUME = 5;
TV.DEFAULT_CHANNELS = ["BBC", "SkyNews", "Sport"];
