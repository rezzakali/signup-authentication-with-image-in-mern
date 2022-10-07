import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Logout() {
  const navigate = useNavigate();
  const logout = async () => {
    try {
      const result = await fetch('http://localhost:5000/user/logout', {
        // mode: 'no-cors',
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
      if (result.status === 500 || !result) {
        window.alert('Logout later!');
      } else {
        window.alert('Logout successfully');
        setTimeout(() => {
          window.location.reload();
        }, 100);
        navigate('/login');
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    logout();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <></>;
}

export default Logout;
