import { getFirestore, doc, getDoc } from "firebase/firestore";
import { analytics, app } from "./firebase";

const db = getFirestore(app);
async function getReport(phoneNumber) {
  const reportRef = doc(db, "report", phoneNumber);

  try {
    const docSnap = await getDoc(reportRef);

    if (docSnap.exists()) {
      const reports = docSnap.data();
      const sortedReports = Object.entries(reports).sort((a, b) => b[1] - a[1]);
      const topCategories = sortedReports.slice(0, 3).map((item) => ({
        category: item[0],
        count: item[1],
      }));
      if (topCategories[0]) {
        return topCategories;
      } else {
        return "It's a number that hasn't been reported yet.";
      }
    } else {
      return "It's a number that hasn't been reported yet.";
    }
  } catch (error) {
    console.error("[getdoc]Have trouble in process", error);
    return "It's a number that hasn't been reported yet.";
  }
}

export default getReport;
