import Auth from "../components/Auth/Auth";
import Header from "../components/Layout/Header/Header";
import Footer from "../components/Layout/Footer/Footer";
import Policy from "../components/Policy/Policy";

const AuthPage = () => {
  return (
    <>
      <Header />
      <Auth />
      <Policy />
      <Footer />
    </>
  );
};

export default AuthPage;
