(function(){
  // extend check
  check.extend({
    log: function(x) {
      console.log(x);
    }
  });

  var x = check('x');
  var y = check('y');

  x.log(); // should log 'x'

  x.equals('x').log(); // should log 'x'
  x.equals('y').log(); // should not log

})();