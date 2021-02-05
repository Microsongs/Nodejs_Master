// 예전 방식
let Human = function(type){
    this.type = type || 'human';
};

Human.isHuman = function(human){
    return human instanceof Human;
}

// 프로토타입 메서드
Human.prototype.breathe = function(){
    alert('h-a-a-a-m');
};

let Zero = function(type, firstName, lastName){
    Human.apply(this, arguments);
    this.firstName = firstName;
    this.lastName = lastName;
}

Zero.prototype = Object.create(Human.prototype);
Zero.prototype.constructor = Zero;
Zero.prototype.sayName = function(){
    alert(this.firstname + ' ' + this.lastName);
};
let oldZero = new Zero('human', 'Zero','Cho');
Human.isHuman(oldZero);

// 현재 방식
class Human{
    constructor(type = 'human'){
        this.type = type;
    }
    static isHuman(human){
        return human instanceof Human;
    }
    breathe(){
        alert('h-a-a-a-m');
    }
}
class Zero extends Human{
    constructor(type, firstName, lastName){
        super(type);
        this.firstName = firstName;
        this.lastName = lastName;
    }
    sayName(){
        super.breathe();
        alert(`${this.firstName} ${this.lastName}`)
    }
}
const newZero = new Zero('human','Zero','Cho');
Human.isHuman(newZero);