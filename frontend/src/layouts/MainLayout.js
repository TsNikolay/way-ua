import React from "react";
import Footer from "../components/Footer/Footer";
import Header from "../components/Headers/MainHeader/Header";
import { Outlet } from "react-router-dom";

import styles from "./MainLayout.module.css";

const MainLayout = () => {
  return (
    <>
      <Header />
      <main
        style={{ backgroundImage: `/images/bg-lightmode.jpg` }}
        className={styles.container}
      >
        <div className={styles.content}>
          <Outlet /> {/* Здесь рендерятся вложенные страницы */}
        </div>
      </main>
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
