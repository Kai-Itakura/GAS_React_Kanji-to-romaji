import { KanjiFormType, RomajiDataType } from '@/components/form/types/formTypes';
import { create } from 'zustand';

type KanjiStore = {
  kanjiData: KanjiFormType | undefined;
  setKanjiData: (value: KanjiFormType | undefined) => void;
};

type RomajiStore = {
  romajiData: RomajiDataType | undefined;
  setRomajiData: (value: RomajiDataType | undefined) => void;
};

export const useKanjiStore = create<KanjiStore>((set) => ({
  kanjiData: undefined,
  setKanjiData: (value) => {
    set(() => {
      return { kanjiData: value };
    });
  },
}));

export const useRomajiStore = create<RomajiStore>((set) => ({
  romajiData: undefined,
  setRomajiData: (value) => {
    set(() => {
      return { romajiData: value };
    });
  },
}));
