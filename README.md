# Traveling Salesperson Problem -- Held-Karp Algorithm

This exercise is about the Traveling Salesperson Problem I mentioned in the
lecture on NP-hard problems -- given a set of cities, determine the length of
the shortest tour that visits all of them. We can get from any city to any other
city, i.e. the graph of cities is completely connected. We consider the version
of the Traveling Salesperson Problem that finds the shortest tour to visit $n$
cities, starting at a city and ending at the $n$ th city; it *does not* go
back to the start. The start city may be any of the cities. Remember that the
graph for a TSP is undirected, i.e. the cost is the same in either direction.

The Held-Karp algorithm for solving the Traveling Salesperson Problem is a
recursive algorithm that considers every subset of cities and finds shortest
tours within them. It takes advantage of the fact that every subroute of a route
of minimum length is of minimum length itself. The main idea is that to solve
the problem of finding the shortest route for $n$ cities, we first solve the
problem of finding the shortest route for $n-1$ cities, and then find the
shortest route from the $n-1$st city to the $n$th city. The pseudocode for the
algorithm is as follows:

```javascript
// cities is the set of cities not visited so far, including start
heldKarp(cities, start)
  if |cities| == 2
    return length of tour that starts at start, goes directly to other city in cities
  else
    return the minimum of
      for each city in cities, unless the city is start
        // reduce the set of cities that are unvisited by one  (the old start), set the new start, add on the distance from old start to new start
        heldKarp(cities - start, city) + distance from start to city
```

Implement a dynamic programming version (which could use memoization) of the
Held-Karp algorithm. If you use memoization, make sure that the cache is reset
every time the function is called such that multiple calls do not end up using
old and incorrect values. Start with the template I provided in `code.js`.

The function takes a distance matrix (the adjacency matrix for the graph where
the values in the cells are the distances between the corresponding cities) and
returns the length of the shortest tour (not the tour itself).

Test your new function; I've provided some basic testing code in `code.test.js`.

## Runtime Analysis

What is the worst-case asymptotic time complexity of your implementation? What
is the worst-case asymptotic memory complexity? Add your answer, including your
reasoning, to this markdown file.

## My Runtime Complexity

First my algorithm selects each of $n$ input cities as the origin for our
prospective route, then recursively it tries each of the remaining options,
which each, in turn, tries each of the remaining options from their own pool
of candidates, during each recursive call, until no unvisited cities remain, at
which point it returns the best, shortest, path. Thus the worst case runtime
complexity is $\Theta(n!)$.  

## My Memory Complexity

For the purpose of analyzing memory complexity, $n$ represents the number of
nodes or cities within the input array.

To start each recursive call my algorithm performs removes one city from the
pool of candidates for the next recursive call, meaning the maximum recursive
depth for $n$ elements is $n - 1$ within the helper tspRecursion function.
This results in a maximum call stack depth of $\Theta(n)$.  

Within each recursive call, a new array, newUnvisited, is created by copying,
slicing, and splicing the input array. At each recursion depth we get
multiple arrays. For example, at the highest level, the code will try $n - 1$
cities, resuling in $n - 1$ recursive calls, and $n - 1$ arrays.

As my algorithm eventually checks every permutation of cities, there will be
$\Theta(n!)$ calls, that each results in a new array.

As each of our $\Theta(n!) total calls results in an array of up to size
$\Theta(n)$, the worst case memory complexity of my code is $\Theta(n! \cdot
n$.

## Sources

For a general idea of TSP code layout:  

https://www.geeksforgeeks.org/travelling-salesman-problem-using-dynamic-programming/#  

I asked both you, and Carlie Niemitalo for advise on what I may be doing
wrong in my memory complexity. Between your and her suggestions, I came
to my updated solution.

## Plagiarism Notice

I certify that I have listed all sources used to complete this exercise, including the use of any Large Language Models. All of the work is my own, except where stated otherwise. I am aware that plagiarism carries severe penalties and that if plagiarism is suspected, charges may be filed against me without prior notice.
