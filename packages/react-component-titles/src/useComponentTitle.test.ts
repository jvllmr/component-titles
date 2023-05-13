import {
  createTests,
  TCreateTitleFunction,
} from "@jvllmr/component-titles-test";
import { renderHook } from "@testing-library/react";
import { useComponentTitle } from "./useComponentTitle";

const createTitle: TCreateTitleFunction = (title: string) => {
  return renderHook((newTitle: string) => useComponentTitle(newTitle), {
    initialProps: title,
  });
};

createTests(createTitle);
