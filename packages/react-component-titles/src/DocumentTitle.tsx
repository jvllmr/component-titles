import { useComponentTitle } from "./useComponentTitle";

export function DocumentTitle({ title }: { title: string }) {
  useComponentTitle(title);

  return null;
}
