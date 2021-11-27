import CEconItem from 'steamcommunity/classes/CEconItem';

export const groupCommodities = (items: CEconItem[]): CEconItem[] => {
  const commodities: Record<string, CEconItem[]> = {};

  const withoutCommodities = items.filter((item) => {
    if (!item.commodity) {
      return true;
    }

    const key = item.market_hash_name + item.classid;

    commodities[key] ||= [];
    commodities[key]?.push(item);

    return false;
  });

  for (const commodity of Object.values(commodities)) {
    const first = commodity[0];

    if (!first) {
      continue;
    }

    first.amount = commodity.length;
    withoutCommodities.push(first);
  }

  return withoutCommodities;
};
