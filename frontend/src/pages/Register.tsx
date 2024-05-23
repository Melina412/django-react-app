import LoginRegisterForm from '../components/LoginRegisterForm';

function Register() {
  return (
    <>
      <LoginRegisterForm route='/api/user/register/' requestMethod='register' />
    </>
  );
}

export default Register;
