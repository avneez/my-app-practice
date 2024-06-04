import AutocompleteHelper from "./AutocompleteHelper"

const Autocomplete = () => {
    
    /* 
    const staticData = [
        'apple',
        'banana',
        'pineapple',
        'milk',
        'oranges',
        'papaya',
        'phone',
        'charger',
    ] 
    */

    const fetchSuggestions = async (query) => {
        const response = await fetch(`https://dummyjson.com/products/search?q=${query}`)
        if (!response.ok) {
            throw new Error("Network respnse was not successful")
        }
        const result = await response.json()
        return result.products;
    }


    return (
        <>
            <div>Autocomplete Suggestions</div>
            <AutocompleteHelper 
                placeholder={"Search Products"}
                // staticData={staticData}
                fetchSuggestions={fetchSuggestions}
                dataKey={"title"}
                customLoading={<span style={{color: "black"}}>Loading...</span>}
                onSelect={() => {}}
                onChange={() => {}}
                onBlur={() => {}}
                onFocus={() => {}}
                customStyles={{}}
            />
        </>
    )
}

export default Autocomplete
