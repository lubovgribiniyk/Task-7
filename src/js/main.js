import House from "./House";
import TV from "./TV";
import VacuumCleaner from "./VacuumCleaner";
import WashingMachine from "./WashingMachine";

const house = new House("Kharkiv, Ukraine", 4);
console.log(house);
const tv = new TV("LG", "gray");
console.log(tv);
const vacuumCleaner = new VacuumCleaner("philips", "blue");
console.log(vacuumCleaner);
const washingMachine = new WashingMachine("philips", "white");
console.log(washingMachine);
