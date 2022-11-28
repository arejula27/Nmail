import { useRelays } from "../../hooks/relays/Relay";
import { MainLayout } from "../../components/layout";

const SettingsPage = () => {
  const relays = useRelays();

  return (
    <MainLayout>
      <div>TODO: SettingsPage</div>
      {relays.list.map((relay, idx) => {
        return <div key={idx}>{relay.url}</div>;
      })}
      <button onClick={() => {}}>Add Relay</button>
    </MainLayout>
  );
};

export default SettingsPage;
