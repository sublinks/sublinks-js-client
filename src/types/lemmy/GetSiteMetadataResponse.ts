
import type { LinkMetadata } from "./LinkMetadata";

export interface GetSiteMetadataResponse {
  metadata: LinkMetadata,
  errors?: string[],
  message?: string,
}
