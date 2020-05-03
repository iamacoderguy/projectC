import { subString } from 'shared/utils/string';

export const PREFIX = '<_';
export const POSTFIX = '_>';

export const convertToReactNativeHyperlink = (hypertext: string, links: Array<string>) => {
  const linkTexts = subString(hypertext, PREFIX, POSTFIX);

  linkTexts.forEach((linkText, i) => {
    hypertext = hypertext.replace(PREFIX + linkText + POSTFIX, links[i]);
  });

  return hypertext;
};

export const generateLinkTexts = (hypertext: string, links: Array<string>) => {
  const linkTexts = subString(hypertext, PREFIX, POSTFIX);

  return (url: string) => {
    const i = links.indexOf(url);
    return linkTexts[i];
  };
};