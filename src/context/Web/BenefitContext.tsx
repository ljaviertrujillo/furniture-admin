import { ReactNode, createContext } from "react";
import { useDispatch } from "react-redux";
import { addBenefit, removeBenefit } from "../../redux/states/benefits";
import { IBenefit } from "../../models";

interface BenefitContextProps {
  newBenefit: (benefit: IBenefit) => void;
  deleteBenefit: (benefit: IBenefit) => void;
}

export const BenefitContext = createContext<BenefitContextProps>({
  newBenefit: function (benefit: IBenefit): void {},
  deleteBenefit: function (benefit: IBenefit): void {},
});

export default function BenefitContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const dispatch = useDispatch();

  const newBenefit = (benefit: IBenefit) => {
    dispatch(addBenefit(benefit));
  };

  const deleteBenefit = (benefit: IBenefit) => {
    dispatch(removeBenefit(benefit.id));
  };

  return (
    <BenefitContext.Provider value={{ newBenefit, deleteBenefit }}>
      {children}
    </BenefitContext.Provider>
  );
}
