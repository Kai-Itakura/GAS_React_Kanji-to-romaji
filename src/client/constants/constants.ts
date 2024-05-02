import { z } from 'zod';

const keyRegxp = new RegExp('[a-zA-Z0-9]+');

const envSchema = z.object({
  GOO_LAB_API_KEY: z.string().regex(keyRegxp),
  GOO_LAB_KANA_URL: z.string().url(),
  GOO_LAB_TOKENIZE_URL: z.string(),
  KURONEKO_URL: z.string().url(),
  YAHOO_API_KEY: z.string().regex(keyRegxp),
  YAHOO_KANA_URL: z.string().url(),
});

const clientEnv = {
  GOO_LAB_API_KEY: process.env.GOO_LAB_API_KEY,
  GOO_LAB_KANA_URL: process.env.GOO_LAB_KANA_URL,
  GOO_LAB_TOKENIZE_URL: process.env.GOO_LAB_TOKENIZE_URL,
  KURONEKO_URL: process.env.KURONEKO_URL,
  YAHOO_API_KEY: process.env.YAHOO_API_KEY,
  YAHOO_KANA_URL: process.env.YAHOO_KANA_URL,
};

const _clientEnv = envSchema.safeParse(clientEnv);

if (!_clientEnv.success) {
  console.error(_clientEnv.error.format());
  process.exit(1);
}

const parsedEnv = _clientEnv.data;

export { parsedEnv };
