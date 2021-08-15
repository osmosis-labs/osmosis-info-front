import { createContext, useCallback, useContext, useEffect, useState } from "react";
import API from "../helpers/API";
const PoolsContext = createContext();

export const usePools = () => useContext(PoolsContext);

export const PoolsProvider = ({ children }) => {
  const [pools, setPools] = useState([]);

  const getPoolData = useCallback(async (poolId) => {
    let response = await API.request({ url: `pools/v1/${poolId}`, type: "get" });
    return response.data;
  }, []);

  const getChartPool = useCallback(async ({ poolId, denomIn, denomOut, range }) => {
    if (range === "all") range = "50y";
    let response = await API.request({
      url: `pairs/v1/historical/${poolId}/chart?asset_in=${denomIn}&asset_out=${denomOut}&range=${range}&asset_type=denom`,
      type: "get",
    });
    return response.data;
  }, []);

  const getLiquidityChartPool = useCallback(async ({ poolId }) => {
    let response = await API.request({
      url: `pools/v1/liquidity/${poolId}/chart`,
      type: "get",
    });
    return response.data;
  }, []);

  const getVolumeChartPool = useCallback(async ({ poolId }) => {
    let response = await API.request({
      url: `pools/v1/volume/${poolId}/chart`,
      type: "get",
    });
    return response.data;
  }, []);

  useEffect(() => {
    let fetch = async () => {
      // get all pools from server API
      let response = await API.request({ url: "pools/v1/all", type: "get" });
      setPools(
        Object.keys(response.data).map((key) => {
          let row = response.data[key];
          return {
            id: key,
            name: row.reduce((acc, currentValue) => {
              let symbolName = currentValue.symbol.length === 0 ? currentValue.denom : currentValue.symbol;
              return `${acc}${acc.length > 0 ? "-" : ""}${symbolName}`;
            }, ""),
            liquidity: row[0].liquidity,
            volume_7d: row[0].volume_7d,
            volume_24h: row[0].volume_24h,
          };
        })
      );
    };
    fetch();
  }, []);

  return (
    <PoolsContext.Provider value={{ pools, getPoolData, getChartPool, getVolumeChartPool, getLiquidityChartPool }}>
      {children}
    </PoolsContext.Provider>
  );
};
