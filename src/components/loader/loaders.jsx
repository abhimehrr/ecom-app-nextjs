import "./style.css";

export const FullPageLoader = () => {
  return (
    <div className="h-screen w-full fixed top-0 left-0 bg-secondary flex item-center justify-center">
      <div className="flex flex-col justify-center items-center space-y-3">
        <span className="spin"></span>
        <p className="text-primary/80 my-4">Please wait...</p>
      </div>
    </div>
  );
};
