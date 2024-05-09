import { GASClient } from 'gas-client';
import * as main from '../../../../server/main';
import { z } from 'zod';
import { romajiFormSchema } from '../utils/FormValidation';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { RomajiDataType, RomajiFormType } from '../types/formTypes';
import { useState } from 'react';

type Server = typeof main;

const { serverFunctions } = new GASClient<Server>();

export const useRomajiForm = ({ rPostcode, rAddress, rName1, rName2, rPhoneNumber }: RomajiDataType) => {
  const [url, setUrl] = useState('');

  const formMutation = useMutation({
    mutationKey: ['romaji'],
    mutationFn: async (romajiFormData: RomajiFormType) => {
      const data = await serverFunctions.createDocument(romajiFormData);
      return data;
    },
    // GASで正常にDocumentが作成されたら、そのDocumentにページ遷移
    onSuccess: (data) => {
      // iOSではwindow.open()が使えないので、stateにurlをセット
      if (!window.open(data, '_blank')) {
        setUrl(data);
      }
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

    formMutation.mutate(filteredData);

    romajiForm.reset();
  };

  return { romajiForm, onSubmit: romajiForm.handleSubmit(onSubmit), url };
};
