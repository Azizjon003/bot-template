const { Scenes } = require("telegraf");
import control from "./control";
import start from "./start";
const stage = new Scenes.Stage([start, control]);

export default stage;
