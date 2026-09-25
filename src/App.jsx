import ErrorBoundary from "./components/ErrorBoundary";
import ProductPage from "./pages/ProductPage";

function App() {
  return (
    <ErrorBoundary>
      <ProductPage />
    </ErrorBoundary>
  );
}

export default App;