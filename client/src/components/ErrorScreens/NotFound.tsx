const NotFound = ({ message }: { message: string }) => {
  return (
    <div className="h-full flex flex-col items-center justify-center ">
      <h2 className="mb-2 text-4xl font-semibold">404</h2>
      <p>🔎 Error: {message}</p>
    </div>
  );
};

export default NotFound;
