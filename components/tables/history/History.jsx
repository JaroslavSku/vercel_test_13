import { connect } from "formik";
import React from "react";
import { useSelector } from "react-redux";

import EntryFooter from "../entryfooter/EntryFooter";
import HistoryEntry from "./historyentry/HistoryEntry";

function History({ showMore }) {
  const history = useSelector((state) => state.history.data);
  console.log("This is the history", history);
  return (
    <div>
      <h3>Historie transakcí</h3>
      {history &&
        history
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .map(({ createdAt, title, info }) => {
            return (
              <HistoryEntry
                key={createdAt}
                date={createdAt}
                name={title}
                info={info}
              />
            );
          })}
      <EntryFooter showMore={showMore} />
    </div>
  );
}

export default History;
