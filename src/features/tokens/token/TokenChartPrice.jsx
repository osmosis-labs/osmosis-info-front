import { makeStyles, useMediaQuery } from "@material-ui/core";
import { useEffect } from "react";
import { useRef } from "react";
import { createChart, CrosshairMode } from "lightweight-charts";
import { detectBestDecimalsDisplay, formateNumberPriceDecimals } from "../../../helpers/helpers";
import { ResizeObserver } from "resize-observer";

const useStyles = makeStyles((theme) => {
  return {
    liquidityChartRoot: {
      position: "absolute",
      top: "0",
      right: "0",
      bottom: "0",
      left: "0",
      height: "100%",
      width: "100%",
    },
    chartContainer: {
      position: "relative",
      height: "95%",
      width: "100%",
    },
  };
});

const TokenChartPrice = ({ data, crossMove }) => {
  const classes = useStyles();
  const chartRef = useRef(null);
  const containerRef = useRef(null);
  const serieRef = useRef(null);
  const resizeObserver = useRef(null);
  const matchXS = useMediaQuery((theme) => theme.breakpoints.down("xs"));
  const priceDecimals = useRef(2);

  useEffect(() => {
    resizeObserver.current = new ResizeObserver((entries, b) => {
      const { width, height } = entries[0].contentRect;
      chartRef.current.applyOptions({ width, height });
      setTimeout(() => {
        chartRef.current.timeScale().fitContent();
      }, 0);
    });
    resizeObserver.current.observe(containerRef.current, { box: "content-box" });
    return () => {
      resizeObserver.current.disconnect();
    };
  }, [matchXS]);

  useEffect(() => {
    // Initialization
    if (chartRef.current === null) {
      let chart = createChart(containerRef.current, {
        layout: {
          backgroundColor: "rgba(31, 33, 40,0)",
          textColor: "#c3c5cb",
          fontFamily: "'Inter'",
        },
        localization: {
          priceFormatter: (price) => {
            return formateNumberPriceDecimals(price, priceDecimals.current);
          },
        },
        grid: {
          vertLines: {
            visible: false,
          },
          horzLines: {
            color: "rgba(42, 46, 57, 0.5)",
            visible: false,
          },
        },
        crosshair: {
          mode: CrosshairMode.Normal,
        },
        timeScale: {
          rightOffset: 1,
          barSpacing: 28,
          lockVisibleTimeRangeOnResize: true,
        },
      });

      serieRef.current = chart.addCandlestickSeries();
      chartRef.current = chart;
    }
    chartRef.current.subscribeCrosshairMove((event) => {
      crossMove(event, serieRef.current);
    });
    return () => {
      chartRef.current.unsubscribeCrosshairMove();
    };
  }, [crossMove, priceDecimals]);

  useEffect(() => {
    // When data is updated
    serieRef.current.setData(data);
    chartRef.current.timeScale().fitContent();
    priceDecimals.current = data.length > 0 ? detectBestDecimalsDisplay(data[0].open) : 2;
  }, [data]);

  return (
    <div className={classes.chartContainer}>
      <div className={classes.liquidityChartRoot} ref={containerRef}></div>
    </div>
  );
};

export default TokenChartPrice;
