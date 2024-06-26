import { GASClient } from 'gas-client';
import * as main from '../../../../server/main';
import { z } from 'zod';
import { KanjiFormSchema, romajiFormSchema } from '../utils/FormValidation';
import { SubmitHandler, UseFormReset, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { KanjiFormType, RomajiDataType, RomajiFormType } from '../types/formTypes';
import { useState } from 'react';
import { useKanjiStore, useRomajiStore } from '../store/store';
import { useShallow } from 'zustand/react/shallow';

type Server = typeof main;

type MutationFnArg = {
  romajiFormData: RomajiFormType;
  kanjiData: KanjiFormType;
};

const { serverFunctions } = new GASClient<Server>();

export const useRomajiForm = (
  { rPostcode, rAddress, rName1, rName2, rPhoneNumber }: RomajiDataType,
  reset: UseFormReset<z.infer<typeof KanjiFormSchema>>
) => {
  const [url, setUrl] = useState('');

  const { kanjiData, setKanjiData } = useKanjiStore(
    useShallow((state) => ({
      kanjiData: state.kanjiData!,
      setKanjiData: state.setKanjiData,
    }))
  );

  const setRomajiData = useRomajiStore((state) => state.setRomajiData);

  const formMutation = useMutation({
    mutationKey: ['romaji'],
    mutationFn: async ({ romajiFormData, kanjiData }: MutationFnArg) => {
      const data = await serverFunctions.createDocument(romajiFormData, kanjiData);
      return data;
    },
    // GASで正常にDocumentが作成されたら、そのDocumentにページ遷移
    onSuccess: (data) => {
      // iOSではwindow.open()が使えないので、stateにurlをセット
      if (!window.open(data, '_blank')) {
        setUrl(data);
      } else {
        setRomajiData(undefined);
        setKanjiData(undefined);
        reset();
      }
      setUrl(data);
    },
  });

  // フォームメソッド
  const romajiForm = useForm<z.infer<typeof romajiFormSchema>>({
    mode: 'onChange',
    resolver: zodResolver(romajiFormSchema),
    defaultValues: {
      rPostcode: rPostcode,
      rAddress: rAddress,
      rName1: rName1,
      rName2: rName2,
      selectName: undefined,
      rPhoneNumber: rPhoneNumber,
    },
  });

  // フォーム送信時の処理
  const onSubmit: SubmitHandler<z.infer<typeof romajiFormSchema>> = async (
    { rPostcode, rAddress, rName1, rName2, rPhoneNumber, selectName },
    e
  ) => {
    e?.preventDefault();

    const filteredData: RomajiFormType = {
      rPostcode,
      rAddress,
      rName: selectName === 'rName1' ? rName1! : rName2!,
      rPhoneNumber,
    };

    formMutation.mutate({ romajiFormData: filteredData, kanjiData });

    romajiForm.reset();
  };

  return { romajiForm, onSubmit: romajiForm.handleSubmit(onSubmit), url, isPending: formMutation.isPending };
};
