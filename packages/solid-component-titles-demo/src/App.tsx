import { createComponentTitle } from "@jvllmr/solid-component-titles";
import { TitleButtonComponent } from "./TitleComponent";
import TextInputComponent from "./TextInputComponent";
function App() {
  createComponentTitle(() => "Component-titles Solid.js Demo");

  return (
    <div>
      <div style={{ display: "flex" }}>
        <TitleButtonComponent title="1st" />
        <TitleButtonComponent title="2nd" />
        <TitleButtonComponent title="3nd" />
      </div>
      <div>
        <TextInputComponent />
      </div>
    </div>
  );
}
export default App;
