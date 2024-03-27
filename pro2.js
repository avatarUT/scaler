// document.addEventListener('DOMContentLoaded', () => {
    const adjacencyList = {
        "A": {"B": 5, "C": 10, "D": 15},
        "B": {"A": 5, "C": 5, "D": -1},
        "C": {"A": 10, "B": 5, "D": 10},
        "D": {"A": 15, "B": -1, "C": 10},
        "E": {"A": -1, "B": -1, "C": -1, "D": 5},
        "F": {"A": -1, "B": -1, "C": -1, "D": 20}
    };

    const cabPricing = {
        "Cab1": 2,
        "Cab2": 3,
        "Cab3": 4,
        "Cab4": 5,
        "Cab5": 6
    };

    function calculateAndDisplayCabs() {
        const source = document.getElementById("source").value.toUpperCase();
        const destination = document.getElementById("destination").value.toUpperCase();
    
        if (!adjacencyList.hasOwnProperty(source) || !adjacencyList.hasOwnProperty(destination)) {
            alert("Invalid source or destination");
            return;
        }
        
        // Implement Dijkstra's or Floyd-Warshall algorithm to calculate shortest path (time-wise)
        const shortestTime = dijkstra(adjacencyList, source, destination);
        console.log(shortestTime);
        
        // Calculate cab pricing based on estimated travel time
        const cabPrices = calculateCabPrices(shortestTime);
        console.log(cabPrices);
    
        // Store cab prices in localStorage
        localStorage.setItem('cabPrices', JSON.stringify(cabPrices));
    
        // Navigate to the new page
        window.location.href = "pro21.html";
    }
    
    // Rest of your JavaScript code...
    

    

    function dijkstra(graph, start, end) {
        // const visited = {};
        // const distances = {};
        // const predecessors = {};
        // const queue = new PriorityQueue();
    
        // // Initialize distances to Infinity and predecessors to null
        // for (const place in graph) {
        //     distances[place] = Infinity;
        //     predecessors[place] = null;
        // }
    
        // distances[start] = 0;
        // queue.enqueue(start, 0);
    
        // while (!queue.isEmpty()) {
        //     const currentPlace = queue.dequeue().element;
    
        //     if (currentPlace === end) {
        //         break; // Reached the destination
        //     }
    
        //     if (!visited[currentPlace]) {
        //         visited[currentPlace] = true;
    
        //         for (const neighbor in graph[currentPlace]) {
        //             const distanceToNeighbor = graph[currentPlace][neighbor];
        //             const totalDistance = distances[currentPlace] + distanceToNeighbor;
    
        //             if (totalDistance < distances[neighbor]) {
        //                 distances[neighbor] = totalDistance;
        //                 predecessors[neighbor] = currentPlace;
        //                 queue.enqueue(neighbor, totalDistance);
        //             }
        //         }
        //     }
        // }
    
        // // Build the shortest path
        // const shortestPath = [];
        // let place = end;
    
        // while (place !== null) {
        //     shortestPath.unshift(place);
        //     place = predecessors[place];
        // }
    
        // // return {
        // //     shortestTime: distances[end],
        // //     shortestPath: shortestPath
        // // };
        // return place;
        return 10;
    }

    class PriorityQueue {
        constructor() {
            this.items = [];
        }
    
        enqueue(element, priority) {
            const queueElement = { element, priority };
            let added = false;
    
            for (let i = 0; i < this.items.length; i++) {
                if (queueElement.priority < this.items[i].priority) {
                    this.items.splice(i, 0, queueElement);
                    added = true;
                    break;
                }
            }
    
            if (!added) {
                this.items.push(queueElement);
            }
        }
    
        dequeue() {
            if (this.isEmpty()) {
                return "Queue is empty";
            }
            return this.items.shift();
        }
    
        isEmpty() {
            return this.items.length === 0;
        }
    }

    function calculateCabPrices(time) {
        const prices = {};

        for (const [cab, pricePerMinute] of Object.entries(cabPricing)) {
            const totalPrice = time * pricePerMinute;
            prices[cab] = totalPrice;
        }
        console.log("calculateprice");
        return prices;
    }

    function displayCabPrices(prices) {
        let html = "<h2 align='center'>Cab Pricing</h2><ul>";
        
        for (const [cab, price] of Object.entries(prices)) {
            console.log(`${cab}: ${price}`);
            html += `<li><div class="name-box">${cab}: ${price} (Total Price)</div></li>`;
        }

        html += "</ul>";
        
        console.log(html);
        // window.location.href="pro21.html";
        document.getElementById("cabPricing").innerHTML = html;
    }


    function bookCab(cabName) {
        // Open email.html page with cabName as a query parameter
        window.location.href = `email.html?cab=${cabName}`;
    }
// });
