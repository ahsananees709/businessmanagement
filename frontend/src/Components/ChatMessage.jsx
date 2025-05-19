import { useState, useEffect, useRef } from "react"; // Added useRef
import {
  Box,
  Typography,
  Avatar,
  TextField,
  IconButton,
  Stack,
  List,
  ListItem,
  ListItemText,
  Badge,
  Chip,
} from "@mui/material";
import {
  Send as SendIcon,
  Visibility as VisibilityIcon,
  Mic as MicIcon,
  ArrowForward as ArrowForwardIcon,
  AttachFile as AttachFileIcon,
} from "@mui/icons-material";
import Sidebar from "./Sidebar";
import { useLocation, useParams } from "react-router-dom";

// Load initial messages from localStorage or use default
const loadInitialMessages = () => {
  const storedMessages = localStorage.getItem("chatMessages");
  return storedMessages
    ? JSON.parse(storedMessages)
    : {
        "Pixel Bits": [
          {
            id: 1,
            user: "Sarah A.",
            avatarInitial: "SA",
            avatarColor: "#FF6F61",
            message:
              "Hey! I need to update the wireframes for the CRM module today.",
            timestamp: "Today, 09:20 AM",
            isCurrentUser: false,
          },
          {
            id: 2,
            user: "Ali (Team Lead)",
            avatarInitial: "AA",
            avatarColor: "#FFAB40",
            message:
              "Working on it, Sarah - do you want separate pages for the Orders and Khata, or a combined view?",
            timestamp: "Today, 09:22 AM",
            isCurrentUser: false,
          },
          {
            id: 3,
            user: "Awais (Developer 💻)",
            avatarInitial: "AW",
            avatarColor: "#FFD740",
            message:
              "Here's the updated dashboard wireframe for review. Let me know if you need any changes! (Dashboard_v2.png) 22 KB",
            timestamp: "Today, 09:24 AM",
            isCurrentUser: true,
          },
        ],
        "Zaka Dairy Farm": [],
        "Community Solutions": [],
        Developer: [],
        Awais: [],
        Ali: [],
        Hassam: [],
        Hamza: [],
        Admin: [],
      };
};

// Load notifications from localStorage
const loadNotifications = () => {
  const storedNotifications = localStorage.getItem("notifications");
  return storedNotifications ? JSON.parse(storedNotifications) : [];
};

// Sample data for Teams
const teamsList = ["Super-Admin", "Admin", "Teams"];

// Sample data for Inbox: Groups
const groupChats = [
  {
    name: "Zaka Dairy Farm",
    badgeCount: 4,
    avatar:
      "https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixlib=rb-4.0.3&auto=format&fit=crop&w=40&h=40&q=80",
  },
  {
    name: "Pixel Bits",
    badgeCount: 0,
    avatar:
      "https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?ixlib=rb-4.0.3&auto=format&fit=crop&w=40&h=40&q=80",
    selected: true,
  },
  {
    name: "Community Solutions",
    badgeCount: 0,
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=40&h=40&q=80",
  },
  {
    name: "Developer",
    badgeCount: 1,
    avatar:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&auto=format&fit=crop&w=40&h=40&q=80",
  },
];

// Sample data for Inbox: Direct Messages (Users) with status
const directMessageUsers = [
  {
    name: "Awais",
    badgeCount: 0,
    avatar:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&auto=format&fit=crop&w=40&h=40&q=80",
    status: "Working on it now. @Sarah...",
  },
];
// Sample data for Admin: Single Admin User with status
const adminUsers = [
  {
    name: "Johnson",
    badgeCount: 0,
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=40&h=40&q=80",
    status: "Available for queries.",
  },
];

