import PokemonList from "../PokemonList/PokemonList";
import Search from "../Search/Search";
import "./Pokedex.css"

function pokedex(){
    return (
        <div className="pokedex-wrapper">
            <h1 id="pokedex-heading" > Pokedex</h1>
            <Search/>
            <PokemonList/>
        
        </div>
    )
}
export default pokedex;