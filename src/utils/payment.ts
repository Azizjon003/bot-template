// bot.on("pre_checkout_query", async (ctx: any) => {
//   const user_id = ctx.from.id;
//   console.log(ctx.update);
//   const user = await prisma.user.findFirst({
//     where: {
//       telegram_id: String(user_id),
//     },
//   });

//   if (!user) {
//     return ctx.answerPreCheckoutQuery(
//       false,
//       "Balansingizni tekshiring balansingiz topilmadi"
//     );
//   }
//   // return ctx.answerPreCheckoutQuery(false, "Foydalanuvchi topilmadi");

//   const wallet = await prisma.wallet.findFirst({
//     where: {
//       user_id: user.id,
//     },
//   });

//   if (!wallet) {
//     // return ctx.answerPreCheckoutQuery(
//     //   false,
//     //   "Balansingizni tekshiring balansingiz topilmadi"
//     // );
//     return ctx.answerPreCheckoutQuery(
//       false,
//       "Balansingizni tekshiring balansingiz topilmadi"
//     );
//     // return bot.telegram.sendMessage(
//     //   user_id,
//     //   "Balansingizni tekshiring balansingiz topilmadi"
//     // );
//   }

//   const amount = ctx.update.pre_checkout_query.total_amount / 100;
//   // const newRequest = await prisma.walletRequest.findFirst({
//   //   where: {
//   //     id: ctx.update.message.successful_payment.invoice_payload.split(":")[1],
//   //     status: "PENDING",
//   //   },
//   // });

//   let newRequest = await prisma.walletRequest.findFirst({
//     where: {
//       user_id: user.id,
//       status: "PENDING",
//     },
//     orderBy: {
//       created_at: "desc",
//     },
//   });

//   if (!newRequest) {
//     return ctx.answerPreCheckoutQuery(false, "To'lov so'rovi topilmadi");
//     // return ctx.answerPreCheckoutQuery(false, "To'lov so'rov topilmadi");
//   }

//   if (amount !== newRequest.amount) {
//     return ctx.answerPreCheckoutQuery(false, "To'lov so'rovi topilmadi");
//     // return bot.telegram.sendMessage(user.id, "To'lov so'rov topilmadi");
//   }

//   await bot.telegram.sendMessage(
//     "-1002103794627",
//     `Foydalanuvchi ${user.name} userId ${user.telegram_id} so'rovni precheckout ga o'tkazdi ${amount} `
//   );
//   return ctx.answerPreCheckoutQuery(true);
// });

// bot.on("successful_payment", async (ctx: any) => {
//   console.log(
//     ctx.update.message.successful_payment,
//     "successful payment",
//     "users"
//   );
//   const user_id = ctx.from.id;
//   const user = await prisma.user.findFirst({
//     where: {
//       telegram_id: String(user_id),
//     },
//   });

//   if (!user) {
//     return bot.telegram.sendMessage(user_id, "Foydalanuvchi topilmadi");
//   }
//   // return ctx.answerPreCheckoutQuery(false, "Foydalanuvchi topilmadi");

//   const wallet = await prisma.wallet.findFirst({
//     where: {
//       user_id: user.id,
//     },
//   });

//   if (!wallet) {
//     // return ctx.answerPreCheckoutQuery(
//     //   false,
//     //   "Balansingizni tekshiring balansingiz topilmadi"
//     // );

//     return bot.telegram.sendMessage(
//       user_id,
//       "Balansingizni tekshiring balansingiz topilmadi"
//     );
//   }

//   const amount = ctx.update.message.successful_payment.total_amount / 100;
//   // const newRequest = await prisma.walletRequest.findFirst({
//   //   where: {
//   //     id: ctx.update.message.successful_payment.invoice_payload.split(":")[1],
//   //     status: "PENDING",
//   //   },
//   // });

//   let newRequest = await prisma.walletRequest.findFirst({
//     where: {
//       user_id: user.id,
//       status: "PENDING",
//     },
//     orderBy: {
//       created_at: "desc",
//     },
//   });

//   if (!newRequest) {
//     return bot.telegram.sendMessage(user_id, "To'lov so'rov topilmadi");
//     // return ctx.answerPreCheckoutQuery(false, "To'lov so'rov topilmadi");
//   }

//   if (amount !== newRequest.amount) {
//     return bot.telegram.sendMessage(user.id, "To'lov so'rov topilmadi");
//     // return await ctx.answerPreCheckoutQuery(false, "To'lov summasi noto'g'ri");
//   }

//   // let amountId = await prisma.walletRequest.findFirst({
//   //   where: {
//   //     id: newRequest.id,
//   //   },

//   // });

//   let amountId = await prisma.walletRequest.update({
//     where: {
//       id: newRequest.id,
//     },
//     data: {
//       status: "APPROVED",
//     },
//   });

//   await prisma.wallet.update({
//     where: {
//       id: wallet.id,
//       user_id: user.id,
//     },
//     data: {
//       balance: wallet.balance + amount,
//     },
//   });

//   // await ctx.answerPreCheckoutQuery(true, "To'lov qabul qilindi");

//   // await bot.telegram.sendMessage(
//   //   user_id,
//   //   "To'lov qabul qilindi. Balansingizga " +
//   //     amount +
//   //     " so'm qo'shildi\n Qayta /start buyrug'ini bosib botni ishlatishingiz mumkin"
//   // );

//   // bot.telegram.deleteMessage(
//   //   user_id,
//   //   parseInt(String(amountId.message_id)) || ctx.message.message_id - 1
//   // );
//   await bot.telegram.sendMessage(
//     "-1002103794627",
//     `Foydalanuvchi ${user.name} userId ${user.telegram_id}  so'rovni to'lov qildi ${amount} `
//   );
//   return await ctx.scene.enter("start");
// });
