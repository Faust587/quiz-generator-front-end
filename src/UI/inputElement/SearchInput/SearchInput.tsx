import "./SearchInputStyles.scss";
import React, { FC, useState } from "react";
import searchIcon from "../../../assets/icons/search-icon.svg";

type propsType = {
  value: string,
  setValue: React.Dispatch<React.SetStateAction<string>>
}


export const SearchInput: FC<propsType> = (
  {
    value,
    setValue
  }
) => {

  const [ status, setStatus ] = useState(false);

  return (
    <div className="input-container">
      <button
        type="button"
        disabled={ status }
        onClick={ () => setStatus(true) }
        className={ `search-button ${ status ? "extended" : "" }` }
      >
        <img
          className={ `search-icon ${ status ? "disabled" : "" }` }
          src={ searchIcon }
          alt="search"
        />
        {
          status ?
            (
              <>
                <input
                  value={ value }
                  onChange={ (event) => setValue(event.target.value) }
                  className="search-input"
                  type="text"
                  placeholder="Type..."
                  autoFocus={ true }
                  onBlur={ () => setStatus(false) }
                />
              </>
            )
            :
            null
        }
      </button>
      <div className={ `search-title ${ status ? "disabled" : "" }` }>
        Search
      </div>
    </div>
  );
};
