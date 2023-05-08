import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { IPrincipal } from "../../models/principal.model";
import { InputImageField, InputTextField, TextAreaField } from "./Input";
import { SecondaryButton } from "../Button";
import { TypeButton } from "../Button/SecondaryButton";
import { PrincipalContext } from "../../context/Web/PrincipalContext";
import { useContext, useState } from "react";
import { uploadTempFile } from "../../services/firebase/ImageController";

export default function PrincipalForm({ onClose }: { onClose: () => void }) {
  const [urls, setUrls] = useState<string[]>([]);
  const [urlsReady, setUrlsReady] = useState(false);
  const { newPrincipal } = useContext(PrincipalContext);

  const initialValues: IPrincipal = {
    title: "",
    slogan: "",
    image: "",
  };

  const principalSchema = Yup.object().shape({
    title: Yup.string()
      .required("Campo requerido")
      .max(30, "Debe contener un máximo de 30 caracteres"),
    slogan: Yup.string().max(128, "Debe contener un máximo de 128caracteres"),
    image: Yup.string().url(),
  });

  const getUrls = async (files: File[]) => {
    const urls = await uploadTempFile(files);
    setUrls(urls);
    setUrlsReady(true);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={principalSchema}
      onSubmit={(values, { resetForm }) => {
        const principal: IPrincipal = {
          title: values.title,
          slogan: values.slogan,
          image: urls[0] || "",
        };
        resetForm();
        newPrincipal(principal);
        onClose();
      }}
    >
      {({ isSubmitting, errors }) => (
        <Form className="category-form">
          <InputTextField
            name="title"
            label="Nombre de tu empresa"
            error={!!errors.title}
          />
          <ErrorMessage
            name="title"
            render={(msg) => <div className="error">{msg}</div>}
          />
          <TextAreaField
            name="slogan"
            label="Slogan de tu empresa"
            error={!!errors.slogan}
          />
          <ErrorMessage
            name="slogan"
            render={(msg) => <div className="error">{msg}</div>}
          />
          <InputImageField
            name="image"
            label=""
            multiple={false}
            getUrls={getUrls}
          />
          <SecondaryButton
            title="Actualizar"
            typeButton={TypeButton.SUBMIT}
            disabled={!urlsReady || isSubmitting}
          />
        </Form>
      )}
    </Formik>
  );
}
