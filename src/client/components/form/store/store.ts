import { KanjiFormType, RomajiDataType } from '@/components/form/types/formTypes';
import { create, StateCreator } from 'zustand';

type KanjiStore = {
  kanjiData: KanjiFormType | undefined;
  setKanjiData: (value: KanjiFormType | undefined) => void;
};

type RomajiStore = {
  romajiData: RomajiDataType | undefined;
  setRomajiData: (value: RomajiDataType | undefined) => void;
};

const createKanjiDataStore: StateCreator<KanjiStore> = (set) => ({
  kanjiData: undefined,
  setKanjiData: (value) => {
    set(() => {
      return { kanjiData: value };
    });
  },
});

const createRomajiData: StateCreator<RomajiStore> = (set) => ({
  romajiData: undefined,
  setRomajiData: (value) => {
    set(() => {
      return { romajiData: value };
    });
  },
});

export const useStore = create<KanjiStore & RomajiStore>((...a) => ({
  ...createKanjiDataStore(...a),
  ...createRomajiData(...a),
}));
