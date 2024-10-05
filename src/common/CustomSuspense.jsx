import { Suspense } from "react";
import { FallingLines } from "react-loader-spinner";
export default function CustomSuspense({ children }) {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <FallingLines color="blue" />
        </div>
      }
    >
      {children}
    </Suspense>
  );
}
