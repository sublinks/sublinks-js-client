
import type { InstanceWithFederationState } from "./InstanceWithFederationState";

export interface FederatedInstances {
  linked: Array<InstanceWithFederationState>;
  allowed: Array<InstanceWithFederationState>;
  blocked: Array<InstanceWithFederationState>;
}
