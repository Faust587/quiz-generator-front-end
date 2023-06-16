import "./footerStyle.scss";
import { type FC } from "react";
import { useNavigate } from "react-router-dom";

interface propTypes {
  text: string;
  urlText: string;
  url: string;
}

export const AuthFooter: FC<propTypes> = ({ text, urlText, url }) => {
  const navigate = useNavigate();
  return (
    <footer
      className="authorization-footer"
      onClick={() => {
        alert("Navigated");
        navigate(url);
      }}
    >
      {text}
      &nbsp;
      <span>{urlText}</span>
    </footer>
  );
};
