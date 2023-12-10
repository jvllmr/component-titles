import { createComponentTitle } from "@jvllmr/solid-component-titles";
import { JSX, createEffect, createSignal } from "solid-js";
import { IconCircleX, IconCircleCheck } from "@tabler/icons-solidjs";

export function TitleComponent(props: { title: string; active?: boolean }) {
  createComponentTitle(() => (props.active ? props.title : ""));
  const notActiveIcon = <IconCircleX color="red" size={50} />;
  const activeIcon = <IconCircleCheck color="green" size={50} />;
  const [icon, setIcon] = createSignal<JSX.Element>(
    props.active ? activeIcon : notActiveIcon,
  );

  createEffect(() => {
    setIcon(props.active ? activeIcon : notActiveIcon);
  });

  return (
    <div
      style={{
        display: "flex",
        "align-items": "center",
        "flex-direction": "column",
      }}
    >
      <div>{icon()}</div>
      <div>{props.title.trim()}</div>
    </div>
  );
}

export function TitleButtonComponent(props: { title: string }) {
  const [active, setActive] = createSignal(false);

  return (
    <div
      style={{
        display: "flex",
        "align-items": "center",
        "flex-direction": "column",
      }}
    >
      <TitleComponent title={props.title} active={active()} />
      <div>
        <button
          style={{ color: active() ? "gray" : "blue" }}
          onClick={() => {
            setActive(!active());
          }}
        >
          Toggle
        </button>
      </div>
    </div>
  );
}
