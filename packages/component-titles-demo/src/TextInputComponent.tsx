/* eslint-disable react/react-in-jsx-scope */
import { useComponentTitle } from "@jvllmr/react-component-titles";
import { Paper, TextInput, Title } from "@mantine/core";
import { useDebouncedValue } from "@mantine/hooks";
import { Prism } from "@mantine/prism";
import { useState } from "react";
export default function TextInputComponent() {
  const [value, setValue] = useState("");
  const [debouncedValue] = useDebouncedValue(value, 3000);
  useComponentTitle(debouncedValue);

  const demoCode = `
import { useDebouncedValue } from "@mantine/hooks";
import React, { useState } from "react";
import {useComponentTitle} from "@jvllmr/react-component-titles"
import { TextInput } from "@mantine/core";

function TextInputComponent() {
  const [value, setValue] = useState("");
  const [debouncedValue] = useDebouncedValue(value, 3000);
  useDOMTitle(debouncedValue);
  return (
    <TextInput
      value={value}
      onChange={(e) => {
        setValue(e.currentTarget.value);
      }}
      description="The document title will update 3 seconds after no input change"
    />
  );
}
    `;

  return (
    <div style={{ marginTop: 50 }}>
      <Paper withBorder p="xs">
        <Title color="light">Type a value</Title>
        <TextInput
          style={{ marginTop: 10 }}
          value={value}
          onChange={(e) => {
            setValue(e.currentTarget.value);
          }}
          description="The document title will update 3 seconds after no input change"
        />
        <Prism
          style={{ marginTop: 10 }}
          language="tsx"
          sx={{ overflow: "hidden" }}
        >
          {demoCode}
        </Prism>
      </Paper>
    </div>
  );
}
