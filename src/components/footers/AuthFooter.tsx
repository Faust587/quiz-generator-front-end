import "./footerStyle.scss";
import { FC } from "react";

type propTypes = {
  text: string,
  urlText: string,
  url: string
}

export const AuthFooter: FC<propTypes> = (
  {
    text,
    urlText,
    url
  }
) => {

  return (
    <footer className="authorization-footer">
      { text }
      &nbsp;
      <a href={ url }>{ urlText }</a>
    </footer>
  );
};
