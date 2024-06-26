
import type { CommunityId } from "./CommunityId";
import type { ListingType } from "./ListingType";
import type { PersonId } from "./PersonId";
import type { SearchType } from "./SearchType";
import type { SortType } from "./SortType";

export interface Search {
  q: string;
  community_id?: CommunityId;
  community_name?: string;
  creator_id?: PersonId;
  type_?: SearchType;
  sort?: SortType;
  listing_type?: ListingType;
  page?: /* integer */ number;
  limit?: /* integer */ number;
}
