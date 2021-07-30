import React, { useState } from 'react';

const SearchComp = ({ serVal, loader }) => {
    const [input, setInput] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        serVal(input);
        loader(true)
    }

    return (
        <div className="serDiv">
            <form onSubmit={handleSubmit}>
                <input type="text" className="fnt18" placeholder='search articles' onChange={(e) => setInput(e.target.value)} />
                <input type="submit" className="fnt18" value="Search" />
            </form>
        </div>
    )

}

export default SearchComp;
