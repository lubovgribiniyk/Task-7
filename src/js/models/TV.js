import Device from "./Device";

export default class TV extends Device {
  static get MIN_VOLUME() {
    return 0;
  }
  static get MAX_VOLUME() {
    return 10;
  }
  static get DEFAULT_VOLUME() {
    return 5;
  }
  static get DEFAULT_CHANNELS() {
    return [
      {
        name: "Sky News",
        link:
          "https://www.youtube.com/embed/XOacA3RYrXk?rel=0&controls=0&showinfo=0&autoplay=1&mute=1"
      },
      {
        name: "Animals",
        link:
          "https://www.youtube.com/embed/CzaXBWch4wQ?rel=0&controls=0&showinfo=0&autoplay=1&mute=1"
      },
      {
        name: "NASA",
        link:
          "https://www.youtube.com/embed/4993sBLAzGA?rel=0&controls=0&showinfo=0&autoplay=1&mute=1"
      }
    ];
  }

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
  setOffTimer(time, callback) {
    this._offTimer = setTimeout(() => {
      this.turnOff();
      callback();
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
