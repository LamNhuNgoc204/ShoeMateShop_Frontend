export const validateFields = (name, email, password, setErrors) => {
  const newErrors = {};
  if (!name || name.length < 6) {
    newErrors.name = 'Tên phải có ít nhất 6 ký tự.';
  }
  if (!email) {
    newErrors.email = 'Email không được bỏ trống.';
  }
  if (!password || password.length < 6) {
    newErrors.password = 'Mật khẩu phải có ít nhất 6 ký tự.';
  }
  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};

export const validateFieldsLogin = (email, password,setErrors) => {
  const newErrors = {};
  if (!email) {
    newErrors.email = 'Email không được bỏ trống.';
  }
  if (!password) {
    newErrors.password = 'Mật khẩu không được bỏ trống.';
  }
  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};
