// 과거의 사용 방법
const example = {a: 123, b:{c:135, d:146}}
const a = example.a;
const b = example.b.d;
console.log(a)
console.log(b)

// 구조분해 문법 사용 시
const {c, b:{d}} = example
console.log(c)
console.log(d)

// 과거의 사용 방법
const arr = [1,2,3,4,5]
const x = arr[0];
const y = arr[1];
const z = arr[4];

// 구조분해 문법 사용 시
const [x,y,,,z] = arr;