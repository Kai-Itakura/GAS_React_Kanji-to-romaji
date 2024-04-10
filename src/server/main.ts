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

// @ts-expect-error: This method will be used for Google App Script as Global Function
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const onOpen = () => {
  const ui = DocumentApp.getUi();
  const htmlOutput = HtmlService.createHtmlOutputFromFile('index.html');

  ui.showSidebar(htmlOutput);
};

const getTargetText = () => {
  const document = DocumentApp.getActiveDocument();
  const docText = document.getBody().getText();
  const textArr = docText.split(/\n/);
  return textArr;
};

const showModalDialog = (textArr: string[]) => {
  const [postcode, address, name, phoneNumber] = textArr;

  const newPostcode = postcode.replace('-', '');
  const newAddress = exports.tokenizeAddress(address) as string;
  const newNames = exports.convertName(name) as string[];
  const newPhoneNumber = phoneNumber.replace('0', '＋81');
  setInitialFormData({ postcode: newPostcode, address: newAddress, names: newNames, phoneNumber: newPhoneNumber });

  const dialogTemplate = HtmlService.createTemplateFromFile('form');

  dialogTemplate.postcode = newPostcode;
  dialogTemplate.address = newAddress;
  dialogTemplate.names = newNames;
  dialogTemplate.phoneNumber = newPhoneNumber;

  const htmlOutput = dialogTemplate.evaluate().setWidth(500).setHeight(400);

  DocumentApp.getUi().showModalDialog(htmlOutput, 'ローマ字に変換');
};

const setInitialFormData = (formData: InitialFormData) => {
  const { postcode, address, names, phoneNumber } = formData;
  PropertiesService.getScriptProperties().setProperties({
    postcode,
    address,
    names: JSON.stringify(names),
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

export { getTargetText, showModalDialog };
