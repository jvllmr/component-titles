# Component-titles

![Routine Checks](https://github.com/jvllmr/component-titles/actions/workflows/test.yml/badge.svg)
![Codecov](https://img.shields.io/codecov/c/github/jvllmr/component-titles?style=plastic)
![npm](https://img.shields.io/npm/dm/react-use-dom-title-hook?style=plastic)

A hook for handling browser Document titles in components. Previous titles get remembered and restored when the component unmounts.

## Functionality

The hook adheres to the following rules:

- It reverts the title when the component unmounts, but only when `document.title` has the value used by the component
- The hook listens to the changes of its given value (internally this counts as a new mounted title)
- When the title changes to an empty string, the hook reverts the title
- When multiple components with the same title get mounted in a row, the title only gets removed when all components have unmounted
- When three components get mounted with a title and the second in order unmounts, the title of the first component is secured and loaded when the third component unmounts. Of course this mechanism works with any count of titled components.
- No state changes and unnecessary re-renders; components notify each other via events and mutable references

## Installation

`npm i @jvllmr/react-component-titles` or `yarn add @jvllmr/react-component-titles` for React
`npm i @jvllmr/solid-component-titles` or `yarn add @jvllmr/solid-component-titles` for Solid

## Demo

You can find a demo [here](https://jvllmr.github.io/component-titles)

## React Code example

```typescript
import { useDOMTitle } from "@jvllmr/react-component-titles";

function MyLoadingComponent() {
  useComponentTitle("Loading...");

  return <Loader />;
}
```

## API Reference

### useComponentTitle

`useDOMTitle(title: string): void`

### DocumentTitle

`DocumentTitle(props: {title: string}): null`
