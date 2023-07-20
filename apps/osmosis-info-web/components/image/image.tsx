import React, { CSSProperties, useEffect, useState } from "react";
import NextImage from "next/image";
type ImageProps = {
	src: string;
	srcFallback?: string;
	alt?: string;
	className?: string;
	style?: CSSProperties;
	assets?: boolean;
	pathAssets?: string;
	width?: number;
	height?: number;
};

export const Image = ({
	src,
	srcFallback = "",
	alt,
	className,
	style,
	assets = false,
	pathAssets = "/images/default.png",
	width = 24,
	height = 24,
}: ImageProps) => {
	const initSrc = assets ? `${pathAssets}${src}` : src;
	const [stateSrc, setStateSrc] = useState(initSrc);
	const [error, setError] = useState(false);
	const onError = () => {
		if (!error) {
			setError(true);
			const errorSrc = assets ? `${pathAssets}${srcFallback}` : srcFallback ?? "";
			setStateSrc(errorSrc);
		}
	};

	useEffect(() => {
		const currentSrc = src ?? "/images/default.png";
		const initSrc = assets ? `${pathAssets}${currentSrc}` : currentSrc;

		setStateSrc(initSrc);
		setError(false);
	}, [src, assets, pathAssets]);

	return (
		<NextImage
			className={className}
			alt={alt ?? ""}
			style={style}
			src={stateSrc ?? ""}
			onError={onError}
			width={width}
			height={height}
		/>
	);
};