const ChatMessage = () => {
  const [messages, setMessages] = useState(loadInitialMessages()["Pixel Bits"]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedUser, setSelectedUser] = useState("Pixel Bits");
  const [selectedTeam, setSelectedTeam] = useState("Teams");
  const [inboxItems, setInboxItems] = useState(groupChats);
  const [notifications, setNotifications] = useState(loadNotifications());
  const messagesEndRef = useRef(null);
  const { businessId } = useParams();
  const location = useLocation();
  const userRole = location.state?.userRole; // Create a ref for the message list

  // Typing indicator effect
  useEffect(() => {
    let timeout;
    if (inputValue.length > 0) {
      setIsTyping(true);
      timeout = setTimeout(() => setIsTyping(false), 2000);
    }
    return () => clearTimeout(timeout);
  }, [inputValue]);

  // Save messages to localStorage whenever they change
  useEffect(() => {
    const allMessages = loadInitialMessages();
    allMessages[selectedUser] = messages;
    localStorage.setItem("chatMessages", JSON.stringify(allMessages));
  }, [messages, selectedUser]);

  // Save notifications to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("notifications", JSON.stringify(notifications));
  }, [notifications]);

  // Scroll to the bottom whenever messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollTo({
        top: messagesEndRef.current.scrollHeight,
        behavior: "smooth", // Smooth scrolling for better UX
      });
    }
  }, [messages, isTyping]); // Trigger on messages or typing indicator change

  // Handle sending a message or file
  const handleSendMessage = () => {
    if (inputValue.trim() === "" && !selectedFile) return;

    const currentDate = new Date();
    const timestamp = currentDate.toISOString();
    let messageContent = inputValue;
    let fileUrl = null;

    if (selectedFile) {
      fileUrl = URL.createObjectURL(selectedFile);
      messageContent = inputValue
        ? `${inputValue} (${selectedFile.name})`
        : `(${selectedFile.name})`;
    }

    const newMessage = {
      id: messages.length + 1,
      user: "Awais (Developer 💻)",
      avatarInitial: "AW",
      avatarColor: "#FFD740",
      message: messageContent,
      fileUrl: fileUrl,
      timestamp: `${currentDate.toLocaleDateString("en-US", {
        weekday: "long",
      })}, ${currentDate.toLocaleString("en-US", {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      })}`,
      isCurrentUser: true,
    };

    setMessages((prevMessages) => [...prevMessages, newMessage]);

    // Add notification
    const avatar =
      inboxItems.find((item) => item.name === selectedUser)?.avatar || "";
    setNotifications((prev) => [
      ...prev,
      {
        chatName: selectedUser,
        type: selectedTeam,
        action: `Awais (Developer) sent a message`,
        message: messageContent,
        sender: "Awais (Developer)",
        avatar,
        timestamp,
      },
    ]);

    setInputValue("");
    setSelectedFile(null);
    setIsTyping(false);
  };

  // Handle Enter key press
  const handleKeyPress = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSendMessage();
    }
  };

  // Handle file selection
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  // Handle user/group selection in Inbox
  const handleUserClick = (userName) => {
    setSelectedUser(userName);
    const allMessages = loadInitialMessages();
    setMessages(allMessages[userName] || []);
    console.log(`Opening chat for: ${userName}`);
  };

  // Handle team item selection
  // const handleTeamClick = (teamName) => {
  //   setSelectedTeam(teamName);
  //   if (teamName === "Super-Admin") {
  //     setInboxItems(directMessageUsers);
  //     setSelectedUser("Awais");
  //     setMessages(loadInitialMessages()["Awais"] || []);
  //   } else {
  //     setInboxItems(groupChats);
  //     setSelectedUser("Pixel Bits");
  //     setMessages(loadInitialMessages()["Pixel Bits"] || []);
  //   }
  //   console.log(`Selected team: ${teamName}`);
  // };

  const handleTeamClick = (teamName) => {
  setSelectedTeam(teamName);
  if (teamName === "Super-Admin") {
    setInboxItems(directMessageUsers);
    setSelectedUser("Awais");
    setMessages(loadInitialMessages()["Awais"] || []);
  } else if (teamName === "Admin") {
    setInboxItems(adminUsers);
    setSelectedUser("Admin");
    setMessages(loadInitialMessages()["Admin"] || []);
  } else {
    setInboxItems(groupChats);
    setSelectedUser("Pixel Bits");
    setMessages(loadInitialMessages()["Pixel Bits"] || []);
  }
  console.log(`Selected team: ${teamName}`);
};

  // Handle notification click
  // const handleNotificationClick = (chatName, teamType) => {
  //   setSelectedTeam(teamType);
  //   setSelectedUser(chatName);
  //   if (teamType === "Super-Admin") {
  //     setInboxItems(directMessageUsers);
  //   } else {
  //     setInboxItems(groupChats);
  //   }
  //   const allMessages = loadInitialMessages();
  //   setMessages(allMessages[chatName] || []);
  //   setNotifications((prev) =>
  //     prev.filter(
  //       (notif) => notif.chatName !== chatName || notif.type !== teamType
  //     )
  //   );
  // };

  const handleNotificationClick = (chatName, teamType) => {
  setSelectedTeam(teamType);
  setSelectedUser(chatName);
  if (teamType === "Super-Admin") {
    setInboxItems(directMessageUsers);
  } else if (teamType === "Admin") {
    setInboxItems(adminUsers);
  } else {
    setInboxItems(groupChats);
  }
  const allMessages = loadInitialMessages();
  setMessages(allMessages[chatName] || []);
  setNotifications((prev) =>
    prev.filter(
      (notif) => notif.chatName !== chatName || notif.type !== teamType
    )
  );
};
  // Get the avatar URL for the selected user/group
  const selectedUserAvatar =
    inboxItems.find((item) => item.name === selectedUser)?.avatar || "";

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        height: "100vh",
        width: "100vw",
        overflow: "hidden",
        backgroundColor: "#F5F7FA",
        boxSizing: "border-box",
      }}
    >
      {/* Sidebar */}
      <Sidebar
        userRole={userRole}
        businessId={businessId}
        sx={{ display: { xs: "none", md: "block" } }}
        notifications={notifications}
        onNotificationClick={handleNotificationClick}
      />

      {/* Main Content Container */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          width: "100%",
          marginLeft: { xs: "0px", md: "100px" },
          marginTop: { xs: "60px", md: "80px" },
          padding: { xs: "10px", sm: "20px", md: "10px" },
        }}
      >
        {/* Chat Heading */}
        <Box sx={{ px: 2, py: 1 }}>
          <Typography
            variant="h1"
            sx={{
              color: "black",
              fontSize: { xs: "1.5rem", md: "2rem" },
              fontWeight: "bold",
            }}
          >
            Chat
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: "#B0BEC5",
              mt: 0.5,
              fontSize: { xs: "0.8rem", md: "0.875rem" },
            }}
          >
            Home / Chat
          </Typography>
        </Box>
        <Typography
          variant="subtitle1"
          sx={{
            px: 2,
            py: 1.5,
            width: "97.3%",
            fontWeight: "bold",
            fontSize: { xs: "1rem", md: "1.1rem" },
            color: "black",
            backgroundColor: "white",
            borderRadius: "8px",
            border: "1px solid #E1DDDD",
          }}
        >
          Inbox
        </Typography>

        {/* Main Content */}
        <Box
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            overflow: "hidden",
            height: { xs: "auto", md: "calc(100vh - 260px)" },
          }}
        >
          {/* Teams Column */}
          <Box
            sx={{
              width: { xs: "100%", md: "250px" },
              borderRight: { md: "1px solid #E0E0E0" },
              backgroundColor: "white",
              borderRadius: "8px",
              mr: { md: 1 },
              height: { xs: "auto", md: "100%" },
              border: "1px solid #E1DDDD",
              flexShrink: 0,
              flexGrow: 0,
              mb: { xs: 2, md: 0 },
            }}
          >
            <List sx={{ px: 0 }}>
              {teamsList.map((team) => (
                <ListItem
                  key={team}
                  onClick={() => handleTeamClick(team)}
                  sx={{
                    px: 2,
                    py: 1,
                    borderRadius: "24px",
                    bgcolor: selectedTeam === team ? "#8BD4E7" : "white",
                    "&:hover": {
                      bgcolor: selectedTeam === team ? "#8BD4E7" : "#F5F7FA",
                      cursor: "pointer",
                    },
                  }}
                >
                  <ListItemText
                    primary={team}
                    primaryTypographyProps={{ fontSize: "0.9rem" }}
                  />
                </ListItem>
              ))}
            </List>
          </Box>

          {/* Inbox Column */}
          <Box
            sx={{
              width: { xs: "100%", md: "300px" },
              border: "1px solid #E0E0E0",
              backgroundColor: "white",
              borderRadius: "8px",
              mr: { md: 1 },
              height: { xs: "auto", md: "100%" },
              flexShrink: 0,
              flexGrow: 0,
              mb: { xs: 2, md: 0 },
            }}
          >
            <List sx={{ px: 1 }}>
              {inboxItems.map((item, index) => (
                <ListItem
                  key={index}
                  onClick={() => handleUserClick(item.name)}
                  sx={{
                    mt: 2,
                    px: 1,
                    py: 1,
                    mb: 1,
                    border: "1px solid #E0E0E0",
                    borderRadius: "8px",
                    bgcolor: item.name === selectedUser ? "#8BD4E7" : "white",
                    "&:hover": {
                      bgcolor:
                        item.name === selectedUser ? "#8BD4E7" : "#F5F7FA",
                      cursor: "pointer",
                    },
                    transition: "background-color 0.2s",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Avatar
                    src={item.avatar}
                    sx={{ width: 36, height: 36, mr: 1 }}
                  />
                  <Box sx={{ flexGrow: 1 }}>
                    <ListItemText
                      primary={item.name}
                      primaryTypographyProps={{
                        fontSize: "1rem",
                        fontWeight:
                          item.name === selectedUser ? "bold" : "normal",
                      }}
                    />
                    {selectedTeam === "Super-Admin" && item.status && (
                      <Typography
                        variant="caption"
                        sx={{
                          color: "black",
                          fontSize: { xs: "0.7rem", md: "0.8rem" },
                          display: "block",
                          mt: 0.2,
                        }}
                      >
                        {item.status}
                      </Typography>
                    )}
                  </Box>
                  {item.badgeCount > 0 && (
                    <Badge
                      badgeContent={item.badgeCount}
                      color="error"
                      sx={{ mr: 1 }}
                    />
                  )}
                </ListItem>
              ))}
            </List>
          </Box>

          {/* Chat Window */}
          <Box
            sx={{
              width: { xs: "100%", md: "985px" },
              display: "flex",
              flexDirection: "column",
              border: "1px solid #CACACA",
              borderRadius: "8px",
              overflow: "hidden",
              backgroundColor: "#F5F7FA",
              height: { xs: "auto", md: "100%" },
              flexShrink: 0,
              flexGrow: 0,
            }}
          >
            {/* Chat Header with Avatar */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                p: 2.5,
                backgroundColor: "white",
                borderBottom: "1px solid #E0E0E0",
                borderTopLeftRadius: "16px",
                borderTopRightRadius: "16px",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Avatar
                  src={selectedUserAvatar}
                  sx={{
                    width: { xs: 32, md: 40 },
                    height: { xs: 32, md: 40 },
                    mr: 1.5,
                  }}
                />
                <Box>
                  <Typography
                    variant="subtitle1"
                    sx={{
                      fontWeight: "bold",
                      fontSize: { xs: "1rem", md: "1.2rem" },
                    }}
                  >
                    {selectedUser}
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{
                      color: "#B0BEC5",
                      fontSize: { xs: "0.8rem", md: "0.9rem" },
                    }}
                  >
                    [
                    {selectedTeam === "Super-Admin"
                      ? "Direct Message"
                      : "Group Chat"}
                    ]
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ display: "flex" }}>
                <IconButton>
                  <VisibilityIcon
                    sx={{ color: "#B0BEC5", fontSize: "1.5rem" }}
                  />
                </IconButton>
                <IconButton>
                  <MicIcon sx={{ color: "#B0BEC5", fontSize: "1.5rem" }} />
                </IconButton>
                <IconButton>
                  <ArrowForwardIcon
                    sx={{ color: "#B0BEC5", fontSize: "1.5rem" }}
                  />
                </IconButton>
              </Box>
            </Box>

            {/* Message List */}
            <Box
              ref={messagesEndRef} // Attach the ref to the message list container
              sx={{
                flex: 1,
                overflowY: "auto",
                p: 2,
                backgroundColor: "white",
                "&::-webkit-scrollbar": {
                  width: "8px",
                },
                "&::-webkit-scrollbar-track": {
                  background: "#f1f1f1",
                },
                "&::-webkit-scrollbar-thumb": {
                  background: "#8BD4E7",
                  borderRadius: "4px",
                },
                "&::-webkit-scrollbar-thumb:hover": {
                  background: "#72c1d9",
                },
                scrollbarWidth: "thin",
                scrollbarColor: "#8BD4E7 #f1f1f1",
              }}
            >
              <Stack spacing={3}>
                {messages.map((msg) => (
                  <Box
                    key={msg.id}
                    sx={{
                      display: "flex",
                      justifyContent: msg.isCurrentUser
                        ? "flex-end"
                        : "flex-start",
                      width: "100%",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        maxWidth: { xs: "90%", md: "70%" },
                        flexDirection: msg.isCurrentUser
                          ? "row-reverse"
                          : "row",
                      }}
                    >
                      <Avatar
                        sx={{
                          bgcolor: msg.avatarColor,
                          width: { xs: 32, md: 40 },
                          height: { xs: 32, md: 40 },
                          mr: msg.isCurrentUser ? 0 : 1.5,
                          ml: msg.isCurrentUser ? 1.5 : 0,
                          fontSize: "1rem",
                        }}
                      >
                        {msg.avatarInitial}
                      </Avatar>
                      <Box>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: msg.isCurrentUser
                              ? "flex-end"
                              : "flex-start",
                            mb: 0.5,
                          }}
                        >
                          <Typography
                            variant="body2"
                            sx={{
                              fontWeight: "bold",
                              fontSize: { xs: "0.8rem", md: "0.9rem" },
                              mr: msg.isCurrentUser ? 0 : 1,
                              ml: msg.isCurrentUser ? 1 : 0,
                            }}
                          >
                            {msg.user}
                          </Typography>
                        </Box>
                        <Box
                          sx={{
                            bgcolor: msg.isCurrentUser ? "#E3F2FD" : "white",
                            p: 1.5,
                            borderRadius: "12px",
                            boxShadow: "none",
                            border: msg.isCurrentUser
                              ? "none"
                              : "1px solid #E0E0E0",
                            display: "flex",
                            alignItems: "center",
                            maxWidth: "100%",
                            overflowWrap: "break-word",
                          }}
                        >
                          <Typography
                            variant="body2"
                            sx={{
                              fontSize: { xs: "0.8rem", md: "0.9rem" },
                              color: "#212121",
                              wordBreak: "break-word",
                            }}
                          >
                            {msg.fileUrl ? (
                              <>
                                {msg.message.split(" (")[0]}{" "}
                                <a
                                  href={msg.fileUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  style={{
                                    color: "#1976d2",
                                    textDecoration: "underline",
                                  }}
                                >
                                  ({msg.message.split(" (")[1]})
                                </a>
                              </>
                            ) : (
                              msg.message
                            )}
                          </Typography>
                          {msg.fileUrl && (
                            <IconButton
                              href={msg.fileUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              sx={{ ml: 1, p: 0 }}
                            >
                              <VisibilityIcon
                                sx={{ fontSize: "1rem", color: "#1976d2" }}
                              />
                            </IconButton>
                          )}
                        </Box>
                        <Typography
                          variant="caption"
                          color="textSecondary"
                          sx={{
                            fontSize: { xs: "0.6rem", md: "0.7rem" },
                            display: "block",
                            mt: 0.5,
                            textAlign: msg.isCurrentUser ? "right" : "left",
                          }}
                        >
                          {msg.timestamp}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                ))}
              </Stack>

              {isTyping && (
                <Box sx={{ mt: 2, display: "flex", alignItems: "center" }}>
                  <Typography variant="caption" sx={{ color: "#B0BEC5" }}>
                    <Chip
                      label="Awais is typing..."
                      size="small"
                      sx={{
                        backgroundColor: "#F5F7FA",
                        color: "#B0BEC5",
                        fontWeight: "normal",
                        fontSize: "0.8rem",
                      }}
                    />
                  </Typography>
                </Box>
              )}
            </Box>

            {/* Message Input */}
            <Box
              sx={{
                p: 1.5,
                borderRadius: "43px",
                border: "1px solid #E0E0E0",
                marginBottom: "3px",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <IconButton component="label" sx={{ mr: 1 }}>
                  <AttachFileIcon
                    sx={{
                      color: "#000000",
                      fontSize: { xs: "1.5rem", md: "1.9rem" },
                      transform: "rotate(45deg)",
                    }}
                  />
                  <input
                    type="file"
                    hidden
                    onChange={handleFileChange}
                    accept="image/*,application/pdf"
                  />
                </IconButton>
                <Box
                  sx={{
                    width: "1px",
                    height: "40px",
                    backgroundColor: "#C0C0C0",
                  }}
                />
                <TextField
                  fullWidth
                  variant="outlined"
                  placeholder="Type your message..."
                  size="small"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  sx={{
                    backgroundColor: "#F5F7FA",
                    borderRadius: "20px",
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": { border: "none" },
                      "&:hover fieldset": { border: "none" },
                      "&.Mui-focused fieldset": { border: "none" },
                    },
                    "& .MuiInputBase-input": {
                      fontSize: { xs: "0.8rem", md: "0.9rem" },
                      padding: "8px 12px",
                    },
                  }}
                />
                <IconButton
                  color="primary"
                  onClick={handleSendMessage}
                  sx={{
                    ml: 1,
                    bgcolor: "#8BD4E7",
                    "&:hover": { bgcolor: "#72c1d9" },
                    p: 1,
                  }}
                >
                  <SendIcon sx={{ fontSize: { xs: "1.2rem", md: "1.5rem" } }} />
                </IconButton>
              </Box>
              {selectedFile && (
                <Typography
                  variant="caption"
                  sx={{
                    mt: 1,
                    color: "#B0BEC5",
                    fontSize: { xs: "0.7rem", md: "0.875rem" },
                  }}
                >
                  Selected file: {selectedFile.name} (
                  {Math.round(selectedFile.size / 1024)} KB)
                </Typography>
              )}
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ChatMessage;
