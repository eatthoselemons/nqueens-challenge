const helperFunctions = require("./helperFunctions.js");
const {binaryNode} = require("./binaryNode.js");
const {point,computeSlope,computeYIntercept} = require("./point.js");
const {slopeInterceptObject} = require("./slopeInterceptObject");

function placeQueenOnBoard(boardList, location) {
  return boardList[location.x] = location.y;
}

function selectQueenRowFromConflictList (conflictList) {
  let listOfMins = [];
  // the conflicts list will be of size n so we can safely assume that the minimum number of conflicts will be less than n
  let min = conflictList.length+1;
  for (let i=0;i<conflictList.length;++i) {
    if (conflictList[i] < min) {
      listOfMins = [i];
      min = conflictList[i];
    } else if (conflictList[i] === min) {
      listOfMins.push(i);
    }
  }
  let myRandom = helperFunctions.randomInt(listOfMins.length-1)
  return listOfMins[myRandom];
}

function generateColumnConflictList(boardList, column) {
  let slopeTree = generateSlopeTree(
      removeWorkingColumnFromCombinationList(
          generateAllCombinations(boardList),
          column));
  let conflictList = [];
  for (let row=0;row<boardList.length;++row) {
    let queenLocation = new point(column, row);
    conflictList[row] = countConflicts(boardList, slopeTree, queenLocation);
  }
  return conflictList;
}


function countConflicts(boardList, slopeTree, queenLocation) {
  let combinationList = generateSinglePointCombinations(boardList, queenLocation);
  let count = 0;
  for (let item=0;item<combinationList.length;++item) {
    let [pointA, pointB] = combinationList[item];
    let slopeIntercept = new slopeInterceptObject(
        computeSlope(pointA, pointB),
        computeYIntercept(pointA, pointB));
    if ( slopeIntercept.slope === 1 || slopeIntercept.slope === -1 ) {
      ++count;
    } else if ( slopeIntercept.slope === 0 ) {
      ++count;
    } else {
      if (slopeTree.find(slopeIntercept)) {
        ++count;
      }
    }
  }
  return count;
}

function countConflictsToMax(boardList, slopeTree, queenLocation, max) {
  let combinationList = generateSinglePointCombinations(boardList, queenLocation);
  let count = 0;
  for (let item=0;item<CombinationList.length;++item) {
    let [pointA, pointB] = CombinationList[item];
    let slopeIntercept = new slopeInterceptObject(
        computeSlope(pointA, pointB),
        computeYIntercept(pointA, pointB));
    if ( slopeIntercept.slope === 1 || slopeIntercept.slope === -1 ) {
      ++count;
    } else if ( slopeIntercept.slope === 0 ) {
      ++count;
    } else {
      if (slopeTree.find(slopeIntercept)) {
        ++count;
      }
    }
    if (count > max) {
      break;
    }
  }
  return count;
}

function generateSlopeTree(combinationList) {
  let tree = new binaryNode();
  let pointA = new point(0, 0);
  let pointB = new point(0, 0);
  for (let item=0;item<combinationList.length;++item) {
    [pointA, pointB] = combinationList[item];
    let slopeIntercept = new slopeInterceptObject(
        computeSlope(pointA, pointB),
        computeYIntercept(pointA, pointB));
    if (slopeIntercept == null ) {
      console.log("slopeIntercept was null");
    }
    tree.add(slopeIntercept);
  }
  return tree;
}


function generateAllCombinations(boardList) {
  let combinationList = [];
  for (let i=0;i<boardList.length;++i) {
    for (let j=i+1;j<boardList.length;++j) {
      let pointA = new point(i, boardList[i]);
      let pointB = new point(j, boardList[j]);
      combinationList.push([pointA, pointB]);
    }
  }
  return combinationList;
}

function generateSinglePointCombinations(boardList, comparePoint) {
  let combinationList = [];
  for (let i=0;i<boardList.length;++i) {
    let listPoint = new point(i, boardList[i]);
    if (comparePoint.x != listPoint.x) {
      combinationList.push([comparePoint, listPoint]);
    }
  }
  return combinationList
}


function removeWorkingColumnFromCombinationList(combinationList, column) {
  return combinationList.filter((item) => { 
    let [pointA, pointB] = item;
    if (pointA.x === column || pointB.x === column) {
      return false;
    }
    return true;
  });
}
exports.placeQueenOnBoard = placeQueenOnBoard;
exports.selectQueenRowFromConflictList = selectQueenRowFromConflictList;
exports.generateColumnConflictList = generateColumnConflictList;
exports.removeWorkingColumnFromCombinationList = removeWorkingColumnFromCombinationList;
exports.generateAllCombinations = generateAllCombinations;
exports.generateSlopeTree = generateSlopeTree;
exports.countConflicts = countConflicts;
