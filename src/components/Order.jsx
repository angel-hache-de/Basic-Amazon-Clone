import moment from "moment";
//import Currency from "react-currency-format";

function Order({ id, amount, items, timestamp }) {
  return (
    <div className="relative border rounded-md">
      <div
        className="flex items-center space-x-10 
      p-5 bg-gray-100 text-sm 
      text-gray-600"
      >
        <div>
          <p className="font-bold text-xs">Order places</p>
          <p>{moment.unix(timestamp).format("DD MMM YYYY")}</p>
          {/*<p>{timestamp.toDate().toLocaleDateString()}</p>*/}
        </div>

        <div>
          <p className="text-xs font-bold"></p>
          <p>
            {/*<Currency quantity={amount} currency="MXN" />*/}
            ${Number(amount).toFixed(2)}
            {"     "}Nex Dat Delivery
          </p>
        </div>

        <p
          className="text-sm whitespace-nowrap sm:text-xl 
        self-end flex-1 text-right !-ml-3
        text-blue-500"
        >
          {items.length} items
        </p>

        <p
          className="absolute top-2 right-1 w-40 lg:w-72 
        truncate text-xs whitespace-nowrap"
        >
          ORDER # {id}
        </p>
      </div>

      <div className="p-5 sm:p-10">
        <div className="flex space-x-6 overflow-x-auto">
          {items.map((item, i) => (
            <img key={i} src={item.image} className="h-20 object-contain sm:h-32" alt="" />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Order;
