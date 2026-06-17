import Sidebar from "../components/Sidebar";

function AdminLayout({ children }) {
  return (
    <div className="d-flex">
      <Sidebar />

      <div
        className="p-4"
        style={{
          width: "100%",
        }}
      >
        {children}
      </div>
    </div>
  );
}

export default AdminLayout;
