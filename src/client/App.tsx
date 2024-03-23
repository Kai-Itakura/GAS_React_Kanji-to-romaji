import { GASClient } from 'gas-client';
import * as main from '../server/main.ts';
import './App.css';

type Server = typeof main;

const { serverFunctions } = new GASClient<Server>();
function App() {
  const handleClickButton = async () => {
    const textArr = await serverFunctions.getTargetText();
    console.log('🚀 ~ handleClickButton ~ textArr:', textArr);
    await serverFunctions.showModalDialog(textArr);
  };

  return (
    <>
      <button onClick={handleClickButton}>ローマ字に変換</button>
    </>
  );
}

export default App;
