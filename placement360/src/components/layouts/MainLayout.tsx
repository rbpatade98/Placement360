import { Outlet } from "react-router";
import Header from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";
import { Container } from "@/components/container";

console.log("Header:", Header);
console.log("Footer:", Footer);
console.log("Container ML:", Container);

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
