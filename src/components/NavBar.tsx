import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";

type NavBarProp = {
  setUser: (Status: string) => void;
};

const NavBar = ({ setUser }: NavBarProp) => {
  const navigate = useNavigate();
  const logout = () => {
    const confirmLogout = confirm("Confirm Logout?");

    if (confirmLogout) {
      document.cookie = "accessToken=; path=/;";
      navigate("/login");
      setUser("");
    }
  };
  return (
    <Sidebar className="p-3">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Rehab Center</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <Link to={"/"}>
                  <SidebarMenuButton>Dashboard</SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <Link to={"/patient"}>
                  <SidebarMenuButton>Patient Management</SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <Link to={"/reports"}>
                  <SidebarMenuButton>Report</SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <Button variant="outline" onClick={logout}>
            Logout
          </Button>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};

export default NavBar;
