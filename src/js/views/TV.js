import TV from "../models/TV";
import DeviceView from "./DeviceView";

import svgTV from "../../img/tv.svg";

export default class viewTV extends DeviceView {
  constructor(tv, root, deleteFn) {
    super(root);
    this._tv = tv;
    this._root = root;
    this._deleteDeviceFn = deleteFn;
  }
  _handleStateBtn() {
    this._tv.toggleState();
    this.render();
  }
  _handleDeleteDeviceBtn() {
    this._deleteDeviceFn(this._tv, this);
  }
  _handlePrevChannelBtn() {
    this._tv.toPrevChannel();
    this.render();
  }
  _handleNextChannelBtn() {
    this._tv.toNextChannel();
    this.render();
  }
  _handleTimerBtn() {
    const timerValue = parseInt(
      this._root.querySelector(".tv-timer__input").value
    );
    if (timerValue) {
      this._tv.setOffTimer(timerValue, () => {
        this.render();
      });
      this._updateTimerState();
    }
  }
  _handleAddVolumeBtn() {
    this._tv.upVolume();
    this.render();
  }
  _handleSubVolumeBtn() {
    this._tv.downVolume();
    this.render();
  }
  _updateTimerState() {
    const newTimerHolder = this._createTimerBlock();
    const currentTimerHolder = this._root.querySelector(".tv-timer");

    currentTimerHolder.parentElement.replaceChild(
      newTimerHolder,
      currentTimerHolder
    );
  }

