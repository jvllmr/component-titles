import { createHookTests } from "@jvllmr/component-titles-test";
import type {
  TCreateTitleFunction,
  TTestContextHandler,
} from "@jvllmr/component-titles-test";

import { createRoot, createSignal } from "solid-js";
import { createComponentTitle } from "../createComponentTitle";

import { waitForResolve } from "./testUtils";
import { afterEach } from "vitest";

// collect hook disposes and dispose them at the and of each test
let createdTitlesDispose: (() => void)[] = [];

const createTitle: TCreateTitleFunction = (title: string) => {
  const [dispose, setTitle] = createRoot((dispose) => {
    const [titleSignal, setTitle] = createSignal(title);
    createComponentTitle(titleSignal);
    return [dispose, setTitle];
  });
  const newLength = createdTitlesDispose.push(dispose);
  return {
    unmount: async () => {
      dispose();
      await waitForResolve();
      createdTitlesDispose = createdTitlesDispose.filter(
        (dispose, index) => index === newLength - 1,
      );
    },
    rerender: async (title: string) => {
      setTitle(title);
      await waitForResolve();
    },
  };
};

afterEach(() => {
  for (const dispose of createdTitlesDispose) {
    dispose();
  }
  createdTitlesDispose = [];
});

createHookTests(createTitle);
