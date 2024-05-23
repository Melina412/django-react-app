import LoginRegisterForm from '../components/LoginRegisterForm';

function Login() {
  return (
    <>
      <LoginRegisterForm route='/api/token/' requestMethod='login' />
    </>
  );
}

export default Login;
