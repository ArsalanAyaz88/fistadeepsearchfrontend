import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { 
  Search, 
  Plus, 
  MessageSquare, 
  Settings, 
  LogOut, 
  ChevronLeft,
  Clock,
  Trash2
} from "lucide-react";
import { Link } from "react-router-dom";
import fishLogo from "@/assets/fish-logo.png";

interface ChatHistory {
  id: string;
  title: string;
  timestamp: string;
  preview: string;
}

interface ChatSidebarProps {
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

const ChatSidebar = ({ isCollapsed, onToggleCollapse }: ChatSidebarProps) => {
  const [chatHistory] = useState<ChatHistory[]>([
    {
      id: "1",
      title: "AI Research Methods",
      timestamp: "2 hours ago",
      preview: "What are the latest developments in machine learning?"
    },
    {
      id: "2", 
      title: "Climate Change Data",
      timestamp: "1 day ago",
      preview: "Show me climate change statistics for the last decade"
    },
    {
      id: "3",
      title: "Space Exploration",
      timestamp: "3 days ago", 
      preview: "Recent discoveries in space exploration"
    },
    {
      id: "4",
      title: "Programming Best Practices",
      timestamp: "1 week ago",
      preview: "What are the best practices for React development?"
    }
  ]);

  return (
    <div className={`bg-card/50 backdrop-blur-sm border-r border-border flex flex-col transition-all duration-300 ${
      isCollapsed ? 'w-16' : 'w-80'
    }`}>
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <Link to="/" className="flex items-center space-x-2">
              <img src={fishLogo} alt="Fista Logo" className="w-8 h-8" />
              <span className="text-lg font-bold bg-gradient-primary bg-clip-text text-transparent">
                Fista
              </span>
            </Link>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggleCollapse}
            className="hover:bg-muted/50"
          >
            <ChevronLeft className={`w-4 h-4 transition-transform ${isCollapsed ? 'rotate-180' : ''}`} />
          </Button>
        </div>
      </div>

      {/* New Chat Button */}
      <div className="p-4">
        <Button 
          className={`bg-gradient-primary border-0 shadow-primary hover:shadow-glow transition-all duration-300 ${
            isCollapsed ? 'w-8 h-8 p-0' : 'w-full'
          }`}
        >
          <Plus className="w-4 h-4" />
          {!isCollapsed && <span className="ml-2">New Chat</span>}
        </Button>
      </div>

      {/* Chat History */}
      <div className="flex-1 overflow-hidden">
        {!isCollapsed && (
          <div className="px-4 pb-2">
            <h3 className="text-sm font-medium text-muted-foreground flex items-center">
              <Clock className="w-4 h-4 mr-2" />
              Recent Chats
            </h3>
          </div>
        )}
        <ScrollArea className="flex-1 px-2">
          <div className="space-y-1">
            {chatHistory.map((chat) => (
              <div
                key={chat.id}
                className={`group relative rounded-lg hover:bg-muted/50 transition-colors cursor-pointer ${
                  isCollapsed ? 'p-2' : 'p-3'
                }`}
              >
                <div className="flex items-start space-x-3">
                  <MessageSquare className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-0.5" />
                  {!isCollapsed && (
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{chat.title}</p>
                      <p className="text-xs text-muted-foreground truncate">{chat.preview}</p>
                      <p className="text-xs text-muted-foreground mt-1">{chat.timestamp}</p>
                    </div>
                  )}
                </div>
                {!isCollapsed && (
                  <button className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Trash2 className="w-3 h-3 text-muted-foreground hover:text-destructive" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Settings and Logout */}
      <div className="p-4 border-t border-border">
        <div className="space-y-2">
          <Button 
            variant="ghost" 
            size="sm" 
            className={`hover:bg-muted/50 ${isCollapsed ? 'w-8 h-8 p-0' : 'w-full justify-start'}`}
          >
            <Settings className="w-4 h-4" />
            {!isCollapsed && <span className="ml-2">Settings</span>}
          </Button>
          <Separator />
          <Button 
            variant="ghost" 
            size="sm" 
            className={`hover:bg-muted/50 text-destructive hover:text-destructive ${
              isCollapsed ? 'w-8 h-8 p-0' : 'w-full justify-start'
            }`}
          >
            <LogOut className="w-4 h-4" />
            {!isCollapsed && <span className="ml-2">Logout</span>}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatSidebar;