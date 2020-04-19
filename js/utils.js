function genarateRandomNum(min, max){

    return Math.floor(Math.random() * (max - min + 1) + min);
}

function makeRandId() {

    return '_' + Math.random().toString(36).substr(2, 9);
};