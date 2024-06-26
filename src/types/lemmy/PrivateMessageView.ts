
import type { Person } from "./Person";
import type { PrivateMessage } from "./PrivateMessage";

export interface PrivateMessageView {
  private_message: PrivateMessage;
  creator: Person;
  recipient: Person;
}
