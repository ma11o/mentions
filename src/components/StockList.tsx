import React, { useState, useEffect } from 'react';
import Stock from './Stock';

function StockList(props: any) {
  const [stocks, setStocks] = useState([])

  useEffect(() => {
    props.api.on("add", (arg: any)=>{
      setStocks(stocks => stocks.concat(arg.data))
    })
  },[]);

  return (
    <>
      {stocks && stocks.map((stock) => {
        return <Stock item={stock} api={props.api}/>
      })}
    </>
  );
}

export default StockList;
