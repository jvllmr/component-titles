import {
	createTests,
	TCreateTitleFunction,
} from "@jvllmr/component-titles-test";
import { renderHook } from "@testing-library/react";
import { useComponentTitle } from "./use-dom-title";

const createTitle: TCreateTitleFunction = (title) => {
	return renderHook((newTitle: string) => useComponentTitle(newTitle), {
		initialProps: title,
	});
};

createTests(createTitle);
