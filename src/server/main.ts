import { KanjiFormType, RomajiFormType } from '../client/components/form/types/formTypes';

type ExportsType = typeof import('./convertAddress') & typeof import('./convertName');

declare const exports: ExportsType;

interface InitialFormData {
  postcode: string;
  address: string;
  names: string[];
  phoneNumber: string;
}

interface FormData {
  postcode: string;
  address: string;
  name: string;
  phoneNumber: string;
}

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

const createDocument = (romajiData: RomajiFormType, kanjiData: KanjiFormType) => {
  console.log('🚀 ~ createDocument ~ kanjiData:', kanjiData);
  console.log('🚀 ~ createDocument ~ romajiData:', romajiData);
  const doc = DocumentApp.create('任意のタイトルを入力してください');
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

// @ts-expect-error: This method will be used from client
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getInitialFormData = (): InitialFormData => {
  const postcode = PropertiesService.getScriptProperties().getProperty('postcode') as string;
  const address = PropertiesService.getScriptProperties().getProperty('address') as string;
  const names = JSON.parse(PropertiesService.getScriptProperties().getProperty('names') as string) as string[];
  const phoneNumber = PropertiesService.getScriptProperties().getProperty('phoneNumber') as string;

  PropertiesService.getScriptProperties().deleteProperty('postcode');
  PropertiesService.getScriptProperties().deleteProperty('address');
  PropertiesService.getScriptProperties().deleteProperty('names');
  PropertiesService.getScriptProperties().deleteProperty('phoneNumber');

  return { postcode, address, names, phoneNumber };
};

// @ts-expect-error: This method will be used from client
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const writeFormData = (formData: FormData) => {
  const document = DocumentApp.getActiveDocument();
  const body = document.getBody();
  const { postcode, address, name, phoneNumber } = formData;
  body.appendParagraph(' ');
  body.appendParagraph(postcode);
  body.appendParagraph(address);
  body.appendParagraph(name);
  body.appendParagraph(phoneNumber);
};

export { convertKanjiToRomaji, createDocument };
