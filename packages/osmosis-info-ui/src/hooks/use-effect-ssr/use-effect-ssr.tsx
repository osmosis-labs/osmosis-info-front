import * as React from "react";

const useEffectSSR = typeof window !== "undefined" ? React.useLayoutEffect : React.useEffect;

export default useEffectSSR;
