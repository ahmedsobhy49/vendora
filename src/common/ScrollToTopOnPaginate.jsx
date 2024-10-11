import React, { useEffect } from "react";

export default function ScrollToTopOnPaginate({ pageState }) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pageState]);

  return null;
}
