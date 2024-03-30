
import type { LinkMetadata } from "./LinkMetadata";

export interface GetSiteMetadataResponse {
  metadata: LinkMetadata,
  error?: string,
  message?: string,
}
