import GoodDeed from "./good.deed.interface";
import MetaData from "./meta.data";

export default interface GoodDeedsDataWithPagingMetaData {
  GoodDeeds: GoodDeed[];

  MetaData: MetaData | null;
}
