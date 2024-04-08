import {
  GOO_LAB_API_KEY,
  GOO_LAB_KANA_URL,
  GOO_LAB_TOKENIZE_URL,
  KURONEKO_URL,
  YAHOO_API_KEY,
  YAHOO_KANA_URL,
} from './constants';

type TFetchApi<T> = (sentence: string) => T | undefined;

const fetchGooLabTokenizeApi: TFetchApi<string[][]> = (sentence) => {
  const payload: GoogleAppsScript.URL_Fetch.Payload = {
    app_id: GOO_LAB_API_KEY,
    sentence,
  };

  const options: GoogleAppsScript.URL_Fetch.URLFetchRequestOptions = {
    method: 'post',
    payload,
  };

  if (GOO_LAB_TOKENIZE_URL) {
    try {
      const res = UrlFetchApp.fetch(GOO_LAB_TOKENIZE_URL, options).getContentText();
      const result = JSON.parse(res).word_list[0] as string[][];
      return result;
    } catch (error) {
      console.error('GooLab APIのデータ取得時にエラーが発生しました。: ', error);
    }
  }
};

const fetchGooLabKanaApi: TFetchApi<string> = (sentence) => {
  const payload: GoogleAppsScript.URL_Fetch.Payload = {
    app_id: GOO_LAB_API_KEY,
    sentence,
    output_type: 'hiragana',
  };

  const options: GoogleAppsScript.URL_Fetch.URLFetchRequestOptions = {
    method: 'post',
    payload,
  };

  if (GOO_LAB_KANA_URL) {
    try {
      const res = UrlFetchApp.fetch(GOO_LAB_KANA_URL, options).getContentText();
      const result = JSON.parse(res).converted satisfies string;
      return result;
    } catch (error) {
      console.error('GooLab APIのデータ取得時にエラーが発生しました。: ', error);
    }
  }
};

const fetchKuronekoApi: TFetchApi<string> = (sentence) => {
  const encodedSentence = encodeURIComponent(sentence);
  const url = `${KURONEKO_URL}?text=${encodedSentence}`;

  try {
    const res = UrlFetchApp.fetch(url).getContentText();
    console.log('🚀 ~ res:', res);
    return res;
  } catch (error) {
    console.error('Kuroneko APIのデータ取得時にエラーが発生しました。: ', error);
  }
};

const fetchYahooKanaApi: TFetchApi<string[]> = (sentence) => {
  const url = `${YAHOO_KANA_URL}?appid=${YAHOO_API_KEY}`;

  const payload: GoogleAppsScript.URL_Fetch.Payload = {
    id: 'convert_name',
    jsonrpc: '2.0',
    method: 'jlp.jimservice.conversion',
    params: {
      q: sentence,
      dictionary: 'name',
    },
  };

  const options: GoogleAppsScript.URL_Fetch.URLFetchRequestOptions = {
    method: 'post',
    payload: JSON.stringify(payload),
  };

  try {
    const res = UrlFetchApp.fetch(url, options).getContentText();
    console.log('🚀 ~ res:', res);
    const segments = JSON.parse(res).result.segment;
    const readings = segments.map((segment: { candidate: object[]; reading: string }) => {
      return segment.reading;
    }) satisfies string[];
    return readings;
  } catch (error) {
    console.error('YAHOO APIのデータ取得時にエラーが発生しました。', error);
  }
};

export { fetchGooLabTokenizeApi, fetchGooLabKanaApi, fetchKuronekoApi, fetchYahooKanaApi };
