import { useComponentTitle } from "./use-dom-title";

export function DocumentTitle({ title }: { title: string }) {
	useComponentTitle(title);

	return null;
}
