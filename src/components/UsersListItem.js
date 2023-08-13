import { GoTrash } from 'react-icons/go';
import Button from './Button';
import { deleteUser } from '../store'
import { useThunk } from '../hooks/useThunk';
import ExpandablePanel from './ExpandablePanel';
import { Fragment } from 'react';
import AlbumsList from './AlbumsList';

function UsersListItem({ user }) {
  const [doDeleteUser, isLoading, error] = useThunk(deleteUser);

  const handleClick = () => {
    doDeleteUser(user)
  }

  const header = <Fragment>
    <Button loading={isLoading} className="mr-3" onClick={handleClick}>
      <GoTrash />
    </Button>
    {error && <div>Error deleting user. </div>}
    {user.name}
  </Fragment>

  return (
    <ExpandablePanel header={header}>
      <AlbumsList user={user} />
    </ExpandablePanel>
  )

}

export default UsersListItem