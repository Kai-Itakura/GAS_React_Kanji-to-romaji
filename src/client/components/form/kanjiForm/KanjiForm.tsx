import { UseFormReturn } from 'react-hook-form';
import { KanjiFormType } from '../types/formTypes';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { HTMLInputTypeAttribute } from 'react';
import { Button } from '@/components/ui/button';
import { z } from 'zod';
import { KanjiFormSchema } from '../utils/FormValidation';
import { Textarea } from '@/components/ui/textarea';

type KanjiFormProps = {
  kanjiForm: UseFormReturn<z.infer<typeof KanjiFormSchema>>;
  onSubmit: () => Promise<void>;
};

type KanjiFormFields = {
  name: keyof KanjiFormType;
  label: '郵便番号' | '住所' | '名前' | '電話番号';
  type?: HTMLInputTypeAttribute;
};

const KanjiForm = ({ kanjiForm, onSubmit }: KanjiFormProps) => {
  const kanjiFormFields: KanjiFormFields[] = [
    { name: 'postcode', label: '郵便番号' },
    { name: 'address', label: '住所' },
    { name: 'name', label: '名前' },
    { name: 'phoneNumber', label: '電話番号', type: 'tel' },
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
                    />
                  ) : (
                    <Input
                      {...field}
                      type={type}
                    />
                  )}
                </FormControl>
                <FormMessage className='text-left' />
              </FormItem>
            )}
          />
        ))}
        <Button
          disabled={!kanjiForm.formState.isValid}
          type='submit'
        >
          ローマ字に変換
        </Button>
      </form>
    </Form>
  );
};

export default KanjiForm;
