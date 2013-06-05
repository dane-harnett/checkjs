(function(){
  // extend check
  check.extend({
    log: function(x) {
      console.log(x);
    }
  });

  var xchk = check('x');
  var ychk = check('y');

  xchk.log(); // should log 'x'

  xchk.equals('x').log(); // should log 'x'
  xchk.equals('y').log(); // should not log


  // PROCEDURAL EXAMPLES AND CHECKJS ALTERNATIVES

  var x = 'x';
  var y = 'y';


  // example 1
  if (typeof x !== 'undefined') {
    doSomething();
  }
  check(x).defined().chain(doSomething);

  // example 2
  if (typeof x !== 'undefined' && x !== '') {
    doSomething();
  }
  check(x).defined().notEmptyString().chain(doSomething);


  // example 3
  if (typeof x !== 'undefined') {
    doSomething();
  } else {
    doSomethingElse();
  }
  check(x).defined().chain(doSomething).otherwise(doSomethingElse);


  // example 4
  if (typeof x !== 'undefined' && typeof y !== 'undefined') {
    doSomething();
  }
  // possible options
  check(x).defined().pass(y).defined().chain(doSomething);
  check(x).defined().check(y).defined().chain(doSomething);
  check(x).defined().and(y).defined().chain(doSomething);

  // example 5
  if (typeof x !== 'undefined' || typeof y !== 'undefined') {
    doSomething();
  }
  // possible options
  check(x).defined().or(y).defined().chain(doSomething);

})();