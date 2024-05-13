import { useQuery } from '@tanstack/react-query';

const BASE_URL = import.meta.env.VITE_ZIPCLOUD_URL;

export const useFetch = <T>(query: T) => {
  const { data, isSuccess, isError, error } = useQuery({
    queryKey: ['zipcloud', query],
    queryFn: async () => {
      const res = await fetch(BASE_URL + query);
      const result = await res.json();
      return result;
    },
    enabled: false,
  });

  if (isSuccess) {
    console.log('success: ', data);
  } else if (isError) {
    console.error('error: ', error);
  }
};
