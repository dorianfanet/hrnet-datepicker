import { render } from "react-dom";
import { DatePicker } from "./lib";

const App = () => (
  <div style={{ width: 640, margin: "15px auto" }}>
    <DatePicker label="Date"/>
  </div>
);

render(<App />, document.getElementById("root"));
