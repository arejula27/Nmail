import { Event, PublishCallback, RelayPolicy } from "nostr-tools";
import { Relay, relayService } from "../domain";
import { useRelays } from "../services/Relay";

export function useRelaysUseCases() {
  const pool = useRelays();

  const addRelay = (url: string, policy: RelayPolicy | undefined) => {
    const relay: Relay = {
      url,
      policy: !policy
        ? {
            read: true,
            write: true,
          }
        : policy,
    };
    pool.addRelay(relay);
  };

  return { addRelay };
}
