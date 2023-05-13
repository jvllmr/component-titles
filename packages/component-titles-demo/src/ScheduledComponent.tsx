import { Button, Center, Paper, SimpleGrid, Title } from "@mantine/core";
import { useCallback, useState } from "react";
import TitleComponent from "./TitleComponent";
export default function ScheduledComponent(props: {
  titles: string[];
  schedule: number[];
  title: string;
}) {
  const [activeArray, setActiveArray] = useState(props.titles.map(() => false));
  const [running, setRunning] = useState(false);

  const runSchedule = useCallback(
    (index = 0, callback?: () => void, activeArrayCopy = [...activeArray]) => {
      if (index === 0) {
        setRunning(true);
        callback = () => {
          setRunning(false);
          setActiveArray(activeArray.map(() => false));
        };
      }

      activeArrayCopy[props.schedule[index]] =
        !activeArrayCopy[props.schedule[index]];

      setActiveArray([...activeArrayCopy]);
      if (index + 1 < props.schedule.length) {
        setTimeout(() => {
          runSchedule(index + 1, callback, activeArrayCopy);
        }, 2000);
      }
      if (callback && index === props.schedule.length - 1) {
        setTimeout(() => {
          if (callback) callback();
        }, 2000);
      }
    },
    [props.schedule]
  );

  return (
    <div style={{ marginTop: 50 }}>
      <Paper withBorder p="xs">
        <Title>{props.title}</Title>
        <Center>
          <SimpleGrid cols={5 > props.titles.length ? props.titles.length : 5}>
            {props.titles.map((title: string, index: number) => (
              <TitleComponent
                key={index}
                title={title}
                active={activeArray[index]}
              />
            ))}
          </SimpleGrid>
        </Center>
        <Center>
          <Button
            onClick={() => {
              runSchedule();
            }}
            disabled={running}
          >
            Start
          </Button>
        </Center>
      </Paper>
    </div>
  );
}
