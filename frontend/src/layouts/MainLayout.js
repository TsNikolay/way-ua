import React from "react";
import Footer from "../components/Footer/Footer";
import Header from "../components/Headers/MainHeader/Header";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <>
      <Header />
      <Outlet /> {/* Здесь рендерятся вложенные страницы */}
      <Footer />
    </>
  );
};

export default MainLayout;

// Outlet - вместо children то есть вместо него подставится тот компонент что передадим в App
// В App.js вот так использовать:
//     function App() {
//         return (
//             <Routes>
//                 <Route element={<MainLayout />}>
//                     <Route path="/" element={<Home />} />
//                     <Route path="/profile" element={<Profile />} />
//                 </Route>
//             </Routes>
//         );
//     }
