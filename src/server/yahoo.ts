import { YAHOO_API_KEY, YAHOO_URL } from './constants';

type TokenizeType = (address: string) => string[][] | undefined;

export const tokenizeByYahoo: TokenizeType = (address: string) => {
  const url = `${YAHOO_URL}?appid=${YAHOO_API_KEY}`;

  address = ` 531-0076
              大阪市北区大淀中3-11-32-806

              532-0002
              大阪府大阪市淀川区東三国6-17-25-805
            `;

  const payload: GoogleAppsScript.URL_Fetch.Payload = {
    id: 'address',
    jsonrpc: '2.0',
    method: 'jlp.maservice.parse',
    params: { q: address },
  };

  const options: GoogleAppsScript.URL_Fetch.URLFetchRequestOptions = {
    method: 'post',
    payload: JSON.stringify(payload),
    muteHttpExceptions: true,
  };

  try {
    const res = UrlFetchApp.fetch(url, options).getContentText();
    const result = JSON.parse(res).result.tokens as string[][];
    console.log('🚀 ~ result:', result);
    return result;
  } catch (error) {
    console.error('Yahoo APIのデータ取得時にエラーが発生しました。: ', error);
  }
};
