import { Scenes } from "telegraf";
const scene = new Scenes.BaseScene("control");

scene.hears("/start", async (ctx: any) => {
  return await ctx.scene.enter("start");
});

scene.hears("Start", async (ctx) => {
  ctx.reply("Start");
});

scene.hears("Admin", async (ctx) => {
  ctx.reply("Admin");
});
export default scene;
