// function AddCategory() {
// return (
// <div className="bg-white shadow-md xl:w-2/5 ">
// <div className="p-[1rem] mb-[1.25rem] font-bold text-white shadow-md xl:mb-[0.5rem] text-sm bg-[#338ffb] md:text-lg xl:p-[1.35rem]">
// <h3 className="text-center">Add New Category</h3>
// </div>
// <div className="p-[1rem] mx-auto lg:w-8/12 xl:w-11/12 2xl:w-10/12">
// <div className="flex flex-col gap-[0.5rem] mb-[0.75rem]">
// <Input
// label="Category Name"
// labelClassName="font-semibold text-xs sm:text-[0.85rem]"
// inputClassName="px-[0.5rem] py-[0.25rem] border border-gray-200 rounded-md outline-none lg:py-[0.5rem] xl:py-[0.75rem]"
// />
// </div>
// <div className="w-64 h-64 mx-auto mb-[0.5rem] lg:w-8/12 xl:w-full xl:h-80 lg:mt-[0.5rem] lg:mb-[1.5rem] xl:mb-[1rem] shadow-inner">
// <img
// src="https://cdn.pixabay.com/photo/2017/11/10/05/24/add-2935429_960_720.png"
// alt="category-preview"
// className="w-full h-full"
// />
// </div>
// <div className="mt-[1rem] text-center lg:mt-[0.5rem]">
// <button className="w-full px-[0.5rem] py-[0.25rem] font-bold text-white bg-blue-400 lg:py-[0.5rem] xl:py-[0.75rem]">
// Add
// </button>
// </div>
// </div>
// </div>
// );
// }
//////

// export default function Category() {
// return (
// <DashboardContainer>
// <div className="h-auto">
// <div className="w-full h-full  ">
// <div className="flex flex-col gap-5 xl:flex-row ">
// {/_ Category Table Section _/}
// <div className="h-full xl:w-3/5 ">
// <CategoryTableHeader />
// <div className="table-custom-hight overflow-auto pt-2 shadow-md bg-white hide-scrollbar">
// <TableContainer>
// <CategoryTableHead />
// <TableBodyContainer>
// {categoryData.map((category) => (
// <CategoryTableRow
// key={category.catId}
// catId={category.catId}
// catImage={category.catImage}
// catName={category.catName}
// />
// ))}
// </TableBodyContainer>
// </TableContainer>
// </div>
// </div>

// {/_ Add Category Form Section _/}
// <AddCategory />
// </div>
// </div>
// </div>
// </DashboardContainer>
// );
// }
///////

// function CategoryTableRow({ category }) {
// const { id, image, name } = category;

// return (
// <tr className="">
// <td className="p-2 text-center">{id}</td>
// <td className="p-2 text-center">
// <img
// src={image}
// className="w-16 lg:w-20 aspect-square mx-auto"
// alt={name}
// />
// </td>
// <td className="p-2 text-center">{name}</td>
// <td className="p-2 text-center">
// <button className="mr-[0.75rem]">
// <RiDeleteBin6Fill size={25} color="#f15313" />
// </button>
// <button>
// <MdEditSquare size={25} color="#ffb900" />
// </button>
// </td>
// </tr>
// );
// }

//////

function CategoryTable() {
const categories = [
{
id: 1,
name: "Sample Name",
image:
"https://images.pexels.com/photos/25652584/pexels-photo-25652584/free-photo-of-elegant-man-wearing-navy-suit.jpeg?auto=compress&cs=tinysrgb&w=400",
},
{
id: 1,
name: "Sample Name",
image:
"https://images.pexels.com/photos/25652584/pexels-photo-25652584/free-photo-of-elegant-man-wearing-navy-suit.jpeg?auto=compress&cs=tinysrgb&w=400",
},
{
id: 1,
name: "Sample Name",
image:
"https://images.pexels.com/photos/25652584/pexels-photo-25652584/free-photo-of-elegant-man-wearing-navy-suit.jpeg?auto=compress&cs=tinysrgb&w=400",
},
{
id: 1,
name: "Sample Name",
image:
"https://images.pexels.com/photos/25652584/pexels-photo-25652584/free-photo-of-elegant-man-wearing-navy-suit.jpeg?auto=compress&cs=tinysrgb&w=400",
},
{
id: 1,
name: "Sample Name",
image:
"https://images.pexels.com/photos/25652584/pexels-photo-25652584/free-photo-of-elegant-man-wearing-navy-suit.jpeg?auto=compress&cs=tinysrgb&w=400",
},
{
id: 1,
name: "Sample Name",
image:
"https://images.pexels.com/photos/25652584/pexels-photo-25652584/free-photo-of-elegant-man-wearing-navy-suit.jpeg?auto=compress&cs=tinysrgb&w=400",
},
{
id: 1,
name: "Sample Name",
image:
"https://images.pexels.com/photos/25652584/pexels-photo-25652584/free-photo-of-elegant-man-wearing-navy-suit.jpeg?auto=compress&cs=tinysrgb&w=400",
},
{
id: 1,
name: "Sample Name",
image:
"https://images.pexels.com/photos/25652584/pexels-photo-25652584/free-photo-of-elegant-man-wearing-navy-suit.jpeg?auto=compress&cs=tinysrgb&w=400",
},
{
id: 1,
name: "Sample Name",
image:
"https://images.pexels.com/photos/25652584/pexels-photo-25652584/free-photo-of-elegant-man-wearing-navy-suit.jpeg?auto=compress&cs=tinysrgb&w=400",
},
{
id: 1,
name: "Sample Name",
image:
"https://images.pexels.com/photos/25652584/pexels-photo-25652584/free-photo-of-elegant-man-wearing-navy-suit.jpeg?auto=compress&cs=tinysrgb&w=400",
},
{
id: 1,
name: "Sample Name",
image:
"https://images.pexels.com/photos/25652584/pexels-photo-25652584/free-photo-of-elegant-man-wearing-navy-suit.jpeg?auto=compress&cs=tinysrgb&w=400",
},
{
id: 1,
name: "Sample Name",
image:
"https://images.pexels.com/photos/25652584/pexels-photo-25652584/free-photo-of-elegant-man-wearing-navy-suit.jpeg?auto=compress&cs=tinysrgb&w=400",
},
{
id: 1,
name: "Sample Name",
image:
"https://images.pexels.com/photos/25652584/pexels-photo-25652584/free-photo-of-elegant-man-wearing-navy-suit.jpeg?auto=compress&cs=tinysrgb&w=400",
},
{
id: 1,
name: "Sample Name",
image:
"https://images.pexels.com/photos/25652584/pexels-photo-25652584/free-photo-of-elegant-man-wearing-navy-suit.jpeg?auto=compress&cs=tinysrgb&w=400",
},
// Add more categories here
];

return (

<div className="h-full xl:w-3/5 ">
<CategoryTableHeader />
<div className="table-custom-hight overflow-auto pt-2 shadow-md bg-white hide-scrollbar">
<TableContainer>
<CategoryTableHead />
<TableBodyContainer>
{categoryData.map((category) => (
<CategoryTableRow
                key={category.catId}
                catId={category.catId}
                catImage={category.catImage}
                catName={category.catName}
              />
))}
</TableBodyContainer>
</TableContainer>
</div>
</div>
);
}
/////
// export default function Category() {
//   return (
//     <DashboardContainer>
//       <div className="flex flex-col mx-3 mt-6 lg:flex-row gap-4">
//         <CategoryTable />
//         <CategoryForm />
//       </div>
//     </DashboardContainer>
//   );
// }
