import { Storage } from "../helpers/storage";
import { ChartLiquidityResponse, ChartVolumeResponse } from "./api/charts/charts";
import { LiquidityStore } from "./api/charts/liquidity-store";
import { VolumeStore } from "./api/charts/volume-store";
import { FavoriteStore } from "./app/favorites/favorites-store";
import { MetricsResponse } from "./api/metrics/metrics";
import { MetricsStore } from "./api/metrics/metrics-store";
import { APRsResponse, FeesResponse, PoolsResponse } from "./api/pools/pools";
import { PoolsStore } from "./api/pools/pools-store";
import { AssetListResponse, MCapResponse, TokenResponse, TokensResponse } from "./api/tokens/tokens";
import { TokensStore } from "./api/tokens/tokens-store";
import { MenuStore } from "./app/menu-store";
import { DEFAULT_LANGUAGE, LanguageSetting } from "./app/settings-store/language";
import { SettingsStore } from "./app/settings-store/settings-store";
import { UserStore } from "./user-store";
import { TopsResponse } from "./api/tops/tops";
import { TopsStore } from "./api/tops/tops-store";
import { AssetsStore } from "./api/assets/assetsStore";

export class RootStore {
	public readonly menuStore: MenuStore;
	public readonly settingsStore: SettingsStore;
	public readonly userStore: UserStore;
	public readonly metricsStore: MetricsStore;
	public readonly tokensStore: TokensStore;
	public readonly poolsStore: PoolsStore;
	public readonly liquidityStore: LiquidityStore;
	public readonly volumeStore: VolumeStore;
	public readonly favoriteStore: FavoriteStore;
	public readonly topsStore: TopsStore;
	public readonly assetsStore: AssetsStore;

	constructor() {
		this.menuStore = new MenuStore();
		this.settingsStore = new SettingsStore(new Storage("settings"), [new LanguageSetting(DEFAULT_LANGUAGE.value)]);
		this.userStore = new UserStore();
		this.assetsStore = new AssetsStore();
		this.metricsStore = new MetricsStore();
		this.tokensStore = new TokensStore(this.assetsStore);
		this.volumeStore = new VolumeStore(this.metricsStore);
		this.liquidityStore = new LiquidityStore();
		this.poolsStore = new PoolsStore(this.tokensStore);
		this.topsStore = new TopsStore(this.tokensStore);
		this.favoriteStore = new FavoriteStore(new Storage("favorites"));
	}

	hydrate = (initState: InitialState): void => {
		this.tokensStore.hydrate(initState);
		this.metricsStore.hydrate(initState);
		this.poolsStore.hydrate(initState);
		this.liquidityStore.hydrate(initState);
		this.volumeStore.hydrate(initState);
		this.topsStore.hydrate(initState);
		this.assetsStore.hydrate(initState);
	};
}

export interface InitialState {
	metricsState?: MetricsResponse;
	tokenState?: TokenResponse;
	assetsState?: AssetListResponse;
	tokensState?: {
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
	topsState?: TopsResponse;
}
