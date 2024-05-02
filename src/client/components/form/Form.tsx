import { useKanjiForm } from './kanjiForm/hooks';
import KanjiForm from './kanjiForm/KanjiForm';

const Form = () => {
  const { methods, onSubmit, romajiData } = useKanjiForm();
  console.log('🚀 ~ Form ~ romajiData:', romajiData);

  return (
    <div className='flex justify-center items-center w-screen h-screen'>
      <KanjiForm
        methods={methods}
        onSubmit={onSubmit}
      />
    </div>
  );
};

export default Form;
