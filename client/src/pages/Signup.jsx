import PhoneIcon from "../components/icons/Phone";
import HomeIcon from "../components/icons/Home";
import Header from "../components/reusable/Header";
import AuthenticationArea from "../components/pageComponents/AuthenticationPage";
import SignUpForm from "../components/forms/Signup";

function SignUpPage() {
  return (
    <div>
      <Header start={<PhoneIcon />} end={<HomeIcon />} />
      <AuthenticationArea title="Sign up!" url="/" message="do you already have an account!?" form={<SignUpForm />} />
    </div>
  );
}

export default SignUpPage;
