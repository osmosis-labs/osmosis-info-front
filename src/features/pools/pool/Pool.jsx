import { makeStyles } from "@material-ui/core";
import { useCallback, useState } from "react";
import { useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import ButtonGroup from "../../../components/buttonGroup/ButtonGroup";
import Image from "../../../components/image/Image";
import Paper from "../../../components/paper/Paper";
import { usePools } from "../../../contexts/PoolsProvider";
import {
  formatDate,
  formatDateHours,
  formateNumberDecimals,
  formateNumberPrice,
  formateNumberPriceDecimals,
  formaterNumber,
  getInclude,
  twoNumber,
} from "../../../helpers/helpers";
import PoolChart from "./PoolChart";
import PoolLiquidityChart from "./PoolLiquidityChart";
import PoolPath from "./PoolPath";
import PoolSelect from "./PoolSelect";
import PoolTitle from "./PoolTitle";
import PoolVolumeChart from "./PoolVolumeChart";

const useStyles = makeStyles((theme) => {
  return {
    poolRoot: {
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
    details: {
      display: "flex",
      flexDirection: "column",
      [theme.breakpoints.down("xs")]: {
        width: "100%",
      },
    },
    detail: {
      padding: theme.spacing(2),
    },
    textBig: {
      fontSize: theme.fontSize.big,
      color: theme.palette.gray.contrastText,
      fontVariantNumeric: "tabular-nums",
    },
    detailPaper: {},
    dataDetail: {
      fontSize: theme.fontSize.big,
      color: theme.palette.gray.contrastText,
    },
    titleDetail: {
      fontWeight: "600",
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
    token: {
      display: "grid",
      padding: `${theme.spacing(1)}px 0 `,
      gridTemplateColumns: "repeat(auto-fit, minmax(20px, 1fr))",
      rowGap: theme.spacing(2),
      color: theme.palette.gray.contrastText,
      alignItems: "center",
    },
    image: {
      width: "30px",
      marginRight: theme.spacing(1),
    },
    tokenName: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
    },
    poolName: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
    },
    convertContainer: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      width: "fit-content",
      padding: "6px 10px",
    },
    pooledTokens: {
      backgroundColor: theme.palette.primary.dark2,
      fontSize: theme.fontSize.small,
      padding: theme.spacing(2),
      borderRadius: theme.spacing(2),
    },
    pooledTokensTitle: {
      fontWeight: "600",
    },
    pooledTokensImages: {
      width: "25px",
    },
    pooledTokensNumber: {
      textAlign: "right",
    },
    chartHeader: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    chartData: {},
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

const Pool = ({ showToast }) => {
  const classes = useStyles();
  const history = useHistory();
  const { id } = useParams();
  const { getPoolData, getChartPool, pools, getVolumeChartPool, getLiquidityChartPool } = usePools();

  //save data here to avoid to re fetching data if is already fetched
  const [pool, setPool] = useState({});
  const [tokens, setTokens] = useState([]);
  const [pairs, setPairs] = useState({});
  const [convertData, setConvertData] = useState(0);

  const [currentPair, setCurrentPair] = useState([]); // Data of the current pair
  const [fees, setFees] = useState("0.0%"); // Data of fees

  const [selectRange, setSelectRange] = useState("7d");
  const [liquidity, setLiquidity] = useState([]);
  const [volume, setVolume] = useState([]);
  const [selectTypeChart, setSelectTypeChart] = useState("price");
  const [selectedTokens, setSelectedTokens] = useState({ one: {}, two: {} });
  const [price, setPrice] = useState({ price: "0", date: "-" });

  useEffect(() => {
    // get pool from history state
    if (!id) {
      showToast({ severity: "warning", text: "Pool not find, you are redirected to pools page." });
      history.push("/pools");
    } else {
      if (pools.length > 0) {
        let indexPool = getInclude(pools, (pool) => pool.id === id);
        if (indexPool >= 0) {
          setPool({ ...pools[indexPool] });
        } else {
          showToast({ severity: "warning", text: "Pool not find, you are redirected to pools page." });
          history.push("/pools");
        }
      }
    }
  }, [id, showToast, history, pools]);

  useEffect(() => {
    // fetch pool details from server
    const fetch = async () => {
      let tokensPool = await getPoolData(pool.id);
      setFees(tokensPool[0].fees);
      setTokens([...tokensPool]);
    };
    if (pool.id) {
      fetch();
    }
  }, [pool, getPoolData]);

  useEffect(() => {
    // fetch the first pair details from server
    const fetch = async () => {
      // range possible: 7d, 1mo, 1y, all
      try {
        let firstPair = await getChartPool({
          poolId: pool.id,
          denomIn: tokens[0].denom,
          denomOut: tokens[1].denom,
          range: "7d",
        });
        if (typeof firstPair === "string") {
          throw new Error(firstPair);
        }
        setPairs((ps) => {
          let namePair = getPairName({ one: tokens[0], two: tokens[1], range: "7d" });
          return { ...ps, [namePair]: firstPair };
        });
        setCurrentPair(firstPair);
        setPrice({
          price: formateNumberDecimals(firstPair[firstPair.length - 1].open, 3),
          date: formatDateHours(new Date()),
        });
        setVolume(await getVolumeChartPool({ poolId: pool.id }));
        setLiquidity(await getLiquidityChartPool({ poolId: pool.id }));
      } catch (error) {
        console.log("Pool.jsx -> 207: error", error);
      }
      convertCoin(tokens[0], tokens[1]);
      setSelectedTokens({ one: tokens[0], two: tokens[1] });
    };
    if (pool.id && tokens.length > 1) {
      fetch();
    }
  }, [tokens, pool, getChartPool, getVolumeChartPool, getLiquidityChartPool]);

  const getPairName = ({ one, two, range }) => {
    // used to get the name of the pair (name of Map of pairs)
    return `${one.denom}-${two.denom}-${range}`;
  };

  const updateTokenData = async (one, two, range) => {
    let namePair = getPairName({ one, two, range });
    let pair = [];
    if (pairs[namePair]) {
      // check if data is already fetched
      pair = pairs[namePair];
    } else {
      // need to fetch data
      pair = await getChartPool({ poolId: pool.id, denomIn: one.denom, denomOut: two.denom, range });
      if (typeof pair === "object" && pair.length > 0) {
        setPairs((ps) => {
          return { ...ps, [namePair]: pair };
        });
      } else {
        pair = [];
      }
    }
    if (pair.length > 0) {
      setPrice({
        price: formateNumberDecimals(pair[pair.length - 1].open, 3),
        date: formatDateHours(new Date()),
      });

      convertCoin(one, two);
      setCurrentPair(pair);
    }
  };

  const onChangeRange = (value) => {
    setSelectRange(value);
    updateTokenData(selectedTokens.one, selectedTokens.two, value);
  };

  const onChangeTypeChart = (value) => {
    setSelectTypeChart(value);
    if (value === "price") {
      updateTokenData(selectedTokens.one, selectedTokens.two, selectRange);
    } else if (value === "volume" && volume.length > 0) {
      let price = "$" + formaterNumber(volume[volume.length - 1].value, 2);
      let date = "";
      if (typeof volume[volume.length - 1].time === "string") {
        date = new Date(volume[volume.length - 1].time);
      } else {
        date = new Date(
          `${twoNumber(volume[volume.length - 1].time.year)}/${twoNumber(
            volume[volume.length - 1].time.month
          )}/${twoNumber(volume[volume.length - 1].time.day)}`
        );
      }
      setPrice({ price, date: formatDate(date) });
    } else if (value === "liquidity" && liquidity.length > 0) {
      let price = "$" + formaterNumber(liquidity[liquidity.length - 1].value, 2);
      let date = "";
      if (typeof liquidity[liquidity.length - 1].time === "string") {
        date = new Date(liquidity[liquidity.length - 1].time);
      } else {
        date = new Date(
          `${twoNumber(liquidity[liquidity.length - 1].time.year)}/${twoNumber(
            liquidity[liquidity.length - 1].time.month
          )}/${twoNumber(liquidity[liquidity.length - 1].time.day)}`
        );
      }
      setPrice({ price, date: formatDate(date) });
    }
  };

  const convertCoin = (coinIn, coinOut) => {
    let convert = coinOut.price / coinIn.price;
    setConvertData(formateNumberDecimals(convert, 4));
  };

  const onChangeSeletedToken = (selectedTokens) => {
    setSelectedTokens(selectedTokens);
    updateTokenData(selectedTokens.one, selectedTokens.two, selectRange);
  };

  const crossMove = useCallback(
    (event, serie) => {
      if (selectTypeChart === "price") {
        if (event.time) {
          let price = formateNumberDecimals(event.seriesPrices.get(serie).close, 3);

          let currentDate = new Date(event.time * 1000);
          setPrice({ price, date: formatDateHours(currentDate) });
        }
      } else if (selectTypeChart === "volume") {
        if (event.time) {
          let price = "$" + formaterNumber(event.seriesPrices.get(serie), 2);
          let date = new Date(
            `${twoNumber(event.time.year)}/${twoNumber(event.time.month)}/${twoNumber(event.time.day)}`
          );
          setPrice({ price, date: formatDate(date) });
        }
      } else {
        if (event.time) {
          let price = "$" + formaterNumber(event.seriesPrices.get(serie), 2);
          let date = new Date(
            `${twoNumber(event.time.year)}/${twoNumber(event.time.month)}/${twoNumber(event.time.day)}`
          );
          setPrice({ price, date: formatDate(date) });
        }
      }
    },
    [selectTypeChart]
  );

  let chartRender = (
    <div className={classes.containerErrorChart}>
      <p className={classes.errorChart}>Not enough liquidity to display chart price.</p>
    </div>
  );

  if (selectTypeChart === "price" && currentPair.length > 0) {
    chartRender = <PoolChart data={currentPair} crossMove={crossMove} />;
  } else if (selectTypeChart === "volume" && volume.length > 0) {
    chartRender = <PoolVolumeChart data={volume} crossMove={crossMove} />;
  } else if (selectTypeChart === "liquidity" && liquidity.length > 0) {
    chartRender = <PoolLiquidityChart data={liquidity} crossMove={crossMove} />;
  }

  return (
    <div className={classes.poolRoot}>
      <PoolPath pool={pool} />
      <PoolTitle pool={pool} tokens={tokens} />

      <Paper className={classes.convertContainer}>
        <Image
          className={`${classes.image}`}
          assets={true}
          alt={`${selectedTokens.two.symbol}`}
          src={`https://raw.githubusercontent.com/osmosis-labs/assetlists/main/images/${selectedTokens.two?.symbol?.toLowerCase()}.png`}
          srcFallback="../assets/default.png"
          pathAssets=""
        />
        <p>
          1 {selectedTokens.two.symbol} = {convertData} {selectedTokens.one.symbol}{" "}
        </p>
      </Paper>
      <PoolSelect tokens={tokens} setSelectedTokens={onChangeSeletedToken} selectedTokens={selectedTokens} />
      <div className={classes.charts}>
        <div className={classes.details}>
          <Paper className={classes.detailPaper}>
            <div className={classes.pooledTokens}>
              <p className={classes.pooledTokensTitle}>Pooled tokens</p>
              <div className={classes.tokensContainer}>
                {tokens.map((token) => {
                  return (
                    <div className={classes.token} key={token.denom}>
                      <div className={classes.tokenName}>
                        <Image
                          className={`${classes.image} ${classes.pooledTokensImages}`}
                          assets={true}
                          alt={`${token.symbol}`}
                          src={`https://raw.githubusercontent.com/osmosis-labs/assetlists/main/images/${token.symbol.toLowerCase()}.png`}
                          srcFallback="../assets/default.png"
                          pathAssets=""
                        />
                        <p>{token.symbol}</p>
                      </div>
                      <p className={classes.pooledTokensNumber}>{formaterNumber(token.amount, 0)}</p>
                      <p className={classes.pooledTokensNumber}>{formateNumberPriceDecimals(token.price)}</p>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className={classes.detail}>
              <p className={classes.titleDetail}>Liquidity</p>
              <p variant="body2" className={classes.dataDetail}>
                {formateNumberPrice(pool.liquidity)}
              </p>
            </div>
            <div className={classes.detail}>
              <p className={classes.titleDetail}>Volume (24hrs)</p>
              <p variant="body2" className={classes.dataDetail}>
                {formateNumberPrice(pool.volume_24h)}
              </p>
            </div>
            <div className={classes.detail}>
              <p className={classes.titleDetail}>Volume (7d)</p>
              <p variant="body2" className={classes.dataDetail}>
                {formateNumberPrice(pool.volume_7d)}
              </p>
            </div>
            <div className={classes.detail}>
              <p className={classes.titleDetail}>Fees</p>
              <p variant="body2" className={classes.dataDetail}>
                {fees}
              </p>
            </div>
          </Paper>
        </div>
        <Paper className={classes.right}>
          <div className={classes.chartHeader}>
            <div className={classes.chartData}>
              <p className={classes.textBig}>
                {price.price} {selectTypeChart === "price" ? selectedTokens.one.symbol : ""}
              </p>
              <p>{price.date}</p>
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
                active={selectRange}
              />
            </div>
          </div>
          <div className={classes.chart}>{chartRender}</div>
        </Paper>
      </div>
    </div>
  );
};

export default Pool;
