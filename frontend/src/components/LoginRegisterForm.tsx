import { useState } from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../constants';
import '../sass/Form.scss';

// 'method' nimmt für props nur die http methods
type FormProps = {
  route: string;
  requestMethod: string;
};

// 'Form' weist der Komponente automatisch den Typ "IntrinsicAttributes & FormProps & RefAttributes<HTMLFormElement>" zu und dann kann an keine props übergeben, die dafür nicht zugelassen sind
function LoginRegisterForm({ route, requestMethod }: FormProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const name = requestMethod === 'login' ? 'Login' : 'Register';
  // console.log({ name });

  async function handleSubmit(e: React.FormEvent) {
    setLoading(true);
    e.preventDefault();

    try {
      const res = await api.post(route, { username, password });
      if (requestMethod === 'login') {
        localStorage.setItem(ACCESS_TOKEN, res.data.access);
        localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
        console.log('login successful');

        navigate('/');
      } else {
        console.log('redirecting to login');
        navigate('/login');
      }
    } catch (error) {
      alert(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className='form'>
      <h1>{name}</h1>

      <input
        className='form-input'
        type='text'
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder='Username'
      />
      <input
        className='form-input'
        type='password'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder='Password'
      />
      {/* {loading && <LoadingIndicator />} */}
      <button className='form-button' type='submit'>
        {name}
      </button>
    </form>
  );
}

export default LoginRegisterForm;
