import "./footerStyle.scss";
import { type FC } from "react";

interface propTypes {
  text: string;
  urlText: string;
  url: string;
}

export const AuthFooter: FC<propTypes> = ({ text, urlText, url }) => {
  return (
    <footer className="authorization-footer">
      {text}
      &nbsp;
      <a href={url}>{urlText}</a>
    </footer>
  );
};
