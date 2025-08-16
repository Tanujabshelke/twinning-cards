const Points = (props) => {
  const { points } = props;
  return (
    <div className="tc-points-container">
      <h2>You earned : {points} points</h2>
    </div>
  );
};

export { Points };
