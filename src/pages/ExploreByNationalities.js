import React, { useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import Footer from '../components/Footer';
import RecipesContext from '../context/RecipesContext';
import Header from '../components/Header';
import NationalitiesDropdown from '../components/NationalitiesDropdown';
import CardsFoodNationalities from '../components/CardsFoodNationalities';

function ExploreByNatinalities() {
  const { pathname } = useLocation();
  const { setLocation } = useContext(RecipesContext);

  useEffect(() => {
    setLocation(pathname);
  }, [pathname, setLocation]);

  return (
    <main>
      <Header titlePage="Explore Nationalities" />
      <NationalitiesDropdown />
      <CardsFoodNationalities />
      <Footer />
    </main>
  );
}

export default ExploreByNatinalities;
