const navigation = [
  { name: "Dashboard", href: "#", current: true },
  { name: "Create Group", href: "./task", current: false },
  { name: "Join Group", href: "./Join", current: false },
  { name: "Profile Settings", href: "#", current: false },
  { name: "Refer To Others", href: "#", current: false },
  { name: "Logout", href: "#", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Sidebar() {
  return (
    <div>
      <div className="flex flex-grow flex-col overflow-y-auto border-r border-gray-200 bg-white pt-5 pb-4">
        <div className="flex flex-shrink-0 items-center space-y-5 px-4">
          <img
            className="h-8 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
          />
        </div>
        <div className="mt-5 flex flex-grow flex-col">
          <nav className="flex-1 space-y-1 bg-white" aria-label="Sidebar">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={classNames(
                  item.current
                    ? "bg-indigo-50 border-indigo-600 text-indigo-600"
                    : "border-transparent text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                  "group flex items-center px-3 py-2 text-sm font-medium border-l-4"
                )}
              >
                {item.name}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}
