import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";

function Loader() {
  return (
    <>
      <Box sx={{ width: "100%" }}>
        <LinearProgress />
      </Box>
      <div className="grid h-screen place-items-center bg-gray-100 ">
        <div className=" rounded-full shadow-xl animate-pulse duration-200 text-center content-center w-40 h-40 bg-white">
          <h1 className="sans text-3xl font-bold ">PayTM</h1>
        </div>
      </div>
    </>
  );
}

export default Loader;
