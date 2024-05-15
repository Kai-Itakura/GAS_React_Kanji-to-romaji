import { DoubleArrowDownIcon, DoubleArrowRightIcon } from '@radix-ui/react-icons';
import KanjiForm from './kanjiForm/KanjiForm';
import RomajiForm from './romajiForm/RomajiForm';
import { useMediaQuery } from '@/hooks/mediaQuery.hooks';
import { useRomajiStore } from './store/store';

const Form = () => {
  const romajiData = useRomajiStore((state) => state.romajiData);

  const isTablet = useMediaQuery();

  if (romajiData) {
    return (
      <>
        <KanjiForm disabled />
        {isTablet ? <DoubleArrowDownIcon className='size-1/12' /> : <DoubleArrowRightIcon className='size-1/12' />}
        <RomajiForm romajiData={romajiData} />
      </>
    );
  }

  return <KanjiForm />;
};

export default Form;
