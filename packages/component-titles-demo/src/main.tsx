import { MantineProvider, MantineProviderProps } from "@mantine/core";
import { useColorScheme } from "@mantine/hooks";
import React from "react";
import ReactDOM from "react-dom";
import DemoApp from "./App";

function Index() {
  const colorScheme = useColorScheme();
  const mantineProviderProps: MantineProviderProps = {
    children: <DemoApp />,
    theme: {
      colorScheme: colorScheme,

      black: "#1a1b1e",
    },
  };
  return <MantineProvider {...mantineProviderProps} />;
}

ReactDOM.render(
  <React.StrictMode>
    <Index />
  </React.StrictMode>,
  document.getElementById("root")
);
