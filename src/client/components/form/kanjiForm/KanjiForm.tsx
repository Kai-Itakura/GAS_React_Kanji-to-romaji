import { KanjiFormType } from '../types/formTypes';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import React, { BaseSyntheticEvent, HTMLInputTypeAttribute, useEffect } from 'react';
import { KanjiFormSchema } from '../utils/FormValidation';
import { Textarea } from '@/components/ui/textarea';
import FormButtonLayout from '@/components/layout/FormButtonLayout';
import FormAlertDialog from '@/components/dialog/AltertDialog';
import { LoadingButton } from '@/components/ui/loadingButton';
import { useGetPostcode } from '@/api/fetch';
import { UseFormReturn } from 'react-hook-form';
import { z } from 'zod';

type KanjiFormProps = {
  disabled?: boolean;
  kanjiForm: UseFormReturn<z.infer<typeof KanjiFormSchema>>;
  onSubmit: (e: BaseSyntheticEvent) => Promise<void>;
  isPending: boolean;
};

type KanjiFormFields = {
  name: keyof KanjiFormType;
  label: '郵便番号' | '住所' | '名前' | '電話番号';
  type?: HTMLInputTypeAttribute;
  disabled?: boolean;
};

const KanjiForm = ({ disabled, kanjiForm, onSubmit, isPending }: KanjiFormProps) => {
  const kanjiFormFields: KanjiFormFields[] = [
    { name: 'postcode', label: '郵便番号', disabled: disabled },
    { name: 'address', label: '住所', disabled: disabled },
    { name: 'name', label: '名前', disabled: disabled },
    { name: 'phoneNumber', label: '電話番号', type: 'tel', disabled: disabled },
  ];

  const { success, data } = KanjiFormSchema.shape.postcode.safeParse(kanjiForm.getValues('postcode'));

  const { mutate, data: addressData, isSuccess, isPending: isGetPostcodePending } = useGetPostcode();

  const handleSearchButtonClick = (e: React.BaseSyntheticEvent) => {
    e.preventDefault();
    mutate(data);
  };

  useEffect(() => {
    if (isSuccess) {
      kanjiForm.setValue('address', addressData, { shouldValidate: true, shouldDirty: true, shouldTouch: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addressData, isSuccess]);

  return (
    <>
      <Form {...kanjiForm}>
        <form
          onSubmit={onSubmit}
          className='h-fit w-full max-w-2xl bg-slate-50 p-10 rounded-xl border  text-card-foreground shadow'
        >
          {kanjiFormFields.map(({ name, label, type }) => (
            <FormField
              key={name}
              control={kanjiForm.control}
              name={name}
              render={({ field }) => (
                <FormItem className='mb-7 text-left'>
                  <FormLabel className='text-left'>{label}</FormLabel>
                  {name === 'postcode' ? (
                    <LoadingButton
                      variant='default'
                      size='sm'
                      className='ml-3 p-1 text-xs h-auto'
                      disabled={!success || isPending || disabled}
                      loading={isGetPostcodePending}
                      onClick={handleSearchButtonClick}
                    >
                      {isGetPostcodePending ? '住所を検索中' : '住所を検索'}
                    </LoadingButton>
                  ) : null}
                  <FormControl>
                    {name === 'address' ? (
                      <Textarea
                        {...field}
                        wrap='soft'
                        disabled={disabled || isPending}
                      />
                    ) : (
                      <>
                        <Input
                          {...field}
                          type={type}
                          disabled={disabled || isPending}
                        />
                      </>
                    )}
                  </FormControl>
                  <FormMessage className='text-left' />
                </FormItem>
              )}
            />
          ))}
          <FormButtonLayout>
            <FormAlertDialog
              buttonText='リセット'
              title='フォームをリセットしますか？'
              clickHandler={() => {
                kanjiForm.reset();
              }}
              buttonDisabled={disabled || isPending}
            />
            <LoadingButton
              type='submit'
              loading={isPending}
              disabled={disabled || isPending}
            >
              {isPending ? 'ローマ字に変換中' : 'ローマ字に変換'}
            </LoadingButton>
          </FormButtonLayout>
        </form>
      </Form>
    </>
  );
};

export default KanjiForm;
