declare const exports: typeof import('./fetch');

type TTokenize = (address: string) => string | undefined;
type TConvertToRomaji = (text: string) => string | undefined;

// 形態素解析
export const tokenizeAddress: TTokenize = (address) => {
  const tokens = exports.fetchGooLabTokenizeApi(address);

  if (tokens) {
    const katakana = tokens.reduce((acc, curr, index, arr) => {
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

    const romaji = convertToRomaji(katakana);
    return romaji;
  }
};

const convertToRomaji: TConvertToRomaji = (text) => {
  const url = `https://www.seonet.jp/useful/hebon/api.php?bmp=yes&word=${text}`;
  try {
    const res = UrlFetchApp.fetch(url).getContentText();
    return res.toUpperCase();
  } catch (error) {
    console.error('ローマ字変換APIからのデータ取得中にエラーが発生しました。: ', error);
  }
};
