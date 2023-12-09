import { createSignal } from "solid-js";
import { createComponentTitle } from "@jvllmr/solid-component-titles";
import { TitleButtonComponent } from "./TitleComponent";
function App() {
  createComponentTitle(() => "Component-titles Solid.js Demo");

  return (
    <div>
      <TitleButtonComponent title="1st" />
      <TitleButtonComponent title="2nd" />
      <TitleButtonComponent title="3nd" />
    </div>
  );
}
export default App;
