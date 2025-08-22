---
title: Demystifying Callbacks
description: A full, top-to-bottom breakdown of callbacks in JavaScript with examples.
date: "2025-08-22"
tags:
  - JavaScript
  - Programming
published: false
---

As a software engineer and former bootcamp instructor who's taught and mentored hundreds of people, there is perhaps no single concept I've seen JavaScript programmers struggle with more than callbacks. The bad news is that the use of callbacks in JavaScript libraries and snippets is so ubiquitous, that having a solid grasp of them is essentially a hard requirement for anyone using JavaScript in almost any context. The good news is that the underlying concepts aren't very hard to understand once you break them all down into their constituent parts.

## Functions

### Declaring Functions

I've found that the most important thing to start with when trying to understand callbacks is the semantics around JavaScript function definitions. Let's take a look at some common, semantically similar, syntactically distinct ways we might define a function in JavaScript.

```JavaScript
// Named function using function syntax
function hello() {
  console.log('Hello world!');
}
hello();

// Anonymous function using function syntax
const hello2 = function() {
  console.log('Hello world!');
}
hello2();

// Anonymous function using "fat arrow" syntax
const hello3 = () => {
  console.log('Hello world!');
}
hello3();

```

Note that the second two examples are `anonymous functions`, sometimes called `lambda functions`. But what makes them "anonymous"? Consider the following program:

```JavaScript
() => {
  console.log('Hello world!')
}

// but wait... how do we run this function?
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

Knowing what we know now about objects in JavaScript, let's rewrite our program so that we have a `reference` to our anonymous function.

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

It can be helpful to think about functions just like we'd think about arrays or objects. They're just objects that store values, but instead of representing structured data, they store a block of code.

Variables however, aren't the only way to create references. Let's look at another program:

```JavaScript
function printArrayValues(arr) {
  for(const val of arr) {
    console.log(val);
  }
}

const foo = [1, 2, 3];
printArrayValues(foo);

printArrayValues([4, 5, 6])
```

This program has a lot of subtle things going on that I've seen people gloss over when they're learning JavaScript (or programming in general). For instance, we have a function called `printArrayValues` that accepts an argument called `arr`. Simple enough, but it's _really important_ to understand that this function is like a variable for a block of code that _we control_. For instance, we could just as easily have called our argument `a` or `array` or `pizza`. If this seems obvious to you, then bear with me for a second. If not, you're not alone - I've seen dozens of programmers take the syntax of a program like this at face value without fully understanding what's happening.

Let's get wild and change the argument name to `pizza` (I promise this will become relevant very soon):

```JavaScript
function printArrayValues(pizza) {
  for(const val of pizza) {
    console.log(val);
  }
}

const foo = [1, 2, 3];
printArrayValues(foo);

printArrayValues([4, 5, 6])
```

This new program is functionally identical to the first example, but it might be surprising to read. In both examples, _we_ defined a function called `printArrayValues` and _we_ determined that our function accepts one argument, and _we_ defined what that argument is called. There's nothing special about the name `arr` except that it gives ourselves and other readers of our code a hint as to what we expect the _caller_ to pass in to our function.

## But Why Callbacks?

As a library author, asking a consumer of your library to define a callback function can be an effective way to offer a broader set of features to library consumers without having to care about the specific details of their program.
