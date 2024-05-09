import { GASClient } from 'gas-client';
import * as main from '../../../../server/main';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { KanjiFormSchema } from '../utils/FormValidation';
import { KanjiFormType, RomajiDataType } from '../types/formTypes';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import * as z from 'zod';

type Server = typeof main;

const { serverFunctions } = new GASClient<Server>();

export const useKanjiForm = () => {
  const [romajiData, setRomajiData] = useState<RomajiDataType>();

  const formMutation = useMutation({
    mutationKey: ['kanji'],
    mutationFn: async (kanjiFromData: KanjiFormType) => {
      const data = await serverFunctions.convertKanjiToRomaji(kanjiFromData);
      return data;
    },
    onSuccess: (data) => {
      setRomajiData(data);
    },
  });

  // フォームメソッド
  const kanjiForm = useForm<z.infer<typeof KanjiFormSchema>>({
    mode: 'onChange',
    resolver: zodResolver(KanjiFormSchema),
    defaultValues: {
      postcode: '532-0002',
      address: '大阪府大阪市淀川区東三国6-17-25-805',
      name: '板倉海',
      phoneNumber: '08063638429',
    },
  });

  // フォーム送信時の処理
  const onSubmit: SubmitHandler<z.infer<typeof KanjiFormSchema>> = async (kanjiFormData, e) => {
    e?.preventDefault();

    formMutation.mutate(kanjiFormData);

    // フォームのリセット
    kanjiForm.reset();
  };

  return { kanjiForm, onSubmit: kanjiForm.handleSubmit(onSubmit), romajiData };
};
