import * as yup from 'yup';

export const saveToolValidation = yup.object().shape({
    title: yup.string().required(),
    link: yup.string().required(),
    description: yup.string().required(),
    tags: yup.string().required()
});