import { Observable } from 'rxjs';

export const getUser = () => {
  const userToken = localStorage.getItem('UserToken');

  if (!userToken) {
    console.error('User not logged in.');
    return 0; // Prevent API call if userToken is missing
  }

  let parsedToken;
  try {
    parsedToken = JSON.parse(userToken);
  } catch (error) {
    console.error('Invalid token format:', error);
    return 0;
  }

  const userId = parsedToken?.userId;

  if (!userId || typeof userId !== 'number') {
    console.error('Invalid User ID:', userId);
    return 0;
  }
  return userId;
};
