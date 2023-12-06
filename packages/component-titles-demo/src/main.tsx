import { MantineProvider, MantineProviderProps } from "@mantine/core";
import "@mantine/core/styles.css";
import "@mantine/code-highlight/styles.css";
import React from "react";
import ReactDOM from "react-dom";
import DemoApp from "./App";
import { useColorScheme } from "@mantine/hooks";

function Index() {
  const mantineProviderProps: MantineProviderProps = {
    children: <DemoApp />,
    theme: {
      black: "#1a1b1e",
    },
  };
  const colorScheme = useColorScheme();
  return (
    <MantineProvider forceColorScheme={colorScheme} {...mantineProviderProps} />
  );
}

ReactDOM.render(
  <React.StrictMode>
    <Index />
  </React.StrictMode>,
  document.getElementById("root"),
);
