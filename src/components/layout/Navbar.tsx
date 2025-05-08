
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Logo from '@/components/logo/Logo';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup,
} from '@/components/ui/dropdown-menu';
import { LogOut, User, LayoutDashboard, Users, FileText, List } from 'lucide-react';

const Navbar: React.FC = () => {
  const { user, logout, isAuthenticated, isAdmin } = useAuth();

  return (
    <header className="w-full border-b border-gray-200 bg-white">
      <div className="container max-w-5xl mx-auto">
        <div className="py-6 text-center">
          <Logo size="lg" />
          <p className="text-xs uppercase tracking-widest text-gray-500 mt-2">
            Renewable Energy Consultancy
          </p>
        </div>
        
        <div className="flex justify-center border-t border-gray-200">
          <nav className="flex items-center justify-center">
            <Link to="/" className="px-6 py-4 text-sm text-gray-800 hover:text-gray-600 transition-colors">
              Home
            </Link>
            <Link to="/services" className="px-6 py-4 text-sm text-gray-800 hover:text-gray-600 transition-colors">
              Services
            </Link>
            <Link to="/about" className="px-6 py-4 text-sm text-gray-800 hover:text-gray-600 transition-colors">
              About Us
            </Link>
            <Link to="/contact" className="px-6 py-4 text-sm text-gray-800 hover:text-gray-600 transition-colors">
              Contact
            </Link>
            
            {isAuthenticated ? (
              <>
                <Link to="/dashboard" className="px-6 py-4 text-sm text-gray-800 hover:text-gray-600 transition-colors">
                  Dashboard
                </Link>
                <div className="ml-4 pl-4 border-l border-gray-200">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 rounded-full p-0">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={undefined} />
                          <AvatarFallback className="text-xs">{user?.profile?.name?.charAt(0) || 'U'}</AvatarFallback>
                        </Avatar>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56">
                      <DropdownMenuLabel>
                        <div className="font-normal">{user?.profile?.name || 'User'}</div>
                        <div className="text-xs text-gray-500">{user?.email || 'user@example.com'}</div>
                      </DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <Link to="/profile" className="cursor-pointer flex items-center">
                          <User className="h-4 w-4 mr-2" />
                          Profile
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link to="/dashboard" className="cursor-pointer flex items-center">
                          <LayoutDashboard className="h-4 w-4 mr-2" />
                          My Dashboard
                        </Link>
                      </DropdownMenuItem>
                      {isAdmin && (
                        <>
                          <DropdownMenuSeparator />
                          <DropdownMenuLabel className="font-normal text-xs text-gray-500">
                            Admin Functions
                          </DropdownMenuLabel>
                          <DropdownMenuGroup>
                            <DropdownMenuItem asChild>
                              <Link to="/admin" className="cursor-pointer flex items-center">
                                <LayoutDashboard className="h-4 w-4 mr-2" />
                                Admin Dashboard
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                              <Link to="/admin/users" className="cursor-pointer flex items-center">
                                <Users className="h-4 w-4 mr-2" />
                                Manage Users
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                              <Link to="/admin/requests" className="cursor-pointer flex items-center">
                                <FileText className="h-4 w-4 mr-2" />
                                Service Requests
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                              <Link to="/admin/projects" className="cursor-pointer flex items-center">
                                <List className="h-4 w-4 mr-2" />
                                Projects
                              </Link>
                            </DropdownMenuItem>
                          </DropdownMenuGroup>
                        </>
                      )}
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={logout} className="cursor-pointer">
                        <LogOut className="h-4 w-4 mr-2" />
                        Logout
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </>
            ) : (
              <div className="ml-4 pl-4 border-l border-gray-200 flex items-center">
                <Button variant="ghost" className="text-sm" asChild>
                  <Link to="/login">Sign in</Link>
                </Button>
                <Button variant="outline" className="ml-2 text-sm border-gray-400 rounded-none" asChild>
                  <Link to="/register">Register</Link>
                </Button>
              </div>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
