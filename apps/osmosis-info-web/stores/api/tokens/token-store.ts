import { action, makeObservable, observable } from "mobx";
import { Request } from "../request";
import { Token, TokenResponse } from "./tokens";
const API_URL = process.env.NEXT_PUBLIC_APP_API_URL;
import axios, { AxiosResponse } from "axios";

type PromiseRequest = AxiosResponse<TokenResponse, TokenResponse>;

export interface TokenStoreArgs {
	token: Token;
}
export class TokenStore extends Request<Token[], PromiseRequest> {
	private _symbol: string;
	get symbol(): string {
		return this._symbol;
	}
	set symbol(symbol: string) {
		this._symbol = symbol;
	}

	@observable private _id = 0;
	get id(): number {
		return this._id;
	}
	set id(id: number) {
		this._id = id;
	}

	@observable private _price = 0;
	get price(): number {
		return this._price;
	}
	set price(price: number) {
		this._price = price;
	}

	@observable private _denom = "";
	get denom(): string {
		return this._denom;
	}
	set denom(denom: string) {
		this._denom = denom;
	}

	@observable private _main = false;
	get main(): boolean {
		return this._main;
	}
	set main(main: boolean) {
		this._main = main;
	}

	@observable private _liquidity = 0;
	get liquidity(): number {
		return this._liquidity;
	}
	set liquidity(liquidity: number) {
		this._liquidity = liquidity;
	}

	@observable private _liquidity24hChange = 0;
	get liquidity24hChange(): number {
		return this._liquidity24hChange;
	}
	set liquidity24hChange(liquidity24hChange: number) {
		this._liquidity24hChange = liquidity24hChange;
	}

	@observable private _volume24h = 0;
	get volume24h(): number {
		return this._volume24h;
	}
	set volume24h(volume24h: number) {
		this._volume24h = volume24h;
	}

	@observable private _volume24hChange = 0;
	get volume24hChange(): number {
		return this._volume24hChange;
	}
	set volume24hChange(volume24hChange: number) {
		this._volume24hChange = volume24hChange;
	}

	@observable private _name = "";
	get name(): string {
		return this._name;
	}
	set name(name: string) {
		this._name = name;
	}

	@observable private _price24h = 0;
	get price24h(): number {
		return this._price24h;
	}
	set price24h(price24h: number) {
		this._price24h = price24h;
	}

	@observable private _price7dChange = 0;
	get price7dChange(): number {
		return this._price7dChange;
	}
	set price7dChange(price7dChange: number) {
		this._price7dChange = price7dChange;
	}

	@observable private _price24hChange = 0;
	get price24hChange(): number {
		return this._price24hChange;
	}
	set price24hChange(price24hChange: number) {
		this._price24hChange = price24hChange;
	}

	@observable private _exponent = 0;
	get exponent(): number {
		return this._exponent;
	}
	set exponent(exponent: number) {
		this._exponent = exponent;
	}

	@observable private _marketCap = 0;
	get marketCap(): number {
		return this._marketCap;
	}
	set marketCap(marketCap: number) {
		this._marketCap = marketCap;
	}

	constructor({ token }: TokenStoreArgs) {
		super({ delayCache: 5 * 60 * 100, defaultData: [] });
		this._symbol = token.symbol;
		this._id = token.id;
		this._price = token.price;
		this._denom = token.denom;
		this._name = token.name;
		this._main = token.main;
		this._liquidity = token.liquidity;
		this._liquidity24hChange = 0;
		this._volume24h = token.volume24h;
		this._volume24hChange = token.volume24hChange;
		this._price24hChange = token.price24hChange;
		this._price7dChange = 0;
		this._exponent = 0;
		this._marketCap = 0;
		makeObservable(this);
	}

	@action
	format(reponseData: PromiseRequest): void {
		const responseToken = reponseData.data;
		this._price = responseToken.price;
		this._denom = responseToken.denom;
		this._symbol = responseToken.symbol;
		this._liquidity = responseToken.liquidity;
		this._liquidity24hChange = responseToken.liquidity_24h_change;
		this._volume24h = responseToken.volume_24h;
		this._volume24hChange = responseToken.volume_24h_change;
		this._name = responseToken.name;
		this._price24hChange = responseToken.price_24h_change;
		this._main = responseToken.main;
	}

	public get errorToken(): string | undefined {
		return this._error;
	}

	public get isLoadingTokens(): boolean {
		return this._isLoading;
	}

	public getToken = () => {
		this.sendRequest(() => axios({ url: `${API_URL}/tokens/v2/${this._symbol}` }));
	};
}
