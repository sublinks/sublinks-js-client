
import type { FederatedInstances } from "./FederatedInstances";

export interface GetFederatedInstancesResponse {
  federated_instances?: FederatedInstances,
  errors?: string[],
  message?: string,
}
