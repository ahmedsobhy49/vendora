import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./header/Header";
import SecondaryHeader from "./secondaryHeader/SecondaryHeader";
import AppConrainer from "../../common/AppContainer";
import MegaMenu from "./megaMenu/MegaMenu";
import getAllParentCategories from "../../services/category/getAllParentCategories";
import { useQuery } from "react-query";
import getSubCategoriesByParentId from "../../services/category/getSubCategoriesByParentId";
import getBrandByCategoryId from "../../services/brands/getBrandsByCategoryId";

export default function UserLayout() {
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [parentCategoriesState, setParentCategoriesState] = useState([]);
  const [subCategoriesState, setSubCategoriesState] = useState([]);
  const [selectedParentId, setSelectedParentId] = useState(null);
  const [topBrands, setTopBrands] = useState([]);

  console.log(topBrands);
  useQuery(["parentCategories"], getAllParentCategories, {
    onSuccess: (fetchedData) => {
      setParentCategoriesState(fetchedData.data.categories);
    },
  });

  // Fetch top brands
  useQuery(
    ["topBrands", selectedParentId],
    () => getBrandByCategoryId(selectedParentId),
    {
      enabled: !!selectedParentId,
      onSuccess: (fetchedData) => {
        if (fetchedData?.data?.brands?.length) {
          setTopBrands(fetchedData?.data?.brands);
        } else {
          setTopBrands([]);
        }
      },
    }
  );

  function handleMouseEnter(event) {
    const parentId = event.currentTarget.dataset.id;
    if (parentId !== selectedParentId) {
      setSelectedParentId(() => parentId);
      setIsMegaMenuOpen(true);
    }
  }

  function handleMouseLeave() {
    setIsMegaMenuOpen(false);
    setSelectedParentId(null);
  }

  // Fetch subcategories by parent ID when selectedParentId changes
  useQuery(
    ["subCategories", selectedParentId],
    () => getSubCategoriesByParentId(selectedParentId),
    {
      enabled: !!selectedParentId, // Only run if selectedParentId is valid
      onSuccess: (fetchedData) => {
        setSubCategoriesState(fetchedData.data.categories || []);
      },
    }
  );
  return (
    <>
      <Header />
      <div
        onMouseLeave={handleMouseLeave}
        className="absolute left-0 right-0 z-20 hidden lg:block"
      >
        <SecondaryHeader
          parentCategoriesState={parentCategoriesState}
          handleMouseEnter={handleMouseEnter}
          handleMouseLeave={handleMouseLeave}
        />
        {isMegaMenuOpen && (
          <MegaMenu
            subCategoriesState={subCategoriesState}
            topBrands={topBrands}
          />
        )}
      </div>

      <AppConrainer isMegaMenuOpen={isMegaMenuOpen}>
        <Outlet />
      </AppConrainer>

      {isMegaMenuOpen && (
        <div className="fixed top-64 right-0 bottom-0 left-0 bg-black opacity-30 z-10"></div>
      )}
    </>
  );
}
