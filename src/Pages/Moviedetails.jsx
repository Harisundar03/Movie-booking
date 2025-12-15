import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import styles from "./Moviedetails.module.css";
import { useCart } from "./CartContext";
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";

function MovieDetails() {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const { addToCart } = useCart();
    const navigate= useNavigate();
    useEffect(() => {
        fetch(`https://backend-crud-one.vercel.app/product/${id}`)
            .then(res => res.json())
            .then(data => setMovie(data));
    }, [id]);

    if (movie == null) return (
        <div className={styles.loadingContainer}>
            <h2>Loading...</h2>
        </div>
    );

    const handleSubmit = ()=>{
           const auth = localStorage.getItem("token"); // check if the user is logged in           
        if (!auth) {
            localStorage.setItem("redirect","/cart")
            navigate("/login"); // move to login if not logged in
        } else {
            addToCart({
                _id: movie._id,
                name: movie.name,
                ticketprice: movie.ticketprice,
                image: movie.image
            });
            navigate("/cart"); // navigate to cart after add
        }
    };


    return (
        <>
        <Navbar />
            <div className={styles.movieDetailsContainer}>
                <div className={styles.movieCard}>
                    <div className={styles.movieContent}>
                        <img 
                            src={movie.image} 
                            alt={movie.name} 
                            className={styles.movieImage}
                        />
                        <div className={styles.movieInfo}>
                            <h1 className={styles.movieTitle}>{movie.name}</h1>
                            <div className={styles.movieMeta}>
                                <p>
                                    <span className={styles.label}>Released:</span> {movie.releasedate}
                                </p>
                                <p>
                                    <span className={styles.label}>Director:</span> {movie.director}
                                </p>
                                <p>
                                    <span className={styles.label}>Budget:</span> {movie.budget}
                                </p>
                            </div>
                            <p className={styles.movieDescription}>{movie.description}</p>
                            
                                <button
                                    className={styles.addToCartBtn}
                                    onClick={handleSubmit}>
                                    &#128722; Add to Cart
                                </button>
                            
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default MovieDetails;