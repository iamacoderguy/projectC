export const subString = (oriString: string, startWith: string, endWith: string) => {
  const subStrings = [];
  let iStart = oriString.indexOf(startWith);
  let iEnd = oriString.indexOf(endWith);

  while (iStart !== -1 && iEnd !== -1) {
    const subStr = oriString.substring(iStart + startWith.length, iEnd);
    oriString = oriString.substr(iEnd + startWith.length, oriString.length - iEnd);
    subStrings.push(subStr);

    iStart = oriString.indexOf(startWith);
    iEnd = oriString.indexOf(endWith);
  }

  return subStrings;
};