interface IProps {
  type: "card" | "list" | "h-card";
  row?: number;
  Haveavatar?: boolean;
}

const TableSkeleton = () => {
  return (
    <div className="animate-pulse space-y-6">
      {/* Header skeleton */}
      <div className="h-8 bg-gray-300 rounded w-1/3"></div>
      <div className="h-4 bg-gray-200 rounded w-1/2"></div>

      <div className="flex justify-center my-8">
        <div className="bg-white rounded-lg overflow-hidden sm:w-[90%] lg:flex">
          {/* Left Section Skeleton */}
          <div className="lg:w-1/2 p-6 space-y-4">
            <div className="w-full h-56 bg-gray-200 rounded-md"></div>

            <div className="flex gap-4">
              <div className="h-6 w-32 bg-gray-200 rounded"></div>
              <div className="h-6 w-36 bg-gray-200 rounded"></div>
            </div>

            <div className="space-y-2 mt-4">
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-4/5"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3"></div>
            </div>
          </div>

          {/* Right Section Skeleton */}
          <div className="lg:w-1/2 sm:border border-gray-200 p-8 m-6 rounded-2xl space-y-4">
            <div className="h-5 bg-gray-300 rounded w-1/3"></div>

            <ul className="space-y-2">
              <li className="h-4 bg-gray-200 rounded w-4/5"></li>
              <li className="h-4 bg-gray-200 rounded w-3/4"></li>
              <li className="h-4 bg-gray-200 rounded w-2/3"></li>
            </ul>

            <div className="h-5 bg-gray-300 rounded w-1/3 mt-4"></div>
            <ul className="space-y-2">
              <li className="h-4 bg-gray-200 rounded w-1/2"></li>
              <li className="h-4 bg-gray-200 rounded w-3/4"></li>
            </ul>

            <div className="h-5 bg-gray-300 rounded w-1/3 mt-4"></div>
            <ul className="space-y-2">
              <li className="h-4 bg-gray-200 rounded w-3/5"></li>
            </ul>

            <div className="h-10 bg-gray-300 rounded w-full mt-4"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

const SkeletonCustom = ({ type, row = 2, Haveavatar = false }: IProps) => {
  return (
    <>
      {type === "card" && (
        <div className="mx-auto w-[90%] max-w-[1440px] my-20 px-4">
          <div>
            <div className="w-[50%] h-4 bg-neutral-200 my-4 rounded " />
            <div className="w-[40%] h-4 bg-neutral-200 rounded my-4" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {Array.from({ length: 8 }).map((_, index) => (
              <div
                className="border rounded-md border-neutral-200 p-4 space-y-3 animate-pulse"
                key={index}
              >
                <div className="w-full h-36 bg-neutral-200 rounded" />
                {Haveavatar && (
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-neutral-300 rounded-full" />
                    <div className="flex-1 h-4 bg-neutral-200 rounded" />
                  </div>
                )}
                {Array.from({ length: row }).map((_, i) => (
                  <div key={i} className="h-4 bg-neutral-200 rounded w-full" />
                ))}
              </div>
            ))}
          </div>
        </div>
      )}

      {type === "list" && (
        <div className="w-full">
          <TableSkeleton />
        </div>
      )}

      {type === "h-card" && (
        <div className="w-[90%] mx-auto my-12 animate-pulse">
          <div className="mb-4">
            <div className="flex items-center justify-center mx-auto gap-4 w-1/5">
              <div className="w-full h-8 bg-neutral-200 rounded" />
              <div className="w-full h-8 bg-neutral-200 rounded" />
            </div>
          </div>
          <div className="mt-8">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                className="border rounded-md border-neutral-100 p-4 mt-2 space-y-3"
                key={index}
              >
                {Haveavatar && (
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-neutral-300 rounded-full" />
                  </div>
                )}
                {Array.from({ length: row }).map((_, i) => (
                  <div key={i} className="h-10 bg-neutral-200 rounded w-full" />
                ))}
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default SkeletonCustom;
