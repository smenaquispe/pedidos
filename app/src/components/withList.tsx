import CommonInterface from './Common.interface'
import { Context } from '../providers/Context'
import React, { useContext, useEffect, useState } from 'react'

// it's my HOC, recieve any kind of conponentt
function withList<T extends CommonInterface>(
        WrappedComponent: React.ComponentType<{items : T[]}>, 
        ep: string,
        data?: T
    ) {
    const { BACKEND_URL } = useContext(Context);
    const [items, setItems] = useState< Array <T> >([]);

    useEffect(() => {
        fetch(BACKEND_URL + ep, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(json => setItems(json))
    }, [])

    return ( 
        <>
           <WrappedComponent items={items as T[]} />
        </>
    )
}

export default withList


