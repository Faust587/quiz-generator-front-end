import "./SearchFormStyles.scss";

export const SearchForm = () => {

  return (
    <div className="search-form-container">
      <h1 className="search-form-title">
        Enter your quiz code
      </h1>
      <h2 className="search-form-subtitle">
        To start a new quiz
      </h2>
      <form className="search-form">
        <input
          type="text"
          className="search-form-input"
          placeholder="Ex: cS09S"
        />
        <button
          type="submit"
          className="search-form-submit-button"
        >
          Enter
        </button>
      </form>
    </div>
  );
};
