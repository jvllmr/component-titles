import {
  createHookTests,
  TCreateTitleFunction,
} from "@jvllmr/component-titles-test";
import { renderHook } from "@solidjs/testing-library";
import { createSignal } from "solid-js";
import { useComponentTitle } from "./useComponentTitle";
const createTitle: TCreateTitleFunction = (title: string) => {
  const [titleSignal, setTitle] = createSignal(title);
  const { cleanup } = renderHook(useComponentTitle, {
    initialProps: [titleSignal()],
  });

  return {
    unmount: cleanup,
    rerender: (title) =>
      queueMicrotask(() => {
        setTitle(title);
      }),
  };
};

createHookTests(createTitle);
