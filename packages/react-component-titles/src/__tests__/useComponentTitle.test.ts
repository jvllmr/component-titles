import {
  createHookTests,
  TCreateTitleFunction,
} from "@jvllmr/component-titles-test";
import { renderHook } from "@testing-library/react";
import { useComponentTitle } from "../useComponentTitle";

const createTitle: TCreateTitleFunction = (title: string) => {
  const renderResult = renderHook(
    (newTitle: string) => useComponentTitle(newTitle),
    {
      initialProps: title,
    },
  );

  return {
    ...renderResult,
    rerender: async (title) => {
      renderResult.rerender(title);
    },
    unmount: async () => {
      renderResult.unmount();
    },
  };
};

createHookTests(createTitle);
