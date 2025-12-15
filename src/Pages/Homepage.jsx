import { useEffect, useState, createContext } from "react";
import { Link } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Styles from './Homepage.module.css'
import SearchBar from "../Components/Searchbar";

function Homepage() {
    const [list, setList] = useState([]);
    const [filter, setFilter] = useState([]);
    const [search, setSearch] = useState("");
    const parentcontext = createContext()
    
    useEffect(() => {
        getdata()
    }, [])

    const getdata = () => {
        fetch("https://backend-crud-one.vercel.app/product")
        .then(res => res.json())
        .then(data => {
            console.log(data);
            setList(data)
            setFilter(data)
        });   
    };

    useEffect(() => {
        let result = list;
        if (search.trim() !== "") {
            result = result.filter(item =>
                item.name?.toLowerCase().includes(search.toLowerCase()) 
            );
        }
        setFilter(result);
    }, [list, search])
   
    return(
        <>
        <Navbar />
        <div className="container">
            <div className="row">
                <SearchBar value={search}onChange={(value) => setSearch(value)}/>

                {filter.map(item => (
                    <div className="col-12 col-sm-6 col-md-3" key={item._id} >
                        <Link to={`/movie/${item._id}`} style={{ textDecoration: "none", color: "black" }}>
                            <div className={`card ${Styles.movieCard}`}>
                                <div className="card-body">
                                    <img src={item.image} className={`card-img-top ${Styles.cardImg}`} alt={item.name} />
                                    <h2 className={Styles.cardText}>{item.name}</h2><br />
                                    <h4>{item.ticketprice}</h4>
                                </div>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
        </>
    );
}
export default Homepage;