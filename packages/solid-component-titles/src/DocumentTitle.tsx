import { createComponentTitle } from "./createComponentTitle";

export function DocumentTitle(props: { title: string }) {
  createComponentTitle(() => props.title);

  return null;
}
