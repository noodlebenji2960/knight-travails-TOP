function Node(pos, path) {
    if (pos[0] < 0 || pos[0] > 7 || pos[1] < 0 || pos[1] > 7) {
        return null;
    }
    return { pos, path };
}

export function knightMoves([x, y], [destinationX, destinationY]) {
    let queue = [Node([x, y], [[x, y]])];
    let currentNode = queue.shift();

    while (currentNode.pos[0] !== destinationX || currentNode.pos[1] !== destinationY) {

        let movements = [
            [currentNode.pos[0] + 2, currentNode.pos[1] - 1],
            [currentNode.pos[0] + 2, currentNode.pos[1] + 1],
            [currentNode.pos[0] - 2, currentNode.pos[1] - 1],
            [currentNode.pos[0] - 2, currentNode.pos[1] + 1],
            [currentNode.pos[0] + 1, currentNode.pos[1] - 2],
            [currentNode.pos[0] + 1, currentNode.pos[1] + 2],
            [currentNode.pos[0] - 1, currentNode.pos[1] - 2],
            [currentNode.pos[0] - 1, currentNode.pos[1] + 2],
        ];

        movements.forEach((move) => {
            let node = Node(move, currentNode.path.concat([move]));
            if (node){
                queue.push(node);
            }
        });

          currentNode = queue.shift();
    }

    let string ="You made it in "+ + (currentNode.path.length - 1) + " moves!"
    document.getElementById("messageDisplay").textContent = string
    console.log("=>"+ string +" Here's your path:");

    currentNode.path.forEach((pos) => {console.log(pos)});
    return currentNode.path
}