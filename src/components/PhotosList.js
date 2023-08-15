import Button from "./Button";
import { Fragment } from "react";
import { useAddPhotoMutation, useFetchPhotosQuery } from "../store";
import Skeleton from "./Skeleton";
import PhotosListItem from "./PhotosListItem";

function PhotosList({ album }) {
  const { data, error, isFetching } = useFetchPhotosQuery(album)
  const [addPhoto, results] = useAddPhotoMutation()

  const handleAddPhoto = () => {
    addPhoto(album)
  }

  let content

  if (error) {
    content = <div>Error fetching photos...</div>
  } else if (isFetching) {
    content = <Skeleton times={4} className={"h-8 w-8"}></Skeleton>
  } else {
    content = data.map((photo) => {
      return <PhotosListItem key={photo.id} photo={photo} />
    });
  }

  return (
    <div>
      <div className="m-2 flex flex-row items-center justify-between">
        <h3 className="text-lg font-bold">Photos in {album.title}</h3>
        <Button loading={results.isLoading} onClick={handleAddPhoto}>
          + Add Photo
        </Button>
      </div>
      <div className="mx-8 flex flex-row flex-wrap justify-center">
        {content}
      </div>
    </div>
  )
}

export default PhotosList;