import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useRomajiForm } from './hooks';
import { useEffect, useRef } from 'react';
import { KanjiFormType, RomajiDataType } from '../types/formTypes';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger } from '@/components/ui/select';
import { SelectValue } from '@radix-ui/react-select';
import { selectContents } from '../utils/FormValidation';
import { Textarea } from '@/components/ui/textarea';
import UrlDialog from '@/components/dialog/urlDialog';
import { useRomajiStore } from '../store/store';
import FormButtonLayout from '@/components/layout/FormButtonLayout';
import FormAlertDialog from '@/components/dialog/AltertDialog';

type RomajiFormProps = {
  romajiData: RomajiDataType;
  kanjiData: KanjiFormType;
  reset: () => void;
};

const RomajiForm = ({ romajiData, kanjiData, reset }: RomajiFormProps) => {
  const setRomajiData = useRomajiStore((state) => state.setRomajiData);

  const { romajiForm, onSubmit, url, buttonDisabled } = useRomajiForm(romajiData, kanjiData, reset);
  const { control, trigger, watch, formState } = romajiForm;

  // フォーム内のセレクトでzodのバリデーションをトリガーするための処理
  useEffect(() => {
    const subscription = watch((_value, { name }) => {
      if (name === 'selectName') {
        void trigger(['rName1', 'rName2']);
      }
    });

    return () => subscription.unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watch, trigger]);

  // このコンポーネントがマウントされた時にその位置までスムーススクロール
  const formRef = useRef<HTMLFormElement>(null);
  useEffect(() => {
    formRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [formRef]);

  return (
    <>
      <Form {...romajiForm}>
        <form
          onSubmit={onSubmit}
          className='h-fit w-full max-w-2xl bg-slate-50 p-10 rounded-xl border  text-card-foreground shadow'
          ref={formRef}
        >
          <FormField
            control={control}
            name='rPostcode'
            render={({ field }) => (
              <FormItem className='mb-7'>
                <FormLabel className='text-left block'>郵便番号</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage className='text-left' />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name='rAddress'
            render={({ field }) => (
              <FormItem className='mb-7'>
                <FormLabel className='text-left block'>住所</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    wrap='soft'
                    rows={3}
                  />
                </FormControl>
                <FormMessage className='text-left' />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name='rName1'
            render={({ field }) => (
              <FormItem className='mb-6'>
                <FormLabel className='text-left block'>名前１</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage className='text-left' />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name='rName2'
            render={({ field }) => (
              <FormItem className='mb-6'>
                <FormLabel className='text-left block'>名前２</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage className='text-left' />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name='selectName'
            render={({ field }) => (
              <FormItem className='mb-7'>
                <FormLabel className='text-left block'>どちらかの名前を選択</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder='名前を選択してください' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {selectContents.map((content, index) => (
                      <SelectItem
                        key={content}
                        value={content}
                      >
                        名前{index + 1}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage className='text-left' />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name='rPhoneNumber'
            render={({ field }) => (
              <FormItem className='mb-7'>
                <FormLabel className='text-left block'>電話番号</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage className='text-left' />
              </FormItem>
            )}
          />
          <FormButtonLayout>
            <FormAlertDialog
              buttonText='戻る'
              title='日本語のフォームに戻りますか？'
              clickHandler={() => setRomajiData(undefined)}
              buttonDisabled={buttonDisabled}
            />
            <Button
              disabled={!formState.isValid || buttonDisabled}
              type='submit'
            >
              Google Documentを作成
            </Button>
          </FormButtonLayout>
        </form>
      </Form>
      {url && (
        <UrlDialog
          title='作成したドキュメントを開きますか？'
          body={url}
          reset={reset}
        />
      )}
    </>
  );
};

export default RomajiForm;
