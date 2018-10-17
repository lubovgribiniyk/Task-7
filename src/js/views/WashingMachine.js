import WashingMachine from "../models/WashingMachine";
import svgWashingMachine from "../../img/laundry.svg";

export default class ViewWashingMachine {
  constructor(washingMachine, root, deleteDeviceFn) {
    this._root = root;
    this._washingMachine = washingMachine;
    this._deleteDeviceFn = deleteDeviceFn;
    this._listClothes = ["dress", "skirt", "shirt", "pants", "shorts"];
  }

  _handleStateBtn() {
    if (this._washingMachine.isOn) {
      this._washingMachine.turnOff();
    } else {
      this._washingMachine.turnOn(() => {
        this.render();
      });
    }
    this.render();
  }
  _handleModeChange(e) {
    this._washingMachine.mode = e.target.value;
    this.render();
  }
  _handleAddPowderBtn() {
    this._washingMachine.addPowder();
    this.render();
  }
  _handleClothesClick(e) {
    if (e.target.tagName === "LI") {
      this._washingMachine.addClothes(e.target.dataset.name);
      this.render();
    }
  }
  _handleRemoveBtn() {
    this._washingMachine.removeClothes();
    this.render();
  }
  _handleDeleteDeviceBtn() {
    this._deleteDeviceFn(this._washingMachine);
  }

