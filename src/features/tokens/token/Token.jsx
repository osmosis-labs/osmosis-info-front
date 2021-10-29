import { makeStyles } from "@material-ui/core";
import { useCallback, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import ButtonGroup from "../../../components/buttonGroup/ButtonGroup";
import Paper from "../../../components/paper/Paper";
import { useTokens } from "../../../contexts/TokensProvider";
import {
  formatDate,
  formatDateHours,
  formateNumberPrice,
  formateNumberPriceDecimals,
  formaterNumber,
  getInclude,
  twoNumber,
} from "../../../helpers/helpers";
import TokenChartPrice from "./TokenChartPrice";
import TokenLiquidityChart from "./TokenLiquidityChart";
import TokenPath from "./TokenPath";
import TokenTitle from "./TokenTitle";
import TokenVolumeChart from "./TokenVolumeChart";

const useStyles = makeStyles((theme) => {
  return {
    tokenRoot: {
      display: "grid",
      gridAutoRows: "auto",
      rowGap: theme.spacing(2),
    },
    charts: {
      display: "grid",
      gridTemplateColumns: "300px 1fr",
      gap: theme.spacing(1),

      [theme.breakpoints.down("xs")]: {
        gridTemplateColumns: "1fr",
        gridTemplateRows: "1fr 1fr",
      },
    },
    right: {
      zIndex: "0",
      [theme.breakpoints.down("xs")]: {
        width: "100%",
      },
    },
    chart: {
      width: "100%",
      height: "80%",
    },
    textBig: {
      fontSize: theme.fontSize.big,
      color: theme.palette.gray.contrastText,
      fontVariantNumeric: "tabular-nums",
    },
    details: {
      display: "flex",
      flexDirection: "column",
      minHeight: "350px",
      [theme.breakpoints.down("xs")]: {
        width: "100%",
      },
    },
    detail: {
      padding: theme.spacing(2),
    },
    dataDetail: {
      fontSize: theme.fontSize.big,
      color: theme.palette.gray.contrastText,
    },
    titleDetail: {
      fontWeight: "600",
    },
    tokenPrice: {
      fontWeight: "500",
      fontSize: "36px",
      paddingLeft: "10px",
      color: theme.palette.gray.contrastText,
    },
    groupButtons: {
      display: "flex",
      alignItems: "flex-end",
      flexDirection: "column",
      justifyContent: "flex-end",
      padding: theme.spacing(1),
    },
    groupButton: {
      marginBottom: theme.spacing(1),
    },
    chartHeader: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    containerErrorChart: {
      height: "100%",
      width: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    errorChart: {
      margin: "auto",
    },
  };
});

const Token = ({ showToast }) => {
  const classes = useStyles();
  const history = useHistory();
  const { symbol } = useParams();
  const { getTokenData, getChartToken, tokens, getVolumeChartToken, getLiquidityChartToken } = useTokens();
  const [token, setToken] = useState({});
  const [dataChart, setDataChart] = useState([]);
  const [savedData, setSavedData] = useState({});
  const [selectedRange, setSelectedRange] = useState("7d");
  const [selectTypeChart, setSelectTypeChart] = useState("price");
  const [dataHover, setDataHover] = useState({ price: "0", date: "-" });
  const [liquidity, setLiquidity] = useState([]);
  const [volume, setVolume] = useState([]);

  useEffect(() => {
    // get token from history state
    if (!symbol) {
      showToast({ severity: "warning", text: "Token not find, you are redirected to tokens page." });
      history.push("/tokens");
    } else {
      if (tokens.length > 0) {
        let indexToken = getInclude(tokens, (token) => token.symbol === symbol);
        if (indexToken >= 0) {
          setToken({ ...tokens[indexToken] });
        } else {
          showToast({ severity: "warning", text: "Token not find, you are redirected to tokens page." });
          history.push("/tokens");
        }
      }
    }
  }, [symbol, showToast, history, tokens]);

  const getName = (chartType, range = "-") => {
    return chartType + "-" + range;
  };

  useEffect(() => {
    // fetch token details from server
    const fetch = async () => {
      let tokenData = await getTokenData(token.symbol);
      try {
        let promises = [
          getChartToken({ symbol: token.symbol, range: "7d" }),
          getLiquidityChartToken({ symbol: token.symbol }),
          getVolumeChartToken({ symbol: token.symbol }),
        ];
        let results = await Promise.all(promises);
        let priceData = results[0];
        let liquidityData = results[1];
        let volumeData = results[2];
        setLiquidity(liquidityData);
        setVolume(volumeData);
        let name = getName("price", "7d");
        setToken({ ...tokenData });
        setDataChart([...priceData]);
        setSavedData((ps) => {
          return { ...ps, [name]: priceData };
        });
        setDataHover({
          price: formateNumberPriceDecimals(priceData[priceData.length - 1].open, 2),
          date: formatDateHours(new Date()),
        });
      } catch (error) {
        console.log("Token.jsx -> 130: error", error);
        setDataHover({
          price: "-",
          date: "-",
        });
      }
    };
    if (token.id) {
      fetch();
    }
  }, [token, getTokenData, getChartToken, getVolumeChartToken, getLiquidityChartToken]);

  const crossMove = useCallback(
    (event, serie) => {
      if (selectTypeChart === "price") {
        if (event.time) {
          let price = formateNumberPriceDecimals(event.seriesPrices.get(serie).close, 2);
          let currentDate = new Date(event.time * 1000);
          setDataHover({ price, date: formatDateHours(currentDate) });
        }
      } else if (selectTypeChart === "volume") {
        if (event.time) {
          let price = "$" + formaterNumber(event.seriesPrices.get(serie), 2);
          let date = new Date(
            `${twoNumber(event.time.year)}/${twoNumber(event.time.month)}/${twoNumber(event.time.day)}`
          );
          setDataHover({ price, date: formatDate(date) });
        }
      } else {
        if (event.time) {
          let price = "$" + formaterNumber(event.seriesPrices.get(serie), 2);
          let date = new Date(
            `${twoNumber(event.time.year)}/${twoNumber(event.time.month)}/${twoNumber(event.time.day)}`
          );
          setDataHover({ price, date: formatDate(date) });
        }
      }
    },
    [selectTypeChart]
  );

  const onChangeTypeChart = (value) => {
    setSelectTypeChart(value);
    if (value === "price") {
      updateDataChart(value, selectedRange);
    } else {
      updateDataChart(value);
    }
  };

  const onChangeRange = (value) => {
    setSelectedRange(value);
    updateDataChart(selectTypeChart, value);
  };

  const updateDataChart = async (typeChart, range = "-") => {
    let name = getName(typeChart, range);
    let loadDataSaved = savedData[name];
    if (loadDataSaved) {
      setDataChart(loadDataSaved);
      setDataHover({
        price: formateNumberPriceDecimals(loadDataSaved[loadDataSaved.length - 1].open, 2),
        date: formatDateHours(new Date()),
      });
    } else {
      if (typeChart === "price") {
        let chartData = await getChartToken({ symbol: token.symbol, range });
        setDataChart([...chartData]);
        setSavedData((ps) => {
          return { ...ps, [name]: chartData };
        });
        setDataHover({
          price: formateNumberPriceDecimals(chartData[chartData.length - 1].open),
          date: formatDateHours(new Date()),
        });
      }
      if (typeChart === "liquidity") {
        setDataHover({
          price: "$" + formaterNumber(liquidity[liquidity.length - 1].value, 2),
          date: formatDateHours(new Date()),
        });
      } else {
        setDataHover({
          price: "$" + formaterNumber(volume[volume.length - 1].value, 2),
          date: formatDateHours(new Date()),
        });
      }
    }
  };

  let chartRender = (
    <div className={classes.containerErrorChart}>
      <p className={classes.errorChart}>Not enough liquidity to display chart price.</p>
    </div>
  );

  if (selectTypeChart === "price" && dataChart.length > 0) {
    chartRender = <TokenChartPrice data={dataChart} crossMove={crossMove} />;
  } else if (selectTypeChart === "volume" && volume.length > 0) {
    chartRender = <TokenVolumeChart data={volume} crossMove={crossMove} />;
  } else if (selectTypeChart === "liquidity" && liquidity.length > 0) {
    chartRender = <TokenLiquidityChart data={liquidity} crossMove={crossMove} />;
  }
  return (
    <div className={classes.tokenRoot}>
      <TokenPath token={token} />
      <TokenTitle token={token} />
      <p className={classes.tokenPrice}>{formateNumberPriceDecimals(token.price)}</p>
      <div className={classes.charts}>
        <Paper>
          <div className={classes.details}>
            <div className={classes.detail}>
              <p className={classes.titleDetail}>Liquidity</p>
              <p variant="body2" data-glitch={formateNumberPrice(token.liquidity)} className={classes.dataDetail + " glitchText2"}>
                {formateNumberPrice(token.liquidity)}
              </p>
            </div>
            <div className={classes.detail}>
              <p className={classes.titleDetail}>Volume (24hrs)</p>
              <p variant="body2" data-glitch={formateNumberPrice(token.volume_24h)} className={classes.dataDetail + " glitchText3"}>
                {formateNumberPrice(token.volume_24h)}
              </p>
            </div>
            <div className={classes.detail}>
              <p className={classes.titleDetail}>Price</p>
              <p variant="body2" data-glitch={formateNumberPriceDecimals(token.price)} className={classes.dataDetail + " glitchText"}>
                {formateNumberPriceDecimals(token.price)}
              </p>
            </div>
          </div>
        </Paper>
        <Paper className={classes.right}>
          <div className={classes.chartHeader}>
            <div className={classes.chartData}>
              <p className={classes.textBig}>{dataHover.price}</p>
              <p>{dataHover.date}</p>
            </div>
            <div className={classes.groupButtons}>
              <ButtonGroup
                className={classes.groupButton}
                buttons={[
                  {
                    id: "price",
                    name: "Rate",
                    onClick: () => {
                      onChangeTypeChart("price");
                    },
                  },
                  {
                    id: "liquidity",
                    name: "Liquidity",
                    onClick: () => {
                      onChangeTypeChart("liquidity");
                    },
                  },
                  {
                    id: "volume",
                    name: "Volume",
                    onClick: () => {
                      onChangeTypeChart("volume");
                    },
                  },
                ]}
                active={selectTypeChart}
              />
              <ButtonGroup
                style={selectTypeChart !== "price" ? { display: "none" } : {}}
                buttons={[
                  {
                    id: "7d",
                    name: "7d",
                    onClick: () => {
                      onChangeRange("7d");
                    },
                  },
                  {
                    id: "1mo",
                    name: "1m",
                    onClick: () => {
                      onChangeRange("1mo");
                    },
                  },
                  {
                    id: "1y",
                    name: "1y",
                    onClick: () => {
                      onChangeRange("1y");
                    },
                  },
                  {
                    id: "all",
                    name: "all",
                    onClick: () => {
                      onChangeRange("all");
                    },
                  },
                ]}
                active={selectedRange}
              />
            </div>
          </div>
          <div className={classes.chart}>{chartRender}</div>
        </Paper>
      </div>
    </div>
  );
};

export default Token;
