import { GASClient } from 'gas-client';
import * as main from '../../../../server/main';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { KanjiFormSchema } from '../utils/FormValidation';
import { KanjiFormType, RomajiFormType } from '../types/formTypes';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import * as z from 'zod';

type Server = typeof main;

const { serverFunctions } = new GASClient<Server>();

export const useKanjiForm = () => {
  const [romajiData, setRomajiData] = useState<RomajiFormType>();

  const formMutation = useMutation({
    mutationKey: ['romaji'],
    mutationFn: async (kanjiFromData: KanjiFormType) => {
      const data = await serverFunctions.convertKanjiToRomaji(kanjiFromData);
      return data;
    },
    onSuccess: (data) => {
      setRomajiData(data);
    },
  });

  // フォームメソッド
  const methods = useForm<z.infer<typeof KanjiFormSchema>>({
    mode: 'onChange',
    resolver: zodResolver(KanjiFormSchema),
    defaultValues: {
      postcode: '',
      address: '',
      name: '',
      phoneNumber: '',
    },
  });

  const onSubmit: SubmitHandler<KanjiFormType> = async (kanjiFormData, e) => {
    e?.preventDefault();

    formMutation.mutate(kanjiFormData);

    // フォームのリセット
    methods.reset();
  };

  return { methods, onSubmit: methods.handleSubmit(onSubmit), romajiData };
};
