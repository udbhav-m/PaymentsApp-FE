import Heading from "./Heading";
import SubHeading from "./SubHeading";

function ErrorBoundary() {
  return (
    <div className="flex flex-col items-center place-content-center h-screen gap-8 ">
      <Heading label="UH-OH!" />
      <SubHeading label="Looks like you ended on a page that does not exists. Go some other way bruv." />
    </div>
  );
}

export default ErrorBoundary;
