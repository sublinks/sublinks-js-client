
import type { ActivityId } from "./ActivityId";
import type { InstanceId } from "./InstanceId";

export interface ReadableFederationState {
  instance_id: InstanceId;
  last_successful_id?: ActivityId;
  last_successful_published_time?: string;
  fail_count: number;
  last_retry?: string;
  next_retry?: string;
}
