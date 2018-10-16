import House from "./models/House";
import TV from "./models/TV";
import VacuumCleaner from "./models/VacuumCleaner";
import WashingMachine from "./models/WashingMachine";
import ViewWashingMachine from "./views/WashingMachine";
import ViewHouse from "./views/House";
import "../scss/index.scss";

const house = new House("Сумская, 10", 3, "Любовь");

const viewHouse = new ViewHouse(house, document.getElementById("root"));
viewHouse.render();
