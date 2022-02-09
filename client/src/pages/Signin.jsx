import PhoneIcon from "../components/icons/Phone";
import HomeIcon from "../components/icons/Home";
import Header from "../components/reusable/Header";
import AuthenticationArea from "../components/pageComponents/AuthenticationPage";
import SignInForm from "../components/forms/Signin";

function SignInPage() {
  return (
    <section>
      <Header start={<PhoneIcon />} end={<HomeIcon />} />
      <AuthenticationArea title="Sign in!" url="/signup" message="start using the service!" form={<SignInForm />} />
    </section>
  );
}

export default SignInPage;
