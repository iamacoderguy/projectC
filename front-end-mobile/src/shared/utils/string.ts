export function isNullOrWhitespace(input: string | null | undefined) {
  if (typeof input === 'undefined' || input == null) {
    return true;
  }
  return input.replace(/\s/g, '').length < 1;
}

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

export const format = (format: string, ...args: any[]) => {
  if (isNullOrWhitespace(format)) {
    return '';
  }

  return format.replace(/{(\d+)}/g, (match, index) => args[index] || '');
};

export const contain = (str: string, ...args: string[]) => {
  return args.some(subStr => str.indexOf(subStr) != -1);
};