// This file was generated by [ts-rs](https://github.com/Aleph-Alpha/ts-rs). Do not edit this file manually.
import type { CommunityBlockView } from "./CommunityBlockView";
import type { CommunityFollowerView } from "./CommunityFollowerView";
import type { CommunityModeratorView } from "./CommunityModeratorView";
import type { InstanceBlockView } from "./InstanceBlockView";
import type { LanguageId } from "./LanguageId";
import type { LocalUserView } from "./LocalUserView";
import type { PersonBlockView } from "./PersonBlockView";

export interface MyUserInfo {
  local_user_view: LocalUserView;
  follows: Array<CommunityFollowerView>;
  moderates: Array<CommunityModeratorView>;
  community_blocks: Array<CommunityBlockView>;
  instance_blocks: Array<InstanceBlockView>;
  person_blocks: Array<PersonBlockView>;
  discussion_languages: Array<LanguageId>;
}