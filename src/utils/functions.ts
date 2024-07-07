export const addInlineKeyboard = (arr: any[]) => {
  let left = [];

  for (let i = 0; i < arr.length; i += 2) {
    let arrcha = [];
    let arrcha2 = [];
    let arrcha3 = [];
    if (arr[i].name.length > 25) {
      arrcha2.push({
        text: arr[i].name,
        callback_data: arr[i].id,
      });
    } else {
      arrcha.push({
        text: arr[i].name,
        callback_data: arr[i].id,
      });
    }

    if (i + 1 < arr.length) {
      if (arr[i + 1].name.length > 25) {
        arrcha3.push({
          text: arr[i + 1].name,
          callback_data: arr[i + 1].id,
        });
      } else {
        arrcha.push({
          text: arr[i + 1].name,
          callback_data: arr[i + 1].id,
        });
      }
    }

    left.push(arrcha);
    left.push(arrcha2);
    left.push(arrcha3);
  }

  return left;
};

export const contentToString = (content: any, lang: string) => {
  let text = "";
  console.log(content);
  for (let txt of content) {
    console.log(txt[`${lang}Content`]);
    let description = `<b>${txt?.title}</b>\n
    <i>${txt[`content`]}</i>\n
    `;
    text += description;
  }

  return text;
};

export const parseItems = (dataString: string) => {
  const titles = dataString
    .match(/"title": "(.*?)"/g)
    ?.map((val) => val.match(/"title": "(.*?)"/)?.[1]);

  const uzContents = dataString
    .match(/"uzContent": "(.*?)"/g)
    ?.map((val) => val.match(/"uzContent": "(.*?)"/)?.[1]);

  console.log(titles, uzContents);
  let content = uzContents?.map((uzContent, index) => {
    return {
      uzContent,
      title: titles?.[index],
    };
  });

  // console.log(content);

  const regex = /"title":"(.*?)","uzContent":"(.*?)"/g;
  let match;
  let results: any = [];

  while ((match = regex.exec(dataString)) !== null) {
    results.push({
      title: match[1],
      uzContent: match[2],
    });
  }

  if (results.length === 0) {
    const titles = dataString
      .match(/"title": "(.*?)"/g)
      ?.map((val) => val.match(/"title": "(.*?)"/)?.[1]);

    const uzContents = dataString
      .match(/"uzContent": "(.*?)"/g)
      ?.map((val) => val.match(/"uzContent": "(.*?)"/)?.[1]);

    console.log(titles, uzContents);
    results = uzContents?.map((uzContent, index) => {
      return {
        uzContent,
        title: titles?.[index],
      };
    });
  }
  return results;
};

export const parseTitles = (rawData: string) => {
  const regexPattern = /"uzTitle": "(.*?)",\s*"enTitle": "(.*?)"/gs;
  let matches;
  const results = [];

  while ((matches = regexPattern.exec(rawData)) !== null) {
    // Adding matched uzTitle and enTitle to results array
    results.push({
      uzTitle: matches[1],
      enTitle: matches[2],
    });
  }

  return results;
};
