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








// Coupon code generator.
const brand = "Traversy Media"
const year = 2026

// 1. Take the first 4 letters of `brand`, uppercase them, store as `prefix`.
let prefix = brand.slice(0,4).toUpperCase()


// 2. Generate a random 4-digit integer (1000 to 9999 inclusive),
//    store as `code`. Use Math.floor(Math.random() * 9000) + 1000.
let code = Math.floor(Math.random() * 9000) + 1000


// 3. Build the coupon as `${prefix}-${year}-${code}` with a template literal.
//    Print it.
console.log(`${prefix}-${year}-${code}`)

// 4. Print "Coupon valid for <year>!" using a template literal
//    (interpolate `year`, don't hardcode it).
console.log(`Coupon valid for ${year}!`)




// // 1. Declare a function called `greet` that prints "Hello, world!".
// //    Call it once.
function greet() {
  console.log("Hello, world!")
}
greet()
// 2. Declare a function called `printSeparator` that prints "---".
//    Call it three times.
function printSeparator(){
  console.log("---")
}
printSeparator()
printSeparator()
printSeparator()

// 1. Declare a function `greetUser(name)` that prints "Hello, <name>!"
//    using a template literal. Call it three times with "Brad", "Sara", "Mike".
function greetUser(name){
  console.log(`Hello, ${name}!`)
}
greetUser("Brad")
greetUser("Sara")
greetUser("Mike")
// 2. Declare a function `describePerson(name, age, city)` that prints
//    "<name> is <age> and lives in <city>.".
//    Call it once with "Jen", 28, "Boston".
function describePerson(name, age, city){
  console.log(`${name} is ${age} and lives in ${city}`)
}
describePerson("Jen", 28, "Boston")




// // 1. Declare `add(a, b)` that RETURNS a + b.
// //    Call it with 2, 3. Store the result in `const sum`. Print sum.
function add(a, b){
  return a+b
}
const sum = add(2, 3)
console.log(sum)
// 2. Declare `isAdult(age)` that RETURNS true if age >= 18, else false.
//    Store `isAdult(20)` in `const adult20` and `isAdult(15)` in `const adult15`.
function isAdult(age){
  if (age >= 18){
    return true
  }
  else{
    return false
  }
}
const adult20=isAdult(20)
const adult15=isAdult(15)

//    Print both.
console.log(adult20, adult15)



// 1. Declare `triple` as an arrow function with IMPLICIT return.
//    Takes one number, returns it * 3. Call with 4 and print.
let triple = (n) => n * 3
console.log(triple(4))

// 2. Declare `add` as an arrow function with EXPLICIT return (braces + return).
//    Takes `a` and `b`, returns a + b. Call with 5, 8 an
const add = (a, b) => {
  return a  + b
}
console.log(add(5, 8))

// 1. Declare `priceWithTax(price, rate = 0.08)` that RETURNS price * (1 + rate).
//    Call with 100 (uses default), then with 100, 0.20. Print both results.
function priceWithTax(price, rate = 0.08) {
  return price * (1 + rate)
}
console.log(priceWithTax(100))
console.log(priceWithTax(100, 0.20))
// 2. Declare `sum(...numbers)` that totals every number passed in
//    using a for...of loop, and RETURNS the total.
//    Call sum(1, 2, 3), sum(10, 20, 30, 40), and sum().
//    Print all three results.
function sum(...numbers){
  let total = 0
  for (const n of numbers){
    total+= n
  }
  return total
}
console.log(sum(1,2, 3))
console.log(sum(10,20,30,40))
console.log(sum())

// 1. Declare `const siteName = "Start.dev"` at the top of the file.
//    Then declare a function `printWelcome(visitor)` that prints
//    "Welcome to <siteName>, <visitor>!" using a template literal.
//    `siteName` is NOT a parameter, read it from outer scope.
//    Call printWelcome("Brad").
const siteName = "Start.dev"
function printWelcome(visitor){
  return `Welcome to ${siteName}, ${visitor}!`
}
console.log(printWelcome("Brad"))
// 2. Declare a function `secret()` with a `const code = 12345` INSIDE its body.
function secret(){
  const code = 12345
  console.log(code);
}
//    Print `code` from inside the function. Call secret().
secret();

// A callback defined for you. Don't change it.
const step = () => console.log("Step.")

// 1. Write `repeatThree(action)` that calls action() three times.
function repeatThree(action){
  action()
  action()
  action()
}

// 2. Call repeatThree with step.
repeatThree(step)

// 3. Call repeatThree with an inline arrow callback that prints "Final move!"
repeatThree(() => console.log("Final move!"))


// An array of fruit. Use forEach to walk it.
const fruits = ["apple", "banana", "cherry"]

// 1. Use forEach on `fruits` to print each fruit on its own line.
fruits.forEach((fruit) => {
  console.log(fruit)
})

// 2. Use forEach on `fruits` again, this time with TWO callback parameters
//    (item AND index). Print "<index + 1>. <fruit>", e.g. "1. apple".
fruits.forEach((item, index) => {
  console.log(`${index + 1}. ${item}`)
})


// Tip Calculator.
//
// Build `tipCalculator(bill, tipPercent = 15)` that prints three lines:
//   - Bill: $<bill>
//   - Tip (<tipPercent>%): $<tip with 2 decimals>
//   - Total: $<total with 2 decimals>
//
// Then call it twice:
//   tipCalculator(50)        — uses default 15%
//   tipCalculator(80, 20)    — overrides to 20%

