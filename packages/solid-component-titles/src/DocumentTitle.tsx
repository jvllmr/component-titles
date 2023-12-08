import { createSignal } from "solid-js";
import { createComponentTitle } from "./createComponentTitle";

export function DocumentTitle(props: { title: string }) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [title, setTitle] = createSignal(props.title);
  createComponentTitle(title);

  return null;
}
