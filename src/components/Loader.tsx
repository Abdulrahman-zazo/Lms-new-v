import { Loader } from "react-feather";

export const Loaders = () => (
  <div className="flex h-screen justify-center items-center py-10">
    <div className="animate-spin animate-duration-[1500ms] rounded-full h-8 w-8  border-primary">
      <Loader />
    </div>
  </div>
);
