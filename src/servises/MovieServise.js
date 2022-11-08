/* eslint-disable class-methods-use-this */
class MovieServise {
  baseUrl = 'https://api.themoviedb.org/3/';

  key = 'api_key=46de638241c04e3c39b3cee8c2703a3d';

  async getRes(url) {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`Ответ в сети был не ок , статус ${res.status}`);
    }
    const body = await res.json();
    return body;
  }

  async postRes(url, request) {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': 70,
      },
      body: request,
    });
    if (!res.ok) {
      throw new Error(`Не удалось поставить рейтинг , статус ${res.status}`);
    }
  }

  // Запрос на список фильмов с самым высоким рейтингом

  async getTopMovies() {
    const url = `${this.baseUrl}/movie/top_rated?${this.key}&language=en-US&page=${1}`;
    const body = await this.getRes(url);
    return body;
  }

  // Запрос на список фильмов

  async getSearchMovies(query, page) {
    const url = `${this.baseUrl}search/movie?${this.key}&query=${query}&page=${page}`;
    const body = await this.getRes(url);
    return body;
  }

  // Получаем список жанров

  async loadGenreList() {
    const url = `${this.baseUrl}genre/movie/list?${this.key}&language=en-US`;
    const body = await this.getRes(url);
    return body;
  }

  // Гостевая сессия

  async openGuestSession() {
    const url = `${this.baseUrl}authentication/guest_session/new?${this.key}`;
    const body = this.getRes(url);
    return body;
  }

  // Выставляем рейтинг

  async postMovieRating(rate, movieId, guestSessionId) {
    const url = `${this.baseUrl}movie/${movieId}/rating?${this.key}&guest_session_id=${guestSessionId}`;
    const rating = { value: rate };
    const request = JSON.stringify(rating);
    await this.postRes(url, request);
  }

  async loadRatedMovies(guestSessionId, page) {
    const url = `${this.baseUrl}guest_session/${guestSessionId}/rated/movies?${this.key}&page=${page}&language=en-US&sort_by=created_at.asc`;
    const body = await this.getRes(url);
    return body;
  }
}

export default MovieServise;
