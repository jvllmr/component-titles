import { createSignal } from "solid-js";
import { useComponentTitle } from "./useComponentTitle";

export function DocumentTitle(props: { title: string }) {
  const [title, setTitle] = createSignal(props.title);
  useComponentTitle(title);

  return null;
}
