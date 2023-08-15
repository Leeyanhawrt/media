import ExpandablePanel from './ExpandablePanel';
import Button from './Button'
import { useRemoveAlbumMutation } from '../store';
import { GoTrash } from 'react-icons/go';
import { Fragment } from 'react';
import PhotosList from './PhotosList';

function AlbumsListItem({ album }) {
  const [removeAlbum, results] = useRemoveAlbumMutation(album);

  const handleRemoveItem = () => {
    removeAlbum(album)
  }

  const header =
    <Fragment>
      <Button className="mr-2" loading={results.isLoading} onClick={handleRemoveItem} >
        <GoTrash />
      </Button>
      {album.title}
    </Fragment >

  return (
    <ExpandablePanel key={album.id} header={header}>
      <PhotosList album={album} />
    </ExpandablePanel>
  );
}

export default AlbumsListItem;