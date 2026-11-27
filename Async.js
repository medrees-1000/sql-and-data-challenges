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