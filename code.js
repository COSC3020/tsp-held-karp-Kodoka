function tsp_hk(distance_matrix)
{
    var numCities = distance_matrix.length;
    var allCities = [];
    // Start at infinity for minimumDistance, and reduce as we go.
    var minimumDistance = Infinity;

    // If 1 city, no need to travel at all.
    if(numCities == 1)
    {
        return 0;
    }

    // Fill our array with the index of each city.
    for(var i = 0; i < numCities; i++)
    {
        allCities.push(i);
    }

    // Try each city as our origin.
    for(var originIndex = 0; originIndex < allCities.length; originIndex++)
    {
        var originCity = allCities[originIndex];
        // Duplicate allCities...
        var unvisited = allCities.slice();
        // Then remove the origin city from the unvisited city pool.
        unvisited.splice(originIndex, 1);

        // Start our recursive call to find the minimumDistance from
        // current origin city.
        var traveledDistance = tspRecursion(originCity, unvisited);
        
        // If the current origin city produces a lower distance than
        // our current minimumDistance, it replaces it.
        if(traveledDistance < minimumDistance)
        {
            minimumDistance = traveledDistance;
        }
    }
    
    return minimumDistance;
}

function tspRecursion(currentCity, unvisitedCities)
{
    // Base case, when 1 city remains, that's the only option,
    // return distance from current city to the remaining unvisited.
    if(unvisitedCities.length == 1)
    {
        return distance_matrix[currentCity][unvisitedCities[0]];
    }

    // Try every remaining unvisited city as the next potential city
    // on our route.
    var bestDistance = Infinity;
    for(var nextCandidate = 0; nextCandidate < unvisitedCities.length; nextCandidate++)
    {
        var nextCity = unvisitedCities[nextCandidate];

        // Duplicate unvisitedCities...
        var newUnvisited = unvisitedCities.slice();
        // Then remove the next candidate for thenext recusrive call.
        newUnvisited.splice(nextCandidate, 1);

        // nextDistance is the distance from the current city to the
        // next, plus next through the new remaining unvisited.
        var nextDistance = distance_matrix[currentCity][nextCity] + tspRecursion(nextCity, newUnvisited);

        // If the nextDistance provides a better optoin than our
        // current bestDistance, update bestDistance to our shortest
        // option.
        if(nextDistance < bestDistance)
        {
            bestDistance = nextDistance;
        }
    }

    return bestDistance;
}
