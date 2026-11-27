// The watchlist. Each movie has a title, genre, rating, year, and a watched flag.
// You only read from this array; do not change it.
const movies = [
  { title: "The Shawshank Redemption", genre: "Drama", rating: 9.3, year: 1994, watched: true },
  { title: "The Dark Knight", genre: "Action", rating: 9.0, year: 2008, watched: false },
  { title: "Inception", genre: "Sci-Fi", rating: 8.8, year: 2010, watched: true },
  { title: "The Matrix", genre: "Sci-Fi", rating: 8.7, year: 1999, watched: true },
  { title: "Parasite", genre: "Thriller", rating: 8.6, year: 2019, watched: true },
  { title: "Interstellar", genre: "Sci-Fi", rating: 8.5, year: 2014, watched: false },
  { title: "Whiplash", genre: "Drama", rating: 8.4, year: 2014, watched: true },
  { title: "Spirited Away", genre: "Animation", rating: 8.3, year: 2001, watched: false },
]

// 1. Print the total number of movies, like:  Total movies: 8
// 2. Count the watched movies with filter, then print:  Watched: 5
// 3. Print how many are left (total minus watched), like:  Not watched: 3
console.log("Total movies: " + movies.length)
const Watched = movies.filter((n) => n["watched"] === true)
console.log("Watched: " + Watched.length)
console.log("Not watched: " + (movies.length - Watched.length))


// Add the average rating to the report.
// 1. Use reduce to add up every movie's rating, starting from 0.
// 2. Divide by movies.length and round with toFixed(1).
// 3. Print it, like:  Average rating: 8.7

const total = movies.reduce((sum, movies) => sum + movies.rating, 0)
console.log(total)

const avg = (total/movies.length).toFixed(1)
console.log(`Average rating ${avg}`)