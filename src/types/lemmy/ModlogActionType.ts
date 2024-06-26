

export type ModlogActionType =
  | "All"
  | "ModRemovePost"
  | "ModLockPost"
  | "ModFeaturePost"
  | "ModRemoveComment"
  | "ModRemoveCommunity"
  | "ModBanFromCommunity"
  | "ModAddCommunity"
  | "ModTransferCommunity"
  | "ModAdd"
  | "ModBan"
  | "ModHideCommunity"
  | "AdminPurgePerson"
  | "AdminPurgeCommunity"
  | "AdminPurgePost"
  | "AdminPurgeComment";
