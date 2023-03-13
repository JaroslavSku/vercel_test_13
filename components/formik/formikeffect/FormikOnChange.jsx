/* eslint-disable react-hooks/exhaustive-deps */
import { connect } from "formik";
import noop from "lodash/noop";
import { useEffect } from "react";
import { usePrevious } from "react-use";

const FormikEffect = ({ onChange = noop, formik }) => {
  const { values } = formik;
  const prevValues = usePrevious(values);

  useEffect(() => {
    console.log("badge inputs changed", prevValues, values);
    if (prevValues) {
      onChange({ prevValues, nextValues: values, formik });
    }
  }, [values]);

  return null;
};

export default connect(FormikEffect);
