import { GASClient } from 'gas-client';
import * as server from '../server/main.ts';
import './App.css';

const { serverFunctions } = new GASClient<typeof server>();
function App() {
  const handleClickButton = async () => {
    const document = await serverFunctions.getDocument();
    console.log('🚀 ~ handleClickButton ~ document:', document);
  };

  return (
    <>
      <button onClick={handleClickButton}>Kanji to Romaji</button>
    </>
  );
}

export default App;
