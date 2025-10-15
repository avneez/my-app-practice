/**
 * Calculates the bit distance for an integer.
 * The bit distance is the maximum distance (number of zeroes) between any two
 * consecutive set bits in its binary representation.
 * If an integer has only one set bit, its bit distance is -1.
 * * @param {number} n The integer to analyze.
 * @returns {number} The bit distance.
 */
function calculateBitDistance(n) {
    if (n <= 0) return -1; // Handle non-positive numbers

    let setBitCount = 0;
    let maxDistance = -1;
    let zeroCount = 0;
    let tempN = n;

    // Iterate through the bits of the number
    while (tempN > 0) {
        // Check the least significant bit (LSB)
        const currentBit = tempN & 1;

        if (currentBit === 1) {
            // Current bit is set (1)
            setBitCount++;

            if (setBitCount > 1) {
                // This is the second or subsequent set bit
                // The distance to the previous set bit is the zeroCount
                maxDistance = Math.max(maxDistance, zeroCount);
            }

            // Reset zero counter for the next consecutive pair
            zeroCount = 0;
        } else if (setBitCount > 0) {
            // Current bit is not set (0), and we have seen at least one set bit
            zeroCount++;
        }

        // Move to the next bit (right-shift, using >>> for unsigned shift)
        tempN >>>= 1;
    }

    // According to the rule, if setBitCount < 2, the bit distance is -1.
    if (setBitCount < 2) {
        return -1;
    }

    return maxDistance;
}

/**
 * Finds the top k integers with the maximum bit distances, sorting by
 * bit distance (descending) and then by value (descending).
 * * @param {number[]} numbers The input array of integers.
 * @param {number} k The number of top integers to return.
 * @returns {number[]} The array of the top k integers.
 */
function findTopKIntegers(numbers, k) {
    if (!numbers || numbers.length === 0 || k <= 0) {
        return [];
    }

    // 1. Calculate bit distance for all numbers and store with the original value
    const infoList = numbers.map(number => ({
        value: number,
        bitDistance: calculateBitDistance(number)
    }));

    // 2. Sort the numbers based on the two rules:
    //    a. Decreasing order of bit distance (b.distance - a.distance)
    //    b. Decreasing order of value (b.value - a.value) as a tie-breaker
    infoList.sort((a, b) => {
        // Rule 1: Sort by bit distance (descending)
        if (a.bitDistance !== b.bitDistance) {
            return b.bitDistance - a.bitDistance;
        }

        // Rule 2: Sort by value (descending) as a tie-breaker
        return b.value - a.value;
    });

    // 3. Extract the first k values
    return infoList.slice(0, k).map(info => info.value);
}

// Example usage from the problem description:
const numbers = [12, 4, 5, 10, 8];
const k = 3;

// Expected:
// 12 (dist=0, val=12)
// 4  (dist=-1, val=4)
// 5  (dist=1, val=5)
// 10 (dist=1, val=10)
// 8  (dist=-1, val=8)
//
// Sorted List:
// 1. 10 (dist=1, val=10)
// 2. 5  (dist=1, val=5)
// 3. 12 (dist=0, val=12)
// 4. 8  (dist=-1, val=8)
// 5. 4  (dist=-1, val=4)
//
// Top k=3: [10, 5, 12]

const result = findTopKIntegers(numbers, k);
console.log(`Input: numbers=${numbers}, k=${k}`);
console.log(`Output: ${result}`); // Output: [10, 5, 12]