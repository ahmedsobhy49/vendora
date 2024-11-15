export default function AppContainer({ children, isMegaMenuOpen }) {
  return (
    // <div className="bg-red-100 pt-28 lg:pt-36 pb-10 px-2 sm:px-4 md:px-6 lg:px-10 min-h-screen flex justify-center items-center w-full md:w-10/12 mx-auto font-[sans-serif] p-6">

    <div className={` w-full md:w-10/12 mx-auto font-[sans-serif] md:mt-28 `}>
      {children}
    </div>
  );
}
