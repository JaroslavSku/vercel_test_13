import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import OrderEntry from "./order/OrderEntry";
import styles from "./Orders.module.scss";

export default function Orders() {
  const orders = useSelector((state) => state.orders.data);

  const [token, setToken] = useState(null);

  useEffect(() => {
    setToken(JSON.parse(localStorage.getItem("rdUser"))?.token);
  }, []);
  return (
    <div className={styles.container}>
      <h2>Přehled objednávek</h2>
      <table className={styles.table}>
        <thead className={styles.tableHeader}>
          <th>Datum</th> <th>Objednávka</th> <th>Částka</th> <th>Stav</th>
          <th></th>
          <th>PDF ke stažení</th>
        </thead>

        <tbody>
          {orders.map(({ createdAt, title, amount, paid, pdf, _id }) => {
            return (
              <OrderEntry
                key={_id}
                date={createdAt}
                title={title}
                amount={amount}
                paid={paid}
                pdf={pdf}
                token={token}
                id={_id}
              />
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
