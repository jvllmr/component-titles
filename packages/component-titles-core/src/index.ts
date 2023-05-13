let uuidStore: string[] = [];
export interface IDOMTitleComponentData {
  uuid: string;
  title: string;
  titleBeforeMount: string;
}

interface IDOMTitleRegisterEventData extends IDOMTitleComponentData {
  setMyRef: (ref: IDOMTitleComponentData | undefined) => void;
}

type TDOMTitleRegisterEventDetail = CustomEventInit<IDOMTitleRegisterEventData>;

interface IDOMTitleUnregisterEventData extends IDOMTitleComponentData {
  beforeMe?: IDOMTitleComponentData;
  behindMe?: IDOMTitleComponentData;
}

type TDOMTitleUnregisterEventDetail =
  CustomEventInit<IDOMTitleUnregisterEventData>;

function checkIfSameUUID<T extends IDOMTitleComponentData>(
  a?: T,
  b?: T
): boolean {
  return !!a && !!b && a.uuid === b.uuid;
}

const isMe = (
  me: { uuid: string; mountedTitle: string; titleBeforeMount: string },
  other?: IDOMTitleComponentData
) =>
  me.mountedTitle &&
  me.uuid &&
  checkIfSameUUID(
    {
      title: me.mountedTitle,
      uuid: me.uuid,
      titleBeforeMount: me.titleBeforeMount,
    },
    other
  );

const createUnregisterEvent = ({
  beforeMe,
  behindMe,
  mountedTitle,
  myId,
  titleBeforeMount,
}: {
  beforeMe: IDOMTitleComponentData | undefined;
  behindMe: IDOMTitleComponentData | undefined;
  myId: string;
  mountedTitle: string;
  titleBeforeMount: string;
}) =>
  new CustomEvent<IDOMTitleUnregisterEventData>(unregisterDOMTitle, {
    detail: {
      beforeMe: beforeMe,
      behindMe: behindMe,
      uuid: myId,
      title: mountedTitle,
      titleBeforeMount: titleBeforeMount,
    },
  });
const registerDOMTitle = "__registerDOMTitle";
const unregisterDOMTitle = "__unregisterDOMTitle";

type TDOMTitleRegisterEventHandler = (e: TDOMTitleRegisterEventDetail) => void;
type TDOMTitleUnregisterEventHandler = (
  e: TDOMTitleUnregisterEventDetail
) => void;

export const handleRegisterFactory =
  ({
    myId,
    setBehindMe,
    mountedTitle,
    titleBeforeMount,
    iAmLast,
    setIAmLast,
  }: {
    myId: () => string;
    setBehindMe: (component: IDOMTitleComponentData) => void;
    mountedTitle: () => string;
    titleBeforeMount: () => string;
    iAmLast: () => boolean;
    setIAmLast: (value: boolean) => void;
  }) =>
  (e: TDOMTitleRegisterEventDetail) => {
    if (iAmLast() && e.detail && e.detail.uuid !== myId()) {
      setIAmLast(false);
      setBehindMe(e.detail);
      e.detail.setMyRef({
        uuid: myId(),
        title: mountedTitle(),
        titleBeforeMount: titleBeforeMount(),
      });
    }
  };

export const handleUnregisterFactory =
  ({
    myId,
    mountedTitle,
    titleBeforeMount,
    behindMe,
    setBehindMe,
    setIAmLast,
    beforeMe,
    setBeforeMe,
    setTitleBeforeMount,
  }: {
    myId: () => string;
    mountedTitle: () => string;
    titleBeforeMount: () => string;
    behindMe: () => IDOMTitleComponentData | undefined;
    beforeMe: () => IDOMTitleComponentData | undefined;
    setBehindMe: (component: IDOMTitleComponentData | undefined) => void;
    setBeforeMe: (component: IDOMTitleComponentData | undefined) => void;
    setTitleBeforeMount: (value: string) => void;
    setIAmLast: (value: boolean) => void;
  }) =>
  (e: TDOMTitleUnregisterEventDetail) => {
    if (e.detail && e.detail.uuid !== myId()) {
      const me = {
        uuid: myId(),
        mountedTitle: mountedTitle(),
        titleBeforeMount: titleBeforeMount(),
      };
      if (
        isMe(me, e.detail.beforeMe) &&
        checkIfSameUUID(behindMe(), e.detail)
      ) {
        setBehindMe(e.detail.behindMe);
        if (!behindMe()) setIAmLast(true);
      } else if (
        isMe(me, e.detail.behindMe) &&
        checkIfSameUUID(beforeMe(), e.detail)
      ) {
        setBeforeMe(e.detail.beforeMe);
        setTitleBeforeMount(e.detail.titleBeforeMount);
      }
    }
  };

