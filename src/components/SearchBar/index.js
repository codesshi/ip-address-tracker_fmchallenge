import { useState } from 'react';
import css from './SearchBar.module.css';
import icon from '../../assets/icon-arrow.svg';

const SearchBar = (props) => {
    const [inputValue, setInputValue] = useState("");
    
    const handleChange = event => {
        setInputValue(event.target.value);
    }

    const handleSubmit = event => {
        event.preventDefault();
        props.onSearch(inputValue);
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className={css.container}>
                <input type="text" value={inputValue} onChange={handleChange} />
                <button type="submit"><img src={icon}></img></button>
            </div>
        </form>
    );
}

export default SearchBar;