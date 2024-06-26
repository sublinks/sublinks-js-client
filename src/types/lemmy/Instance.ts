
import type { InstanceId } from "./InstanceId";

export interface Instance {
  id: InstanceId;
  domain: string;
  published: string;
  updated?: string;
  software?: string;
  version?: string;
}
