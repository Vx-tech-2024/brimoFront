import { NavLink } from "react-router-dom";

export default function Sidebar() {
  const links = [
    { name: "Dashboard", path: "/" },
    { name: "Team Members", path: "/team-members" },
    { name: "Loans", path: "/loans" },
    { name: "Agent Targets", path: "/target" },
    { name: "Performance", path: "/performance" },
    { name: "Reports", path: "/reports" },
    { name: "Daily Activity", path: "/daily-activity" },
  ];

  return (
    <aside className="hidden md:flex w-56 flex-col border-r border-border bg-white p-4">
      <h2 className="mb-8 text-xl font-bold">Brimo</h2>

      <nav className="flex flex-col gap-2">
        {links.map((link) => (
          <NavLink
            key={link.name}
            to={link.path}
            className={({ isActive }) =>
              `rounded-md px-3 py-2 text-sm font-medium transition ${
                isActive
                  ? "bg-blue-50 text-blue-600"
                  : "text-slate-600 hover:bg-slate-100"
              }`
            }
          >
            {link.name}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}