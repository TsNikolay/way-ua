import styles from "./SpinnerLoader.module.css";
const SpinnerLoader = () => {
  return (
    <div className={styles.spinner}>
      <img src="/animations/spinnerLoader.svg" alt="Loading..." />
    </div>
  );
};

export default SpinnerLoader;
