import xss from "xss";
import prisma from "../../prisma/prisma";

enum enabledEnum {
  one = "one",
  two = "two",
  three = "three",
  four = "four",
}
const enabled = async (id: string, name: string): Promise<enabledEnum> => {
  name = xss(name);
  const user = await prisma.user.findFirst({
    where: {
      telegram_id: id,
    },
  });

  if (user) {
    if (!user.isActive) {
      return enabledEnum.three;
    }
    if (user.role === "USER") {
      if (user.working) {
        console.log("working");
        return enabledEnum.four;
      }
      return enabledEnum.one;
    } else if (user.role === "ADMIN") {
      return enabledEnum.two;
    }

    return enabledEnum.one;
  } else {
    let user = await prisma.user.create({
      data: {
        telegram_id: id,
        name: name,
        username: name,
      },
    });

    return enabledEnum.one;
  }
};

export default enabled;
