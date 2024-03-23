import { GOO_LAB_API_KEY, GOO_LAB_URL } from './constants';

type TokenizeType = (address: string) => string | undefined;
type FetchType = (sentence: string) => string[][] | undefined;

// 形態素解析
export const tokenize: TokenizeType = (address) => {
  const tokens = fetchGooLabApi(address);

  if (tokens) {
    const katakanaArr = tokens.reduce((acc, curr, index, arr) => {
      const [originalWord, partOfSpeech, convertedWord] = curr;

      if (partOfSpeech === 'Number') {
        return acc + originalWord;
      } else {
        const nextPartOfSpeech = arr[index + 1][1];
        if (nextPartOfSpeech === '名詞接尾辞') {
          return acc + convertedWord;
        } else {
          return acc + convertedWord + ' ';
        }
      }
    }, '');

    return katakanaArr;
  }
};

const fetchGooLabApi: FetchType = (sentence) => {
  const payload: GoogleAppsScript.URL_Fetch.Payload = {
    app_id: GOO_LAB_API_KEY,
    sentence,
  };

  const options: GoogleAppsScript.URL_Fetch.URLFetchRequestOptions = {
    method: 'post',
    payload,
  };

  if (GOO_LAB_URL) {
    try {
      const res = UrlFetchApp.fetch(GOO_LAB_URL, options).getContentText();
      const result = JSON.parse(res).word_list[0] as string[][];
      return result;
    } catch (error) {
      console.error('GooLab APIのデータ取得時にエラーが発生しました。: ', error);
    }
  }
};
