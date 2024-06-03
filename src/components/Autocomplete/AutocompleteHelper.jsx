import React, { useEffect, useState, useCallback } from 'react'
import './styles.css'
import SuggestionsList from './SuggestionsList'
import debounce from "lodash/debounce"

const AutocompleteHelper = ({
  placeholder,
  staticData,
  fetchSuggestions,
  dataKey = "",
  customLoading = "Loading...",
  onSelect = () => {},
  onChange = () => {},
  onBlur = () => {},
  onFocus = () => {},
  customStyles
}) => {
  const [inputValue, setInputValue] = useState('')
  const [suggestions, setSuggestions] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [suggestionSelected, setSuggestionSelected] = useState(false)

  const handleInputChange = (event) => {
    setSuggestionSelected(false)
    setInputValue(event.target.value)
    onChange(event.target.value)
  };

  const getSuggestions = async (query) => {
    setError(null)
    setLoading(true)
    try {
      let result;
      if (staticData) {
        result = staticData.filter((item) => {
          return item.toLowerCase().includes(query.toLowerCase())
        })
      } else if (fetchSuggestions) {
        result = await fetchSuggestions(query)
      }
      console.log(suggestions,'suggestions inside getSuggestions')
      setSuggestions(result)
    } catch (error) {
      setError("Failed to fetch suggestions")
      setSuggestions([])
    } finally {
      setLoading(false)
    }
  };

  const getSuggestionsDebounced = useCallback(debounce(getSuggestions, 300),[])

  useEffect(() => { 
    if(inputValue.length > 1){ 
      getSuggestionsDebounced(inputValue)
    } else {
      setSuggestions([])
    }
  }, [inputValue])

  const handleSuggestionClick = (suggestion) => {
    setInputValue(dataKey ? suggestion[dataKey] : dataKey);
    onSelect(suggestion);
    setSuggestions([]);
    setSuggestionSelected(true);
  }

  return (
    <div className='autocompleteContainer'>
      <input
        type='text'
        placeholder={placeholder}
        value={inputValue}
        style={customStyles}
        onBlur={onBlur}
        onFocus={onFocus}
        onChange={handleInputChange}
      />
      {(suggestions.length > 0 || loading || error) && (
       <ul className='suggestionsList'>
          {error && <div className="error">{error} </div>}
          {loading && <div className="loading">{customLoading}</div>}
          <SuggestionsList 
            dataKey={dataKey}
            highlight={inputValue}
            suggestions={suggestions}
            onSuggestionClick={handleSuggestionClick}
            suggestionSelected={suggestionSelected}
          />
        </ul>
      )}
    </div>

  )
}

export default AutocompleteHelper