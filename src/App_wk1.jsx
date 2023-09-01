import { useState } from 'react'
import { datas } from './data.js';
import './all.css'

function App_wk1() {
    // const [count, setCount] = useState(0);
    const [products, setProducts] = useState(datas);
    const [newProduct, setNewProduct] = useState("");
    const [changName, setChangeName] = useState(false);

    //LV2:可以重新設定菜單的庫存數量
    function changeProdInv(product, config) {
        const prod = products.map((data) =>
          data.id === product.id
            ? {
                ...data,
                inv: config === "increment" ? data.inv + 1 : data.inv - 1
              }
            : data
        );
        setProducts(prod);
      }

      function setNewName(e) {
        setNewProduct({
          ...newProduct,
          prodName: e.target.value
        });
      }
    //LV3:還能再去設定品項名稱
      function reName(product, e) {
        if (e.target.textContent === "異動") {
          const newArr = products.map((data) =>
          data.id === newProduct.id ? newProduct : data
          );
          setProducts(newArr);
        } else {
          setNewProduct(product);
        }
        setChangeName(!changName);
      }

  return (
    <>
      <h1>(wk1) : 菜單管理功能</h1>
      <div >
      <table>
            <thead>
                <tr>
                <th scope="col">品項</th>
                <th scope="col">描述</th>
                <th scope="col">價格</th>
                <th scope="col">庫存</th>
                <th scope="col">修改品項</th>
                </tr>
            </thead>
            <tbody>
            { products.map(data => 
                        <tr key={data.id}>
                            <td>{data.prodName}</td>
                            <td><small>{data.desc}</small></td>
                            <td>{data.price}</td>
                           
                            <td><button onClick={() => changeProdInv(data,'decrement')}>-</button>{data.inv}<button onClick={() => changeProdInv(data,'increment')}>+</button></td>
                            <td>
                                <button type="button" onClick={(e) => reName(data, e)}>
                                {changName && data.id === newProduct.id
                                    ? "異動"
                                    : "修改品項"}
                                </button>
                            </td>
                        </tr>)
                    }
            </tbody>
        </table> 
        {changName ? (
        <div className="box">
          <label htmlFor="newName">欲異動的品項名</label>
          <input
            type="text"
            name="newName"
            id="newName"
            value={newProduct.prodName}
            onChange={setNewName}
          />
        </div>
      ) : (
        ""
      )}
      </div>
      
    </>
  )
}

export default App_wk1