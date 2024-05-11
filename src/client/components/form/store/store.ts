import { KanjiFormType, RomajiDataType } from '@/components/form/types/formTypes';
import { create } from 'zustand';

type KanjiStore = {
  kanjiData: KanjiFormType | undefined;
  buttonDisabled: boolean;
  setKanjiData: (value: KanjiFormType | undefined) => void;
  setButtonDisabled: (value: boolean) => void;
};

type RomajiStore = {
  romajiData: RomajiDataType | undefined;
  buttonDisabled: boolean;
  setRomajiData: (value: RomajiDataType | undefined) => void;
  setButtonDisabled: (value: boolean) => void;
};

export const useKanjiStore = create<KanjiStore>((set) => ({
  kanjiData: undefined,
  buttonDisabled: false,
  setKanjiData: (value) => {
    set(() => {
      return { kanjiData: value };
    });
  },
  setButtonDisabled: (value) => {
    set(() => {
      return { buttonDisabled: value };
    });
  },
}));

export const useRomajiStore = create<RomajiStore>((set) => ({
  romajiData: undefined,
  buttonDisabled: false,
  setRomajiData: (value) => {
    set(() => {
      return { romajiData: value };
    });
  },
  setButtonDisabled: (value) => {
    set(() => {
      return { buttonDisabled: value };
    });
  },
}));