function tipCalculator(bill, tipPercent = 15){
console.log(`Bill: $${bill}
Tip (${tipPercent}%): $${((tipPercent / 100) * bill).toFixed(2)}
Total: $${(bill + ((tipPercent / 100) * bill)).toFixed(2)}`)
}

tipCalculator(50)
tipCalculator(80, 20)

// 1. Create a `user` object with these properties:
//    - name: "Sasha"
//    - email: "sasha@example.com"
//    - age: 27
//    - isAdmin: false
const user = {
       name: "Sasha",
       email: "sasha@example.com",
       age: 27,
       isAdmin: false
}

// 2. Log the user's name using dot notation.
console.log(user.name)

// 3. Use this variable to log the user's age with bracket notation:
const fieldToShow = "age"
console.log(user[fieldToShow])


// A student profile object.
const student = {
  name: "Marcus",
  grade: "Sophomore",
  major: "Data Science"
}

// 1. Update the student's `grade` to "Junior".
// 2. Add a new property `gpa` with a value of 3.8 using dot notation.
// 3. Add a new property `isEnrolled` with a value of true using bracket notation ("isEnrolled").
// 4. Delete the `major` property from the object.
// 5. Print the final `student` object.

student.grade = "Junior"
student.gpa=3.8
student["isEnrolled"] = true
delete student.major
console.log(student)


// You're given this user object:
const user4 = {
  name: "Sasha",
  email: "sasha@example.com",
  age: 27,
}

// 1. Add a `role` property with value "admin".
user4.role = "admin"

// 2. Update the existing `age` property to 28.
user4.age = 28

// 3. Use `delete` to remove the `email` property.
delete user4.email

// 4. Log the final user object.
console.log(user4)


// // You're given this user. Add 2 methods inside the object literal.
const user1 = {
  firstName: "Sasha",
  lastName: "Chen",
  age: 27,

  // 1. greet() — logs "Hi, I'm <firstName>" using `this.firstName`
  greet() {
    console.log(`Hi, I'm ${this.firstName}`)
  },

  // 2. fullName() — returns "<firstName> <lastName>"
  fullName() {
    return `${this.firstName} ${this.lastName}`
  }

}

// 3. Call user.greet(), then log user.fullName().
user1.greet()
console.log(user1.fullName())



// // You're given this user with nested address, preferences, and a tags array.
const user2 = {
  name: "Sasha",
  email: "sasha@example.com",
  address: {
    city: "Boston",
    state: "MA",
    zip: "02108",
  },
  preferences: {
    theme: "dark",
    notifications: true,
  },
  tags: ["frontend", "react", "design"],
}

// 1. Log the user's city.
console.log(user2.address.city)

// 2. Update the user's zip to "02101".
user2.address.zip = "02101"


// 3. Log the FIRST tag in the user's tags array (use index access).
console.log(user2.tags[0])

// 4. Log the entire updated user object.
console.log(user2)


// You're given these two users:
const user3 = {
  name: "Sasha",
  email: "sasha@example.com",
  age: 27,
  role: "admin",
}

const guest = {
  name: "Anna",
  email: "anna@example.com",
  // no `role` property
}

// 1. Destructure `name` and `email` from `user` in ONE statement. Log each.
const {name, email} = user3
console.log(name)
console.log(email)
// 2. Destructure `age` from `user` but rename it to `userAge`. Log `userAge`.
const {age : userAge} = user3
console.log(userAge)
// 3. Destructure `role` from `guest` with a default of "member". Log it.
// const {role="member"} = guest
// console.log(role)





// You're given this user. Do NOT mutate it.
const user5 = {
  name: "Sasha",
  email: "sasha@example.com",
  age: 27,
  role: "member",
}

const defaults = {
  theme: "light",
  notifications: true,
  lang: "en",
}

const overrides = {
  theme: "dark",
}

// 1. Make `updatedUser` — a copy of user with role: "admin". Use spread.
//    Then console.log it.
const updatedUser = {...user5, role:"admin" }
console.log(updatedUser)

// 2. Make `settings` — combine defaults and overrides with spread.
//    Overrides should win. Then console.log it.
const settings = {...defaults, ...overrides}
console.log(settings)
// 3. Log user.role to prove the original is unchanged. (Expect: "member")
console.log(user5.role)



// An array of product objects.
const products = [
  { title: "Keyboard", category: "tech", stock: 8 },
  { title: "Mug", category: "kitchen", stock: 15 },
  { title: "Notebook", category: "office", stock: 22 },
]

// 1. Use forEach to print each product's title on its own line.
products.forEach((product) => {
  console.log(`${product.title}`)
})

// 2. Use forEach with destructuring in the callback parameter
//    to print "<title> [<category>]" for each product.
//    Pattern: ({ title, category }) => ...
products.forEach(({title, category}) => {
  console.log(`${title} [${category}]`)
})



const profile = {
    name: "Sasha",
    email: "sasha@example.com",
    role: "admin",
    badges: [], 
    address: { city: "Boston", state: "MA" },
    summary() {
      const { name, role, email, address: { city, state } } = this
      return `${name} (${role}): ${email} - ${city}, ${state}`
    }
}

console.log(profile.summary())

const updateEmail = (profile, newEmail) => {
   return {
     ...profile, 
     email: newEmail
   }
}


const awardBadge = (profile, badgeName) => {
  return {
    ...profile,
    badges: [...profile.badges, badgeName]
  }
}



const updated = updateEmail(profile, "sasha@traversymedia.com")
console.log(updated.summary())
console.log("Original email still:" + profile.email)
const withBadge = awardBadge(profile, "early-adopter")
console.log("Badges", withBadge.badges)
console.log("Original badges still: ", profile.badges)

