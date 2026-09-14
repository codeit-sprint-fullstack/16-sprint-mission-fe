import Header from './components/Header';
import Footer from './components/Footer';
import BestProductList from './components/BestProductList';
import ProductList from './components/ProductList';

function App() {
  return (
    <>
      <Header />
      <main>
        <BestProductList />
        <ProductList />
      </main>
      <Footer />
    </>
  );
}

export default App;