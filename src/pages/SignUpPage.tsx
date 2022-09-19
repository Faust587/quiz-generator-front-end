import {FC} from "react";
import {SignUpForm} from "../components/forms/SignUpForm";
import {AuthSlider} from "../components/sliders/AuthSlider";
import {AuthHeader} from "../components/headers/AuthHeader";
import {AuthFooter} from "../components/footers/AuthFooter";
import "./style.scss";

const PUBLIC_URL = process.env.PUBLIC_URL;

export const SignUpPage: FC = (): JSX.Element => {

  return (
    <div className="authorization-content">
      <AuthSlider />
      <div className="sign-up-container">
        <AuthHeader />
        <SignUpForm />
        <div className="authorization-footer-wrapper">
          <AuthFooter text="Already have an account?"
                      urlText="Log in"
                      url={`${PUBLIC_URL}/sign-in`} />
        </div>
      </div>
    </div>
  );
}
