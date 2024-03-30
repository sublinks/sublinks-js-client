
import type { FederatedInstances } from "./FederatedInstances";

export interface GetFederatedInstancesResponse {
  federated_instances?: FederatedInstances,
  error?: string,
  message?: string,
}
