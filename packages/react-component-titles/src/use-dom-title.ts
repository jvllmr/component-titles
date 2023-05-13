import { useRef, useEffect, useMemo, MutableRefObject } from "react";
import { v4 as uuidv4 } from "uuid";
import {
	IDOMTitleComponentData,
	handleRegisterFactory,
	handleUnregisterFactory,
	onMount,
	onUnmount,
	registerFactory,
	revertTitleFactory,
} from "@jvllmr/component-titles-core";

function refSetter<T>(ref: MutableRefObject<T>) {
	return (value: T) => (ref.current = value);
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
				iAmLast: iAmLast.current,
				mountedTitle: mountedTitle.current,
				myId: uuid.current,
				titleBeforeMount: titleBeforeMount.current,
				setBehindMe: refSetter(behindMe),
				setIAmLast: refSetter(iAmLast),
			}),
		[]
	);
	const handleUnregister = useMemo(
		() =>
			handleUnregisterFactory({
				beforeMe: beforeMe.current,
				behindMe: behindMe.current,
				mountedTitle: mountedTitle.current,
				myId: uuid.current,
				titleBeforeMount: titleBeforeMount.current,
				setBeforeMe: refSetter(beforeMe),
				setBehindMe: refSetter(behindMe),
				setIAmLast: refSetter(iAmLast),
				setTitleBeforeMount: refSetter(titleBeforeMount),
			}),
		[]
	);
	const revertTitle = useMemo(
		() =>
			revertTitleFactory({
				beforeMe: beforeMe.current,
				behindMe: behindMe.current,
				mountedTitle: mountedTitle.current,
				titleBeforeMount: titleBeforeMount.current,
			}),
		[]
	);
	const register = useMemo(
		() =>
			registerFactory({
				revertTitle,
				beforeMe: beforeMe.current,
				behindMe: behindMe.current,
				mountedTitle: mountedTitle.current,
				myId: uuid.current,
				titleBeforeMount: titleBeforeMount.current,
				setBeforeMe: refSetter(beforeMe),
				setBehindMe: refSetter(behindMe),
				setIAmLast: refSetter(iAmLast),
				setMountedTitle: refSetter(mountedTitle),
				setTitleBeforeMount: refSetter(titleBeforeMount),
			}),
		[]
	);
	useEffect(() => {
		onMount({ handleRegister, handleUnregister });
		return () => {
			onUnmount({
				beforeMe: beforeMe.current,
				behindMe: behindMe.current,
				handleRegister,
				handleUnregister,
				mountedTitle: mountedTitle.current,
				myId: uuid.current,
				revertTitle,
				titleBeforeMount: titleBeforeMount.current,
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
