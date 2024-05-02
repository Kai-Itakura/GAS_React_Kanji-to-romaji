export type GetTokensResponse = {
  request_id: string;
  word_list: string[][][];
};

export type GetGooLabPseudonymResponse = {
  request_id: string;
  output_type: 'hiragana' | 'katakana';
  converted: string;
};

type Segment = {
  candidate: string[];
  reading: string;
};

export type GetRomajiResponse = {
  id: string;
  jsonrpc: '2.0';
  result: {
    segment: Segment[];
  };
};
