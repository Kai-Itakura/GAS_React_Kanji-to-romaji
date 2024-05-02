import { FormProvider, UseFormReturn } from 'react-hook-form';
import Input from '../../Input/Input';
import { KanjiFormType } from '../types/formTypes';
import Button from '../../button/button';

type KanjiFormProps = {
  methods: UseFormReturn<KanjiFormType>;
  onSubmit: () => Promise<void>;
};

const KanjiForm = ({ methods, onSubmit }: KanjiFormProps) => {
  return (
    <FormProvider {...methods}>
      <form onSubmit={onSubmit}>
        <Input
          name='postcode'
          text='郵便番号'
        />
        <Input
          name='address'
          text='住所'
        />
        <Input
          name='name'
          text='名前'
        />
        <Input
          name='phoneNumber'
          text='電話番号'
          type='tel'
        />
        <Button
          text='ローマ字に変換'
          type='submit'
        />
      </form>
    </FormProvider>
  );
};

export default KanjiForm;
