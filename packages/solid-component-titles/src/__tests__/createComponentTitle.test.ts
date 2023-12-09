import { createHookTests } from "@jvllmr/component-titles-test";
import type { TCreateTitleFunction } from "@jvllmr/component-titles-test";

import { createRoot, createSignal } from "solid-js";
import { createComponentTitle } from "../createComponentTitle";

import { waitForResolve } from "./testUtils";

const createTitle: TCreateTitleFunction = (title: string) => {
  const [dispose, setTitle] = createRoot((dispose) => {
    const [titleSignal, setTitle] = createSignal(title);
    createComponentTitle(titleSignal);
    return [dispose, setTitle];
  });

  return {
    unmount: async () => {
      dispose();
      await waitForResolve();
    },
    rerender: async (title: string) => {
      setTitle(title);
      await waitForResolve();
    },
  };
};

createHookTests(createTitle);
