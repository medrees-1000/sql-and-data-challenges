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


// // State from a UI — use ternaries to pick the right text for each piece.

// const isLoggedIn = true
// const cartTotal = 0

// // 1. Sign-in button label.
// //    Assign a ternary to a const `label` — "Sign out" if logged in, otherwise "Sign in".
// //    Then console.log the label.
// const label = isLoggedIn ? "Sign out" : "Sign in"
// console.log(label)
// // 2. Cart status line.
// //    Print a ternary that picks "Your cart is empty" when cartTotal is 0,
// //    otherwise prints "Total: $<amount>" (use a template literal for the amount).
// console.log(`${cartTotal === 0 ? "Your cart is empty" : `Total :${count} `}`)


// A user's role from the database. Switch on it and print their access level.

const role = "editor"

// Build a switch statement on `role` that handles AT LEAST these three cases plus a default:
//
//   case "admin"   → "Full access — you control the universe."
//   case "editor"  → "Can edit content."
//   case "viewer"  → "Read-only — sit back and watch."
//   default        → "Unknown role — contact support."
//
// Remember: every case needs `break` so it doesn't fall through to the next one.

// switch (role) {
//   case "admin":
//     console.log("Full access - you control the computer")
//     break 
//   case "editor":
//     console.log("Can edit content")
//     break
//   case "viewer":
//     console.log("Read only - sit back and watch")
//     break
//   default:
//     console.log("Unknown role - contact support")
// }


// Coffee shop receipt — three items, tax, and a free-shipping rule.

const item1Name = "Cappuccino"
const item1Price = 4.5

const item2Name = "Croissant"
const item2Price = 3.25

const item3Name = "Sandwich"
const item3Price = 8.99

const taxRate = 0.08
const flatShippingFee = 4.99
const freeShippingThreshold = 20

// 1. Compute the subtotal — sum of the three item prices.
let subtotal = item1Price+item2Price+ item3Price
subtotal = Number(subtotal.toFixed(2))
console.log(`Total is ${subtotal}`)

// 2. Compute the tax — subtotal × taxRate.
let tax = subtotal * taxRate
tax = Number(tax.toFixed(2))
console.log(`Total tax is ${tax}`)
// 3. Apply the shipping rule (use `if`/`else` OR a ternary):
//    - If subtotal >= freeShippingThreshold, shipping is 0.
//    - Otherwise, shipping is flatShippingFee.
let shipping;
if (subtotal >= freeShippingThreshold){
  shipping = 0
  console.log(`Total shipping is ${shipping}`)
} else{
  shipping = flatShippingFee
  console.log(`Total shipping is ${shipping}`)
}

// 4. Compute the total — subtotal + tax + shipping.
let total = subtotal + tax + shipping
console.log(`Total for this order is ${total}`)

// 5. Print the receipt — at least 5 console.log calls:
//      - A header line (e.g. "=== Receipt ===")
//      - One line per item (use template literals so the name and price appear together)
//      - A subtotal line
//      - A tax line
//      - A shipping line (show "FREE" when shipping is 0 — use a ternary)
//      - A total line
//
//    Tip: `someNumber.toFixed(2)` formats a number to exactly 2 decimals.
console.log("=== Receipt ===")
console.log(`${item1Name}    $${item1Price}`)
console.log(`${item2Name}    $${item2Price}`)
console.log(`${item3Name}    $${item3Price}`)
console.log("---------------------")
console.log(`Subtotal        $${subtotal}`)
console.log(`Tax (%8)        $${tax}`)
console.log(`Shipping        ${shipping === 0 ? "Free" : `$${shipping}`}`)
console.log("---------------------")
console.log(`Total           $${total}`)
console.log("=== Thanks! ===")










// A music playlist.

// 1. Create a const called `playlist` and put these 4 songs in it as strings:
//    "Bohemian Rhapsody", "Stairway to Heaven", "Hotel California", "Imagine"
//    Then console.log the first song (index 0).
const playlist = ["Bohemian Rhapsody", "Stairway to Heaven", "Hotel California", "Imagine"]
console.log(playlist[0])

// 2. Print the song at index 2.
console.log(playlist[2])

// 3. Print the last song using playlist.length - 1.
console.log(playlist[playlist.length - 1])



// A small to-do list. Grow it at both ends, then shrink it back.

const todos = ["Walk the dog", "Buy groceries"]

// 1. Use push to add "Reply to emails" to the end of the list,
//    then console.log the whole todos array.
todos.push("Reply to emails")
console.log(todos)


// 2. Use unshift to add "Make coffee" to the beginning of the list,
//    then console.log the whole todos array.
todos.unshift("Make coffee")
console.log(todos)
// 3. Use pop to remove the last item, and console.log what pop returned.
console.log(todos.pop())

// 4. Use shift to remove the first item, and console.log what shift returned.
console.log(todos.shift())





// A guest list for an event. Search it.

const guests = ["Alice", "Bob", "Charlie", "Diana", "Eve"]

// 1. Use indexOf to find the index of "Charlie",
//    and console.log the result.
console.log(guests.indexOf("Charlie"))


// 2. Use indexOf to look up "Frank" (not in the list),
//    and console.log what you get back.
console.log(guests.indexOf("Frank"))

// 3. Use includes to check if "Diana" is on the list,
//    and console.log the true/false result.
console.log(guests.includes("Diana"))





// A queue of songs. Copy part of it, then edit it in place.

const queue = ["Song A", "Song B", "Song C", "Song D", "Song E", "Song F"]

// 1. Use slice to grab the first 3 songs into a new array (store it
//    in a const), then console.log that new array.
const new_que = queue.slice(1,4)
console.log(new_que)

// 2. console.log the original queue to confirm slice did NOT change it.
console.log(queue)

// 3. Use splice to remove "Song C" and "Song D" (2 items starting at
//    index 2). Capture what splice returns in a const and console.log it.
const new_splice = queue.splice(2, 2)
console.log(new_splice)


