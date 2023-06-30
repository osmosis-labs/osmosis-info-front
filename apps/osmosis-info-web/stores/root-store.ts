import { Storage } from "../helpers/storage";
import { ChartLiquidityResponse, ChartVolumeResponse } from "./api/charts/charts";
import { LiquidityStore } from "./api/charts/liquidity-store";
import { VolumeStore } from "./api/charts/volume-store";
import { MetricsResponse } from "./api/metrics/metrics";
import { MetricsStore } from "./api/metrics/metrics-store";
import { APRsResponse, FeesResponse, PoolsResponse } from "./api/pools/Pools";
import { PoolsStore } from "./api/pools/pools-store";
import { AssetListResponse, MCapResponse, TokenResponse, TokensResponse } from "./api/tokens/tokens";
import { TokensStore } from "./api/tokens/tokens-store";
import { MenuStore } from "./app/menu-store";
import { DEFAULT_LANGUAGE, LanguageSetting } from "./app/settings-store/language";
import { SettingsStore } from "./app/settings-store/settings-store";
import { UserStore } from "./user-store";

export class RootStore {
	public readonly menuStore: MenuStore;
	public readonly settingsStore: SettingsStore;
	public readonly userStore: UserStore;
	public readonly metricsStore: MetricsStore;
	public readonly tokensStore: TokensStore;
	public readonly poolsStore: PoolsStore;
	public readonly liquidityStore: LiquidityStore;
	public readonly volumeStore: VolumeStore;

	constructor() {
		this.menuStore = new MenuStore();
		this.settingsStore = new SettingsStore(new Storage("settings"), [new LanguageSetting(DEFAULT_LANGUAGE.value)]);
		this.userStore = new UserStore();
		this.metricsStore = new MetricsStore();
		this.tokensStore = new TokensStore();
		this.volumeStore = new VolumeStore(this.metricsStore);
		this.liquidityStore = new LiquidityStore();
		this.poolsStore = new PoolsStore(this.tokensStore);
	}

	hydrate = (initState: InitialState): void => {
		this.tokensStore.hydrate(initState);
		this.metricsStore.hydrate(initState);
		this.poolsStore.hydrate(initState);
		this.liquidityStore.hydrate(initState);
		this.volumeStore.hydrate(initState);
	};
}

export interface InitialState {
	metricsState?: MetricsResponse;
	tokenState?: TokenResponse;
	tokensState?: {
		assetList: AssetListResponse;
		tokens: TokensResponse[];
		marketCap: MCapResponse;
	};
	poolsState?: {
		pools: PoolsResponse;
		apr: APRsResponse;
		fees: FeesResponse;
	};
	liquidityChartState?: ChartLiquidityResponse;
	volumeChartState?: ChartVolumeResponse;
}
