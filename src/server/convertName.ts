declare const exports: typeof import('./fetch');

type convertNameType = (name: string) => string[] | undefined;
type TConvertToRomajiAll = (texts: (string | undefined)[]) => string[] | undefined;

export const convertName: convertNameType = (name: string) => {
  const converted1 = exports.fetchGooLabKanaApi(name);
  const converted2 = exports.fetchKuronekoApi(name);

  const separatedName1 = splitName(converted1);
  const separatedName2 = splitName(converted2);

  const romajiArr = convertToRomajiAll([separatedName1, separatedName2]);

  return romajiArr;
};

const splitName = (name: string | undefined) => {
  if (name) {
    const nameArr = exports.fetchYahooKanaApi(name);
    const separatedName = nameArr?.join(' ');
    return separatedName;
  }
};

const convertToRomajiAll: TConvertToRomajiAll = (texts) => {
  const url = 'https://www.seonet.jp/useful/hebon/api.php?bmp=yes&word=';
  const urls = texts.map((text) => {
    return url + text;
  });

  try {
    const res = UrlFetchApp.fetchAll(urls);
    const results = res.map((_res) => {
      return _res.getContentText().toUpperCase();
    });
    return results;
  } catch (error) {
    console.error('ローマ字変換APIからのデータ取得中にエラーが発生しました。: ', error);
  }
};
