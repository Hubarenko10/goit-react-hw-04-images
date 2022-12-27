import PropTypes from 'prop-types';
import { ImageGalleryItem } from './ImageGalleryItem';
import { GalleryItem,ImageGalleryStyled } from './ImageGalleryStyled';

export const ImageGallery = ({ photos, onSelect }) => {
  return (
    <ImageGalleryStyled>
      {photos.map(({ id, webformatURL, largeImageURL, tags }) => {
        return (
          <GalleryItem key={id}>
            <ImageGalleryItem
              photos={photos}
              onSelect={onSelect}
              smallImg={webformatURL}
              largeImg={largeImageURL}
              tags={tags}
            />
          </GalleryItem>
        );
      })}
    </ImageGalleryStyled>
  );
};

ImageGallery.propTypes = {
  photos: PropTypes.array.isRequired,
  onSelect: PropTypes.func.isRequired,
};
