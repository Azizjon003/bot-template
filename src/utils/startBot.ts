const botStart = (bot: any) => {
  bot.launch().then(() => {
    console.log("started");
  });
  console.log(`Bot nimadir has been started...`);
};

export default botStart;
