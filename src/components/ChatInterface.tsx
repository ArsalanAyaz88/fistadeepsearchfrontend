import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";
import { 
  Send, 
  Mic, 
  MicOff, 
  Paperclip, 
  MoreHorizontal,
  Copy,
  ThumbsUp,
  ThumbsDown,
  RefreshCw
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface Message {
  id: string;
  role: 'user' | 'agent';
  content: string;
  timestamp: Date;
  isTyping?: boolean;
}

const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "agent",
      content: "Hello! I'm Fista, your AI Search Agent. I can help you find comprehensive information on any topic using advanced AI-powered search capabilities. What would you like to explore today?",
      timestamp: new Date(),
    }
  ]);
  const [input, setInput] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const agentMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "agent",
        content: `I understand you're asking about "${input}". Let me search through comprehensive databases and provide you with detailed insights on this topic. Here's what I found:\n\nThis is a simulated response demonstrating the deep search capabilities. In a real implementation, this would connect to actual search APIs and AI models to provide comprehensive, accurate information based on your query.`,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, agentMessage]);
      setIsLoading(false);
    }, 2000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    // In a real implementation, this would start/stop voice recording
    if (!isRecording) {
      // Start recording
      console.log("Starting voice recording...");
    } else {
      // Stop recording and process
      console.log("Stopping voice recording...");
    }
  };

  const MessageBubble = ({ message }: { message: Message }) => (
    <div className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
      {message.role === 'agent' && (
        <Avatar className="w-8 h-8 bg-gradient-primary">
          <AvatarFallback className="bg-gradient-primary text-white text-sm">AI</AvatarFallback>
        </Avatar>
      )}
      <Card className={`max-w-[80%] p-4 ${
        message.role === 'user' 
          ? 'bg-user-bg text-white' 
          : 'bg-agent-bg border-border'
      }`}>
        <div className="prose prose-sm max-w-none text-current">
          <p className="whitespace-pre-wrap m-0">{message.content}</p>
        </div>
        <div className="flex items-center justify-between mt-3 pt-2 border-t border-border/20">
          <span className="text-xs opacity-70">
            {message.timestamp.toLocaleTimeString()}
          </span>
          {message.role === 'agent' && (
            <div className="flex items-center gap-1">
              <Button variant="ghost" size="sm" className="h-6 w-6 p-0 hover:bg-muted/20">
                <Copy className="w-3 h-3" />
              </Button>
              <Button variant="ghost" size="sm" className="h-6 w-6 p-0 hover:bg-muted/20">
                <ThumbsUp className="w-3 h-3" />
              </Button>
              <Button variant="ghost" size="sm" className="h-6 w-6 p-0 hover:bg-muted/20">
                <ThumbsDown className="w-3 h-3" />
              </Button>
              <Button variant="ghost" size="sm" className="h-6 w-6 p-0 hover:bg-muted/20">
                <RefreshCw className="w-3 h-3" />
              </Button>
            </div>
          )}
        </div>
      </Card>
      {message.role === 'user' && (
        <Avatar className="w-8 h-8 bg-muted">
          <AvatarFallback className="bg-muted text-muted-foreground text-sm">U</AvatarFallback>
        </Avatar>
      )}
    </div>
  );

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Chat Header */}
      <div className="border-b border-border p-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold">Fista AI Agent</h1>
            <p className="text-sm text-muted-foreground">AI-powered comprehensive search</p>
          </div>
          <Button variant="ghost" size="sm">
            <MoreHorizontal className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4 pb-4">
          {messages.map((message) => (
            <MessageBubble key={message.id} message={message} />
          ))}
          {isLoading && (
            <div className="flex gap-3 justify-start">
              <Avatar className="w-8 h-8 bg-gradient-primary">
                <AvatarFallback className="bg-gradient-primary text-white text-sm">AI</AvatarFallback>
              </Avatar>
              <Card className="bg-agent-bg border-border p-4">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                  <span className="text-sm text-muted-foreground">Searching...</span>
                </div>
              </Card>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>

      {/* Input Area */}
      <div className="border-t border-border p-4">
        <div className="flex items-end gap-2">
          <Button
            variant="ghost"
            size="sm"
            className="hover:bg-muted/50"
          >
            <Paperclip className="w-4 h-4" />
          </Button>
          <div className="flex-1 relative">
            <Input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask me anything..."
              className="bg-muted/50 border-border focus:ring-primary pr-12 resize-none min-h-[40px]"
              disabled={isLoading}
            />
          </div>
          <Button
            onClick={toggleRecording}
            variant="ghost"
            size="sm"
            className={`hover:bg-muted/50 ${isRecording ? 'text-destructive' : ''}`}
          >
            {isRecording ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
          </Button>
          <Button
            onClick={handleSendMessage}
            disabled={!input.trim() || isLoading}
            className="bg-gradient-primary border-0 shadow-primary hover:shadow-glow transition-all duration-300"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
        <div className="flex items-center justify-center mt-2">
          <p className="text-xs text-muted-foreground">
            Press Enter to send, Shift + Enter for new line
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;