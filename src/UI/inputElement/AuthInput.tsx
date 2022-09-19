import React, {FC, useState} from "react";
import redCrossIcon from "../../assets/icons/red-cross.svg";
import "./inputStyles.scss";

type propsType = {
  name: string,
  placeholder: string,
  isError: boolean
  type: "text" | "password",
  value: string,
  setValue: React.Dispatch<React.SetStateAction<string>>
}

export const AuthInput: FC<propsType> = (
  {
    name,
    placeholder,
    isError,
    type,
    value,
    setValue
  }
) => {

  const [isActive, setIsActive] = useState(false);

  return (
    <div className="authorization-input-wrapper">
      <input className="authorization-input"
             type={type}
             placeholder={placeholder}
             value={value}
             onFocus={() => setIsActive(true)}
             onBlur={() => setIsActive(false)}
             onChange={(event) => setValue(event.target.value)}
             name={name}/>
      {
        (isError && !isActive) ? (
          <img className="input-error-icon"
               src={redCrossIcon}
               alt="error" />
        ) : null
      }
    </div>
  );
}
