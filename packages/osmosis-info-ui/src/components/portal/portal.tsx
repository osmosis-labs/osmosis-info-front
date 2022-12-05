import React, { forwardRef, useRef, useState } from "react";
import { createPortal } from "react-dom";
import useEffectSSR from "../../hooks/use-effect-ssr/use-effect-ssr";

export interface PortalProps {
	/** React element displayed in the Portal. */
	children?: React.ReactElement | React.ReactElement[];
}

const Portal = forwardRef<HTMLDivElement, PortalProps>(({ children }: PortalProps, ref) => {
	const [mountNode, setMountNode] = useState<null | Element>(null);
	const currentRef = useRef<any | null>(null);

	useEffectSSR(() => {
		setMountNode(document.body);
	}, []);

	useEffectSSR(() => {
		if (mountNode) {
			currentRef.current = mountNode;
			return () => {
				currentRef.current = null;
			};
		}

		return undefined;
	}, [ref, mountNode]);
	return <>{mountNode ? createPortal(children, mountNode) : mountNode}</>;
});

Portal.displayName = "Portal";

export default Portal;
