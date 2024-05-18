import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '../ui/button';

type FormAlertDialogProps = {
  buttonText: string;
  title: string;
  buttonDisabled?: boolean;
  clickHandler: React.MouseEventHandler<HTMLButtonElement>;
};

const FormAlertDialog = ({ buttonText, title, buttonDisabled, clickHandler }: FormAlertDialogProps) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button disabled={buttonDisabled}>{buttonText}</Button>
      </AlertDialogTrigger>
      <AlertDialogContent className='rounded-lg w-[80%] block max-w-sm'>
        <AlertDialogHeader className='mb-4'>
          <AlertDialogTitle>{title}</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>いいえ</AlertDialogCancel>
          <AlertDialogAction onClick={clickHandler}>はい</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default FormAlertDialog;
