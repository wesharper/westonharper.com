---
title: Demystifying Callbacks
description: A full, top-to-bottom breakdown of callbacks with examples.
date: "2025-08-22"
tags:
  - JavaScript
  - Programming
published: false
---

As a software engineer and former bootcamp instructor who's taught and mentored hundreds of people, there is perhaps no single concept I've seen JavaScript programmers struggle with more than callbacks. To this day, I still find myself having discussions with students and even professional programmers about the underlying concepts and syntax behind callbacks. Hopefully, this document will serve as a permanent placeholder that I can point people to the next time the topic comes up.

## Prerequisites

### Declaring Functions

Because callbacks are just functions, let's start with a simple program that defines a function and invokes it.

```JavaScript
function add(a, b) {
  return a + b;
}

const sum = add(1, 2);
console.log(sum);
```

In this program, we have a function called `add` that accepts 2 arguments called `a` and `b`. Simple enough, but it's _really important_ before we move forward to understand that this function is essentially just a way to remember a block of code that we want to run again and again with a variety of different inputs.

Let's get wild and change some things:

```JavaScript
function add(pizza, cheese) {
  return pizza + cheese;
}

const sum = add(1, 2);
console.log(sum);
```

This version of our program is functionally identical to the first, but it's intended to illustrate what the function definition syntax is actually doing by drawing our attention to the _argument definition_. Our `add` function definition essentially states that no matter what 2 values are passed as arguments to our `add` function, the first one will always be called `pizza` and the second argument will always be called `cheese` in the context of our code block. This makes the function incredibly flexible, because it can accept any two numbers and always just return the sum of the first value (`pizza`) and the second value (`cheese`).

```JavaScript
// store the value returned by the add function in variable foo
const foo = add(1, 2);
// print what's stored in foo
console.log(foo);

// store the value returned by the add function in variable bar
const bar = add(3, 4);
// print what's stored in bar
console.log(bar);

// store the value returned by the add function in variable baz
const baz = add(foo, bar);
// print what's stored in baz
console.log(baz);
```

Now, let's take a look at some common, semantically similar, but syntactically distinct ways we might define a function in JavaScript.

```JavaScript
// Named function using function syntax
function add(a, b) {
  return a + b;
}
add(1, 2);

// Anonymous function using function syntax
const add2 = function(pizza, cheese) {
  return pizza + cheese;
}
add2(3, 4);

// Anonymous function using "fat arrow" syntax
const add3 = (foo, bar) => {
  return foo + bar;
}
add3(5, 6);
```

Note that the second two examples are `anonymous functions` (sometimes called `lambda functions`). But what makes them "anonymous"? Consider the following program:

```JavaScript
() => {
  console.log('Hello world!')
}

// how do we run this function?
```

While this is a valid program, the function we've defined can't be _referenced_ because it doesn't have a name - it's anonymous. In other words, there's no way for us to _invoke_ this particular anonymous function. If we want to be able to run the code block defined by this function, we're going to need a reference to it. But what's a reference?

### Object References and Value Types

