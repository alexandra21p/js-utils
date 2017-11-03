function getNestedKeys( object, prefix = "" ) {
	let result = [];
  const keys = Object.keys( object );
  
  let partial = keys.reduce( ( acc, currentKey ) => {
  	if ( typeof object[currentKey] === 'function' || Array.isArray( object[currentKey] ) ) {
    	return acc;
    }
    if ( typeof object[currentKey] === 'object' ) {
        return acc.concat( getNestedKeys( object[currentKey], `${prefix}${currentKey}.` ) );
    } else {
      	acc.push( `${prefix}${currentKey}` );
        return acc;
    }
  }, [] );
  
  return result.concat( partial );
}


let object = {
	user: {
  	name: "bla",
    age: 18,
    contact: {
    	address: "streetname"
    }, 
    arr: [1,2,3]
  },
  account: "blabla",
  getId: function() {
  	return "something";
  }
};

console.log( getNestedKeys( object ) );
