import { Container, Input } from '@mui/material'
import { useContext, useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";
import { AuthContext } from "../context/AuthContext";

const FEATURED_API = 'https://api.themoviedb.org/3/discover/movie?api_key=d6278b3dc3e6f8f8376a89851c3f8c8f'
const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?api_key=d6278b3dc3e6f8f8376a89851c3f8c8f&query='



const Home = () => {

    const [ movies, setMovies ] = useState([])
    const [searchMovie, setsearchMovie  ] = useState('') 
    const {currentUser} = useContext(AuthContext)

    useEffect(() => {
        getMovies(FEATURED_API)
    }, [])

    const getMovies = (API) => {
        fetch(API)
        .then(res => res.json())
        .then(res => setMovies(res.results))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if(searchMovie && currentUser) {
            getMovies(SEARCH_API + searchMovie)
        }else{
            alert('Please log in to search a movie.')
        }
        setsearchMovie('')
    }

    return (
        <div>
            <form onSubmit={handleSubmit} style={{display:'flex', margin:'2rem'}}>
                <Input value={searchMovie} onChange={(e) => setsearchMovie(e.target.value)} type='search' sx={{ margin: 'auto', width:'50%'}} placeholder='Search a Movie' variant="filled" />
            </form>

            <Container style={{display:'flex', flexWrap:'wrap'}}>
                {movies.map((movie) => (
                    <MovieCard key={movie.id} {...movie}/>
                ) )}
                
            </Container>
        </div>
    )
}

export default Home
