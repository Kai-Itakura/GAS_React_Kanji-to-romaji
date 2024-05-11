import { DoubleArrowDownIcon, DoubleArrowRightIcon } from '@radix-ui/react-icons';
import { useKanjiForm } from './kanjiForm/hooks';
import KanjiForm from './kanjiForm/KanjiForm';
import RomajiForm from './romajiForm/RomajiForm';
import { useMediaQuery } from '@/hooks/mediaQuery.hooks';

const Form = () => {
  const { kanjiForm, onSubmit, romajiData, buttonDisabled } = useKanjiForm();

  const isTablet = useMediaQuery();

  if (romajiData) {
    return (
      <>
        <KanjiForm
          kanjiForm={kanjiForm}
          onSubmit={onSubmit}
          disabled
        />
        {isTablet ? <DoubleArrowDownIcon className='size-1/12' /> : <DoubleArrowRightIcon className='size-1/12' />}
        <RomajiForm
          romajiData={romajiData}
          kanjiData={kanjiForm.getValues()}
          reset={kanjiForm.reset}
        />
      </>
    );
  }

  return (
    <KanjiForm
      kanjiForm={kanjiForm}
      onSubmit={onSubmit}
      buttonDisabled={buttonDisabled}
    />
  );
};

export default Form;
