import React, { useState } from 'react';

interface IStock {
  sender: string
  datetime: string
  mention: string
  title: string
  text: string
}

interface IProp {
  item: IStock
  api: any
}

const Stock = (props: IProp) => {
  const { item } = props

  const handleClick = (event: any) => {
    props.api.click("click!")
  }

  return (
    <div onClick={handleClick}>
      <div>{item.sender} {item.datetime}</div>
      <div>{item.mention}</div>
      <div>{item.title}</div>
      <p>{item.text}</p>
    </div>
  )
}

export default Stock;
