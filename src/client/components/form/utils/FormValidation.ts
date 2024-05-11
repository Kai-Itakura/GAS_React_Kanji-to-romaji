import { z } from 'zod';

const POST_CODE = new RegExp('^\\d{3}-?\\d{4}$');
const PHONE_NUMBER = new RegExp('^\\d+$');
const ADDRESS_REGEX = new RegExp('^.*(\\d+[-\\d]*)$');

export const KanjiFormSchema = z.object({
  postcode: z.string().min(1, '郵便番号は必須です').regex(POST_CODE, '半角数字で入力してください'),
  address: z
    .string()
    .min(1, '住所は必須です')
    .regex(ADDRESS_REGEX, '番地以降はハイフンと半角数字で入力してください　例：1-6-19-904'),
  name: z
    .string()
    .min(1, '名前は必須です')
    .refine((value) => {
      return Boolean(value.trim().length);
    }, '空白は使用できません'),
  phoneNumber: z
    .string()
    .min(1, '電話番号は必須です')
    .regex(PHONE_NUMBER, '半角英数字のみ入力してください（ハイフンなどは使えません）'),
});

const ROMAJI_POST_CODE = new RegExp('\\d{7}');
const ROMAJI_PHONE_NUMBER = new RegExp('^\\+[\\d]{1,3}[\\s.-]?(\\d{1,4}[\\s.-]?){2,4}\\d{1,4}$');

export const selectContents = ['rName1', 'rName2'] as const;

export const romajiFormSchema = z
  .object({
    rPostcode: z.string().min(1, '郵便番号は必須です').regex(ROMAJI_POST_CODE, '半角英数字で入力してください'),
    rAddress: z.string().min(1, '住所は必須です'),
    rName1: z.string().optional(),
    rName2: z.string().optional(),
    selectName: z.enum(selectContents, {
      required_error: 'どちらかの名前を選んでください',
      invalid_type_error: 'どちらかの名前を選んでください',
    }),
    rPhoneNumber: z
      .string()
      .min(1, '電話番号は必須です')
      .regex(ROMAJI_PHONE_NUMBER, '電話番号の形式が無効です。国際形式で入力してください　例: +811234567890'),
  })
  .superRefine((val, ctx) => {
    if (val.selectName === 'rName1' && !val.rName1) {
      ctx.addIssue({
        path: ['rName1'],
        code: z.ZodIssueCode.custom,
        message: '選択された名前フィールドは必須です',
      });
    } else if (val.selectName === 'rName2' && !val.rName2) {
      ctx.addIssue({
        path: ['rName2'],
        code: z.ZodIssueCode.custom,
        message: '選択された名前フィールドは必須です',
      });
    }

    return true;
  });
