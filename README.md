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

For my runtime complexity $n$ is representative of the number of cities in
the input.  

Alright, now that my code is dynamic via memoization, it functions a little
different. To start I no longer truly explore all $n!$ permutations, instead
I solve each subproblem in the form of current city, remaining set of
cities once. Due to memoization we don't need to resolve any single
subprolem more than once. There are approximately $2^n$ of those. For each
subproblem I spend $\Theta(n)$ time looping over the up to $n$ subsequent
cities, and a further $\Theta(n)$ time looking up and generating my
memoization/distance key pairs, or $2n$. So my algorithm works through $2^n$
subproblems, where a nested loop does $\Theta(n)$ work over $n$ choices,
ultimately resulting in a run time complexity of $\Theta(n^2 \cdot 2^n)$  

## My Memory Complexity

Again, for my memory complexity, $n$ is still representative of the number of
cities in the input.  

I now use memoization for each subproblem of the form current city, remaining
set of cities. For each potential pair, I cache one entry. There are
approximately $2^n$ different subsets of remaining cities, and as many as $n$
choices for the current city, which totals up to $n \cdot 2^n$ entries which
will be stored in memoStorage. That means the total space utilized by my
algorithm is $\Theta(n \cdot 2^n)$.  

## Sources

For a general idea of TSP code layout:  

https://www.geeksforgeeks.org/travelling-salesman-problem-using-dynamic-programming/#  

I asked both you, and Carlie Niemitalo for advise on what I may be doing
wrong in my memory complexity. Between your and her suggestions, I came
to my updated solution.

I used the following video to help with make my code dynamic via memoization:  

https://www.youtube.com/watch?v=cY4HiiFHO1o  

## Plagiarism Notice

I certify that I have listed all sources used to complete this exercise, including the use of any Large Language Models. All of the work is my own, except where stated otherwise. I am aware that plagiarism carries severe penalties and that if plagiarism is suspected, charges may be filed against me without prior notice.
