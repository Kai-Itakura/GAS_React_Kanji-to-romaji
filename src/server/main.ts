const onOpen = () => {
  const ui = DocumentApp.getUi();
  const template = HtmlService.createHtmlOutputFromFile('index.html');

  ui.showSidebar(template);
};

const getDocument = () => {
  const document = DocumentApp.getActiveDocument();
  return document;
};

global.showSidebarUi = onOpen;

export { getDocument };
