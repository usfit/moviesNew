class MovieServise {
  baseUrl = "https://api.themoviedb.org/3/";

  key = "api_key=46de638241c04e3c39b3cee8c2703a3d";

  // Запрос на список фильмов

  async getSearchMovies(query, page) {
    const url = `${this.baseUrl}search/movie?${this.key}&query=${query}&page=${page}`;
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`Ответ в сети был не ок , статус ${res.status}`);
    }
    const body = await res.json();
    return body;
  }
}

export default MovieServise;
