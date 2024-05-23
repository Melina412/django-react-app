import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <>
      <h1>404 Not Found</h1>
      <p>The page you requested does not exist.</p>
      <Link to={'/'}>Go back Home</Link>
    </>
  );
}

export default NotFound;
