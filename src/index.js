import { DatePicker } from "./lib";
import ReactDOM from 'react-dom/client';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <App />
);

function App(){

  function handleOnChange(){
    console.log('change')
  }

  return (
    <div style={{ width: 640, margin: "15px auto" }}>
      <DatePicker label="Date" onChange={handleOnChange}/>
    </div>
  )
}