  _createTitleBlock() {
    const title = document.createElement("div");
    title.innerText = `Телевизор: ${this._tv.maker}`;
    title.classList.add("title");

    return title;
  }
  _createStateBlock() {
    const stateHolder = document.createElement("div");
    stateHolder.classList.add("state-wrapper");

    const isOnState = document.createElement("div");
    isOnState.classList.add("state-block");

    const isOnStateLight = document.createElement("span");
    isOnStateLight.classList.add("state-light");

    const isOnStateText = document.createElement("span");
    isOnStateText.classList.add("state-text");

    const toggleStateBtn = document.createElement("button");
    toggleStateBtn.type = "button";
    toggleStateBtn.classList.add("toggle-state-btn");

    if (this._tv.isOn) {
      isOnStateText.innerText = "Телевизор включен";
      toggleStateBtn.innerText = "Выключить";
      isOnStateLight.classList.add("state-light__on");
    } else {
      isOnStateText.innerText = "Телевизор выключен";
      toggleStateBtn.innerText = "Включить";
      isOnStateLight.classList.add("state-light__off");
    }

    toggleStateBtn.addEventListener("click", this._handleStateBtn.bind(this));

    isOnState.appendChild(isOnStateLight);
    isOnState.appendChild(isOnStateText);
    stateHolder.appendChild(isOnState);
    stateHolder.appendChild(toggleStateBtn);

    return stateHolder;
  }
  _createTvBlock() {
    const tvHolder = document.createElement("div");
    tvHolder.classList.add("tv-block");

    const svgContainer = document.createElement("div");
    svgContainer.innerHTML = svgTV;
    svgContainer.firstChild.style.fill = this._tv.color;
    tvHolder.appendChild(svgContainer);

    if (this._tv.isOn) {
      const tvIframe = document.createElement("iframe");
      tvIframe.src = this._tv.currentChannel.link;
      tvIframe.classList.add("tv-block__iframe");
      tvIframe.style.width = "295px";
      tvIframe.style.height = "160px";

      tvHolder.appendChild(tvIframe);
    }

    return tvHolder;
  }
  _createChannelBlock() {
    const channelHolder = document.createElement("div");
    channelHolder.classList.add("channel-wrapper");

    if (this._tv.isOn) {
      const currentChannel = document.createElement("div");
      currentChannel.classList.add("current-channel");
      currentChannel.innerText = `Текущий канал: ${
        this._tv.currentChannel.name
      }`;
      channelHolder.appendChild(currentChannel);
    }

    const prevChannelBtn = document.createElement("button");
    prevChannelBtn.type = "button";
    prevChannelBtn.innerText = "< Предыдущий канал";
    prevChannelBtn.classList.add("change-button");
    prevChannelBtn.disabled = this._tv.isOn ? false : true;
    prevChannelBtn.addEventListener(
      "click",
      this._handlePrevChannelBtn.bind(this)
    );

    const nextChannelBtn = document.createElement("button");
    nextChannelBtn.type = "button";
    nextChannelBtn.innerText = "Следующий канал >";
    nextChannelBtn.disabled = this._tv.isOn ? false : true;
    nextChannelBtn.classList.add("change-button");
    nextChannelBtn.addEventListener(
      "click",
      this._handleNextChannelBtn.bind(this)
    );

    channelHolder.appendChild(prevChannelBtn);
    channelHolder.appendChild(nextChannelBtn);

    return channelHolder;
  }
  _createTimerBlock() {
    const timerHolder = document.createElement("div");
    timerHolder.classList.add("tv-timer");

    const timerTitle = document.createElement("h3");
    timerTitle.classList.add("tv-timer__title");
    timerTitle.innerText = this._tv.isOffTimerActive()
      ? "Таймер запущен..."
      : "Установить таймер выключения:";
    timerHolder.appendChild(timerTitle);

    if (!this._tv.isOffTimerActive()) {
      const timerInput = document.createElement("input");
      timerInput.type = "number";
      timerInput.value = 0;
      timerInput.min = 0;
      timerInput.max = 30;
      timerInput.classList.add("tv-timer__input");
      timerInput.disabled = this._tv.isOn ? false : true;

      const timerButton = document.createElement("button");
      timerButton.type = "button";
      timerButton.innerText = "Включить таймер";
      timerButton.disabled = this._tv.isOn ? false : true;
      timerButton.addEventListener("click", this._handleTimerBtn.bind(this));

      timerHolder.appendChild(timerInput);
      timerHolder.appendChild(timerButton);
    }

    return timerHolder;
  }
  _createSoundBlock() {
    const soundHolder = document.createElement("div");
    soundHolder.classList.add("sound-wrapper");

    if (this._tv.isOn) {
      const currentVolume = document.createElement("div");
      currentVolume.classList.add("current-volume");
      currentVolume.innerText = `Громкость: ${this._tv.volume}`;
      soundHolder.appendChild(currentVolume);
    }

    const addVolumeBtn = document.createElement("button");
    addVolumeBtn.type = "button";
    addVolumeBtn.innerText = "Увеличить громкость";
    addVolumeBtn.classList.add("change-button");
    addVolumeBtn.disabled = this._tv.isOn ? false : true;
    addVolumeBtn.addEventListener("click", this._handleAddVolumeBtn.bind(this));

    const subVolumeBtn = document.createElement("button");
    subVolumeBtn.type = "button";
    subVolumeBtn.innerText = "Уменьшить громкость";
    subVolumeBtn.classList.add("change-button");
    subVolumeBtn.disabled = this._tv.isOn ? false : true;
    subVolumeBtn.addEventListener("click", this._handleSubVolumeBtn.bind(this));

    soundHolder.appendChild(subVolumeBtn);
    soundHolder.appendChild(addVolumeBtn);

    return soundHolder;
  }
  render() {
    this._root.innerHTML = "";

    const tv = document.createElement("div");
    tv.classList.add("tv");

    const tvContainer = document.createElement("div");
    tvContainer.classList.add("container");

    const tvUserPanel = document.createElement("div");
    tvUserPanel.classList.add("user-panel");

    const title = this._createTitleBlock();
    const stateHolder = this._createStateBlock();
    const tvHolder = this._createTvBlock();

    const channelHolder = this._createChannelBlock();
    const timerHolder = this._createTimerBlock();
    const soundHolder = this._createSoundBlock();

    const deleteBtn = document.createElement("button");
    deleteBtn.type = "button";
    deleteBtn.innerText = "Удалить устройство";
    deleteBtn.classList.add("delete-device");
    deleteBtn.addEventListener("click", this._handleDeleteDeviceBtn.bind(this));

    tvContainer.appendChild(tvHolder);
    tvContainer.appendChild(tvUserPanel);

    tv.appendChild(title);
    tv.appendChild(tvContainer);
    tvUserPanel.appendChild(stateHolder);
    tvUserPanel.appendChild(channelHolder);
    tvUserPanel.appendChild(timerHolder);
    tvUserPanel.appendChild(soundHolder);
    tv.appendChild(deleteBtn);

    this._root.appendChild(tv);
  }
}
