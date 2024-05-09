import { DoubleArrowDownIcon, DoubleArrowRightIcon } from '@radix-ui/react-icons';
import { useKanjiForm } from './kanjiForm/hooks';
import KanjiForm from './kanjiForm/KanjiForm';
import RomajiForm from './romajiForm/RomajiForm';
import { useMediaQuery } from '@/hooks/useMediaQuery';

const Form = () => {
  const { kanjiForm, onSubmit, romajiData } = useKanjiForm();

  const isTablet = useMediaQuery();

  return (
    <div className='flex justify-center items-center w-full h-full gap-10 mt-10 tablet:flex-col'>
      <KanjiForm
        kanjiForm={kanjiForm}
        onSubmit={onSubmit}
      />
      {romajiData && (
        <>
          {isTablet ? <DoubleArrowDownIcon className='size-1/12' /> : <DoubleArrowRightIcon className='size-1/12' />}
          <RomajiForm
            romajiData={romajiData}
            kanjiData={kanjiForm.getValues()}
          />
        </>
      )}
    </div>
  );
};

export default Form;