export const revertTitleFactory =
  ({
    beforeMe,
    behindMe,
    mountedTitle,
    titleBeforeMount,
  }: {
    mountedTitle: () => string;
    beforeMe: () => IDOMTitleComponentData | undefined;
    behindMe: () => IDOMTitleComponentData | undefined;
    titleBeforeMount: () => string;
  }) =>
  () => {
    if (
      document.title === mountedTitle() &&
      (!beforeMe() || (beforeMe() && beforeMe()?.title !== mountedTitle())) &&
      !behindMe()
    )
      document.title = titleBeforeMount();
  };

export function onMount({
  handleRegister,
  handleUnregister,
}: {
  handleRegister: TDOMTitleRegisterEventHandler;
  handleUnregister: TDOMTitleUnregisterEventHandler;
}) {
  document.addEventListener(registerDOMTitle, handleRegister);
  document.addEventListener(unregisterDOMTitle, handleUnregister);
}

export function onUnmount({
  handleRegister,
  handleUnregister,
  revertTitle,
  ...nextUnregisterEventProps
}: {
  handleRegister: TDOMTitleRegisterEventHandler;
  handleUnregister: TDOMTitleUnregisterEventHandler;
  revertTitle: () => void;
  beforeMe: () => IDOMTitleComponentData | undefined;
  behindMe: () => IDOMTitleComponentData | undefined;
  myId: () => string;
  mountedTitle: () => string;
  titleBeforeMount: () => string;
}) {
  document.removeEventListener(registerDOMTitle, handleRegister);
  document.removeEventListener(unregisterDOMTitle, handleUnregister);

  revertTitle();
  const unregisterEventProps = {
    myId: nextUnregisterEventProps.myId(),
    beforeMe: nextUnregisterEventProps.beforeMe(),
    behindMe: nextUnregisterEventProps.behindMe(),
    mountedTitle: nextUnregisterEventProps.mountedTitle(),
    titleBeforeMount: nextUnregisterEventProps.titleBeforeMount(),
  };
  document.dispatchEvent(createUnregisterEvent(unregisterEventProps));
  uuidStore = uuidStore.filter(
    (val: string) => val !== nextUnregisterEventProps.myId()
  );
}

export const registerFactory =
  ({
    mountedTitle,
    myId,
    revertTitle,
    setMountedTitle,
    setTitleBeforeMount,
    setBeforeMe,
    setBehindMe,
    setIAmLast,
    titleBeforeMount,
    beforeMe,
    behindMe,
  }: {
    mountedTitle: () => string;
    setMountedTitle: (title: string) => void;
    setTitleBeforeMount: (title: string) => void;
    setBeforeMe: (component: IDOMTitleComponentData | undefined) => void;
    setBehindMe: (component: IDOMTitleComponentData | undefined) => void;
    setIAmLast: (value: boolean) => void;
    myId: () => string;
    revertTitle: () => void;
    titleBeforeMount: () => string;
    beforeMe: () => IDOMTitleComponentData | undefined;
    behindMe: () => IDOMTitleComponentData | undefined;
  }) =>
  (title: string) => {
    if (typeof title === "string") {
      const trimmed = title.trim();

      let registerAllowed = mountedTitle() && !uuidStore.includes(myId());

      if (!trimmed || (trimmed && mountedTitle() !== trimmed)) {
        document.dispatchEvent(
          createUnregisterEvent({
            beforeMe: beforeMe(),
            behindMe: behindMe(),
            mountedTitle: mountedTitle(),
            myId: myId(),
            titleBeforeMount: titleBeforeMount(),
          })
        );
        revertTitle();

        setMountedTitle("");
        setTitleBeforeMount("");
        setBehindMe(undefined);
        setBeforeMe(undefined);
        setIAmLast(true);
        if (trimmed) registerAllowed = true;
        uuidStore = uuidStore.filter((val: string) => val !== myId());
      }

      if (trimmed && mountedTitle() !== trimmed && registerAllowed) {
        setTitleBeforeMount(document.title);
        setMountedTitle(trimmed);

        document.title = trimmed;
        if (!uuidStore.includes(myId())) {
          uuidStore.push(myId());

          const registerEvent = new CustomEvent<IDOMTitleRegisterEventData>(
            registerDOMTitle,
            {
              detail: {
                uuid: myId(),
                titleBeforeMount: titleBeforeMount(),
                title: mountedTitle(),
                setMyRef: setBeforeMe,
              },
            }
          );
          document.dispatchEvent(registerEvent);
        }
      }
    }
  };
