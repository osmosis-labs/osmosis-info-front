import { makeStyles } from "@material-ui/core";
import { useEffect } from "react";
import { useState } from "react";

const useStyles = makeStyles((theme) => {
    return {
        imageRoot: {

        },
    };
});

const Image = ({ src, srcFallback, alt, className, style, assets = false, pathAssets = "assets/" }) => {
    const classes = useStyles();
    let initSrc = assets ? `${pathAssets}${src}` : src
    const [stateSrc, setStateSrc] = useState(initSrc)
    const [error, setError] = useState(false)
    const onError = () => {
        if (!error) {
            setError(true)
            let errorSrc = assets ? `${pathAssets}${srcFallback}` : srcFallback
            setStateSrc(errorSrc)
        }
    }

    useEffect(() => {
        // update image if src is updated
        let initSrc = assets ? `${pathAssets}${src}` : src
        setStateSrc(initSrc)
        setError(false)
    }, [src, assets, pathAssets])

    return <img className={`${classes.imageRoot} ${className}`} alt={alt}
        style={style ? style : null}
        src={stateSrc}
        onError={onError}
    />
}

export default Image