import { Loaders } from "@/components/Loader";
import PrivacyComponent from "@/components/Ui/privacyComponent";

import React, { Suspense } from "react";

const PrivacyPolicyPage = () => {
  return (
    <div className="relative">
      <Suspense fallback={<Loaders />}>
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className=" max-[600px]:pb-4 sm:pt-40 sm:pb-2 md:pt-20">
            <div className="relative   max-[600px]:pt-16 overflow-hidden">
              <PrivacyComponent />
            </div>
          </div>
        </div>
      </Suspense>
    </div>
  );
};

export default PrivacyPolicyPage;
