import xss from "xss";
import prisma from "../../prisma/prisma";

export enum enabledEnum {
  USER = "USER",
  ADMIN = "ADMIN",
  INACTIVE = "INACTIVE",
  WORKING = "WORKING",
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
      return enabledEnum.INACTIVE;
    }
    if (user.role === "USER") {
      if (user.working) {
        console.log("working");
        return enabledEnum.WORKING;
      }
      return enabledEnum.USER;
    } else if (user.role === "ADMIN") {
      return enabledEnum.ADMIN;
    }

    return enabledEnum.USER;
  } else {
    let user = await prisma.user.create({
      data: {
        telegram_id: id,
        name: name,
        username: name,
      },
    });

    return enabledEnum.USER;
  }
};

export default enabled;
