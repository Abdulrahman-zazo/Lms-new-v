import FormComplaints from "@/components/FormComplaints";
import { Loaders } from "@/components/Loader";
import { cookies } from "next/headers";
import React, { Suspense } from "react";

const ComplaintsPage = async () => {
  const token = await (await cookies()).get("auth_token")?.value;

  return (
    <div className="bg-bg-purple  sm:p-8 md:p-12   ">
      <Suspense fallback={<Loaders />}>
        <div className=" w-full sm:max-w-[90%] sm:mx-auto mt-18 ">
          <FormComplaints token={token || ""} />
        </div>
      </Suspense>
    </div>
  );
};

export default ComplaintsPage;
