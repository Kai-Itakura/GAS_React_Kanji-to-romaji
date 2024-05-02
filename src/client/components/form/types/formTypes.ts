export type KanjiFormType = {
  postcode: string;
  address: string;
  name: string;
  phoneNumber: string;
};

export type RomajiFormType = {
  rPostcode: string;
  rAddress: string;
  rNames: string[];
  rPhoneNumber: string;
};

export type FormData =
  | KanjiFormType
  | (RomajiFormType & {
      converted: boolean;
    });
