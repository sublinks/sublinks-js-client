
import type { InstanceId } from "./InstanceId";
import type { ReadableFederationState } from "./ReadableFederationState";

export interface InstanceWithFederationState {
  id: InstanceId;
  domain: string;
  published: string;
  updated?: string;
  software?: string;
  version?: string;
  federation_state?: ReadableFederationState;
}
