import { makeStyles, useMediaQuery } from "@material-ui/core";
import { useEffect } from "react";
import { useRef } from "react";
import { createChart } from "lightweight-charts";
import { formaterNumber } from "../../helpers/helpers";
import { ResizeObserver } from "resize-observer";

const useStyles = makeStyles((theme) => {
  return {
    liquidityChartRoot: {
      minHeight: "250px",
    },
  };
});

const LiquidityChart = ({ data, crossMove }) => {
  const classes = useStyles();
  const chartRef = useRef(null);
  const containerRef = useRef(null);
  const serieRef = useRef(null);
  const resizeObserver = useRef(null);
  const matchXS = useMediaQuery((theme) => theme.breakpoints.down("xs"));

  useEffect(() => {
    // Used to resize chart.

    // Need to change observer because the break point break the observer
    if (matchXS) {
      if (resizeObserver.current) resizeObserver.current.disconnect();
      resizeObserver.current = new ResizeObserver((entries, b) => {
        chartRef.current.applyOptions({ width: window.innerWidth - 100 });
        setTimeout(() => {
          chartRef.current.timeScale().fitContent();
        }, 0);
      });
      resizeObserver.current.observe(document.body, { box: "content-box" });
      resizeObserver.current.observe(containerRef.current, { box: "content-box" });
    } else {
      if (resizeObserver.current) resizeObserver.current.disconnect();
      resizeObserver.current = new ResizeObserver((entries, b) => {
        const { width, height } = entries[0].contentRect;
        chartRef.current.applyOptions({ width, height });
        setTimeout(() => {
          chartRef.current.timeScale().fitContent();
        }, 0);
      });
      resizeObserver.current.observe(containerRef.current, { box: "content-box" });
    }
    return () => {
      resizeObserver.current.disconnect();
    };
  }, [matchXS]);

  useEffect(() => {
    // Initialization
    if (chartRef.current === null) {
      let chart = createChart(containerRef.current, {
        rightPriceScale: {
          margins: {
            above: 0,
            below: 10,
          },
        },
        layout: {
          backgroundColor: "rgba(31, 33, 40,0)",
          textColor: "#c3c5cb",
          fontFamily: "'Inter'",
        },
        localization: {
          priceFormatter: (price) => {
            return formaterNumber(price);
          },
        },
        grid: {
          horzLines: {
            visible: false,
          },
          vertLines: {
            visible: false,
          },
        },
        crosshair: {
          horzLine: {
            visible: false,
            labelVisible: false,
          },
          vertLine: {
            visible: true,
            style: 0,
            width: 2,
            color: "rgba(32, 38, 46, 0.1)",
            labelVisible: false,
          },
        },
        timeScale: {
          rightOffset: 1,
          barSpacing: 28,
          lockVisibleTimeRangeOnResize: true,
        },
      });

      serieRef.current = chart.addAreaSeries({
        topColor: "rgba(196, 164, 106, 0.4)",
        bottomColor: "rgba(196, 164, 106, 0.0)",
        lineColor: "rgba(251, 192, 45, 1)",
        lineWidth: 3,
      });
      chartRef.current = chart;
    }

    chartRef.current.subscribeCrosshairMove((event) => {
      crossMove(event, serieRef.current);
    });
    return () => {
      chartRef.current.unsubscribeCrosshairMove();
    };
  }, [crossMove]);

  useEffect(() => {
    // When data is updated
    serieRef.current.setData(data);
    chartRef.current.timeScale().fitContent();
  }, [data]);

  return <div className={classes.liquidityChartRoot} ref={containerRef}></div>;
};

export default LiquidityChart;
