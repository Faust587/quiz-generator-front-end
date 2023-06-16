import { type FC } from "react";
import { SignUpForm } from "../../components/forms/AuthForms/SignUpForm";
import { AuthSlider } from "../../components/sliders/AuthSlider";
import { AuthHeader } from "../../components/headers/AuthHeader/AuthHeader";
import { AuthFooter } from "../../components/footers/AuthFooter/AuthFooter";
import "./AuthPagesStyles.scss";

const PUBLIC_URL = process.env.PUBLIC_URL;

export const SignUpPage: FC = (): JSX.Element => {
  return (
    <div className="authorization-content">
      <AuthSlider />
      <div className="sign-up-container">
        <AuthHeader
          title="Create an account"
          subtitle="Let's start to create your quizzes"
        />
        <SignUpForm />
        <div className="authorization-footer-wrapper">
          <AuthFooter
            text="Already have an account?"
            urlText="Log in"
            url={`/sign-in`}
          />
        </div>
      </div>
    </div>
  );
};
