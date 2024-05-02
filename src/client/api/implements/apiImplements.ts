import { GetGooLabPseudonymRequest, GetRomajiRequest, GetTokensRequest } from '../requests/requests';
import { GetGooLabPseudonymResponse, GetRomajiResponse, GetTokensResponse } from '../responses/response';

export type FetchApi<Req, Res> = (body: Req) => Promise<Res>;

export interface ApiImplements {
  /**
   * 形態素解析API
   */
  getTokens: FetchApi<GetTokensRequest, GetTokensResponse>;

  /**
   * GooLabかな変換API
   */
  getGooLabPseudonym: FetchApi<GetGooLabPseudonymRequest, GetGooLabPseudonymResponse>;

  /**
   * クロネコかな変換API
   */
  getKuronekoPseudonym: FetchApi<string, string>;

  /**
   * Yahooローマ字変換API
   */
  getRomaji: FetchApi<GetRomajiRequest, GetRomajiResponse>;
}
