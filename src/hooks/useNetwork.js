import { useState } from "react";
import useNestedFormState from "./useNestedFormState";

const TestComponent = () => {
  const [formData, setFormData] = useState({
    startDate: { expected: "" },
    endDate: { expected: "" },
  });

  const { handleNestedChange, handleDateChange } = useNestedFormState(formData, setFormData);

  return (
    <div>
      <h2>Testing useNestedFormState</h2>
      <input
        type="text"
        placeholder="Start Date"
        onChange={(e) => handleNestedChange("startDate", "expected", e.target.value)}
      />
      <input
        type="text"
        placeholder="End Date"
        onChange={(e) => handleNestedChange("endDate", "expected", e.target.value)}
      />
      <button onClick={() => handleDateChange("startDate", "expected", new Date())}>
        Set Current Date
      </button>
      <pre>{JSON.stringify(formData, null, 2)}</pre>
    </div>
  );
};

export default TestComponent;
