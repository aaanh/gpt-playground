import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";

const DefaultLayout = ({ children }: any) => {
  return (
    <>
      <NavBar></NavBar>
      <main
        className="flex min-h-screen justify-center pt-20"
        data-theme="light"
      >
        {children}
      </main>
      <Footer></Footer>
    </>
  );
};

export default DefaultLayout;
