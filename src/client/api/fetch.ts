import { useToast } from '@/components/ui/use-toast';
import { cn } from '@/lib/utils';
import { useMutation } from '@tanstack/react-query';

type GetPostCodeResult = {
  message: string;
  status: number;
  results: {
    address1: string;
    address2: string;
    address3: string;
    kana1: string;
    kana2: string;
    kana3: string;
    prefcode: string;
    zipcode: string;
  }[];
};

const BASE_URL = import.meta.env.VITE_ZIPCLOUD_URL;

export const useGetPostcode = <T>() => {
  const { toast } = useToast();

  const mutationReturn = useMutation({
    mutationKey: ['zipcloud'],
    mutationFn: async (query: T): Promise<string> => {
      try {
        const res = await fetch(BASE_URL + query);
        const result: GetPostCodeResult = await res.json();
        const { address1, address2, address3 } = result.results[0];
        return address1 + address2 + address3;
      } catch (error) {
        throw new Error('住所が見つかりませんでした');
      }
    },
    onError: (error) => {
      toast({ description: error.message, variant: 'textRed', className: cn('right-0') });
    },
  });

  return mutationReturn;
};
