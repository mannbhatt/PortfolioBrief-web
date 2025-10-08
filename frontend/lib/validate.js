export default function emailValidate(values){
    const errors = {};

    if (!values.email || !(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email))) {
        errors.email = 'Invalid Email';
    }

    return errors;
}