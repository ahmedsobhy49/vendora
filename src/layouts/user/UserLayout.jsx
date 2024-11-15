import React, { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "./header/Header";
import SecondaryHeader from "./secondaryHeader/SecondaryHeader";
import AppConrainer from "../../common/AppContainer";
import MegaMenu from "./megaMenu/MegaMenu";
import getAllParentCategories from "../../services/category/getAllParentCategories";
import { useQuery } from "react-query";
import getSubCategoriesByParentId from "../../services/category/getSubCategoriesByParentId";
import getBrandByCategoryId from "../../services/brands/getBrandsByCategoryId";
import Sidebar from "./sidebar/Sidebar";

export default function UserLayout() {
  const loction = useLocation();
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [parentCategoriesState, setParentCategoriesState] = useState([]);
  const [subCategoriesState, setSubCategoriesState] = useState([]);
  const [selectedParentId, setSelectedParentId] = useState(null);
  const [topBrands, setTopBrands] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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

  useEffect(() => {
    setIsSidebarOpen(false);
  }, [location.pathname]);

  function handleMouseEnter(event) {
    const parentId = event.currentTarget.dataset.id;
    if (parentId !== selectedParentId) {
      setSelectedParentId(() => parentId);
      setIsMegaMenuOpen(true);
      setIsSidebarOpen(false); // Close sidebar when opening mega menu
    }
  }

  function handleMouseLeave() {
    setIsMegaMenuOpen(false);
    setSelectedParentId(null);
  }

  function handleSidebarVisibilityChange(e) {
    if (e.currentTarget.dataset.type === "close") {
      setIsSidebarOpen(false);
    } else if (e.currentTarget.dataset.type === "open") {
      setIsSidebarOpen(true);
      setIsMegaMenuOpen(false);
      setSelectedParentId(null);
    }
  }

  return (
    <>
      <Header handleSidebarVisibilityChange={handleSidebarVisibilityChange} />
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        parentCategoriesState={parentCategoriesState}
        subCategoriesState={subCategoriesState}
        setSubCategoriesState={setSubCategoriesState}
        setSelectedParentId={setSelectedParentId}
        selectedParentId={selectedParentId}
      />
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
        <div className="fixed top-64 right-0 bottom-0 left-0 bg-black opacity-30 z-10 hidden lg:block"></div>
      )}

      {isSidebarOpen && (
        <div
          className="fixed top-0 right-0 left-0 bottom-0  bg-black opacity-30 z-1 lg:hidden"
          data-type="close"
          onClick={(e) => handleSidebarVisibilityChange(e)}
        ></div>
      )}
    </>
  );
}
