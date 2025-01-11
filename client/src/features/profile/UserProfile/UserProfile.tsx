import { useParams } from 'react-router-dom';

const UserProfile = () => {
  const {id} = useParams()

  console.log(id);

  return (
    <div>
      User profile for: {id}
    </div>
  );
};

export default UserProfile;