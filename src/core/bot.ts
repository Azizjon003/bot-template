import { Telegraf } from "telegraf";
import configs from "../utils/config";
import prisma from "../../prisma/prisma";

const bot = new Telegraf(String(configs.TOKEN));

export default bot;
