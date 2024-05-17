import { DoubleArrowDownIcon, DoubleArrowRightIcon } from '@radix-ui/react-icons';
import KanjiForm from './kanjiForm/KanjiForm';
import RomajiForm from './romajiForm/RomajiForm';
import { useMediaQuery } from '@/hooks/mediaQuery.hooks';
import { useRomajiStore } from './store/store';
import { useKanjiForm } from './kanjiForm/hooks';

const Form = () => {
  const { kanjiForm, onSubmit, isPending } = useKanjiForm();

  const romajiData = useRomajiStore((state) => state.romajiData);

  const isTablet = useMediaQuery();

  if (romajiData) {
    return (
      <>
        <KanjiForm
          disabled
          onSubmit={onSubmit}
          isPending={isPending}
          kanjiForm={kanjiForm}
        />
        {isTablet ? <DoubleArrowDownIcon className='size-1/12' /> : <DoubleArrowRightIcon className='size-1/12' />}
        <RomajiForm
          romajiData={romajiData}
          reset={kanjiForm.reset}
        />
      </>
    );
  }

  return (
    <KanjiForm
      onSubmit={onSubmit}
      isPending={isPending}
      kanjiForm={kanjiForm}
    />
  );
};

export default Form;
