const SuggestionsList = ({
        suggestions = [],
        highlight,
        dataKey,
        onSuggestionClick,
    }) => {
    
    const getHighlightedText = (text, highlight) => {
        const parts = text.split(new RegExp(`(${highlight})`, 'gi')); //g-global, i-caseInsensitive

        return <span>
            {parts.map((part, index) => {
                return part.toLowerCase() === highlight.toLowerCase() ? 
                <b key={index}>{part}</b> : part
            })}
        </span>
    }

    return (
        <>
            {suggestions.map((suggestion, index) => {
                const currSuggestion = dataKey ? suggestion[dataKey] : suggestion;       
                return (
                    <li
                        key={index}
                        onClick={() => onSuggestionClick(suggestion)}
                        className="suggestionItem"
                    >
                        {getHighlightedText(currSuggestion, highlight)}
                    </li>
                )
            })}
        </>
    )
}

export default SuggestionsList