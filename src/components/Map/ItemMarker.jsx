"use client";

// Convert to https://codesandbox.io/p/sandbox/objective-hooks-r9jrw4 if we need some functionality inside the marker
export const ItemMarker = (props) => {
  const {
    item: {
      name = "",
      address,
      start_timestamp = "00:00",
      end_timestamp = "00:00",
      justification = "",
    },
  } = props;

  return (
    <>
      <h2>{name}</h2>
      <p>{address}</p>
      <p>{justification}</p>
      Working hours: <b>{start_timestamp}</b>- <b>{end_timestamp}</b>
    </>
  );
};
