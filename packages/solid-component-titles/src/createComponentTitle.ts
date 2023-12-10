import {
  IDOMTitleComponentData,
  handleRegisterFactory,
  handleUnregisterFactory,
  onMount as onTitleMount,
  onUnmount,
  registerFactory,
  revertTitleFactory,
} from "@jvllmr/component-titles-core";
import {
  Accessor,
  createEffect,
  createMemo,
  createUniqueId,
  onCleanup,
  onMount,
} from "solid-js";

function refSetter<TData>(data: TData, key: keyof TData) {
  return (value: TData[keyof TData]) => (data[key] = value);
}

function refGetter<TData, TDataKey extends keyof TData>(
  data: TData,
  key: TDataKey,
): () => TData[TDataKey] {
  return () => data[key];
}

export function createComponentTitle(title: Accessor<string>) {
  const id = createUniqueId();
  console.log(id);
  const componentInfo: {
    iAmLast: boolean;
    mountedTitle: string;

    titleBeforeMount: string;
    behindMe: IDOMTitleComponentData | undefined;
    beforeMe: IDOMTitleComponentData | undefined;
  } = {
    iAmLast: true,
    mountedTitle: "",

    titleBeforeMount: "",
    behindMe: undefined,
    beforeMe: undefined,
  };

  const handleRegister = createMemo(() =>
    handleRegisterFactory({
      iAmLast: refGetter(componentInfo, "iAmLast"),
      mountedTitle: refGetter(componentInfo, "mountedTitle"),
      myId: () => id,
      titleBeforeMount: refGetter(componentInfo, "titleBeforeMount"),
      setBehindMe: refSetter(componentInfo, "behindMe"),
      setIAmLast: refSetter(componentInfo, "iAmLast"),
    }),
  );
  const handleUnregister = createMemo(() =>
    handleUnregisterFactory({
      beforeMe: refGetter(componentInfo, "beforeMe"),
      behindMe: refGetter(componentInfo, "behindMe"),
      mountedTitle: refGetter(componentInfo, "mountedTitle"),
      myId: () => id,
      titleBeforeMount: refGetter(componentInfo, "titleBeforeMount"),
      setBeforeMe: refSetter(componentInfo, "beforeMe"),
      setBehindMe: refSetter(componentInfo, "behindMe"),
      setIAmLast: refSetter(componentInfo, "iAmLast"),
      setTitleBeforeMount: refSetter(componentInfo, "titleBeforeMount"),
    }),
  );
  const revertTitle = createMemo(() =>
    revertTitleFactory({
      beforeMe: refGetter(componentInfo, "beforeMe"),
      behindMe: refGetter(componentInfo, "behindMe"),
      mountedTitle: refGetter(componentInfo, "mountedTitle"),
      titleBeforeMount: refGetter(componentInfo, "titleBeforeMount"),
    }),
  );
  const register = createMemo(() =>
    registerFactory({
      revertTitle: revertTitle(),
      beforeMe: refGetter(componentInfo, "beforeMe"),
      behindMe: refGetter(componentInfo, "behindMe"),
      mountedTitle: refGetter(componentInfo, "mountedTitle"),
      myId: () => id,
      titleBeforeMount: refGetter(componentInfo, "titleBeforeMount"),
      setBeforeMe: refSetter(componentInfo, "beforeMe"),
      setBehindMe: refSetter(componentInfo, "behindMe"),
      setIAmLast: refSetter(componentInfo, "iAmLast"),
      setMountedTitle: refSetter(componentInfo, "mountedTitle"),
      setTitleBeforeMount: refSetter(componentInfo, "titleBeforeMount"),
    }),
  );

  onMount(() => {
    onTitleMount({
      handleRegister: handleRegister(),
      handleUnregister: handleUnregister(),
    });
  });

  onCleanup(() => {
    onUnmount({
      handleRegister: handleRegister(),
      handleUnregister: handleUnregister(),
      titleBeforeMount: refGetter(componentInfo, "titleBeforeMount"),
      beforeMe: refGetter(componentInfo, "beforeMe"),
      myId: () => id,
      behindMe: refGetter(componentInfo, "behindMe"),
      mountedTitle: refGetter(componentInfo, "mountedTitle"),
      revertTitle: revertTitle(),
    });
  });

  createEffect(() => register()(title()));
}
