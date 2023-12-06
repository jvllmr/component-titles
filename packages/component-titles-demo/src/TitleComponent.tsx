import { useComponentTitle } from "@jvllmr/react-component-titles";
import { Button, Center, Paper, SimpleGrid, Text, Title } from "@mantine/core";
import { Prism } from "@mantine/prism";
import { IconCircleCheck, IconCircleX } from "@tabler/icons-react";
import React, { useEffect, useState } from "react";
export default function TitleComponent(props: {
  title: string;
  active?: boolean;
}) {
  useComponentTitle(props.active ? props.title : "");
  const notActiveIcon = <IconCircleX color="red" size={50} />;
  const activeIcon = <IconCircleCheck color="green" size={50} />;
  const [icon, setIcon] = useState<React.ReactNode>(
    props.active ? activeIcon : notActiveIcon,
  );

  useEffect(() => {
    setIcon(props.active ? activeIcon : notActiveIcon);
  }, [props.active]);

  return (
    <SimpleGrid style={{ margin: 50 }}>
      <Center>{icon}</Center>
      <Center>
        <Text>{props.title.trim()}</Text>
      </Center>
    </SimpleGrid>
  );
}

export function TitleButtonComponent(props: { title: string }) {
  const [active, setActive] = useState(false);

  return (
    <SimpleGrid>
      <TitleComponent title={props.title} active={active} />
      <Center style={{ marginTop: -80 }}>
        <Button
          color={active ? "gray" : "blue"}
          onClick={() => {
            setActive(!active);
          }}
        >
          Toggle
        </Button>
      </Center>
    </SimpleGrid>
  );
}

export function TitleComponentExample() {
  const demoCode = `
import {useComponentTitle} from "@jvllmr/react-component-titles"
import { CircleCheck, CircleX } from "tabler-icons-react";
import { Center, SimpleGrid, Text } from "@mantine/core";

function TitleComponent(props: { title: string; active?: boolean }) {
  useDOMTitle(props.active ? props.title : "");
  const notActiveIcon = <CircleX color="red" size={50} />;
  const activeIcon = <CircleCheck color="green" size={50} />;
  const [icon, setIcon] = useState<React.ReactNode>(
    props.active ? activeIcon : notActiveIcon
  );

  useEffect(() => {
    setIcon(props.active ? activeIcon : notActiveIcon);
  }, [props.active]);

  return (
    <SimpleGrid style={{ margin: 50 }}>
      <Center>{icon}</Center>
      <Center>
        <Text>{props.title.trim()}</Text>
      </Center>
    </SimpleGrid>
  );
}`;
  const demoCodeButton = `
import { SimpleGrid, Button } from "@mantine/core";
function TitleButtonComponent(props: { title: string }) {
  const [active, setActive] = useState(false);

  return (
    <SimpleGrid>
      <TitleComponent title={props.title} active={active} />
      <Center style={{ marginTop: -80 }}>
        <Button
          color={active ? "gray" : "blue"}
          onClick={() => {
            setActive(!active);
          }}>
          Toggle
        </Button>
      </Center>
    </SimpleGrid>
  );
}`;
  return (
    <div style={{ marginTop: 50 }}>
      <Paper withBorder p="xs">
        <Title>Simple Title Component</Title>
        <Text style={{ marginTop: 10 }}>
          The next examples will be shown with the following component:
        </Text>
        <TitleComponent title="My title" />
        <Prism language="tsx">{demoCode}</Prism>
        <Text style={{ marginTop: 30 }}>
          Obviously, the component only changes the title with external input:
        </Text>
        <TitleButtonComponent title="My title" />
        <Prism language="tsx">{demoCodeButton}</Prism>
      </Paper>
    </div>
  );
}
