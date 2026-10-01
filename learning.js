// A player's score across a short game. Apply each event below to the
// `score` variable and print the score after each one so you can watch it move.

// let score = 100
// console.log(score)

// // Event 1: Pick up 10 points.
// //    Add 10 to `score` using the compound assignment operator (+=),
// //    then console.log the new score.

// score +=10
// console.log(score)


// // Event 2: Bonus round! Double the score.
// //    Multiply `score` by 2 using *=, then console.log it.
// score *=2
// console.log(score)

// // Event 3: Lose a life.
// //    Drop `score` by exactly 1 using the decrement operator (--),
// //    then console.log it.
// score--
// console.log(score)

// Two products. Use comparison operators to answer the questions below.

// const productAPrice = 29.99
// const productBPrice = 19.99

// const productARating = 4.5
// const productBRating = 4.7

// // 1. Are the two prices exactly equal?
// //    Compare them with strict equality (===) and print the result.
// //    The comparison can go straight inside console.log(...).

// console.log(productAPrice === productBPrice)
// // 2. Are the two ratings different?
// //    Compare them with strict inequality (!==) and print the result.
// console.log(productARating !== productBRating)

// // 3. Is product A cheaper than product B?
// //    Compare the two prices with a size operator (<) and print the result.
// console.log(productAPrice < productBPrice)



// // User data — pretend this came back from your app's API.

// const isLoggedIn = true
// const isBanned = false
// const displayName = ""    // user hasn't picked one yet

// // 1. Print whether the user is allowed in.
// //    Allowed = logged in AND not banned.
// //    (Use && and !)
// console.log(isLoggedIn && !isBanned)


// // 2. Print the name to show on screen.
// //    If displayName is empty, fall back to "Guest".
// //    (Use || — it falls back when the left side is falsy)
// console.log(displayName || "Guest")


// Classify a temperature reading into a comfort bucket and print the matching message.

// const tempF = 72

// // Build an if / else if / else chain that handles tempF in these four ranges.
// // Print exactly ONE message — the one that matches.
// //
// //   85 or hotter         → a "too hot" message
// //   between 65 and 84    → a "nice weather" message
// //   between 45 and 64    → a "chilly" message
// //   below 45             → a "too cold" message
// //
// // The exact wording is up to you. Try changing tempF to 30, 50, 70, 90 and
// // rerun to see the different branches fire.

// if (tempF >= 85){
//   console.log("too hot")
// } else if (tempF < 85 && tempF >= 65){
//   console.log("nice weather")
// } else if (tempF < 65 && tempF >= 45){
//   console.log("chilly")
// }else {
//   console.log("too cold")
// }



// // A user trying to use a paid feature on your site.

// const isLoggedIn = true
// const isBanned = false
// const isPremium = false
// const freeTriesLeft = 1

// // 1. Welcome check.
// //    If logged in AND not banned, print "Welcome back."
// //    Otherwise, print "Please sign in."
// //    (Combines && and !)
// if (isLoggedIn && !isBanned){
//   console.log("Welcome back")
// } else {
//   console.log("Please sign in")
// }

// // 2. Access check.
// //    If premium OR they still have free tries left, print "Access granted."
// //    Otherwise, print "Upgrade or wait for tomorrow's free try."
// //    (Uses ||)
// if (isPremium || freeTriesLeft > 0){
//   console.log("Access granted")
// }else{
//   console.log("Upgrade or wait for tomorrow's free try.")
// }

