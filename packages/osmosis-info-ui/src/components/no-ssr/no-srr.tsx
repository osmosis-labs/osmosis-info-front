import React from "react";

export interface NoSsrProps {
	children?: React.ReactElement;
}

const useEnhancedEffect = typeof window !== "undefined" ? React.useLayoutEffect : React.useEffect;

const NoSsr = ({ children }: NoSsrProps) => {
	const [mountedState, setMountedState] = React.useState(false);

	useEnhancedEffect(() => {
		setMountedState(true);
	}, []);

	return <>{mountedState ? children : null}</>;
};
export default NoSsr;
