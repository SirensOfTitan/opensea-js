import 'isomorphic-unfetch';
import { OpenSeaAPIConfig, OrderJSON, Order, OpenSeaAsset, OpenSeaAssetBundle, FungibleToken, OrderQuery, OpenSeaAssetQuery, OpenSeaAssetBundleQuery, FungibleTokenQuery } from './types';
export declare const ORDERBOOK_VERSION: number;
export declare const API_VERSION: number;
export declare const API_BASE_MAINNET = "https://api.opensea.io";
export declare const API_BASE_RINKEBY = "https://rinkeby-api.opensea.io";
export declare const SITE_HOST_MAINNET = "https://opensea.io";
export declare const SITE_HOST_RINKEBY = "https://rinkeby.opensea.io";
export declare class OpenSeaAPI {
    /**
     * Host url for OpenSea
     */
    readonly hostUrl: string;
    /**
     * Base url for the API
     */
    readonly apiBaseUrl: string;
    /**
     * Page size to use for fetching orders
     */
    pageSize: number;
    /**
     * Logger function to use when debugging
     */
    logger: (arg: string) => void;
    private apiKey;
    /**
     * Create an instance of the OpenSea API
     * @param config OpenSeaAPIConfig for setting up the API, including an optional API key, network name, and base URL
     * @param logger Optional function for logging debug strings before and after requests are made
     */
    constructor(config: OpenSeaAPIConfig, logger?: (arg: string) => void);
    /**
     * Send an order to the orderbook.
     * Throws when the order is invalid.
     * IN NEXT VERSION: change order input to Order type
     * @param order Order JSON to post to the orderbook
     * @param retries Number of times to retry if the service is unavailable for any reason
     */
    postOrder(order: OrderJSON, retries?: number): Promise<Order>;
    /**
     * Get an order from the orderbook, returning `null` if none are found.
     * @param query Query to use for getting orders. A subset of parameters
     *  on the `OrderJSON` type is supported
     */
    getOrder(query: OrderQuery): Promise<Order | null>;
    /**
     * Get a list of orders from the orderbook, returning the page of orders
     *  and the count of total orders found.
     * @param query Query to use for getting orders. A subset of parameters
     *  on the `OrderJSON` type is supported
     * @param page Page number, defaults to 1. Can be overridden by
     * `limit` and `offset` attributes from OrderQuery
     */
    getOrders(query?: OrderQuery, page?: number): Promise<{
        orders: Order[];
        count: number;
    }>;
    /**
     * Fetch an asset from the API, return null if it isn't found
     * @param tokenAddress Address of the asset's contract
     * @param tokenId The asset's token ID
     * @param retries Number of times to retry if the service is unavailable for any reason
     */
    getAsset(tokenAddress: string, tokenId: string | number, retries?: number): Promise<OpenSeaAsset | null>;
    /**
     * Fetch list of assets from the API, returning the page of assets and the count of total assets
     * @param query Query to use for getting orders. A subset of parameters on the `OpenSeaAssetJSON` type is supported
     * @param page Page number, defaults to 1. Can be overridden by
     * `limit` and `offset` attributes from OpenSeaAssetQuery
     */
    getAssets(query?: OpenSeaAssetQuery, page?: number): Promise<{
        assets: OpenSeaAsset[];
        estimatedCount: number;
    }>;
    /**
     * Fetch list of fungible tokens from the API matching paramters
     * @param query Query to use for getting orders. A subset of parameters on the `OpenSeaAssetJSON` type is supported
     * @param page Page number, defaults to 1. Can be overridden by
     * `limit` and `offset` attributes from FungibleTokenQuery
     * @param retries Number of times to retry if the service is unavailable for any reason
     */
    getTokens(query?: FungibleTokenQuery, page?: number, retries?: number): Promise<{
        tokens: FungibleToken[];
    }>;
    /**
     * Fetch an bundle from the API, return null if it isn't found
     * @param tokenAddress Address of the bundle's contract
     * @param tokenId The bundle's token ID
     */
    getBundle(slug: string): Promise<OpenSeaAssetBundle | null>;
    /**
     * Fetch list of bundles from the API, returning the page of bundles and the count of total bundles
     * @param query Query to use for getting orders. A subset of parameters on the `OpenSeaAssetBundleJSON` type is supported
     * @param page Page number, defaults to 1. Can be overridden by
     * `limit` and `offset` attributes from OpenSeaAssetBundleQuery
     */
    getBundles(query?: OpenSeaAssetBundleQuery, page?: number): Promise<{
        bundles: OpenSeaAssetBundle[];
        estimatedCount: number;
    }>;
    /**
     * Get JSON data from API, sending auth token in headers
     * @param apiPath Path to URL endpoint under API
     * @param query Data to send. Will be stringified using QueryString
     */
    get(apiPath: string, query?: object): Promise<Response>;
    /**
     * POST JSON data to API, sending auth token in headers
     * @param apiPath Path to URL endpoint under API
     * @param body Data to send. Will be JSON.stringified
     * @param opts RequestInit opts, similar to Fetch API. If it contains
     *  a body, it won't be stringified.
     */
    post(apiPath: string, body?: object, opts?: RequestInit): Promise<Response>;
    /**
     * PUT JSON data to API, sending auth token in headers
     * @param apiPath Path to URL endpoint under API
     * @param body Data to send
     * @param opts RequestInit opts, similar to Fetch API. If it contains
     *  a body, it won't be stringified.
     */
    put(apiPath: string, body: object, opts?: RequestInit): Promise<Response>;
    /**
     * Get from an API Endpoint, sending auth token in headers
     * @param apiPath Path to URL endpoint under API
     * @param opts RequestInit opts, similar to Fetch API
     */
    private _fetch;
    private _handleApiResponse;
}
