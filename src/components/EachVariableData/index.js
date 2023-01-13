import "./index.css";

const EachVariableData = (props) => {
  const { productData } = props;
  //   console.log("abc", productData);
  const {symbol,priceChangePercent,lastPrice,lowPrice,volume}=productData

  return (
    <li className="product-item">
      <p>{symbol}</p>
      <p>{priceChangePercent}</p>
      <p>{lastPrice}</p>
      <p>{lastPrice-lowPrice}</p>
      <p>{volume}</p>
    </li>
  );
};

export default EachVariableData;