At a high-level, we can think of JavaScript as having two broad types of data: [primitive values](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Data_structures#primitive_values) like strings, numbers, and booleans, which are passed around by _value_ and [objects](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Data_structures#objects), which are passed around by _reference_.

> Unfortunately, JavaScript tends to use the term "object" for a handful of concepts that are similar but semantically distinct. What most JavaScript developers tend to think about when they hear "object" is a collection of key/value pairs, sometimes referred to as a "hash map" or "dictionary".
>
> However, you'll often find documentation that uses the term "object" more broadly to describe the subset of data types that all use _references_ behind the scenes. In JavaScript, arrays, functions, and "objects" are all _objects_; you'll need to be careful to understand which version of the term "object" is being used as you navigate the JavaScript ecosystem.

So why are there two types of data that work differently? At the end of the day, it all boils down to how the JavaScript runtime translates our JavaScript code into machine code that our CPU can actually execute. JavaScript being the high-level language it is, it often hides away many of the details about how the computer actually deals with things like memory allocation.

The very basic gist, for the purposes of this lesson is that primitive values are able to be statically allocated into memory using some fixed number of bits, while objects are more flexible by design and therefore must do much more memory management behind the scenes. For people who have never worked in a lower-level programming language or taken relevant computer science courses, this might be an entirely foreign concept. But hopefully the following examples make some intuitive sense:

- All numbers in JavaScript (except `BigInt`s) are 64-bit, floating-point numbers. Therefore, when a JavaScript runtime compiles your JavaScript code, all the numbers it sees can be stored using exactly 64 bits. This chunk of 64 bits can live in one and only one location behind the scenes.
- All arrays in JavaScript are ordered containers of 0 or more values where each index can hold any valid JavaScript value, including other objects. Therefore, when a JavaScript runtime compiles your JavaScript code, all the arrays it sees have to be stored using an approach that can accommodate for any number of arbitrary values that may be arbitrarily added, removed, or modified in some way throughout the duration of the program.

This underlying reality can lead to some behavior that some programmers don't expect. Take a moment to consider the following program and try to predict its output:

```JavaScript
// Example 1
let a = 1;
let b = a;
a = 2;
console.log(b); // what will I print?

// Example 2
let x = [1, 2, 3];
let y = x;
x.push(4);
console.log(y); // what will I print?
```

If the output of this program is surprising to you, you're not alone. It's something I've seen almost every student struggle with at some point or another. Let's break down what's happening in more detail starting with example 1.

- Declare a variable called `a` that stores the _primitive_ value `1`
- Declare a variable called `b` that stores whatever is in variable `a`
- Update variable `a` to store the _primitive_ value `2`
- Print whatever is stored in variable `b`

In this example, because `a` is storing a number, the JavaScript runtime can allocate its 64 bits of memory and pass a copy of that value around to `b` by creating another 64-bit block of memory with the exact same information inside it. Because we just stored a copy of the full value, when we modify `a`, the value inside `b` doesn't change.

However, when we're dealing with objects, this is clearly not the case. So what's happening?

- Declare a variable called `x` that stores a _reference_ to a particular array _object_
- Declare a variable called `y` that stores whatever is in variable `x`
- Modify the array that is _referenced_ by the variable `x`
- Print whatever is stored in variable `y`, which in this case is a _reference_ to the same array that is _referenced_ by variable `x`

As we can see, what we're really remembering and passing around when we use `objects` are actually _references_ to the objects in memory. How these objects actually work in the compiler and the CPU is a topic for another day, but you can think of a reference as an identifier that "points" to an object. When we write the code: `let y = x`, we're still getting a copy of `x` and storing it in `y`. However, `x` is simply storing a reference to a specific object. So when we get a copy of `x`, we're just making a copy of the reference, which points at the _exact same object_. Now, we have 2 variables that "point" at the same array, not 2 copies of the values `[1, 2, 3]` in order.

> If you have a coding bootcamp background or otherwise want to understand software more deeply, I highly recommend Casey Muratori's [Computer, Enhance!](https://computerenhance.com) course.

### References, References, References

Armed with some knowledge about objects and references in JavaScript, let's get back to our anonymous function.

```JavaScript
// remember, functions are objects in JavaScript
const foo = () => {
  console.log("Hello world!");
}

// the variable `foo` stores a reference to our anonymous "fat arrow function"
// now, we can invoke `foo` and the JavaScript runtime will know that we want to invoke our anonymous function
foo();

// now, let's make a copy of the reference stored in `foo`
const bar = foo;

// foo and bar are now functionally equivalent
// now, we can invoke `bar` and the JavaScript runtime will know that we want to invoke our anonymous function
bar();
```

It can be helpful to think about functions just like we'd think about arrays or objects. Remember, they're just a way to store a block of code.

Variables however, aren't the only way to create references. Remember our original function definition? If a function definition allows us to define an argument name by which an arbitrary input is referred to within the context of our function, shouldn't all the same rules apply?

Let's look at another program:

```JavaScript
function printArrayItems(arr) {
  for(const val of arr) {
    console.log(val);
  }
}

const foo = ['a', 'b', 'c'];
const bar = foo;
printArrayItems(foo);

foo.push('d');
printArrayItems(bar);
printArrayItems([1, 2, 3]);
```

We know by now that when we pass around an array, we're really just passing around a _reference_ to that array. So in all 3 invocations of `printArrayItems`, we're passing a _reference_ to an array.

Now notice the very last invocation. In this case, we're just passing an array directly to the function without first storing it somewhere. In this way, it's a lot like an anonymous array. We can't do anything with it after we print it because we don't have any way to refer to it anymore. But our function will still refer to it as `arr` while its code block runs.

## And Now... Callbacks

We finally have all of the prerequisite knowledge necessary to understand what's happening with callbacks, but even with all the knowledge we have, the syntax can still feel really unintuitive for some people and that's okay. As long as you strive to understand the code you're reading and writing, eventually it will feel like second nature.

Let's look at a few more programs:
