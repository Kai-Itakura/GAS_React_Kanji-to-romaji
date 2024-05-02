import { UseFormReturn } from 'react-hook-form';
import { KanjiFormType } from '../types/formTypes';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { HTMLInputTypeAttribute } from 'react';
import { Button } from '@/components/ui/button';

type KanjiFormProps = {
  methods: UseFormReturn<KanjiFormType>;
  onSubmit: () => Promise<void>;
};

type KanjiFormFields = {
  name: keyof KanjiFormType;
  label: '郵便番号' | '住所' | '名前' | '電話番号';
  type?: HTMLInputTypeAttribute;
};

const KanjiForm = ({ methods, onSubmit }: KanjiFormProps) => {
  const kanjiFormFields: KanjiFormFields[] = [
    { name: 'postcode', label: '郵便番号' },
    { name: 'address', label: '住所' },
    { name: 'name', label: '名前' },
    { name: 'phoneNumber', label: '電話番号', type: 'tel' },
  ];

  return (
    <Form {...methods}>
      <form
        onSubmit={onSubmit}
        className='h-fit w-1/2'
      >
        {kanjiFormFields.map(({ name, label, type }) => (
          <FormField
            key={name}
            control={methods.control}
            name={name}
            render={({ field }) => (
              <FormItem className='mb-8'>
                <FormLabel className='text-left block'>{label}</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type={type}
                  />
                </FormControl>
                <FormMessage className='text-left' />
              </FormItem>
            )}
          />
        ))}
        <Button type='submit'>ローマ字に変換</Button>
      </form>
    </Form>
  );
};

export default KanjiForm;
