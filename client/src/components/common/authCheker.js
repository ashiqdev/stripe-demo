import { useQuery } from '@apollo/react-hooks';

import { CURRENT_USER_QUERY } from '../User';


export function CheckAuth() {
  const { data } = useQuery(
    CURRENT_USER_QUERY,
  );
  return data && data.me;
}

export default CheckAuth;
