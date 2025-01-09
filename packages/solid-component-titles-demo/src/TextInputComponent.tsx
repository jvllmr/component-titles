import { createComponentTitle } from "@jvllmr/solid-component-titles";
import { Setter, createSignal, onCleanup } from "solid-js";

function createDebouncedSetter<TValue>(setter: Setter<TValue>, delay: number) {
  let timerHandle: NodeJS.Timeout;

  // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
  function debouncedSignalSetter(value: Exclude<TValue, Function>) {
    clearTimeout(timerHandle);
    timerHandle = setTimeout(() => setter(value), delay);
  }
  onCleanup(() => clearInterval(timerHandle));
  return debouncedSignalSetter;
}

export default function TextInputComponent() {
  const [value, setValue] = createSignal("");
  const debouncedValueSetter = createDebouncedSetter(setValue, 3000);
  createComponentTitle(value);

  return (
    <div>
      <input
        type="text"
        placeholder="Input new title here"
        onChange={(e) => {
          debouncedValueSetter(e.target.value);
        }}
      />
    </div>
  );
}
