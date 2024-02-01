import Head from "next/head";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import getReport from "@/firebase/getReport";
import Loading from "@/conponents/loading";
import Header from "@/conponents/header";
import styles from "@styles/pages/details.module.scss";
import updateReport from "@/firebase/setReport";

function Detail() {
  const [reportData, setReportData] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [visible, setVisible] = useState(false);
  const router = useRouter();
  const phoneNumber = router.query.number;

  useEffect(() => {
    if (!phoneNumber) return;
    const fetchData = async () => {
      const data = await getReport(phoneNumber);
      setReportData(data);
    };
    fetchData();
  }, [phoneNumber]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedCategory) {
      setVisible(true);
      updateReport(phoneNumber, selectedCategory);
      setTimeout(() => {
        setVisible(false);
      }, 2000);
    }
  };

  return (
    <>
      <Head>
        <title>{phoneNumber}</title>
        <meta name="description" content="Details about the phone number report" />
      </Head>
      <div className={styles.container}>
        <Header />
        <div className={styles.resultarea}>
          <p className={styles.resultarea__phonenumber}>{`"${phoneNumber}"`}</p>
          <div>
            {reportData ? (
              <>
                <div className={styles.resultarea__category}>
                  {typeof reportData === "string" ? (
                    <p>{reportData}</p>
                  ) : (
                    reportData.map((item, index) => (
                      <div key={index}>
                        <p>
                          {item.category}({item.count})
                        </p>
                      </div>
                    ))
                  )}
                </div>
                <form onSubmit={handleSubmit} className={styles.resultarea__wrapper}>
                  <select
                    className={styles.resultarea__wrapper__selection}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                  >
                    <option hidden>Please report the category</option>
                    <option value="telemarketing">Telemarketing Calls</option>
                    <option value="robocalls">Robocalls</option>
                    <option value="scam">Scam Calls</option>
                    <option value="phishing">Phishing Calls</option>
                    <option value="spoofing">Spoofing Calls</option>
                    <option value="debtCollection">Debt Collection Scams</option>
                    <option value="charityScam">Charity Scam Calls</option>
                    <option value="survey">Survey Calls</option>
                    <option value="prizeLottery">Prize and Lottery Scam Calls</option>
                    <option value="warrantyInsurance">Warranty and Insurance Scam Calls</option>
                    <option value="techSupport">Tech Support Scam Calls</option>
                    <option value="malwareSpyware">Malware/Spyware Calls</option>
                    <option value="accountSuspension">Account Suspension Scam Calls</option>
                    <option value="jobOffer">Job Offer Scam Calls</option>
                  </select>
                  <button type="submit" className={styles.resultarea__wrapper__submitbutton}>
                    Report
                  </button>
                </form>
                <p className={visible ? styles.thank : styles.thank__unvisible}>Thank you for your support!</p>
              </>
            ) : (
              <Loading />
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Detail;
