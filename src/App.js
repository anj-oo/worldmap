import './App.css';
import WorldMap from './components/WorldMap';

function App() {
  return (
    <div className="App">
      <WorldMap/>

      <div className="popup-overlay">
      <div className="popup-content">
        <h2>Popup Title</h2>
        <p>This is a simple popup example in React!</p>
        <button >Close</button>
      </div>
    </div>
    </div>
  );
}

export default App;
