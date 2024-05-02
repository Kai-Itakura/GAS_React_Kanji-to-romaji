import { useKanjiForm } from './kanjiForm/hooks';
import KanjiForm from './kanjiForm/KanjiForm';

const Form = () => {
  const { methods, onSubmit, romajiData } = useKanjiForm();
  console.log('🚀 ~ Form ~ romajiData:', romajiData);

  return (
    <KanjiForm
      methods={methods}
      onSubmit={onSubmit}
    />
  );
};

export default Form;
