interface MovieBoxOffice {
    page: number,
    results: [
        { poster_path: string },
        { adult: boolean },
        { overview: string },
        { release_date: string },
        { genre_ids: object[] },
        { id: number },
        { original_title: string },
        { original_language: string },
        { title: Date },
        { backdrop_path: number },
        { popularity: number },
        { vote_count: number },
        { video: boolean },
        { vote_average: number }
    ],
    total_results: number,
    total_pages: number
}