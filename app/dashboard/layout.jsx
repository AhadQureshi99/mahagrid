import Sidebar from "../components/Sidebar";

export default function RootLayout({ children }) {
  return (
    <>
      <div className="flex  gap-5 w-full items-center">
        <Sidebar />
        <div
          className="flex flex-col self-start w-full"
        >
          {children}
        </div>
      </div>
    </>
  );
}
