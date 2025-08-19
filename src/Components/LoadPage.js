import { Button } from "./Button";

const LoadPage = (props) => {
  const { onClick } = props;
  return (
    <div className="tc-laod-page-container">
      <Button
        onClick={onClick}
        className="tc-load-page-button"
        label={"Let's Begin"}
      />
    </div>
  );
};

export { LoadPage };
