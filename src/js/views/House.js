import WashingMachine from "../models/WashingMachine";
import TV from "../models/TV";
import VacuumCleaner from "../models/VacuumCleaner";
import ViewWashingMachine from "./WashingMachine";
import ViewTV from "./TV";

import homeSvg from "../../img/home.svg";

export default class ViewHouse {
  constructor(house, root) {
    this._house = house;
    this._root = root;
    this._devices = [
      { text: "телевизор", value: "tv" },
      { text: "стиральная машина", value: "washing_machine" }
    ];
    this._deviceColors = [
      { text: "черный", value: "#000000" },
      { text: "серый", value: "#808080" },
      { text: "синий", value: "#0d3d84" },
      { text: "розовый", value: "#b76da5" }
    ];
    this._deviceMakers = [
      { text: "philips", value: "philips" },
      { text: "samsung", value: "samsung" },
      { text: "lg", value: "lg" },
      { text: "xiaomi", value: "xiaomi" }
    ];
  }
  _handleAddDeviceBtn() {
    const selectedDevice = this._root.querySelector(
      ".add-device__select_device"
    ).value;
    const selectedMaker = this._root.querySelector(".add-device__select_maker")
      .value;
    const selectedColor = this._root.querySelector(".add-device__select_color")
      .value;
    let device;

    if (selectedDevice === "washing_machine") {
      device = new WashingMachine(selectedMaker, selectedColor);
    } else if (selectedDevice === "tv") {
      device = new TV(selectedMaker, selectedColor);
    } else if (selectedDevice === "vacuum_cleaner") {
      device = VacuumCleaner(selectedMaker, selectedColor);
    }

    this._house.addDevice(device);
    this.render();
  }
  _handleDeleteDevice(device) {
    const userAnswer = confirm("Вы уверены что хотите удалить это устройство?");
    if (userAnswer) {
      this._house.removeDevice(device);
    }
    this.render();
  }

  _createHeadingBlock() {
    const houseHeading = document.createElement("div");
    houseHeading.classList.add("house-heading");

    const houseLogo = document.createElement("div");
    houseLogo.classList.add("house-logo");
    houseLogo.innerHTML = homeSvg;

    const houseHeadingText = document.createElement("h1");
    houseHeadingText.innerText = "My House";
    houseHeadingText.classList.add("house-heading__text");

    houseHeading.appendChild(houseLogo);
    houseHeading.appendChild(houseHeadingText);

    return houseHeading;
  }

  _createStateBlock() {
    const stateHolder = document.createElement("ul");
    stateHolder.classList.add("house-state");

    const owner = document.createElement("li");
    owner.innerText = `Владелец: ${this._house.owner}`;
    owner.classList.add("house-state__item");

    const address = document.createElement("li");
    address.innerText = `Адресс: ${this._house.address}`;
    address.classList.add("house-state__item");

    const floor = document.createElement("li");
    floor.innerText = `Этажей: ${this._house.floor}`;
    floor.classList.add("house-state__item");

    stateHolder.appendChild(owner);
    stateHolder.appendChild(address);
    stateHolder.appendChild(floor);

    return stateHolder;
  }

  _createSelect(list) {
    const select = document.createElement("select");
    select.classList.add("add-device__select");
    list.forEach(item => {
      const selectItem = document.createElement("option");
      selectItem.innerText = item.text;
      selectItem.value = item.value;

      select.appendChild(selectItem);
    });

    return select;
  }
  _createAddDeviceBlock() {
    const addDeviceHolder = document.createElement("div");
    addDeviceHolder.classList.add("add-device");

    const addDeviceText = document.createElement("h3");
    addDeviceText.classList.add("add-device__title");
    addDeviceText.innerText = "Выберите устройство:";

    const selectDevice = this._createSelect(this._devices);
    selectDevice.classList.add("add-device__select_device");

    const selectColor = this._createSelect(this._deviceColors);
    selectColor.classList.add("add-device__select_color");

    const selectMaker = this._createSelect(this._deviceMakers);
    selectMaker.classList.add("add-device__select_maker");

    addDeviceHolder.appendChild(addDeviceText);
    addDeviceHolder.appendChild(selectDevice);
    addDeviceHolder.appendChild(selectColor);
    addDeviceHolder.appendChild(selectMaker);

    const addDeviceBtn = document.createElement("button");
    addDeviceBtn.classList.add("add-device__button");
    addDeviceBtn.type = "button";
    addDeviceBtn.innerText = "Добавить в дом";
    addDeviceBtn.addEventListener("click", this._handleAddDeviceBtn.bind(this));
    addDeviceHolder.appendChild(addDeviceBtn);

    return addDeviceHolder;
  }

  render() {
    this._root.innerHTML = "";
    const house = document.createElement("div");
    house.classList.add("house");

    const sidebar = document.createElement("aside");
    sidebar.classList.add("sidebar");

    const main = document.createElement("main");
    main.classList.add("main");

    this._house.devices.forEach(device => {
      const deviceContainer = document.createElement("div");
      deviceContainer.classList.add("device-container");
      main.appendChild(deviceContainer);

      let view;
      if (device instanceof TV) {
        view = new ViewTV(
          device,
          deviceContainer,
          this._handleDeleteDevice.bind(this)
        );
      } else if (device instanceof WashingMachine) {
        view = new ViewWashingMachine(
          device,
          deviceContainer,
          this._handleDeleteDevice.bind(this)
        );
      } else if (device instanceof VacuumCleaner) {
        view = new ViewVacuumCleaner(
          device,
          deviceContainer,
          this._handleDeleteDevice.bind(this)
        );
      }

      view.render();
    });

    const houseHeading = this._createHeadingBlock();
    const stateHolder = this._createStateBlock();
    const addDeviceHolder = this._createAddDeviceBlock();

    house.appendChild(houseHeading);
    house.appendChild(stateHolder);
    house.appendChild(addDeviceHolder);

    sidebar.appendChild(house);
    this._root.appendChild(sidebar);
    this._root.appendChild(main);
  }
}
