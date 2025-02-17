import '@app/App.css';
import { AuthProvider } from '@app/providers';
import Routes from '@app/routes/routes';
// import { Routes } from "@app/routes";

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </div>
  );
}

export default App;
