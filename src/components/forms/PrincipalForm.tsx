import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { IPrincipal } from '../../models/principal.model';
import { InputImageField, InputTextField, TextAreaField } from './Input';
import { SecondaryButton } from '../Button';
import { TypeButton } from '../Button/SecondaryButton';
import { PrincipalContext } from '../../context/Web/PrincipalContext';
import { useContext } from 'react';

export default function PrincipalForm({onClose}: {onClose: () => void}) {
    const { newPrincipal } = useContext(PrincipalContext)

    const initialValues: IPrincipal =  {
        title: '',
        slogan: '',
        image: ''
    }

    const principalSchema = Yup.object().shape({
        title: Yup.string().required('Titulo requerido').max(30, 'Debe contener un maximo de 30 caracteres'),
        slogan: Yup.string().required('Slogan requerido').max(255, 'Debe contener un maximo de 255 caracteres'),
        image: Yup.string().url()
    })

  return ( 
    <Formik
        initialValues={initialValues}
        validationSchema={principalSchema}
        onSubmit={(values, {resetForm}) => {
            const principal: IPrincipal = {
                title: values.title,
                slogan: values.slogan,
                image: values.image
            }
            resetForm()
            newPrincipal(principal)
            onClose()
        }}
    >
        {({isSubmitting}) => (
            <Form className="category-form">
                <InputTextField name='title' label='Nombre de tu empresa' />
                <TextAreaField name='slogan' label='Slogan de tu empresa' />
                <InputImageField name='image' label='' multiple={false} />
                <SecondaryButton title='Actualizar' typeButton={TypeButton.SUBMIT} />
            </Form>
        )}
    </Formik>
  )
}