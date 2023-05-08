import { useState, useContext } from "react";
import BenefitForm from "../../../../components/forms/BenefitForm";
import { useSelector } from "react-redux";
import { AppStore } from "../../../../redux/store";
import { ComplementaryButton } from "../../../../components";
import { VscAdd, VscClose } from "react-icons/vsc";
import { Card } from "../Card";
import { BenefitContext } from "../../../../context/Web/BenefitContext";

export default function BenefitsMain() {
    const [formVisible, setFormVisible] = useState<boolean>(false)
    const benefits = useSelector((state: AppStore) => state.benefit.data)
    const {deleteBenefit} = useContext(BenefitContext)

  return (
    <>
        <ComplementaryButton
        icon={formVisible ? <VscClose /> : <VscAdd />}
        title={formVisible ? "Cerrar" : "Nuevo Beneficio"}
        handle={() => setFormVisible(!formVisible)}
      />
        {formVisible ? (
            <BenefitForm onClose={() => setFormVisible(false)} />
        ) : null}
        {benefits.length > 0 ? (
            <>
            {benefits.map(benefit => (
                <Card 
                    key={benefit.id}
                    title={benefit.title} 
                    description={benefit.description} 
                    iconIndex={benefit.iconIndex} 
                    handleRemove={() => deleteBenefit(benefit)} />
            ))}
                
            </>

        ): <p>Agregar nuevo beneficio</p>}
    </>
  )
}