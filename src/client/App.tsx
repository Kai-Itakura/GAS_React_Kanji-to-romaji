import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './App.css';
import Form from './components/form/Form.tsx';
import FormLayout from './components/layout/FormLayout.tsx';
import { Toaster } from './components/ui/toaster.tsx';

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <h1 className='m-5 text-xl font-bold'>ローマ字変換フォーム</h1>
      <QueryClientProvider client={queryClient}>
        <FormLayout>
          <Form />
        </FormLayout>
      </QueryClientProvider>
      <Toaster />
    </>
  );
}

export default App;