  _createTitleBlock() {
    const title = document.createElement("div");
    title.innerText = `Стиральная машина: ${this._washingMachine.maker}`;
    title.classList.add("title");

    return title;
  }
  _createPowderBlock() {
    const isPowder = document.createElement("div");
    isPowder.classList.add("powder");

    if (!this._washingMachine.isOn) {
      const isPowderText = document.createElement("span");
      isPowderText.classList.add("powder-text");
      isPowderText.innerText = this._washingMachine.powder
        ? "Порошок добавлен"
        : "Порошок не добавлен";
      isPowder.appendChild(isPowderText);

      if (!this._washingMachine.powder) {
        const addPowderBtn = document.createElement("button");
        addPowderBtn.type = "button";
        addPowderBtn.classList.add("add-powder-btn");
        addPowderBtn.innerText = "Добавить порошок";
        addPowderBtn.classList.add("light-button");
        isPowder.appendChild(addPowderBtn);
        addPowderBtn.addEventListener(
          "click",
          this._handleAddPowderBtn.bind(this)
        );
      } else {
        const iconPowder = document.createElement("div");
        iconPowder.classList.add("powder-icon");
        isPowder.insertBefore(iconPowder, isPowderText);
      }
    }

    return isPowder;
  }
  _createModeBlock() {
    const modeHolder = document.createElement("div");
    modeHolder.classList.add("mode-block");

    const currentMode = document.createElement("div");
    currentMode.classList.add("subtitle");
    modeHolder.appendChild(currentMode);

    if (!this._washingMachine.isOn) {
      const selectMode = document.createElement("select");
      selectMode.classList.add("select-mode");

      WashingMachine.SUPPORTED_MODES.forEach(mode => {
        const selectModeItem = document.createElement("option");
        selectModeItem.innerText = `${mode} (${
          WashingMachine.SUPPORTED_MODES_TIME[mode]
        }s)`;
        selectModeItem.value = mode;
        if (mode === this._washingMachine.mode) {
          selectModeItem.selected = true;
        }
        selectMode.appendChild(selectModeItem);
      });

      modeHolder.appendChild(selectMode);

      currentMode.innerText = "Выберите режим:";
      selectMode.addEventListener("change", this._handleModeChange.bind(this));
    } else {
      currentMode.innerText = `Режим: ${this._washingMachine.mode} (${
        WashingMachine.SUPPORTED_MODES_TIME[this._washingMachine.mode]
      }s)`;
    }

    return modeHolder;
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

    if (this._washingMachine.isOn) {
      isOnStateText.innerText = "Машина работает";
      toggleStateBtn.innerText = "Выключить";
      isOnStateLight.classList.add("state-light__on");
    } else {
      isOnStateText.innerText = "Машина не работает";
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
  _createClothesBlock() {
    const clothesHolder = document.createElement("div");

    if (!this._washingMachine.isOn) {
      const listClothesPanel = document.createElement("div");

      const listClothesText = document.createElement("p");
      listClothesText.innerText = "Добавьте вещи для стирки:";
      listClothesText.classList.add("subtitle");

      const listClothes = document.createElement("ul");
      listClothes.classList.add("clothes-list");
      this._listClothes.forEach(item => {
        const itemClothes = document.createElement("li");
        itemClothes.dataset.name = item;
        itemClothes.classList.add(
          "clothes-list__item",
          `clothes-list__item_${item}`
        );
        listClothes.appendChild(itemClothes);
      });
      listClothes.addEventListener(
        "click",
        this._handleClothesClick.bind(this)
      );

      listClothesPanel.appendChild(listClothesText);
      listClothesPanel.appendChild(listClothes);
      clothesHolder.appendChild(listClothesPanel);
    }

    const addedClothesPanel = document.createElement("div");

    const addedClothesText = document.createElement("p");
    addedClothesText.innerText = this._washingMachine.isEmpty()
      ? "В стиральной машине вещей нет."
      : "Вещи в стиральной машине:";
    addedClothesText.classList.add("subtitle");

    addedClothesPanel.appendChild(addedClothesText);

    if (!this._washingMachine.isEmpty()) {
      const listAddedClothes = document.createElement("ul");
      listAddedClothes.classList.add("clothes-list");
      this._washingMachine.clothes.forEach(item => {
        const addedClothesItem = document.createElement("li");
        addedClothesItem.classList.add(
          "clothes-list__item",
          "clothes-list__added-item",
          `clothes-list__item_${item}`
        );
        listAddedClothes.appendChild(addedClothesItem);
      });

      addedClothesPanel.appendChild(listAddedClothes);
    }

    if (!this._washingMachine.isEmpty() && !this._washingMachine.isOn) {
      const removeClothesBtn = document.createElement("button");
      removeClothesBtn.type = "button";
      removeClothesBtn.innerText = "Выгрузить";
      removeClothesBtn.classList.add("light-button");
      removeClothesBtn.classList.add("remove-clothes-btn");
      removeClothesBtn.addEventListener(
        "click",
        this._handleRemoveBtn.bind(this)
      );
      addedClothesPanel.appendChild(removeClothesBtn);
    }

    clothesHolder.appendChild(addedClothesPanel);

    return clothesHolder;
  }

  render() {
    this._root.innerHTML = "";

    const washingMachine = document.createElement("div");
    washingMachine.classList.add("washing-machine");

    const title = this._createTitleBlock();
    const stateHolder = this._createStateBlock();
    const modeHolder = this._createModeBlock();
    const powderHolder = this._createPowderBlock();
    const clothesHolder = this._createClothesBlock();

    const wmContainer = document.createElement("div");
    wmContainer.classList.add("container");

    const svgContainer = document.createElement("div");
    svgContainer.classList.add("washing-machine__img");
    svgContainer.innerHTML = svgWashingMachine;
    svgContainer.firstChild.style.fill = this._washingMachine.color;

    const wmUserPanel = document.createElement("div");
    wmUserPanel.classList.add("user-panel");

    wmContainer.appendChild(svgContainer);
    wmContainer.appendChild(wmUserPanel);

    const deleteBtn = document.createElement("button");
    deleteBtn.type = "button";
    deleteBtn.innerText = "Удалить устройство";
    deleteBtn.classList.add("delete-device");
    deleteBtn.addEventListener("click", this._handleDeleteDeviceBtn.bind(this));

    wmUserPanel.appendChild(stateHolder);
    wmUserPanel.appendChild(modeHolder);

    if (!this._washingMachine.isOn) {
      wmUserPanel.appendChild(powderHolder);
    }

    wmUserPanel.appendChild(clothesHolder);

    washingMachine.appendChild(title);
    washingMachine.appendChild(wmContainer);
    washingMachine.appendChild(deleteBtn);

    this._root.appendChild(washingMachine);
  }
}
