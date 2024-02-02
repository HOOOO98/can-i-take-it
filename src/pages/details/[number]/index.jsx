import Head from "next/head";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import getReport from "@/firebase/getReport";
import Loading from "@/conponents/loading";
import Header from "@/conponents/header";
import styles from "@styles/pages/details.module.scss";
import updateReport from "@/firebase/setReport";
import { logEvent } from "@/firebase/firebase";

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
      logEvent("report_view", { phone_number: phoneNumber });
    };
    fetchData();
  }, [phoneNumber]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedCategory) {
      setVisible(true);
      updateReport(phoneNumber, selectedCategory);
      logEvent("report_update", { phone_number: phoneNumber, category: selectedCategory });
      setTimeout(() => {
        setVisible(false);
      }, 2000);
    }
  };

  return (
    <>
      <Head>
        <title>{phoneNumber}</title>
        <meta name="description" content="Search Results on ${phoneNumber}...Details about the phone number report" />
        <meta
          name="keywords"
          content={`${phoneNumber}, 스팸 번호 조회, 스팸 전화 확인, 스팸 전화 차단, 불량 전화 식별, 전화번호 스팸 검사, 스팸 전화번호 데이터베이스, 불법 전화 신고, 스팸 전화 방지, 스팸 전화번호 검색, 스팸 번호 식별기, 광고 전화 차단, 스팸 전화 필터, 무료 스팸 번호 조회, 전화 스팸 신고, 스팸 번호 목록, 스팸 전화번호 목록, 피싱 전화 조회, 스팸 번호 블랙리스트, 스팸 전화 알림, 스팸 전화번호 추적, Spam Number Lookup, Spam Call Identification, Block Spam Calls, Identify Fraud Calls, Phone Number Spam Check, Spam Call Database, Report Illegal Calls, Prevent Spam Calls, Search Spam Numbers, Spam Caller ID, Búsqueda de Números Spam, Identificación de Llamadas Spam, Bloquear Llamadas Spam, Identificar Llamadas Fraudulentas, Verificación de Spam en Números Telefónicos, Base de Datos de Llamadas Spam, Reportar Llamadas Ilegales, Prevenir Llamadas Spam, Buscar Números Spam, Identificador de Llamador Spam, Recherche de Numéros Spam, Identification d'Appels Spam, Bloquer les Appels Spam, Identifier les Appels Frauduleux, Vérification de Spam pour les Numéros de Téléphone, Base de Données d'Appels Spam, Signaler les Appels Illégaux, Prévenir les Appels Spam, Rechercher des Numéros Spam, ID d'Appelant Spam, Spam-Nummernsuche, Spam-Anruferkennung, Spam-Anrufe Blockieren, Betrugsanrufe Identifizieren, Spam-Check für Telefonnummern, Datenbank für Spam-Anrufe, Illegale Anrufe Melden, Spam-Anrufe Verhindern, Spam-Nummern Suchen, Spam-Anrufer-ID, 垃圾号码查询, 垃圾来电识别, 屏蔽垃圾电话, 识别欺诈电话, 电话号码垃圾检查, 垃圾来电数据库, 报告非法电话, 防止垃圾电话, 搜索垃圾号码, 垃圾来电显示, スパム番号検索, スパム電話の識別, スパム電話のブロック, 詐欺電話の特定, 電話番号のスパムチェック, スパム電話のデータベース, 不法な電話の報告, スパム電話の防止, スパム番号の検索, スパム発信者ID, البحث عن أرقام السبام, تحديد المكالمات السبام, حظر المكالمات السبام, التعرف على المكالمات الاحتيالية, فحص السبام للأرقام الهاتفية, قاعدة بيانات المكالمات السبام, الإبلاغ عن المكالمات غير القانونية, منع المكالمات السبام, البحث عن أرقام السبام, هوية المتصل السبام
         `}
        />
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
