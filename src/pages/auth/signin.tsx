import Login from "~/features/auth/components/Login";
import { NextPageWithLayout } from "~/types";

const LoginPage: NextPageWithLayout = () => {
  return <Login></Login>;
}

LoginPage.getLayout = Layout;

export default LoginPage;