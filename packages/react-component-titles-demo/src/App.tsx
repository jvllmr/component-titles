import { useComponentTitle } from "@jvllmr/react-component-titles";
import {
  Center,
  Container,
  Paper,
  ScrollArea,
  SimpleGrid,
} from "@mantine/core";
import Playground from "./Playground";
import ScheduledComponent from "./ScheduledComponent";
import TextInputComponent from "./TextInputComponent";
import { TitleComponentExample } from "./TitleComponent";
import "./index.css";

export default function DemoApp() {
  useComponentTitle("Component-titles React Demo");

  return (
    <Paper m={0} p={0} w="100vw" h="100vh" radius={0}>
      <ScrollArea style={{ height: "100vh" }}>
        <Container style={{ marginTop: 50 }} fluid>
          <Center>
            <SimpleGrid>
              <TextInputComponent />

              <TitleComponentExample />
              <ScheduledComponent
                title="Chained titles"
                titles={["1st title", "2nd title", "3rd title"]}
                schedule={[0, 1, 2, 2, 1, 0]}
              />
              <ScheduledComponent
                title="Removing in the middle does not break the chain"
                titles={["1st title", "2nd title", "3rd title"]}
                schedule={[0, 1, 2, 1, 0, 2]}
              />
              <ScheduledComponent
                title="Same titles form a group"
                titles={["1st title", "Loading...", "Loading...", "2nd title"]}
                schedule={[0, 1, 2, 3, 3, 1, 2, 0]}
              />
              <ScheduledComponent
                title="But they only group when mounted right after each other"
                titles={["1st title", "Loading...", "2nd title", "Loading..."]}
                schedule={[0, 1, 2, 3, 3, 2, 1, 0]}
              />
              <Playground />
              <div style={{ minHeight: "5vh" }} />
            </SimpleGrid>
          </Center>
        </Container>
      </ScrollArea>
    </Paper>
  );
}
