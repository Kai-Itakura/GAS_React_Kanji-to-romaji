import { parsedEnv } from '../../constants/constants';
import { ApiImplements, FetchApi } from '../implements/apiImplements';
import { GetGooLabPseudonymRequest, GetRomajiRequest, GetTokensRequest } from '../requests/requests';
import { GetGooLabPseudonymResponse, GetRomajiResponse, GetTokensResponse } from '../responses/response';

const { GOO_LAB_KANA_URL, GOO_LAB_TOKENIZE_URL, YAHOO_KANA_URL, KURONEKO_URL, YAHOO_API_KEY } = parsedEnv;

class ConvertApi implements ApiImplements {
  /**
   * 形態素解析API
   * @param body
   * @returns 形態素トークン
   */
  public getTokens: FetchApi<GetTokensRequest, GetTokensResponse> = async (body) => {
    const res = await fetch(GOO_LAB_TOKENIZE_URL, { method: 'post', body: JSON.stringify(body) });

    return await res.json();
  };

  /**
   * GooLabかな変換API
   * @param body
   * @returns ひらがな
   */
  public getGooLabPseudonym: FetchApi<GetGooLabPseudonymRequest, GetGooLabPseudonymResponse> = async (body) => {
    const res = await fetch(GOO_LAB_KANA_URL, { method: 'post', body: JSON.stringify(body) });

    return await res.json();
  };

  public getKuronekoPseudonym: FetchApi<string, string> = async (sentence) => {
    const res = await fetch(KURONEKO_URL + `?text=${sentence}`);

    return res.json();
  };

  public getRomaji: FetchApi<GetRomajiRequest, GetRomajiResponse> = async (body) => {
    const res = await fetch(YAHOO_KANA_URL, {
      method: 'post',
      headers: { 'User-Agent': `Yahoo AppID: ${YAHOO_API_KEY}` },
      body: JSON.stringify(body),
    });

    return await res.json();
  };
}

export const convertApi = new ConvertApi();
