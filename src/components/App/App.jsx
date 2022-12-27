import { fetchImages } from 'api';
import toast, { Toaster } from 'react-hot-toast';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { Loader } from 'components/Loader/Loader';
import { Button } from 'components/Button/Button';
import { ModalImage } from 'components/Modal/Modal';
import { GlobalStyle } from 'components/GlobalStyle';
import { Searchbar } from 'components/SearchBar/SearchBar';
import { AppStyle } from './AppStyled';
import { useState,useEffect } from 'react';


export const App  = () => {
const [page,setPage] = useState(1);
const [query,setQuery] = useState('');
const [photos,setPhotos] = useState([]);
const [selectedImage,setSelectedImage] = useState(false);
const [isLoading,setIsLoading] = useState(false);
useEffect(()=>{
if(query === ''){
  return;
}
async function foo(){
  try {
  setIsLoading(true);
  const responce = await fetchImages(query, page);
  const data = responce.hits.map(
    ({ id, largeImageURL, tags, webformatURL }) => {
      return {
        id,
        largeImageURL,
        tags,
        webformatURL,
      };
    }
  );
  setPhotos(prevPhotos =>[...prevPhotos, ...data]);
  setIsLoading(false)
  } catch (error) {
    toast.error('Oops! Something went wrong!');
  }
  ;
}
foo()
},[page,query]);

const loadMore = () => {
  setPage(prevPage => prevPage + 1);
};

const searchPhoto = ({ searchQuery }) => {
    setQuery(searchQuery);
    setPage(1);
    setPhotos([]);
};

const selectImage = imgUrl => {
  setSelectedImage(imgUrl);
};

const resetImage = () => {
  setSelectedImage(null);
};
return (
  <>
    <AppStyle>
      <Searchbar onSubmit={searchPhoto} />
      {photos.length > 0 && (
        <ImageGallery photos={photos} onSelect={selectImage} />
      )}
      {photos.length > 11 && !isLoading && (
        <Button onClick={loadMore} />
      )}
      {isLoading && <Loader />}
      <ModalImage
        selectImage={selectedImage}
        resetImage={resetImage}
      />
      <Toaster />
      <GlobalStyle />
    </AppStyle>
  </>
);
}

// export class oldApp extends Component {
//   state = {
//     page: 1,
//     query: '',
//     photos: [],
//     selectedImage: false,
//   };

  

  

//   searchPhoto = ({ searchQuery }) => {
//     const { query } = this.state;
//     if (searchQuery !== query) {
//       this.setState({
//         photos: [],
//         page: 1,
//       });
//     }
//     this.setState({
//       query: searchQuery,
//       page: 1,
//       photos: [],
//     });
//   };

//   selectImage = imgUrl => {
//     this.setState({
//       selectedImage: imgUrl,
//     });
//   };

//   resetImage = () => {
//     this.setState({
//       selectedImage: null,
//     });
//   };

//   render() {
//     const { photos, isLoading, selectedImage } = this.state;
//     return (
//       <>
//         <AppStyle>
//           <Searchbar onSubmit={this.searchPhoto} />
//           {photos.length > 0 && (
//             <ImageGallery photos={photos} onSelect={this.selectImage} />
//           )}
//           {photos.length > 11 && !isLoading && (
//             <Button onClick={this.loadMore} />
//           )}
//           {isLoading && <Loader />}
//           <ModalImage
//             selectImage={selectedImage}
//             resetImage={this.resetImage}
//           />
//           <Toaster />
//           <GlobalStyle />
//         </AppStyle>
//       </>
//     );
//   }
// }
