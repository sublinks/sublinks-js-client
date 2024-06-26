
import type { ListingType } from "./ListingType";
import type { SortType } from "./SortType";

export interface ListCommunities {
  type_?: ListingType;
  sort?: SortType;
  show_nsfw?: boolean;
  page?: /* integer */ number;
  limit?: /* integer */ number;
}
