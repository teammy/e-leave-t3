import Register from "~/features/auth/components/Register";
import { NextPageWithLayout } from "~/types";

const RegisterPage: NextPageWithLayout = () => {
  return <Register></Register>;
}

RegisterPage.getLayout = Layout;

export default RegisterPage;