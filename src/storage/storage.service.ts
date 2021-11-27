import { Injectable } from '@nestjs/common';

@Injectable()
export class StorageService {
  // constructor() {} // private readonly prisma: PrismaService
  // readonly saveItems = async (items: CEconItem[]) => {
  //   // CreateMany does not work with SQLite
  //   for (const item of items) {
  //     await this.prisma.inventoryItem.create({
  //       data: {
  //         amount: item.amount,
  //         commodity: item.commodity,
  //         appId: item.appid,
  //         contextId: item.contextid,
  //         marketHashName: item.market_hash_name || item.name,
  //         tradelockEnd: new Date(
  //           Date.now() + item.market_tradable_restriction * 24 * 60 * 60 * 1000
  //         )
  //       }
  //     });
  //   }
  //   // const batch = items.map((item) =>
  //   //   this.prisma.steamItem.create(this.toSteamItem(item))
  //   // );
  // };
  // private readonly toSteamItem = (item: CEconItem): SteamItem => {
  //   return {
  //     amount: item.amount,
  //     commodity: item.commodity,
  //     appId: item.appid,
  //     contextId: item.contextid,
  //     marketHashName: item.market_hash_name || item.name,
  //     tradelockEnd: new Date(
  //       Date.now() + item.market_tradable_restriction * 24 * 60 * 60 * 1000
  //     ),
  //     id: -1
  //   };
  // };
}
