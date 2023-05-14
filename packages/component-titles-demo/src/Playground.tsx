/* eslint-disable react/react-in-jsx-scope */
import {
  Button,
  Center,
  Group,
  Paper,
  SimpleGrid,
  TextInput,
  Title,
} from "@mantine/core";
import { useState } from "react";
import { TitleButtonComponent } from "./TitleComponent";
export default function Playground() {
  const [titles, setTitles] = useState<string[]>([]);
  const [newTitle, setNewTitle] = useState("");
  return (
    <div style={{ marginTop: 50 }}>
      <Paper withBorder style={{ padding: 15 }}>
        <Title>Playground</Title>
        <Center>
          <SimpleGrid cols={5 > titles.length ? titles.length : 5}>
            {titles.map((title: string, index: number) => (
              <TitleButtonComponent key={index} title={title} />
            ))}
          </SimpleGrid>
        </Center>
        <Center>
          <Group>
            <TextInput
              placeholder="Add a new title"
              value={newTitle}
              onChange={(e) => {
                setNewTitle(e.target.value);
              }}
            />
            <Button
              onClick={() => {
                if (newTitle) {
                  setTitles([...titles, newTitle]);
                  setNewTitle("");
                }
              }}
            >
              Add Title
            </Button>

            <Button
              color="red"
              onClick={() => {
                setTitles([]);
              }}
            >
              Clear all
            </Button>
          </Group>
        </Center>
      </Paper>
    </div>
  );
}
