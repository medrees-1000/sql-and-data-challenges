// A tiny "send a message" flow. Two of the lines are yours to write.

// 1. Print "Sending..." here, so it shows first.
console.log("Sending...")

// The send is scheduled with setTimeout: it prints "Message sent!" after
// 1 second (1000 ms). This part is written for you, and you do not need
// to change it.
setTimeout(() => {
  console.log("Message sent!")
}, 1000)

// 2. Print "You can keep working..." here.
console.log("You can keep working...")

// Run it and check the final order. "Message sent!" is scheduled in the MIDDLE,
// but it prints LAST, because setTimeout defers it until the synchronous
// lines have finished.
//   Expected order: Sending... / You can keep working... / Message sent!


// Two requests, already written for you. You do not need to change them.
// loadProfile() succeeds. loadSettings() fails (the service is down).

function loadProfile() {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ name: "Ada" }), 300)
  })
}

function loadSettings() {
  return new Promise((resolve, reject) => {
    setTimeout(() => reject("settings service is down"), 300)
  })
}

// 1. Call loadProfile(). With .then, print the profile's name.
//    Expected: Ada
loadProfile()
   .then((profile)=> {
    console.log(profile.name)
   })

// 2. Call loadSettings(). With .catch, print the rejection error it receives.
//    Expected: settings service is down
   .catch((error)=>{
    console.log(error)
   })


// getOrder() is already written for you. It returns a promise that
// resolves with an order after a short delay. You do not need to change it.

function getOrder() {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ id: 7, total: 90 }), 300)
  })
}

// 1. Write an async function called showTotal that awaits getOrder()
//    and prints the order's total.
// 2. Call showTotal().
//    Expected: 90

async function showTotal(){
    const {total} = await getOrder()
    console.log(total)
}

showTotal()


// chargeCard() is already written for you. It returns a promise that
// rejects, because the payment service is down. You do not change it.

function chargeCard() {
  return new Promise((resolve, reject) => {
    setTimeout(() => reject("payment declined"), 300)
  })
}

// Write an async function called pay. Inside it:
//   1. in a try block, await chargeCard() and then print "Charged!"
//   2. in the catch block, print the error it receives
// Then call pay() on its own line below the function.
//   Expected: payment declined
async function pay() {
    try{
        const charged = await chargeCard()
        console.log("Charged!") 
    } catch(error){
        console.log(error)
    }
}

pay()




// Two requests, already written for you. Each resolves after a short
// delay, and they do not depend on each other. You do not change them.

function loadProfile() {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ name: "Ada" }), 300)
  })
}

function loadPosts() {
  return new Promise((resolve) => {
    setTimeout(() => resolve(["Hello world", "Async is fun", "Promises 101"]), 300)
  })
}

// Write an async function called load. Inside it:
//   1. run BOTH requests at the same time with Promise.all
//   2. pull the two results out with array destructuring
//   3. print the profile's name and the number of posts (posts.length)
// Then call load() on its own line below the function.
//   Expected: Ada 3

async function load(){
    try{
        const [Profile, posts] = await Promise.all([loadProfile(), loadPosts()])
        console.log(Profile.name, posts.length)
    } catch(error){
        console.log(error)
    }
}

load()



// /posts returns an array of 100 blog posts, each shaped like
// { userId, id, title, body }.

// Write an async function called loadPosts. Inside it:
//   1. await fetch https://jsonplaceholder.typicode.com/posts
//   2. await response.json() to get the array of posts
//   3. use filter to build userPosts: only the posts whose userId is 1
//   4. print how many there are (userPosts.length)
// Then call loadPosts() on its own line below the function.
//   Expected: 10

async function loadPosts() {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts")
  const posts = await response.json()
  const userPosts = posts.filter((post) => post.userId === 1)
  console.log(userPosts.length)
}
 
loadPosts()





// /users/1 returns one user with a nested company object (which has a name),
// but no slogan field.

// Write an async function called loadCompany. Inside it:
//   1. await fetch https://jsonplaceholder.typicode.com/users/1
//   2. await response.json() into a user object
//   3. print the company name with optional chaining: user.company?.name
//   4. the user has no slogan, so print user.company?.slogan with a ?? fallback of "No slogan"
// Then call loadCompany() on its own line below the function.
//   Expected:
//     Romaguera-Crona
//     No slogan


async function loadCompany(){
    const response = await fetch("https://jsonplaceholder.typicode.com/users/1")
    const user = await response.json()
    console.log(user.company?.name)
    console.log(user.company?.slogan ?? "No slogan") 
}

loadCompany()