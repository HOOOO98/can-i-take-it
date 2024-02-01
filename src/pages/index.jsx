import Header from "@/conponents/header";
import Search from "@/conponents/search";
import Head from "next/head";
import styles from "@styles/pages/home.module.scss";

function Home() {
  return (
    <>
      <Head>
        <title>Can I take it | Home</title>
        <meta name="description" content="Easy to lookup spam call" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.container}>
        <Header />
        <div className={styles.searchArea}>
          <Search />
        </div>
      </div>
    </>
  );
}

export default Home;
