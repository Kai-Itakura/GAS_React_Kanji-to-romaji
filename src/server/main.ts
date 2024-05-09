import { KanjiFormType, RomajiFormType } from '../client/components/form/types/formTypes';

type ExportsType = typeof import('./convertAddress') & typeof import('./convertName');

declare const exports: ExportsType;

// @ts-expect-error This function is executed at the time when a GET request is received.
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const doGet = () => {
  return HtmlService.createTemplateFromFile('index')
    .evaluate()
    .addMetaTag('viewport', 'width=device-width, initial-scale=1')
    .setTitle('Kanji to Romaji');
};

const convertKanjiToRomaji = (formData: KanjiFormType) => {
  const { postcode, address, name, phoneNumber } = formData;

  setKnajiFormData(formData);

  const rPostcode = postcode.replace('-', '');
  const rAddress = exports.tokenizeAddress(address) as string;
  const rNames = exports.convertName(name) as string[];
  const rPhoneNumber = phoneNumber.replace('0', '+81');

  return {
    rPostcode,
    rAddress,
    rName1: rNames[0],
    rName2: rNames[1],
    rPhoneNumber,
  };
};

const createDocument = (
  { rPostcode, rAddress, rName, rPhoneNumber }: RomajiFormType,
  { postcode, address, name, phoneNumber }: KanjiFormType
) => {
  const doc = DocumentApp.create('任意のタイトルを入力してください');

  const body = doc.getBody();
  body.appendParagraph(postcode);
  body.appendParagraph(address);
  body.appendParagraph(name);
  body.appendParagraph(phoneNumber);
  body.appendParagraph(' ');
  body.appendParagraph(rPostcode);
  body.appendParagraph(rAddress);
  body.appendParagraph(rName);
  body.appendParagraph(rPhoneNumber);

  const docUrl = doc.getUrl();
  return docUrl;
};

const setKnajiFormData = (formData: KanjiFormType) => {
  const { postcode, address, name, phoneNumber } = formData;
  PropertiesService.getScriptProperties().setProperties({
    postcode,
    address,
    name,
    phoneNumber,
  });
};

export { convertKanjiToRomaji, createDocument };
