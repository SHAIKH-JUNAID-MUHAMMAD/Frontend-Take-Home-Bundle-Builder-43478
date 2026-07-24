import { stepsDetail } from "../../constants/steps";
import { allProducts, useBundleState } from "../../hooks/useBundleState";
import AccordionStep from "./AccordionStep";
import ReviewPanel from "../ReviewPanel/ReviewPanel";

const Steps = () => {
  const bundle = useBundleState();

  return (
    <div className="w-full h-auto flex flex-col xl:flex-row justify-center gap-7.25 relative">
      <div className="w-full xl:w-3xl h-auto flex flex-col gap-0 md:gap-3.25">
        {stepsDetail.map((step, index) => {
          const isActive = step.title === bundle.currentStep;
          const isLastStep = index === stepsDetail.length - 1;
          const stepProducts = allProducts.filter(
            (p) => p.category === step.title,
          );

          return (
            <AccordionStep
              key={step.title}
              index={index}
              title={step.title}
              icon={step.icon}
              sIcon={step.sIcon}
              isActive={isActive}
              isLastStep={isLastStep}
              nextTitle={stepsDetail[index + 1]?.title}
              products={stepProducts}
              bundle={bundle}
              onToggle={() => bundle.handleStepToggle(step.title)}
              onNext={() => bundle.goToNextStep(step.title)}
            />
          );
        })}
      </div>
      <div>
        <ReviewPanel bundle={bundle} />
      </div>
    </div>
  );
};

export default Steps;
