import { ReactNode, createContext } from "react";
import { useDispatch } from "react-redux";
import { addBenefit, removeBenefit } from "../../redux/states/benefits";
import { Benefit } from "../../models";

interface BenefitContextProps {
  newBenefit: (benefit: Benefit) => void;
  deleteBenefit: (benefit: Benefit) => void;
}

export const BenefitContext = createContext<BenefitContextProps>({
  newBenefit: function (benefit: Benefit): void {},
  deleteBenefit: function (benefit: Benefit): void {},
});

export default function BenefitContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const dispatch = useDispatch();

  const newBenefit = (benefit: Benefit) => {
    dispatch(addBenefit(benefit));
  };

  const deleteBenefit = (benefit: Benefit) => {
    dispatch(removeBenefit(benefit.id));
  };

  return (
    <BenefitContext.Provider value={{ newBenefit, deleteBenefit }}>
      {children}
    </BenefitContext.Provider>
  );
}
