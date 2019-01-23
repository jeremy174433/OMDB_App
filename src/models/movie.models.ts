interface Movie {
    Response: string,
    Search: [
        { Poster: string },
        { Title: string },
        { Type: string },
        { Year: Date },
        { imdbId: number }
    ],
    totalResults: number,
    Error: string
}