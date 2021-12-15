import Header from "./components/layout/Header";
import BtcTracker from "./components/trackers/BtcTracker";
import GoldTracker from "./components/trackers/GoldTracker";

function App() {
  return (
    <div className="App">
      <Header></Header>
      <BtcTracker></BtcTracker>
      <GoldTracker></GoldTracker>
    </div>
  );
}

export default App;
