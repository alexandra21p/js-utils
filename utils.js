// groups arrays in chunks of given size
// e.g. groupArray( [1, 2, 3, 4, 5], 2 ) -> [ [ 1, 2 ], [ 3, 4 ], [ 5 ] ]
const groupArray = ( array, chunkSize ) =>
	array.reduce( ( acc, current, index ) => {
        if ( index % chunkSize === 0 ) {
            acc.push( [ current ] );
            return acc;
        }
        const lastArrayIndex = index - ( index % chunkSize );
        const currentArray = acc[ lastArrayIndex / chunkSize ];
        currentArray.push( current );
        return acc;
    }, [] );



// returns object's keys prefixed with parent key ( nested )
// ignores arrays and functions
const getNestedKeys = ( object, prefix = "" ) => {
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
// ["user.name", "user.age", "user.contact.address", "account"]


// parse a date string into an object { day, month, year }
// e.g. const date = "11/12/2017, 00:00:00";
// parseDate( date ) => { day: "11", month: "12", year: "2017" }

parseDate = ( date ) => {
    const newDate = date.slice(0, 10).split(/[-/]/);
    if ( newDate.length === 3 ) {
        let [ day, month, year ] = newDate;
        day = day.length === 2 && ( parseInt( day, 10 ) < 31 && parseInt( day, 10 ) > 0 )
            ? day : "";
        month = month.length === 2 && ( parseInt( month, 10 ) < 13 && parseInt( month, 10 ) > 0 )
            ? month : "";
        year = year.length === 4 ? year : "";

        return {
            day,
            month,
            year,
        };
    }
}
