import React, { useState } from "react";
import styles from "@styles/components/search.module.scss";
import { useRouter } from "next/router";

function Search() {
  const [isFocused, setIsFocused] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const router = useRouter();

  const handleChange = (event) => {
    const value = event.target.value;
    const numberPattern = /^[0-9]*$/;

    if (numberPattern.test(value) && value.length <= 15) {
      setInputValue(value);
      setIsFocused(value.trim() !== "");
    }
  };

  const handleBlur = () => {
    setIsFocused(inputValue.trim() !== "");
  };

  const handleKeyDown = (event) => {
    if ((event.key === "Enter") & inputValue) {
      router.push(`/details/${inputValue}`);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.inputWrapper}>
        <input
          id="search"
          type="text"
          className={styles.inputWrapper__searchInput}
          onFocus={() => setIsFocused(true)}
          onBlur={handleBlur}
          onChange={handleChange}
          value={inputValue}
          maxLength={15}
          autoComplete="off"
          onKeyDown={handleKeyDown}
        />
        <label
          htmlFor="search"
          className={isFocused ? `${styles.inputWrapper__searchLabelFocus}` : styles.inputWrapper__searchLabel}
        >
          Search
        </label>
      </div>
      <p className={inputValue ? styles.blinkText : styles.guidtext}>
        {inputValue ? "Press Enter" : "Search for Suspicious Numbers."}
      </p>
    </div>
  );
}

export default Search;
