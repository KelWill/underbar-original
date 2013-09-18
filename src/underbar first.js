/*jshint eqnull:true, expr:true*/

var _ = { };

(function() {

  /**
   * COLLECTIONS
   * ===========
   *
   * In this section, we'll have a look at functions that operate on collections
   * of values; in JavaScript, a 'collection' is something that can contain a
   * number of values--either an array or an object.
   */

  // Return an array of the first n elements of an array. If n is undefined,
  // return just the first element.
  _.first = function(array, n) {  //use slice to simplify
    var items = [];
    if (n == undefined) {return array[0];}            
    
    if (n > array.length) {n = array.length;}
    for (var i = 0; i<n; i++) 
      {items.push(array[i]);}
    return items;
};

  // Like first, but for the last elements. If n is undefined, return just the
  // last element.
  _.last = function(array, n) {   //same for last 
    var items = [];
    if (n === undefined) {return array[array.length - 1];}
    if (n > array.length) {n = array.length;}
    for (var i = array.length - n; i < array.length; i++) {items.push(array[i]);}
    return items; 
  };

  // Call iterator(value, key, collection) for each element of collection.
  // Accepts both arrays and objects.
  _.each = function(collection, iterator) {   //refactor this
    //if (collection==null) {return;}
    if (Array.isArray(collection)) {
      for (var i = 0; i < collection.length; i++){ iterator(collection[i], i, collection);}  
    }
    else {
      for (var i in collection ){
        iterator(collection[i], i, collection);
      }    
    }
    return response;
  };

  // Returns the index at which value can be found in the array, or -1 if value
  // is not present in the array.
  _.indexOf = function(array, target){  //note: I should probably figure out a way to pass in some sort of breaker, but this is working for now. 
   var iterator = function(value, key, collection, target, index) 
   {   
     if (value === target) 
     {
       index.push(key);
     }
   };
   var index = _.each(array, iterator, target, []);
   for (var i = 0; i<index.length; i++) 
     {
       if (index[i] > -1) 
       {
         return index[i];
       }
     } 
   return -1;
    // TIP: Here's an example of a function that needs to iterate, which we've
    // implemented for you. Instead of using a standard `for` loop, though,
    // it uses the iteration helper `each`, which you will need to write.
  };

  // Return all elements of an array that pass a truth test.
  _.filter = function(collection, iterator) {
    var response = [];
    for (var i = 0; i<collection.length; i++)
    {
      if (iterator(collection[i]))
      {
        response.push(collection[i]);
      }
    }
    return response;
  };

  // Return all elements of an array that don't pass a truth test.
  _.reject = function(collection, iterator) {  //should go back and redo to use _.filter and _.indexOf
    var response = [];
    for (var i = 0; i<collection.length; i++)
    {
      if (!iterator(collection[i]))
      {
        response.push(collection[i]);
      }
    }
    return response;
    
    // TIP: see if you can re-use _.filter() here, without simply
    // copying code in and modifying it
  };

  // Produce a duplicate-free version of the array.
  _.uniq = function(array) {
    var results = [];
    while (true)
    {
      var a = array.shift();
      if (_.indexOf(results, a)==-1)
      {
        results.push(a);
      }
      if (array.length == 0) {return results}
    }
  };


  // Return the results of applying an iterator to each element.
  _.map = function(array, iterator) {
    var results = []
    for (var i = 0; i < array.length; i++)
    {
      results.push(iterator(array[i])); 
    }  
    
    return results;
  };
 

  /*
   * TIP: map is really handy when you want to transform an array of
   * values into a new array of values. _.pluck() is solved for you
   * as an example of this.
   */

  // Takes an array of objects and returns and array of the values of
  // a certain property in it. E.g. take an array of people and return
  // an array of just their ages
  _.pluck = function(array, propertyName) {
    // TIP: map is really handy when you want to transform an array of
    // values into a new array of values. _.pluck() is solved for you
    // as an example of this.
    return _.map(array, function(value){
      return value[propertyName];
    });
  };

  // Calls the method named by methodName on each value in the list.
  _.invoke = function(list, methodName, args) {
    var results = [];
    for (var i = 0; i<list.length; i++) 
    { 
	  if (methodName in list[i]){ //this is if it's a method of list[i]
        results.push(list[i][methodName](args)); 
      }
	  else {
	    results.push(methodName.apply(list[i], args));
	  }
    }
    return results;
  };

  // Reduces an array or object to a single value by repetitively calling
  // iterator(previousValue, item) for each item. previousValue should be
  // the return value of the previous iterator call.
  //
  // You can pass in an initialValue that is passed to the first iterator
  // call. Defaults to 0.
  //
  // Example:
  //   var numbers = [1,2,3];
  //   var sum = _.reduce(numbers, function(total, number){
  //     return total + number;
  //   }, 0); // should be 6
  //
  _.reduce = function(collection, iterator, initialValue) {
    var previousValue = initialValue || 0;
    //I need to change reduce so that it can handle arrays and objects
    if (Array.isArray(collection))
    {  for (var i=0; i<collection.length; i++)
      {
        previousValue = iterator(previousValue, collection[i]);
      }
    }
    else 
    {
      for (var i in collection) 
      {
        previousValue = iterator(previousValue, collection[i]);
      }
    }
    return previousValue;
  };

  // Determine if the array or object contains a given value (using `===`).
  _.contains = function(collection, target) {
    // TIP: Many iteration problems can be most easily expressed in
    // terms of reduce(). Here's a freebie to demonstrate!
    return _.reduce(collection, function(wasFound, item) {
      if(wasFound) {
        return true;
      }
      return item === target;
    }, false);
  };

  // Determine whether all of the elements match a truth test.
  _.every = function(collection, iterator) {
    iterator = iterator || function(item) {
	  return !!item;
	} 
    var results = _.map(_.map(collection, iterator), function(item) {return !!item;});
    if (_.contains(results, false)) 
	  {return false;}
    return true;
    // TIP: Try re-using reduce() here.
  };

  // Determine whether any of the elements pass a truth test. If no iterator is
  // provided, provide a default one
  _.some = function(collection, iterator) {  
    iterator = iterator || function(item) {return !!item;};
	var results = _.map(collection, iterator);
	for (var i = 0; i<results.length; i++){
	  if (results[i]==true) {
	    return true
	  }
	}
	return false;
    // TIP: There's a very clever way to re-use every() here.  In _.every, if iterator returns false once, everything is false, in _.some if it returns true once, everything is true
	// Tried doing it the classy way with every and double negatives, but I can't figure out a way to pas iterator into a new function that returns the opposite of what iterator does
	// and then pass that into _.every  so I'm doing it the easy way.
  };
  
  /**
   * OBJECTS
   * =======
   *
   * In this section, we'll look at a couple of helpers for merging objects.
   */

  // Extend a given object with all the properties of the passed in
  // object(s).
  //
  // Example:
  //   var obj1 = {key1: "something"};
  //   _.extend(obj1, {
  //     key2: "something new",
  //     key3: "something else new"
  //   }, {
  //     bla: "even more stuff"
  //   }); // obj1 now contains key1, key2, key3 and bla
  _.extend = function(obj) {
    for (var i = 1; i<arguments.length; i++){
	  for (var j in arguments[i]){
	    obj[j] = arguments[i][j];
	  }
	}
	return obj 
  };

  // Like extend, but doesn't ever overwrite a key that already
  // exists in obj
  _.defaults = function(obj) {
    for (var i = 1; i<arguments.length; i++){
	  for (var j in arguments[i]){
	    if (!(j in obj)){
	      obj[j] = arguments[i][j];
		}
	  }
	}
	return obj 
  };


  /**
   * FUNCTIONS
   * =========
   *
   * Now we're getting into function decorators, which take in any function
   * and return out a new version of the function that works somewhat differently
   */

  // Return a function that can be called at most one time. Subsequent calls
  // should return the previously returned value.
  _.once = function(func) {
    // TIP: These variables are stored in a "closure scope" (worth researching),
    // so that they'll remain available to the newly-generated function every
    // time it's called.
    var alreadyCalled = false;
    var result;
    // TIP: We'll return a new function that delegates to the old one, but only
    // if it hasn't been called before.
    return function(){
      if(!alreadyCalled){
        // TIP: .apply(this, arguments) is the standard way to pass on all of the
        // infromation from one function call to another.
        result = func.apply(this, arguments);
        alreadyCalled = true;
      }
      // The new function always returns the originally computed result.
      return result;
    };
  };

  // Memoize an expensive function by storing its results. You may assume
  // that the function takes only one argument and that it is a primitive.
  //
  // Memoize should return a function that when called, will check if it has
  // already computed the result for the given argument and return that value
  // instead if possible.

  _.memoize = function(func) {  
    var newFunc = function(arg) {
      if (!_.memoize.all[func]) {
        _.memoize.all[func] = {};
      }
      for (var a in _.memoize.all[func]){
          if (a===arg){
            return _.memoize.all[func][a];
          }
        }
      var result = func.apply(this, arguments);;
      _.memoize.all[func][arg] = result;
      return result;
    };
    return newFunc  
  };
  _.memoize.all = {};
  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  //
  // The arguments for the original function are passed after the wait
  // parameter. For example _.delay(someFunction, 500, 'a', 'b') will
  // call someFunction('a', 'b') after 500ms
  _.delay = function(func, wait) {
    if (arguments[2]) {
	  var args = [];
	  for (var i = 2; i<arguments.length; i++){
	    args.push(arguments[i]);
	  }
	setTimeout(func.apply(this, args), wait);
	}
	else{
	  setTimeout(func, wait);
	}
  };


  /**
   * ADVANCED COLLECTION OPERATIONS
   * ==============================
   */

  // Shuffle an array.
  _.shuffle = function(array) {
    var len = array.length;
	var results = [];
	var hasValue = [];
	var i = 0;
	while (true){
	  var key = Math.floor(Math.random()*len);
	  if (!_.contains(hasValue, key)){
	    results[key] = array[i];
		hasValue.push(key);
		i = i + 1;
		if (i == len) {
		  return results;
		}
	  }
	}
  };


  /**
   * Note: This is the end of the pre-course curriculum. Feel free to continue,
   * but nothing beyond here is required.
   */


  // Sort the object's values by a criterion produced by an iterator.
  // If iterator is a string, sort objects by that property with the name
  // of that string. For example, _.sortBy(people, 'name') should sort
  // an array of people by their name.
  _.sortBy = function(collection, iterator) {
  };

  // Zip together two or more arrays with elements of the same index
  // going together.
  //
  // Example:
  // _.zip(['a','b','c','d'], [1,2,3]) returns [['a',1], ['b',2], ['c',3], ['d',undefined]]
  _.zip = function() {
  };

  // Takes a multidimensional array and converts it to a one-dimensional array.
  // The new array should contain all elements of the multidimensional array.
  //
  // Hint: Use Array.isArray to check if something is an array
  _.flatten = function(nestedArray, result) {
  };

  // Takes an arbitrary number of arrays and produces an array that contains
  // every item shared between all the passed-in arrays.
  _.intersection = function() {
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {
  };


  /**
   * MEGA EXTRA CREDIT
   * =================
   */

  // Return an object that responds to chainable function calls for map, pluck,
  // select, etc.
  //
  // See the Underbar readme for details.
  _.chain = function(obj) {
  };

  // EXTRA CREDIT:
  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time.
  //
  // See the Underbar readme for details.
  _.throttle = function(func, wait) {
  };

}).call(this);
