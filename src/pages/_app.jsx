import "../styles/index.scss";
import { Oswald } from "next/font/google";

const oswald = Oswald({
  subsets: ["latin"],
});

function App({ Component, pageProps }) {
  return (
    <main className={oswald.className}>
      <Component {...pageProps} />
    </main>
  );
}

export default App;
