import { Outlet } from "react-router";
import Header from "../ui/Header";
import Footer from "../ui/Footer";
import { Container } from "../Container";


const MainLayout = () => {
  return (
    <div className="w-full min-h-screen flex flex-col">
      <Header />
      <Container className="flex-1 flex flex-col py-8">
        <main className="flex-1 w-full">
          <Outlet />
        </main>
      </Container>
      <Footer />
    </div>
  )
}

export default MainLayout;
