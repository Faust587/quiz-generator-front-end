import styles from "./SearchForm.module.scss";

export const SearchForm = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Enter quiz code</h1>
      <h2 className={styles.subtitle}>To start a quiz</h2>
      <form
        className={styles.form}
        action=""
      >
        <input
          className={styles.input}
          type="text"
          placeholder="Ex: cS09S"
        />
        <button
          className={styles.submitButton}
          type="submit"
        >
          Enter
        </button>
      </form>
    </div>
  );
};
