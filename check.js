(function(){
  
  function check(subject) {
    // dont have to use the new keyword to create an instance
    if(!(this instanceof check))
      return new check(subject);
    
    var self = this;
    self.subject = subject;
    // assumes "Some" fold executes "a"
    self.fold = function(a, b, args) {
        return a(self.subject, args);
    };
  }

  check.none = new check();
  check.none.fold = function(a, b, args) {
      return b(args);
  };

  check.prototype.chain = function(f) {
      return this.fold(
          function(a) {
              return f(a);
          },
          function() {
              return check.none;
          }
      );
  };
  check.prototype.pass = function(x) {
    return this.fold(function(){ return check(x);},
                     function(){ return check.none;});
  };
  check.lift = function(n, f) {
    check.prototype[n] = function(){
      return this.fold(f, function(){ return check.none; }, arguments);
    };
  };

  window.check = check;
})();
// set all the check primitives
(function(){
  check.lift('equals', function(x, v) {
    return x == v[0] ? check(x) : check.none;
  });
  check.lift('notEquals', function(x, v) {
    return x != v[0] ? check(x) : check.none;
  });
  check.lift('strictlyEquals', function(x, v) {
    return x === v[0] ? check(x) : check.none;
  });
  check.lift('strictlyNotEquals', function(x, v) {
    return x !== v[0] ? check(x) : check.none;
  });
  check.lift('defined', function(x){
    return check(typeof x).strictlyNotEquals('undefined').pass(x);
  });
  check.lift('notEmptyString', function(x){
    return check(x).strictlyNotEquals('');
  });
  check.lift('log', function(x){
    console.log(x);
    return check(x);
  });
})();