import { Suspense, ReactNode } from "react";

export default function Page({children}: {children: ReactNode}) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      {children}
    </Suspense>
  );
}
