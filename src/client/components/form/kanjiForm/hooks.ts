import { GASClient } from 'gas-client';
import * as main from '../../../../server/main';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { KanjiFormSchema } from '../utils/FormValidation';
import { KanjiFormType } from '../types/formTypes';
import { useMutation } from '@tanstack/react-query';
import * as z from 'zod';
import { useKanjiStore, useRomajiStore } from '../store/store';
import { useShallow } from 'zustand/react/shallow';

type Server = typeof main;

const { serverFunctions } = new GASClient<Server>();

export const useKanjiForm = () => {
  const { setKanjiData, buttonDisabled, setButtonDisabled } = useKanjiStore(
    useShallow((state) => ({
      setKanjiData: state.setKanjiData,
      buttonDisabled: state.buttonDisabled,
      setButtonDisabled: state.setButtonDisabled,
    }))
  );

  const { romajiData, setRomajiData } = useRomajiStore(
    useShallow((state) => ({
      romajiData: state.romajiData,
      setRomajiData: state.setRomajiData,
    }))
  );

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
      name: '',
      phoneNumber: '08063638429',
    },
  });

  // フォーム送信時の処理
  const onSubmit: SubmitHandler<z.infer<typeof KanjiFormSchema>> = async (kanjiFormData, e) => {
    e?.preventDefault();

    setKanjiData(kanjiFormData);
    formMutation.mutate(kanjiFormData);
  };

  setButtonDisabled(formMutation.isPending);

  return { kanjiForm, onSubmit: kanjiForm.handleSubmit(onSubmit), romajiData, buttonDisabled };
};
