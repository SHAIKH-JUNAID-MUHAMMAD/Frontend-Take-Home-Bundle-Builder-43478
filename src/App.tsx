import Steps from "./components/Steps/Steps";

function App() {
  return (
    <>
      <div className="w-full h-auto flex xl:hidden justify-center items-center p-5 pt-7.75">
        <p className="font-bold text-[#1F1F1F] text-[31.88px] text-center">
          Let’s get started!
        </p>
      </div>
    <div className="w-full h-auto flex flex-col gap-[33.58px] items-center xl:pt-[49.32px]  md:pb-[49.32px]">
      <Steps />
    </div>
    </>
  );
}

export default App;
