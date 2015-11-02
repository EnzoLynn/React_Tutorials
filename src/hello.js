  ReactDOM.render(
    <h1> Hello, world! </h1>,
    document.getElementById('example')
  );

  var a = [];
  for (let i = 0; i < 10; i++) {
    a[i] = function() {
      console.log(i);
    };
  }
  a[6]();

  {
    let a = 10;
    var b = 1;
  }
  console.log(a);
  console.log(b);


  function timeout(ms) {
    return new Promise((resolve, reject) => {
      setTimeout(resolve, ms, 'done');
    });
  }

  timeout(100).then((value) => {
    console.log(value);
  });