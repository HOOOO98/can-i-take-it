import { getFirestore, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { app } from "./firebase";

const db = getFirestore(app);
async function updateReport(phoneNumber, selectedCategory) {
  const reportRef = doc(db, "report", phoneNumber);

  try {
    const docSnap = await getDoc(reportRef);
    if (docSnap.exists()) {
      const currentCount = docSnap.data()[selectedCategory] || 0;
      await updateDoc(reportRef, {
        [selectedCategory]: currentCount + 1,
      });
    } else {
      await setDoc(reportRef, {
        [selectedCategory]: 1,
      });
    }
    console.log("[updatedoc]Report updated successfully");
  } catch (error) {
    console.error("[updatedoc]Error updating report:", error);
  }
}

export default updateReport;
