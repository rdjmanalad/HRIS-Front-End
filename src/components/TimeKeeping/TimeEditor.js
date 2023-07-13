import TimePicker from "react-time-picker";

export const TimeEditor = ({ value, onUpdate }) => {
  const handleChange = (time) => {
    onUpdate(time);
  };

  return (
    <TimePicker value={value} onChange={handleChange} disableClock={true} />
  );
};
