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