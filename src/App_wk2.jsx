// import * as bootstrap from "bootstrap";
import 'bootstrap/scss/bootstrap.scss'
import { useState } from "react";
import { useEffect } from "react";
import { datas } from "./data.js";
// import "./all.css";

function App_wk2() {
  // const [count, setCount] = useState(0);
  const [memu] = useState(datas)
  const [myCart, setMyCart] = useState([])
  const [totalSUM, setTotalSUM] = useState(0)
  const [myDesc, setMyDesc] = useState('')
  const [myOrder, setMyOrder] = useState({})

  const addMyCart = (myWant) => {
    setMyCart([...myCart, {
      ...myWant,
      id: new Date().getTime(),
      quantity: 1,
      subtotal: myWant.price
    }])
  }

  const updMyCart = (mm, value) => {
    const myNew = myCart.map((cItem) => {
      if (cItem.id === mm.id) {
        return {
          ...cItem,
          quantity: parseInt(value),
          subtotal: cItem.price * parseInt(value)
        }
      }
      return cItem
    })
    setMyCart(myNew)
  }

  const creMyOrder = () => {
    setMyOrder({
      id: new Date().getTime(),
      myCart,
      myDesc,
      totalSUM
    })
    setMyCart([])
    setMyDesc('')
  }

  useEffect(() => {
    const total = myCart.reduce((pre, next) => {
      return pre + next.price*next.quantity
    }, 0)
    setTotalSUM(total)
  }, [myCart])

  return (
    <>
      <h1>(wk2) : 線上訂購功能</h1>
      <div id="root">
        <div className="container mt-5">
          <div className="row">
            <div className="col-md-4">
              <div className="list-group">
              {
              memu.map(mm => {
                return (<a href="#" className="list-group-item list-group-item-action" key={mm.id}
                  onClick={(e) => {
                    e.preventDefault();
                    console.log(mm)
                    //若id存在購物車,則購物車的數量+1
                    //否則則新增至購物車
                    addMyCart(mm)
                  }}>
                  <div className="d-flex w-100 justify-content-between">
                    <h5 className="mb-1">{mm.prodName}</h5>
                    <small>${mm.price}</small>
                  </div>
                  <p className="mb-1">{mm.desc}</p>
                </a>)
              })
              }
              </div>
            </div>
            <div className="col-md-8">
              <h5>我的購物車</h5>
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col" width="50">
                      刪除
                    </th>
                    <th scope="col">品項</th>
                    <th scope="col">描述</th>
                    <th scope="col" width="90">
                      數量
                    </th>
                    <th scope="col">單價</th>
                    <th scope="col">小計</th>
                  </tr>
                </thead>
                <tbody>
                {
                  myCart.map(cart => {
                  return (
                    <tr key={cart.id}>
                    <td><button type="button" className='btn btn-sm' onClick={() => {
                      const myNew = myCart.filter((delItem) => {
                        return delItem.id !== cart.id
                      })
                      setMyCart(myNew)
                    }}>刪除</button></td>
                    <td>{cart.prodName}</td>
                    <td><small>{cart.desc}</small></td>
                    <td>
                    <select className="form-select" value={cart.quantity} onChange={(e) => {
                        const value = e.target.value;
                        updMyCart(cart, value);
                      }}>
                        {[...Array(10).keys()].map((myQty) => {
                          return (<option value={myQty + 1} key={myQty}>{myQty + 1}</option>)
                        })}
                      </select>
                    </td>
                    <td>{cart.price}</td>
                    <td>{cart.subtotal}</td>
                  </tr>
                  )
                })
                }
                </tbody>
              </table>
              <div className="text-end mb-3">
                <h5>
                  總計: <span>${totalSUM}</span>
                </h5>
              </div>
              <textarea
                className="form-control mb-3"
                rows="3"
                placeholder="備註" 
                onChange={(e) => {
                  setMyDesc(e.target.value)
                }}
              >{myDesc}</textarea>
              <div className="text-end">
                <button className="btn btn-primary" onClick={(e) => {
                  e.preventDefault()
                  creMyOrder()
                }}>送出</button>
              </div>
            </div>
          </div>
          <hr />
          <div className="row justify-content-center">
            <div className="col-8">
            {
              !myOrder.id ? <div className="alert alert-secondary text-center" role="alert">
                我的訂單尚未建立
              </div> : (
                <div className="card">
                  <div className="card-body">
                    <div className="card-title">
                      <h5>我的訂單</h5>
                      <table className='table'>
                        <thead>
                          <tr>
                            <th scope='col'>品項</th>
                            <th scope='col'>數量</th>
                            <th scope='col'>小計</th>
                          </tr>
                        </thead>
                        <tbody>
                          {myOrder.myCart.map((myNew) => {
                            return (<tr key={myNew.id}>
                              <td>{myNew.prodName}</td>
                              <td>{myNew.quantity}</td>
                              <td>{myNew.subtotal}</td>
                            </tr>)
                          })}
                        </tbody>
                      </table>
                      <div className='text-end'>
                        備註: <span>{myOrder.myDesc}</span>
                      </div>
                      <div className="text-end">
                        <h5>總計: <span>${myOrder.totalSUM}</span></h5>
                      </div>
                    </div>
                  </div>
                </div>
              )
            }
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App_wk2;
