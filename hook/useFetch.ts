'use client';

import {  useEffect, useState } from "react";

const usefetch = <T = any> (url:string) => {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() =>{
        const fetchdata = async () =>{
            setLoading(true);
            try{
                const reponse = await fetch (url);
                const json = await reponse.json();
                setData(json);
                setLoading(false);

            }catch(err:any){    
                setError(err.message);
                setLoading(false);
            }

        }

        fetchdata();

    }, [url]);
     
    return { loading, error, data };

}

export default usefetch