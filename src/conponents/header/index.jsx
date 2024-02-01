import Link from "next/link";
import React from "react";
import styles from "@styles/components/Header.module.scss";
function Header() {
  return (
    <header className={styles.container}>
      <Link href="/" className={styles.title}>
        Can I Take It ?
      </Link>
    </header>
  );
}

export default Header;
