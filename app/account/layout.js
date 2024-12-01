import SideNavigation from "../_components/SideNavigation";

function AccountLayout({ children }) {
  return (
    <div className="flex gap-4 h-full">
      <SideNavigation className="flex-1" />
      {children}
    </div>
  );
}

export default AccountLayout;
