export type GetTokensRequest = {
  app_id: string;
  sentence: string;
};

export type GetGooLabPseudonymRequest = {
  app_id: string;
  sentence: string;
  output_type: 'hiragana' | 'katakana';
};

export type GetRomajiRequest = {
  id: string;
  jsonrpc: '2.0';
  method: 'jlp.jimservice.conversion';
  params: {
    q: string;
    dictionary: 'name';
  };
};
