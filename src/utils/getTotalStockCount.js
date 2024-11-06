export default function getTotalStockCount(product, category) {
  let totalStock = 0;
  switch (category) {
    case "mobiles":
      totalStock = product?.categorySpecificFields?.variations
        ?.map((variation) => {
          console.log(variation?.colors.map((color) => color?.stock));
          return variation?.colors.map((color) => color?.stock);
        })
        ?.flat()
        .reduce((curr, acc) => curr + acc, 0);
  }
  console.log(totalStock);
  return totalStock;
}
