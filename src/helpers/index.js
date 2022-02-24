export const setDateMovie = dateMovie =>
     new Date(dateMovie).toLocaleString(undefined, { year: 'numeric', month: 'short', day: 'numeric'})

export const shortText = (text) => 
    text.length > 20 ? text.slice(0, 20) + '...' : text