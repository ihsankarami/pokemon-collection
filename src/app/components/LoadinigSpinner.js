export default function LoadingSpinner() {
  return (
    <>
      <div className="flex items-center justify-center min-h-screen ">
        <div
          style={{ borderTopColor: "transparent" }}
          className="w-20 h-20 border-4 border-blue-200 rounded-full animate-spin"
        ></div>
        <p className="ml-2 text-white">Loading...</p>
      </div>
    </>
  );
}
