import "./index.css";

const EachVariableData = (props) => {
  const { productData } = props;
  //   console.log("abc", productData);
  const {symbol,priceChangePercent,lastPrice,lowPrice}=productData

  return (
    <li className="product-item">
      <p>{symbol}</p>
      <p>{priceChangePercent}</p>
      <p>{lastPrice}</p>
      <p>{lastPrice-lowPrice}</p>
    </li>
  );
};

export default EachVariableData;
