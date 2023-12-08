import {
  createHookTests,
  TCreateTitleFunction,
} from "@jvllmr/component-titles-test";
import { renderHook } from "@solidjs/testing-library";
import { createRoot, createSignal } from "solid-js";
import { createComponentTitle } from "../createComponentTitle";
import { createOwner } from "solid-js/types/server/reactive.js";
const createTitle: TCreateTitleFunction = (title: string) => {
  const [titleSignal, setTitle] = createSignal(title);
  const { cleanup } = renderHook(createComponentTitle, {
    initialProps: [titleSignal],
  });

  return {
    unmount: cleanup,
    rerender: (title) => setTitle(title),
  };
};

createHookTests(createTitle);
