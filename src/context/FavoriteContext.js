import { addDoc, collection, deleteDoc, doc, getDocs, onSnapshot, query, where } from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";
import { db } from "../firebase_config";
import { useAuthContext } from "./AuthContext";

const FavoriteContext = createContext(undefined);

export const FavoriteProvider = ({children}) => {
    const [favItems, setFavItems] = useState([]);
    const {currentUser, loginGoogle} = useAuthContext();

    useEffect(() => {
        if(currentUser === null) return;
        const unsubscribe = onSnapshot( //Listeners => to changes in the firestore collection
          query(collection(db, 'favoriteMovies'), where('createdBy', '==', currentUser?.uid)),
          (snapshot) => {
            const res = [];
            snapshot.forEach((doc) => {
              res.push({
                data: doc.data(),
                id: doc.id,
              });
            });
            setFavItems(res);
          }
        );
        return () => unsubscribe(); // Cleanup the listener when the component unmounts
      }, [currentUser?.uid]);

    //ADD MOVIE TO FAV DB COLLECTION
    const addFavMovie = async (title, id, type, posterImg, score) => {
      if(currentUser === null) {
        const handleLoginGoogle = async () => {
          try {
            await loginGoogle();
          } catch(err) {
            console.log(err);
          }
        };
        handleLoginGoogle();
        return;
      };
        try {
            await addDoc(collection(db, 'favoriteMovies'), {
                title: title,
                movieId: id,
                type: type,
                posterImg: posterImg,
                score: score,
                createdBy: currentUser?.uid,
            });
        } catch(err) {
            console.log(err);
        }
    }

    //REMOVE MOVIE FROM FAV DB COLLECTION
    const removeFavMovie = async (id) => {
      if(currentUser === null) return;
      try {
        const q = query(collection(db, 'favoriteMovies'), where("movieId", "==", id));
        const querySnapshot = await getDocs(q);

        let idToRemove;
        querySnapshot?.forEach((doc) => {
          idToRemove = doc.id;
        });

        deleteDoc(doc(db, 'favoriteMovies', idToRemove))
          .then(() => {
            console.log('REMOVED');
          })
          .catch((err) => console.log(err));
      } catch (err) {
        console.log(err);
      }
      };

    return (
    <FavoriteContext.Provider value={{
        favItems,
        addFavMovie,
        removeFavMovie,

    }}>
        {children}
    </FavoriteContext.Provider>
    )
}

export const useFavContext = () => useContext(FavoriteContext);