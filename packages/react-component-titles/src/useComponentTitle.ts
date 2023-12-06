import {
  IDOMTitleComponentData,
  handleRegisterFactory,
  handleUnregisterFactory,
  onMount,
  onUnmount,
  registerFactory,
  revertTitleFactory,
} from "@jvllmr/component-titles-core";
import { MutableRefObject, useEffect, useMemo, useRef } from "react";
import { v4 as uuidv4 } from "uuid";

function refSetter<T>(ref: MutableRefObject<T>) {
  return (value: T) => (ref.current = value);
}

function refGetter<T>(ref: MutableRefObject<T>) {
  return () => ref.current;
}

export function useComponentTitle(title: string) {
  const uuid = useRef(uuidv4());
  const mountedTitle = useRef("");
  const titleBeforeMount = useRef("");
  const behindMe = useRef<IDOMTitleComponentData>();
  const beforeMe = useRef<IDOMTitleComponentData>();
  const iAmLast = useRef(true);

  const handleRegister = useMemo(
    () =>
      handleRegisterFactory({
        iAmLast: refGetter(iAmLast),
        mountedTitle: refGetter(mountedTitle),
        myId: refGetter(uuid),
        titleBeforeMount: refGetter(titleBeforeMount),
        setBehindMe: refSetter(behindMe),
        setIAmLast: refSetter(iAmLast),
      }),
    [],
  );
  const handleUnregister = useMemo(
    () =>
      handleUnregisterFactory({
        beforeMe: refGetter(beforeMe),
        behindMe: refGetter(behindMe),
        mountedTitle: refGetter(mountedTitle),
        myId: refGetter(uuid),
        titleBeforeMount: refGetter(titleBeforeMount),
        setBeforeMe: refSetter(beforeMe),
        setBehindMe: refSetter(behindMe),
        setIAmLast: refSetter(iAmLast),
        setTitleBeforeMount: refSetter(titleBeforeMount),
      }),
    [],
  );
  const revertTitle = useMemo(
    () =>
      revertTitleFactory({
        beforeMe: refGetter(beforeMe),
        behindMe: refGetter(behindMe),
        mountedTitle: refGetter(mountedTitle),
        titleBeforeMount: refGetter(titleBeforeMount),
      }),
    [],
  );
  const register = useMemo(
    () =>
      registerFactory({
        revertTitle,
        beforeMe: refGetter(beforeMe),
        behindMe: refGetter(behindMe),
        mountedTitle: refGetter(mountedTitle),
        myId: refGetter(uuid),
        titleBeforeMount: refGetter(titleBeforeMount),
        setBeforeMe: refSetter(beforeMe),
        setBehindMe: refSetter(behindMe),
        setIAmLast: refSetter(iAmLast),
        setMountedTitle: refSetter(mountedTitle),
        setTitleBeforeMount: refSetter(titleBeforeMount),
      }),
    [],
  );
  useEffect(() => {
    onMount({ handleRegister, handleUnregister });
    return () => {
      onUnmount({
        beforeMe: refGetter(beforeMe),
        behindMe: refGetter(behindMe),
        handleRegister,
        handleUnregister,
        mountedTitle: refGetter(mountedTitle),
        myId: refGetter(uuid),
        revertTitle,
        titleBeforeMount: refGetter(titleBeforeMount),
      });
    };
  }, []);

  useMemo(() => {
    register(title);
  }, []);

  useEffect(() => {
    register(title);
  }, [title]);
}
