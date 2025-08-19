import React from "react";

const Button = (props) => {
  const { label, onClick, className = "" } = props;

  const _className = React.useMemo(() => {
    return `tc-button ${className}`;
  }, [className]);

  const handleClick = React.useCallback(
    (e) => {
      onClick?.(e);
    },
    [onClick]
  );
  return (
    <button className={_className} onClick={handleClick}>
      {label}
    </button>
  );
};

export { Button };
