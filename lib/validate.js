export default function login_Validate(values) {
  const errors = {};
  // email validation
  if (!values.email) {
    errors.email = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }
  // password validation

  if (!values.password) {
    errors.password = 'Required';
  } else if (values.password.length < 8 || values.password.length > 20) {
    errors.password =
      'Password must be more than 8 characters and less than 20 characters long';
  } else if (values.password.includes(' ')) {
    errors.password = 'invalid password';
  }
  return errors;
}
export function register_validation(values) {
  // Username validation
  const errors = {};
  if (!values.Username) {
    values.Username = 'Required';
  }
  // email validate
  if (!values.email) {
    errors.email = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }
  // password validate
  if (!values.password) {
    errors.password = 'Required';
  } else if (values.password.length < 8 || values.password.length > 20) {
    errors.password =
      'must be more than 8 characters and less than 20 characters long ';
  } else if (values.password.includes(' ')) {
    errors.password = 'invalid password! space dose not allow';
  }
  // cPassword validate
  if (!values.cpassword) {
    errors.cpassword = 'Required';
  } else if (values.password !== values.cpassword) {
    errors.cpassword = 'password dose not match!';
  }
  return errors;
}
