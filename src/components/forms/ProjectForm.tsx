import "./forms.scss";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { InputImageField, InputTextField, TextAreaField } from "./Input";
import { SecondaryButton } from "../Button";
import { TypeButton } from "../Button/SecondaryButton";
import { useContext, useState } from "react";
import { ProjectContext } from "../../context/Web/ProjectsContext";
import { uploadTempFile } from "../../services/firebase/ImageController";
import { v4 } from "uuid";
import { IProject } from "../../models";

export default function ProjectForm({ onClose }: { onClose: () => void }) {
  const { newProject } = useContext(ProjectContext);
  const [urls, setUrls] = useState<string[]>([]);
  const [urlsReady, setUrlsReady] = useState(false);

  const initialValues: IProject = {
    id: "",
    title: "",
    description: "",
    images: [],
    client: {
      id: "",
      name: "",
      address: "",
      phoneNumber: "",
      logo: "",
    },
  };

  const projectSchema = Yup.object().shape({
    title: Yup.string().required("Titulo requerido"),
    description: Yup.string()
      .required("Descripcion requerida")
      .min(8, "Debe contener un minimo de 8 caracteres")
      .max(120, "Debe contener un maximo de 120 caracteres"),
    images: Yup.array().of(Yup.string().url()),
  });

  const getUrls = async (files: File[]) => {
    const urls = await uploadTempFile(files);
    setUrls(urls);
    setUrlsReady(true);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={projectSchema}
      onSubmit={(values, { resetForm }) => {
        const project: IProject = {
          id: v4(),
          title: values.title,
          description: values.description,
          images: urls || [],
          client: {
            id: "",
            name: "",
            address: "",
            phoneNumber: "",
            logo: "",
          },
        };
        resetForm();
        newProject(project);
        onClose();
      }}
    >
      {({ isSubmitting }) => (
        <Form className="category-form">
          <InputTextField name="title" label="Nombre del proyecto" />
          <ErrorMessage name="title" />
          <TextAreaField name="description" label="Descripcion del proyecto" />
          <ErrorMessage name="description" />
          <InputImageField
            name="images"
            label=""
            multiple={true}
            getUrls={getUrls}
          />
          <SecondaryButton
            typeButton={TypeButton.SUBMIT}
            title="Agregar proyecto"
            disabled={!urlsReady || isSubmitting}
          />
        </Form>
      )}
    </Formik>
  );
}
