import { useEffect, useState} from "react";
import axios from "axios";
import './PokemonList.css'
import Pokemon from "../Pokemon/Pokemn";



function PokemonList(){
    const [PokemonList,setPokemonList]=useState([]);
    const [isLoading,setIsLoading]=useState(true);


    const [pokedexUrl,setPokedexUrl]=useState("https://pokeapi.co/api/v2/pokemon")

    const [nextUrl,setNextUrl]=useState('');
    const [prevUrl,setPrevUrl]=useState('');


   async function downloadsPokemons(){
    setIsLoading(true);
    const response=await axios.get(pokedexUrl);//This dawnnlaod kist of 20 Pokemons 

    const pokemonResultes=response.data.results; // we get the array of pokemons from result

    console.log(response.data)
    setNextUrl(response.data.next);
    setPrevUrl(response.data.previous);

    //itrating over the array of pokemon and using there URL to create an array of promises that will dawnload those 20 pokemons

    const pokemonResultPromise = pokemonResultes.map((pokemon)=>axios.get(pokemon.url)); 
            
// passing that promise array to axios.all
    const pokemonData =await axios.all(pokemonResultPromise);//array of 20 pokemon detail data

    console.log(pokemonData);
//now itrate on the data of each pokemon id, name ,type
    const res=pokemonData.map((pokeData) => {
        const pokemon=pokeData.data;
        return {name:pokemon.name,
                image :( pokemon.sprites.other) ? pokemon.sprites.other.dream_world.front_default : pokemon.sprites.front_shiny, 
                types:pokemon.types,
                id:pokemon.id}
    })
    console.log(res)
    setPokemonList(res);

    setIsLoading(false);
    }

    useEffect(()=>{
        downloadsPokemons();
    },[pokedexUrl])
    

    return (         
        <>
        <div className="pokemon-list-rapper">
           <div className="pokemon-wrapper">
            {(isLoading)?" Loading..." :
            PokemonList.map((p)=> < Pokemon name={p.name} image={p.image} key={p.id}/> )}
            </div> 
            <div className="controls">
                <button disabled={prevUrl==null} onClick={()=>setPokedexUrl(prevUrl)} >Prev</button>
                <button disabled={nextUrl==null} onClick={()=>setPokedexUrl(nextUrl)} >Next</button>
            </div>
        </div>
        
        </>
    )
}
export default PokemonList;