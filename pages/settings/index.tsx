import { url } from "inspector";
import React from "react";
import { MainLayout } from "../../components/layout";
import { useRelays } from "../../context/relays/services/Relay";

const SettingsPage = () => {
  const relays = useRelays();

  return (
    <MainLayout>
      <div>TODO: SettingsPage</div>
      {relays.list.map((relay, idx) => {
        return <div key={idx}>{relay.url}</div>;
      })}
      <button
        onClick={() => {
          relays.addRelay({
            url: "hola",
            policy: {
              read: false,
              write: false,
            },
          });
        }}
      >
        Add Relay
      </button>
    </MainLayout>
  );
};

export default SettingsPage;
