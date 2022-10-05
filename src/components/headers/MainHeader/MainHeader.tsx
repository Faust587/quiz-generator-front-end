import "./MainHeaderStyles.scss";
import userIcon from "../../../assets/icons/user-icon.svg";
import { SearchForm } from "../../forms/SearchForm/SearchForm";

export const MainHeader = () => {

  return (
    <div className="main-header-container">
      <header className="main-header">
        <div className="main-header-top-section">
          <div className="main-header-titles-container">
            <h1 className="main-header-title">
              Let's play
            </h1>
            <h2 className="main-header-subtitle">
              And be the first!
            </h2>
          </div>
          <img
            alt="user-profile"
            src={ userIcon }
            className="main-header-profile-icon"
          />
        </div>
        <SearchForm />
      </header>
    </div>
  );
};
