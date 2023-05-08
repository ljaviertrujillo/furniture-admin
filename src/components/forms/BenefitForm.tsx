import "./forms.scss";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { IBenefit } from "../../models";
import { v4 } from "uuid";
import { InputTextField, TextAreaField } from "./Input";
import { SecondaryButton } from "../Button";
import { TypeButton } from "../Button/SecondaryButton";
import IconsLibrary from "../Icons/IconsLibrary";
import { useState, useContext } from "react";
import { BenefitContext } from "../../context/Web/BenefitContext";

export default function BenefitForm({ onClose }: { onClose: () => void }) {
  const { newBenefit } = useContext(BenefitContext);
  const [iconIndex, setIconIndex] = useState(0);
  const initialValues: IBenefit = {
    id: "",
    title: "",
    description: "",
    iconIndex: 0,
  };

  const benefitSchema = Yup.object().shape({
    title: Yup.string()
      .required("Campo requerido")
      .min(8, "Debe contener un mínimo 8 caracteres")
      .max(20, "Debe contener un máximo de 20 caracteres"),
    description: Yup.string()
      .required("Campo requerido")
      .min(8, "Debe contener un mínimo 8 caracteres")
      .max(30, "Debe contener un máximo de 20 caracteres"),
  });

  const iconIndexChange = (index: number) => {
    setIconIndex(index);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={benefitSchema}
      onSubmit={(values, { resetForm }) => {
        const benefit: IBenefit = {
          id: v4(),
          title: values.title,
          description: values.description,
          image: "",
          iconIndex: iconIndex,
        };
        resetForm();
        newBenefit(benefit);
        onClose();
      }}
    >
      {({ isSubmitting, errors }) => (
        <Form className="category-form">
          <InputTextField
            name={"title"}
            label="Titulo de tu beneficio"
            error={!!errors.title}
          />
          <ErrorMessage
            name="title"
            render={(msg) => <div className="error">{msg}</div>}
          />
          <TextAreaField
            name="description"
            label="Desceipcion de tu beneficio"
            error={!!errors.description}
          />
          <ErrorMessage
            name="description"
            render={(msg) => <div className="error">{msg}</div>}
          />
          <IconsLibrary onChange={iconIndexChange} />
          <SecondaryButton
            typeButton={TypeButton.SUBMIT}
            title="Nuevo beneficio"
            disabled={isSubmitting || iconIndex < 1}
          />
        </Form>
      )}
    </Formik>
  );
}
