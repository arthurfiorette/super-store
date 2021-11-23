export type InventoryContentsResponse = {
  [appId: string]: {
    appid: number;
    name: string;
    icon: string;
    link: string;
    /** Number of itens in the inventory */
    asset_count: number;
    inventory_logo: string;
    trade_permissions: string;
    load_failed: number;
    store_vetted: string;
    owner_only: boolean;
    rgContents: Record<string, any>;
  };
};
