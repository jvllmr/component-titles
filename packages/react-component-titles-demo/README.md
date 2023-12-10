# Component-titles

[![Routine Checks](https://github.com/jvllmr/component-titles/actions/workflows/test.yml/badge.svg)](https://github.com/jvllmr/component-titles/actions/workflows/test.yml)
[![Codecov](https://img.shields.io/codecov/c/github/jvllmr/component-titles/main?style=plastic)](https://app.codecov.io/gh/jvllmr/component-titles/tree/main)
[![npm](https://img.shields.io/npm/dm/@jvllmr/component-titles-core?style=plastic)](https://www.npmjs.com/package/@jvllmr/component-titles-core)
[![Bundlesize React](https://deno.bundlejs.com/badge?q=@jvllmr/react-component-titles&treeshake=[*]&config={%22esbuild%22:{%22external%22:[%22react%22,%22react-dom%22]}}&badge=detailed)](https://bundlejs.com/?q=%40jvllmr%2Freact-component-titles&treeshake=%5B*%5D&config=%7B%22esbuild%22%3A%7B%22external%22%3A%5B%22react%22%2C%22react-dom%22%5D%7D%7D)
[![Bundlesize Solid](https://deno.bundlejs.com/badge?q=@jvllmr/solid-component-titles&treeshake=[*]&config={%22esbuild%22:{%22external%22:[%22solid-js%22]}}&badge=detailed)](https://bundlejs.com/?q=%40jvllmr%2Fsolid-component-titles&treeshake=%5B*%5D&config=%7B%22esbuild%22%3A%7B%22external%22%3A%5B%22solid-js%22%5D%7D%7D)

A hook for handling browser Document titles bound to components. Previous titles are restored when a component unmounts.

## Functionality

The hook adheres to the following rules:

- It reverts the title when the component unmounts, but only when `document.title` has the value used by the component
- The hook listens to the changes of its given value (internally this counts as a new mounted title)
- When the title changes to an empty string, the hook reverts the title
- When multiple components with the same title get mounted in a row, the title only gets removed when all components have unmounted
- When three components get mounted with a title and the second in order unmounts, the title of the first component is saved in the third and loaded when the third component unmounts. Of course this mechanism works with any count of titled components.
- No state changes and unnecessary re-renders; components notify each other and share state via events and mutable refs

## Installation

- `npm i @jvllmr/react-component-titles` or `yarn add @jvllmr/react-component-titles` for React
- `npm i @jvllmr/solid-component-titles` or `yarn add @jvllmr/solid-component-titles` for Solid

## Demo

You can find a React demo [here](https://jvllmr.github.io/component-titles)

## React Code example

```typescript
// with solid-js use import { createComponentTitle } from "@jvllmr/solid-component-titles"
import { useComponentTitle } from "@jvllmr/react-component-titles";

function MyLoadingComponent() {
	// In solid-js () => string has to be passed
	useComponentTitle("Loading...");

	return <Loader />;
}
```

## API Reference

### useComponentTitle (React)

useComponentTitle hook API

```typescript
function useComponentTitle(title: string): void;
```

### createComponentTitle (Solid)

createComponentTitle hook API

```typescript
function createComponentTitle(title: Accessor<string>): void;
```

### DocumentTitle

DocumentTitle component API

```typescript
function DocumentTitle(props: { title: string }): null;
```
