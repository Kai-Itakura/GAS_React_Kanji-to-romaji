import { z } from 'zod';

const POST_CODE = new RegExp('^\\d{3}-?\\d{4}$');
const PHONE_NUMBER = new RegExp('^\\d+$');

export const KanjiFormSchema = z.object({
  postcode: z.string().min(1, '郵便番号は必須です').regex(POST_CODE, '半角数字で入力してください'),
  address: z.string().min(1, '住所は必須です'),
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
