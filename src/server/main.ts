type ExportsType = typeof import('./gooLab') & typeof import('./yahoo');

declare const exports: ExportsType;

// @ts-expect-error: This method used for Google App Script as Global Function
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

  const katakana = exports.tokenize(address);

  const newPhoneNumber = phoneNumber.replace('0', '＋81');

  const html = `
    <p>どちらか選択してください</p>
    <button>${newPostcode}<br>${katakana}<br>${name}<br>${newPhoneNumber}</button>
  `;

  const dialogHtml = HtmlService.createHtmlOutput(html);
  DocumentApp.getUi().showModalDialog(dialogHtml, 'ローマ字に変換');
};

export { getTargetText, showModalDialog };
