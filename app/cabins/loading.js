import SpinnerMini from "../_components/SpinnerMini";

function Loading() {
  return (
    <div className="grid items-center gap-3">
      <SpinnerMini />
      <p>Loading Cabins Data ...</p>
    </div>
  );
}

export default Loading;
