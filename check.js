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

  function returnCheckNoneFunc() {
    return check.none;
  }

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
    return this.fold(function(){ return check(x);}, returnCheckNoneFunc);
  };
  check.lift = function(n, f) {
    check.prototype[n] = function(){
      return this.fold(f, returnCheckNoneFunc, arguments);
    };
  };

  check.extend = function(obj) {
    for (var key in obj) {
      check.lift(key, obj[key]);
    }
  };

  window.check = check;
})();
// set all the check primitives
(function(){
  check.extend({
    equals: function(x, v) {
      return x == v[0] ? check(x) : check.none;
    },
    notEquals: function(x, v) {
      return x != v[0] ? check(x) : check.none;
    },
    strictlyEquals: function(x, v) {
      return x === v[0] ? check(x) : check.none;
    },
    strictlyNotEquals: function(x, v) {
      return x !== v[0] ? check(x) : check.none;
    },
    defined: function(x){
      return check(typeof x).strictlyNotEquals('undefined').pass(x);
    },
    notDefined: function(x){
      return check(typeof x).strictlyEquals('undefined').pass(x);
    },
    emptyString: function(x) {
      return check(x).strictlyEquals('');
    },
    notEmptyString: function(x){
      return check(x).strictlyNotEquals('');
    }
  });
})();