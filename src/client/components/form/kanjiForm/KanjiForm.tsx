import { UseFormReturn } from 'react-hook-form';
import { KanjiFormType } from '../types/formTypes';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { HTMLInputTypeAttribute } from 'react';
import { Button } from '@/components/ui/button';
import { z } from 'zod';
import { KanjiFormSchema } from '../utils/FormValidation';
import { Textarea } from '@/components/ui/textarea';
import FormButtonLayout from '@/components/layout/FormButtonLayout';
import FormAlertDialog from '@/components/dialog/AltertDialog';

type KanjiFormProps = {
  kanjiForm: UseFormReturn<z.infer<typeof KanjiFormSchema>>;
  onSubmit: () => Promise<void>;
  disabled?: boolean;
  buttonDisabled?: boolean;
};

type KanjiFormFields = {
  name: keyof KanjiFormType;
  label: '郵便番号' | '住所' | '名前' | '電話番号';
  type?: HTMLInputTypeAttribute;
  disabled?: boolean;
};

const KanjiForm = ({ kanjiForm, onSubmit, disabled, buttonDisabled }: KanjiFormProps) => {
  const kanjiFormFields: KanjiFormFields[] = [
    { name: 'postcode', label: '郵便番号', disabled: disabled },
    { name: 'address', label: '住所', disabled: disabled },
    { name: 'name', label: '名前', disabled: disabled },
    { name: 'phoneNumber', label: '電話番号', type: 'tel', disabled: disabled },
  ];

  return (
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
              <FormItem className='mb-7'>
                <FormLabel className='text-left block'>{label}</FormLabel>
                <FormControl>
                  {name === 'address' ? (
                    <Textarea
                      {...field}
                      wrap='soft'
                      disabled={disabled}
                    />
                  ) : (
                    <Input
                      {...field}
                      type={type}
                      disabled={disabled}
                    />
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
            buttonDisabled={disabled || buttonDisabled}
          />
          <Button
            disabled={!kanjiForm.formState.isValid || disabled || buttonDisabled}
            type='submit'
          >
            ローマ字に変換
          </Button>
        </FormButtonLayout>
      </form>
    </Form>
  );
};

export default KanjiForm;
