import React from 'react';

const CreaEntrprise = () => {

    const queryupdrole = (userid) => {
        
        return `
        mutation{
            updateUser(input:
              {where:
                {id:${userid}}
                data:{role:"5f5c6b6b7f803318bae13a1a"}}){
              user{id
              role{name}
              }
              }
          
          }
        `
    }
    
    
    return ( 
    <div>
        creation entreprise
    </div>

     );
}
 
export default CreaEntrprise;