import { SubmitHandler, useForm } from 'react-hook-form';

type FormData = {
  postcode: string;
  address: string;
  name: string;
  phoneNumber: string;
};

const Form = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = (data, e) => {
    e?.preventDefault();

    console.log('🚀 ~ Form ~ data:', data);

    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor='postcode'>郵便番号</label>
      <input {...register('postcode')} />
      {errors.postcode && <p>{errors.postcode.message}</p>}
      <label htmlFor='address'>住所</label>
      <input {...register('address')} />
      {errors.address && <p>{errors.address.message}</p>}
      <label htmlFor='name'>名前</label>
      <input {...register('name')} />
      {errors.name && <p>{errors.name.message}</p>}
      <label htmlFor='phone_number'>電話番号</label>
      <input
        type='tel'
        {...register('phoneNumber')}
      />
      {errors.phoneNumber && <p>{errors.phoneNumber.message}</p>}
      <button type='submit'>ローマ字に変換</button>
    </form>
  );
};

export default Form;
