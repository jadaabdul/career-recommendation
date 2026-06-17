import Sidebar from "../components/Sidebar";

function AdminLayout({ children }) {
  return (
    <div
      className="d-flex"
      style={{
        minHeight: "100vh",
        backgroundColor: "#f5f7fb",
      }}
    >
      <Sidebar />

      <div
        className="p-4"
        style={{
          flex: 1,
          overflowX: "auto",
        }}
      >
        <div
          className="bg-white shadow-sm rounded p-4"
          style={{
            minHeight: "90vh",
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

export default AdminLayout;
