import Lottie from "react-lottie";
import loading from "@/assets/loading.json";
import styles from "@styles/components/loading.module.scss";

function Loading() {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: loading,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div className={styles.container}>
      <Lottie options={defaultOptions} height={320} width={320} />
    </div>
  );
}

export default Loading;
