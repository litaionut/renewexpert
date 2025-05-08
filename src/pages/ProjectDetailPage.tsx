
import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import {
  ArrowLeft,
  Calendar,
  CheckCircle,
  Clock,
  Download,
  FileText,
  MessageSquare,
  Upload,
} from 'lucide-react';
import { mockProjects, mockMessages } from '@/data/mock-data';
import { Link } from 'react-router-dom';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const ProjectDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { user, isAuthenticated } = useAuth();
  const [newMessage, setNewMessage] = React.useState('');
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  const project = mockProjects.find(p => p.id === id);
  
  if (!project) {
    return (
      <div className="container py-12 text-center">
        <h1 className="text-2xl font-bold mb-4">Project Not Found</h1>
        <p className="mb-6">The project you're looking for doesn't exist.</p>
        <Button asChild>
          <Link to="/dashboard">Back to Dashboard</Link>
        </Button>
      </div>
    );
  }
  
  // Check if user has access to this project
  const hasAccess =
    user?.role === 'client' && project.clientId === user.id ||
    user?.role === 'expert' && project.expertId === user.id;
  
  if (!hasAccess) {
    return <Navigate to="/dashboard" />;
  }
  
  // Project progress calculation
  let progressPercentage = 0;
  switch (project.status) {
    case 'pending':
      progressPercentage = 10;
      break;
    case 'in-progress':
      progressPercentage = 40;
      break;
    case 'review':
      progressPercentage = 80;
      break;
    case 'completed':
      progressPercentage = 100;
      break;
    case 'cancelled':
      progressPercentage = 100;
      break;
  }

  const getStatusLabel = () => {
    switch (project.status) {
      case 'pending':
        return 'Pending';
      case 'in-progress':
        return 'In Progress';
      case 'review':
        return 'Under Review';
      case 'completed':
        return 'Completed';
      case 'cancelled':
        return 'Cancelled';
      default:
        return project.status;
    }
  };
  
  // Filter messages for this project
  const projectMessages = mockMessages
    .filter(msg => msg.projectId === id)
    .sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
    
  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    
    // In a real app, this would send the message to an API
    console.log('Sending message:', newMessage);
    
    // Clear input
    setNewMessage('');
  };

  return (
    <div className="container py-8">
      <div className="mb-6">
        <Link 
          to="/dashboard"
          className="text-sm inline-flex items-center text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="mr-1 h-4 w-4" /> Back to Dashboard
        </Link>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mt-2">
          <h1 className="text-3xl font-bold mb-2 md:mb-0">{project.title}</h1>
          <div className="flex items-center space-x-3">
            <span 
              className={`px-3 py-1 rounded-full text-sm font-medium capitalize
                ${project.status === 'completed' ? 'bg-green-100 text-green-800' :
                  project.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                  project.status === 'review' ? 'bg-purple-100 text-purple-800' :
                  project.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                  'bg-yellow-100 text-yellow-800'
                }
              `}
            >
              {getStatusLabel()}
            </span>
            
            {/* Show different button based on project status */}
            {project.status === 'completed' ? (
              <Button size="sm" className="gap-1">
                <Download className="h-4 w-4" /> Download Report
              </Button>
            ) : user?.role === 'expert' && project.status === 'in-progress' ? (
              <Button size="sm" className="gap-1">
                <Upload className="h-4 w-4" /> Submit for Review
              </Button>
            ) : user?.role === 'client' && project.status === 'review' ? (
              <Button size="sm" className="gap-1">
                <CheckCircle className="h-4 w-4" /> Approve
              </Button>
            ) : null}
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Tabs defaultValue="overview">
            <TabsList className="mb-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="messages">Messages</TabsTrigger>
              <TabsTrigger value="documents">Documents</TabsTrigger>
              <TabsTrigger value="reports">Reports</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Project Details</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-medium mb-2">Description</h3>
                      <p className="text-muted-foreground">{project.description}</p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h3 className="font-medium mb-1">Project Type</h3>
                        <p className="text-muted-foreground capitalize">{project.type}</p>
                      </div>
                      <div>
                        <h3 className="font-medium mb-1">Location</h3>
                        <p className="text-muted-foreground">{project.location}</p>
                      </div>
                      <div>
                        <h3 className="font-medium mb-1">Start Date</h3>
                        <p className="text-muted-foreground">{project.startDate}</p>
                      </div>
                      <div>
                        <h3 className="font-medium mb-1">Due Date</h3>
                        <p className="text-muted-foreground">{project.dueDate}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Project Timeline</CardTitle>
                  <CardDescription>Current progress and milestones</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    <div className="flex justify-between mb-1 text-sm">
                      <span>Progress</span>
                      <span>{progressPercentage}%</span>
                    </div>
                    <Progress value={progressPercentage} className="h-2" />
                  </div>
                  
                  <div className="space-y-4 mt-6">
                    <div className="relative pl-6 pb-6 border-l border-border">
                      <div className="absolute left-[-8px] top-0 w-4 h-4 rounded-full bg-green-500"></div>
                      <h3 className="font-medium">Project Created</h3>
                      <p className="text-sm text-muted-foreground mb-1">{project.startDate}</p>
                      <p className="text-sm">Project requirements submitted and approved.</p>
                    </div>
                    
                    <div className={`relative pl-6 pb-6 border-l ${project.status === 'pending' ? 'border-muted' : 'border-border'}`}>
                      <div className={`absolute left-[-8px] top-0 w-4 h-4 rounded-full ${project.status !== 'pending' ? 'bg-green-500' : 'bg-muted'}`}></div>
                      <h3 className="font-medium">Expert Assigned</h3>
                      <p className="text-sm text-muted-foreground mb-1">
                        {project.status !== 'pending' ? '2025-04-24' : 'Waiting'}
                      </p>
                      <p className="text-sm">Expert assigned and project work begins.</p>
                    </div>
                    
                    <div className={`relative pl-6 pb-6 border-l ${project.status !== 'in-progress' && project.status !== 'review' && project.status !== 'completed' ? 'border-muted' : 'border-border'}`}>
                      <div className={`absolute left-[-8px] top-0 w-4 h-4 rounded-full ${project.status === 'in-progress' || project.status === 'review' || project.status === 'completed' ? 'bg-green-500' : 'bg-muted'}`}></div>
                      <h3 className="font-medium">Project In Progress</h3>
                      <p className="text-sm text-muted-foreground mb-1">
                        {project.status === 'in-progress' || project.status === 'review' || project.status === 'completed' ? '2025-04-26' : 'Waiting'}
                      </p>
                      <p className="text-sm">Analysis and consultancy work being performed.</p>
                    </div>
                    
                    <div className={`relative pl-6 pb-6 border-l ${project.status !== 'review' && project.status !== 'completed' ? 'border-muted' : 'border-border'}`}>
                      <div className={`absolute left-[-8px] top-0 w-4 h-4 rounded-full ${project.status === 'review' || project.status === 'completed' ? 'bg-green-500' : 'bg-muted'}`}></div>
                      <h3 className="font-medium">Review Phase</h3>
                      <p className="text-sm text-muted-foreground mb-1">
                        {project.status === 'review' || project.status === 'completed' ? '2025-05-10' : 'Waiting'}
                      </p>
                      <p className="text-sm">Draft report submitted for client review.</p>
                    </div>
                    
                    <div className={`relative pl-6 ${project.status !== 'completed' ? 'border-muted' : 'border-border'}`}>
                      <div className={`absolute left-[-8px] top-0 w-4 h-4 rounded-full ${project.status === 'completed' ? 'bg-green-500' : 'bg-muted'}`}></div>
                      <h3 className="font-medium">Project Completed</h3>
                      <p className="text-sm text-muted-foreground mb-1">
                        {project.status === 'completed' ? project.completedDate : 'Waiting'}
                      </p>
                      <p className="text-sm">Final report delivered and project closed.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="messages">
              <Card>
                <CardHeader>
                  <CardTitle>Messages</CardTitle>
                  <CardDescription>Communication history for this project</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6 mb-6">
                    {projectMessages.length > 0 ? (
                      projectMessages.map((message, index) => (
                        <div key={index} className={`flex ${message.senderId === user?.id ? 'justify-end' : 'justify-start'}`}>
                          <div className={`max-w-[80%] ${message.senderId === user?.id ? 'bg-brand-teal text-white' : 'bg-gray-100'} rounded-lg p-4`}>
                            <div className="flex items-center gap-2 mb-2">
                              <Avatar className="h-6 w-6">
                                <AvatarFallback>
                                  {message.senderName.charAt(0)}
                                </AvatarFallback>
                              </Avatar>
                              <span className={`text-sm font-medium ${message.senderId === user?.id ? 'text-white' : 'text-gray-700'}`}>
                                {message.senderName}
                              </span>
                              <span className={`text-xs ${message.senderId === user?.id ? 'text-white/70' : 'text-gray-500'}`}>
                                {message.timestamp}
                              </span>
                            </div>
                            <p className="text-sm">{message.content}</p>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center p-6 text-muted-foreground">
                        <MessageSquare className="h-12 w-12 mx-auto mb-2 opacity-20" />
                        <p>No messages yet. Start the conversation!</p>
                      </div>
                    )}
                  </div>
                  
                  <Separator className="my-4" />
                  
                  <div className="flex gap-2">
                    <Textarea 
                      placeholder="Type your message here..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      className="flex-1"
                    />
                    <Button onClick={handleSendMessage}>Send</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="documents">
              <Card>
                <CardHeader>
                  <CardTitle>Documents</CardTitle>
                  <CardDescription>Project-related documents and files</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="font-medium">Uploaded Documents</h3>
                      <Button variant="outline" size="sm">
                        <Upload className="h-4 w-4 mr-2" /> Upload Document
                      </Button>
                    </div>
                    
                    <div className="border rounded-md">
                      <div className="p-4 hover:bg-muted/50 flex items-center justify-between">
                        <div className="flex items-center">
                          <FileText className="h-5 w-5 text-muted-foreground mr-2" />
                          <div>
                            <p className="font-medium">Project Requirements.pdf</p>
                            <p className="text-xs text-muted-foreground">Uploaded on {project.startDate}</p>
                          </div>
                        </div>
                        <Button variant="ghost" size="icon">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                      
                      <Separator />
                      
                      <div className="p-4 hover:bg-muted/50 flex items-center justify-between">
                        <div className="flex items-center">
                          <FileText className="h-5 w-5 text-muted-foreground mr-2" />
                          <div>
                            <p className="font-medium">Site Photos.zip</p>
                            <p className="text-xs text-muted-foreground">Uploaded on {project.startDate}</p>
                          </div>
                        </div>
                        <Button variant="ghost" size="icon">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                      
                      {project.status !== 'pending' && (
                        <>
                          <Separator />
                          <div className="p-4 hover:bg-muted/50 flex items-center justify-between">
                            <div className="flex items-center">
                              <FileText className="h-5 w-5 text-muted-foreground mr-2" />
                              <div>
                                <p className="font-medium">Initial Assessment.pdf</p>
                                <p className="text-xs text-muted-foreground">Uploaded on 2025-04-27</p>
                              </div>
                            </div>
                            <Button variant="ghost" size="icon">
                              <Download className="h-4 w-4" />
                            </Button>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="reports">
              <Card>
                <CardHeader>
                  <CardTitle>Reports</CardTitle>
                  <CardDescription>Project reports and deliverables</CardDescription>
                </CardHeader>
                <CardContent>
                  {project.status === 'review' || project.status === 'completed' ? (
                    <div className="space-y-4">
                      <div className="border rounded-md">
                        <div className="p-4 hover:bg-muted/50 flex items-center justify-between">
                          <div className="flex items-center">
                            <FileText className="h-5 w-5 text-muted-foreground mr-2" />
                            <div>
                              <p className="font-medium">Draft Report v1.pdf</p>
                              <p className="text-xs text-muted-foreground">Uploaded on 2025-05-10</p>
                            </div>
                          </div>
                          <Button variant="ghost" size="icon">
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>
                        
                        {project.status === 'completed' && (
                          <>
                            <Separator />
                            <div className="p-4 hover:bg-muted/50 flex items-center justify-between">
                              <div className="flex items-center">
                                <FileText className="h-5 w-5 text-muted-foreground mr-2" />
                                <div>
                                  <p className="font-medium">Final Report.pdf</p>
                                  <p className="text-xs text-muted-foreground">Uploaded on {project.completedDate}</p>
                                </div>
                              </div>
                              <Button variant="ghost" size="icon">
                                <Download className="h-4 w-4" />
                              </Button>
                            </div>
                            
                            <Separator />
                            <div className="p-4 hover:bg-muted/50 flex items-center justify-between">
                              <div className="flex items-center">
                                <FileText className="h-5 w-5 text-muted-foreground mr-2" />
                                <div>
                                  <p className="font-medium">Technical Appendices.pdf</p>
                                  <p className="text-xs text-muted-foreground">Uploaded on {project.completedDate}</p>
                                </div>
                              </div>
                              <Button variant="ghost" size="icon">
                                <Download className="h-4 w-4" />
                              </Button>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="text-center p-8 text-muted-foreground">
                      <FileText className="h-12 w-12 mx-auto mb-2 opacity-20" />
                      <p className="mb-2">No reports available yet</p>
                      <p className="text-sm">Reports will be uploaded when the project reaches the review phase.</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
        
        <div>
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Project Info</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <span className="text-sm text-muted-foreground">Client</span>
                    <p className="font-medium">ABC Renewables Ltd.</p>
                  </div>
                  
                  {user?.role === 'client' && (
                    <div>
                      <span className="text-sm text-muted-foreground">Expert</span>
                      <div className="flex items-center mt-1">
                        <Avatar className="h-6 w-6 mr-2">
                          <AvatarFallback>JE</AvatarFallback>
                        </Avatar>
                        <span>Jane Expert</span>
                      </div>
                    </div>
                  )}
                  
                  <div>
                    <span className="text-sm text-muted-foreground">Service Type</span>
                    <p className="font-medium">
                      {project.type === 'wind' ? 'Wind Energy Consultancy' : 
                       project.type === 'solar' ? 'Solar Energy Consultancy' : 
                       'Renewable Energy Consultancy'}
                    </p>
                  </div>
                  
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                    <div>
                      <span className="text-sm text-muted-foreground">Due Date</span>
                      <p className="font-medium">{project.dueDate}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                    <div>
                      <span className="text-sm text-muted-foreground">Time Remaining</span>
                      <p className="font-medium">
                        {project.status === 'completed' ? 'Completed' : '14 days'}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {project.status !== 'pending' && (
              <Card>
                <CardHeader>
                  <CardTitle>Quote Details</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <span className="text-sm text-muted-foreground">Quote #</span>
                      <p className="font-medium">Q-2023-{id}</p>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Base fee</span>
                        <span>$4,800.00</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Additional services</span>
                        <span>$1,200.00</span>
                      </div>
                      <Separator className="my-2" />
                      <div className="flex justify-between font-medium">
                        <span>Total</span>
                        <span>$6,000.00</span>
                      </div>
                    </div>
                    
                    <div>
                      <span className="text-sm text-muted-foreground">Payment Status</span>
                      <p className="font-medium text-green-600">Paid</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailPage;
