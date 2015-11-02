'use strict';

ReactDOM.render(React.createElement(
  'h1',
  null,
  ' Hello, world! '
), document.getElementById('example'));

var a = [];

var _loop = function (i) {
  a[i] = function () {
    console.log(i);
  };
};

for (var i = 0; i < 10; i++) {
  _loop(i);
}
a[6]();

{
  var _a = 10;
  var b = 1;
}
console.log(a);
console.log(b);

function timeout(ms) {
  return new Promise(function (resolve, reject) {
    setTimeout(resolve, ms, 'done');
  });
}

timeout(100).then(function (value) {
  console.log(value);
});