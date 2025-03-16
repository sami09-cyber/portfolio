// "use client"
//
// import type React from "react"
//
// import { useState, useRef, useEffect } from "react"
// import { motion, AnimatePresence } from "framer-motion"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
// import { ScrollArea } from "@/components/ui/scroll-area"
// import { MessageSquare, X, Send, Bot, User, ChevronDown, ChevronUp, Trash2, ArrowUp } from "lucide-react"
//
//
// type Message = {
//   id: number
//   text: string
//   sender: "user" | "bot"
//   timestamp: Date
// }
//
// interface FloatingChatbotProps {
//   title?: string
//   botAvatar?: string
//   userAvatar?: string
//   position?: "bottom-right" | "bottom-left" | "top-right" | "top-left"
//   initiallyOpen?: boolean
//   welcomeMessage?: string
//   theme?: "light" | "dark" | "system"
// }
//
// export function FloatingChatbot({
//                                   title,
//                                   botAvatar = "",
//                                   userAvatar = "",
//                                   position = "bottom-right",
//                                   initiallyOpen = false,
//                                   welcomeMessage = "Bonjour ! Comment puis-je vous aider aujourd'hui ?",
//                                   theme = "system",
//                                 }: FloatingChatbotProps) {
//   const [isOpen, setIsOpen] = useState(initiallyOpen)
//   const [isMinimized, setIsMinimized] = useState(false)
//   const [messages, setMessages] = useState<Message[]>([])
//   const [input, setInput] = useState("")
//   const [isTyping, setIsTyping] = useState(false)
//   const [showScrollTop, setShowScrollTop] = useState(false)
//   const inputRef = useRef<HTMLInputElement>(null!)
//   const messagesEndRef = useRef<HTMLDivElement>(null!)
//
//   // Position classes based on the position prop
//   const positionClasses = {
//     "bottom-right": "bottom-4 right-4",
//     "bottom-left": "bottom-4 left-4",
//     "top-right": "top-4 right-4",
//     "top-left": "top-4 left-4",
//   }
//
//   // Add welcome message on first render
//   useEffect(() => {
//     if (welcomeMessage) {
//       setMessages([
//         {
//           id: 1,
//           text: welcomeMessage,
//           sender: "bot",
//           timestamp: new Date(),
//         },
//       ])
//     }
//   }, [welcomeMessage])
//
//   // Auto-scroll to bottom when new messages are added
//   useEffect(() => {
//     if (messagesEndRef.current) {
//       requestAnimationFrame(() => {
//         messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
//       })
//     }
//   }, [messages, isTyping]) // Ajout de isTyping comme dépendance
//
//   // Focus input when chat is opened
//   useEffect(() => {
//     if (typeof window !== "undefined" && isOpen && !isMinimized && inputRef.current) {
//       inputRef.current.focus()
//     }
//   }, [isOpen, isMinimized])
//
//   // Sample bot responses for demo
//   const botResponses = [
//     "Je suis là pour vous aider avec toutes vos questions.",
//     "N'hésitez pas à me demander des informations sur nos services.",
//     "Je peux vous aider à naviguer sur notre site web.",
//     "Avez-vous besoin d'aide pour trouver quelque chose de spécifique ?",
//     "Je suis un assistant virtuel, je ferai de mon mieux pour répondre à vos questions.",
//     "Merci pour votre message. Comment puis-je vous aider davantage ?",
//   ]
//
//   const handleSendMessage = (e: React.FormEvent) => {
//     e.preventDefault()
//     if (!input.trim()) return
//
//     // Add user message
//     const userMessage: Message = {
//       id: messages[0].id + 1,
//       text: input,
//       sender: "user",
//       timestamp: new Date(),
//     }
//     setMessages((prev) => [...prev, userMessage])
//     setInput("")
//     setIsTyping(true)
//
//     // Simulate bot response after a delay
//     setTimeout(
//         () => {
//           const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)]
//           const botMessage: Message = {
//             id: messages[0].id + 1,
//             text: randomResponse,
//             sender: "bot",
//             timestamp: new Date(),
//           }
//           setMessages((prev) => [...prev, botMessage])
//           setIsTyping(false)
//         },
//         1000 + Math.random() * 1000,
//     ) // Random delay between 1-2 seconds
//   }
//
//   const toggleChat = () => {
//     if (!isOpen) {
//       setIsOpen(true)
//       setIsMinimized(false)
//     } else {
//       setIsOpen(false)
//     }
//   }
//
//   const toggleMinimize = () => {
//     setIsMinimized(!isMinimized)
//   }
//
//   // Format time for messages
//   const formatTime = (date: Date) => {
//     return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
//   }
//
//   const scrollToTop = () => {
//     if (messagesEndRef.current && messagesEndRef.current.parentElement) {
//       messagesEndRef.current.parentElement.scrollTo({
//         top: 0,
//         behavior: "smooth",
//       })
//     }
//   }
//
//   return (
//       <>
//         {/* Floating button when chat is closed */}
//         {!isOpen && (
//             <motion.div
//                 className={`fixed ${positionClasses[position]} z-50`}
//                 initial={{ scale: 0.8, opacity: 0 }}
//                 animate={{ scale: 1, opacity: 1 }}
//                 exit={{ scale: 0.8, opacity: 0 }}
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//             >
//               <Button
//                   onClick={toggleChat}
//                   size="icon"
//                   className="h-14 w-14 rounded-full shadow-lg bg-primary hover:bg-primary/90"
//                   aria-label= "Ouvrir le chat"
//               >
//                 <MessageSquare className="h-6 w-6" />
//               </Button>
//             </motion.div>
//         )}
//
//         {/* Chat window */}
//         <AnimatePresence>
//           {isOpen && (
//               <motion.div
//                   className={`fixed ${positionClasses[position]} z-50 flex flex-col bg-background border border-border rounded-lg shadow-xl overflow-hidden`}
//                   initial={{ opacity: 0, y: 20, width: "90%", height: "70vh", maxWidth: "400px" }}
//                   animate={{
//                     opacity: 1,
//                     y: 0,
//                     width: "90%",
//                     height: isMinimized ? "auto" : "70vh",
//                     maxWidth: "400px",
//                   }}
//                   exit={{ opacity: 0, y: 20 }}
//                   transition={{ duration: 0.2 }}
//               >
//                 {/* Chat header - toujours visible */}
//                 <div className="flex items-center justify-between p-3 border-b border-border bg-primary text-primary-foreground sticky top-0 z-10">
//                   <div className="flex items-center gap-2">
//                     <Avatar className="h-8 w-8">
//                       {botAvatar ? (
//                           <AvatarImage src={botAvatar} alt={title} />
//                       ) : (
//                           <AvatarFallback className="bg-primary-foreground text-primary">
//                             <Bot className="h-4 w-4" />
//                           </AvatarFallback>
//                       )}
//                     </Avatar>
//                     <div className="font-medium">{title}</div>
//                   </div>
//                   <div className="flex items-center gap-1">
//                     <Button
//                         variant="ghost"
//                         size="icon"
//                         className="h-8 w-8 text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground"
//                         onClick={() => {
//                           // Reset messages to just the welcome message
//                           setMessages([
//                             {
//                               id: 1,
//                               text: welcomeMessage ?? "Bienvenue ! Comment puis-je vous aider ?",
//                               sender: "bot",
//                               timestamp: new Date(),
//                             }
//                           ])
//                         }}
//                         aria-label="Effacer la conversation"
//                     >
//                       <Trash2 className="h-4 w-4" />
//                     </Button>
//                     <Button
//                         variant="ghost"
//                         size="icon"
//                         className="h-8 w-8 text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground"
//                         onClick={toggleMinimize}
//                         aria-label={isMinimized ? "Agrandir le chat" : "Réduire le chat"}
//                     >
//                       {isMinimized ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
//                     </Button>
//                     <Button
//                         variant="ghost"
//                         size="icon"
//                         className="h-8 w-8 text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground"
//                         onClick={toggleChat}
//                         aria-label="Fermer le chat"
//                     >
//                       <X className="h-4 w-4" />
//                     </Button>
//                   </div>
//                 </div>
//
//                 {/* Chat content - only shown when not minimized */}
//                 <AnimatePresence>
//                   {!isMinimized && (
//                       <motion.div
//                           className="flex-1 flex flex-col overflow-hidden" // Ajout de overflow-hidden
//                           initial={{ opacity: 0, height: 0 }}
//                           animate={{ opacity: 1, height: "auto" }}
//                           exit={{ opacity: 0, height: 0 }}
//                           transition={{ duration: 0.2 }}
//                       >
//                         {/* Messages area */}
//                         {/*<ScrollArea className="flex-1 p-4">*/}
//                         {/*  <div className="space-y-4">*/}
//                         {/*    {messages.map((message, index) => (*/}
//                         {/*        <div*/}
//                         {/*            key={index}*/}
//                         {/*            className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}*/}
//                         {/*        >*/}
//                         {/*          <div className="flex items-start gap-2 max-w-[80%]">*/}
//                         {/*            {message.sender === "bot" && (*/}
//                         {/*                <Avatar className="h-8 w-8 mt-1">*/}
//                         {/*                  {botAvatar ? (*/}
//                         {/*                      <AvatarImage src={botAvatar} alt={title} />*/}
//                         {/*                  ) : (*/}
//                         {/*                      <AvatarFallback className="bg-primary text-primary-foreground">*/}
//                         {/*                        <Bot className="h-4 w-4" />*/}
//                         {/*                      </AvatarFallback>*/}
//                         {/*                  )}*/}
//                         {/*                </Avatar>*/}
//                         {/*            )}*/}
//                         {/*            <div*/}
//                         {/*                className={`p-3 rounded-lg ${*/}
//                         {/*                    message.sender === "user" ? "bg-primary text-primary-foreground" : "bg-muted"*/}
//                         {/*                }`}*/}
//                         {/*            >*/}
//                         {/*              <p className="whitespace-pre-wrap break-words">{message.text}</p>*/}
//                         {/*              <p*/}
//                         {/*                  className={`text-xs mt-1 ${*/}
//                         {/*                      message.sender === "user" ? "text-primary-foreground/70" : "text-muted-foreground"*/}
//                         {/*                  }`}*/}
//                         {/*              >*/}
//                         {/*                {formatTime(message.timestamp)}*/}
//                         {/*              </p>*/}
//                         {/*            </div>*/}
//                         {/*            {message.sender === "user" && (*/}
//                         {/*                <Avatar className="h-8 w-8 mt-1">*/}
//                         {/*                  {userAvatar ? (*/}
//                         {/*                      <AvatarImage src={userAvatar} alt="Vous" />*/}
//                         {/*                  ) : (*/}
//                         {/*                      <AvatarFallback className="bg-secondary text-secondary-foreground">*/}
//                         {/*                        <User className="h-4 w-4" />*/}
//                         {/*                      </AvatarFallback>*/}
//                         {/*                  )}*/}
//                         {/*                </Avatar>*/}
//                         {/*            )}*/}
//                         {/*          </div>*/}
//                         {/*        </div>*/}
//                         {/*    ))}*/}
//
//                         {/*    /!* Typing indicator *!/*/}
//                         {/*    {isTyping && (*/}
//                         {/*        <div className="flex justify-start">*/}
//                         {/*          <div className="flex items-start gap-2 max-w-[80%]">*/}
//                         {/*            <Avatar className="h-8 w-8 mt-1">*/}
//                         {/*              {botAvatar ? (*/}
//                         {/*                  <AvatarImage src={botAvatar} alt={title} />*/}
//                         {/*              ) : (*/}
//                         {/*                  <AvatarFallback className="bg-primary text-primary-foreground">*/}
//                         {/*                    <Bot className="h-4 w-4" />*/}
//                         {/*                  </AvatarFallback>*/}
//                         {/*              )}*/}
//                         {/*            </Avatar>*/}
//                         {/*            <div className="p-3 rounded-lg bg-muted">*/}
//                         {/*              <div className="flex space-x-1">*/}
//                         {/*                <div className="w-2 h-2 rounded-full bg-muted-foreground/50 animate-bounce"></div>*/}
//                         {/*                <div*/}
//                         {/*                    className="w-2 h-2 rounded-full bg-muted-foreground/50 animate-bounce"*/}
//                         {/*                    style={{ animationDelay: "0.2s" }}*/}
//                         {/*                ></div>*/}
//                         {/*                <div*/}
//                         {/*                    className="w-2 h-2 rounded-full bg-muted-foreground/50 animate-bounce"*/}
//                         {/*                    style={{ animationDelay: "0.4s" }}*/}
//                         {/*                ></div>*/}
//                         {/*              </div>*/}
//                         {/*            </div>*/}
//                         {/*          </div>*/}
//                         {/*        </div>*/}
//                         {/*    )}*/}
//
//                         {/*    /!* Invisible element to scroll to *!/*/}
//                         {/*    <div ref={messagesEndRef} />*/}
//                         {/*  </div>*/}
//                         {/*</ScrollArea>*/}
//
//                         <ScrollArea
//                             className="flex-1 p-4"
//                             onScroll={(e) => {
//                               const target = e.currentTarget
//                               setShowScrollTop(target.scrollTop > 300)
//                             }}
//                         >
//                           <div className="space-y-4">
//                             {messages.map((message, index) => (
//                                 <div
//                                     key={index}
//                                     className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
//                                 >
//                                   <div className="flex items-start gap-2 max-w-[80%]">
//                                     {message.sender === "bot" && (
//                                         <Avatar className="h-8 w-8 mt-1">
//                                           {botAvatar ? (
//                                               <AvatarImage src={botAvatar} alt={title} />
//                                           ) : (
//                                               <AvatarFallback className="bg-primary text-primary-foreground">
//                                                 <Bot className="h-4 w-4" />
//                                               </AvatarFallback>
//                                           )}
//                                         </Avatar>
//                                     )}
//                                     <div
//                                         className={`p-3 rounded-lg ${
//                                             message.sender === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
//                                         }`}
//                                     >
//                                       <p className="whitespace-pre-wrap break-words">{message.text}</p>
//                                       <p
//                                           className={`text-xs mt-1 ${
//                                               message.sender === "user" ? "text-primary-foreground/70" : "text-muted-foreground"
//                                           }`}
//                                       >
//                                         {formatTime(message.timestamp)}
//                                       </p>
//                                     </div>
//                                     {message.sender === "user" && (
//                                         <Avatar className="h-8 w-8 mt-1">
//                                           {userAvatar ? (
//                                               <AvatarImage src={userAvatar} alt="Vous" />
//                                           ) : (
//                                               <AvatarFallback className="bg-secondary text-secondary-foreground">
//                                                 <User className="h-4 w-4" />
//                                               </AvatarFallback>
//                                           )}
//                                         </Avatar>
//                                     )}
//                                   </div>
//                                 </div>
//                             ))}
//
//                             {/* Typing indicator */}
//                             {isTyping && (
//                                 <div className="flex justify-start">
//                                   <div className="flex items-start gap-2 max-w-[80%]">
//                                     <Avatar className="h-8 w-8 mt-1">
//                                       {botAvatar ? (
//                                           <AvatarImage src={botAvatar} alt={title} />
//                                       ) : (
//                                           <AvatarFallback className="bg-primary text-primary-foreground">
//                                             <Bot className="h-4 w-4" />
//                                           </AvatarFallback>
//                                       )}
//                                     </Avatar>
//                                     <div className="p-3 rounded-lg bg-muted">
//                                       <div className="flex space-x-1">
//                                         <div className="w-2 h-2 rounded-full bg-muted-foreground/50 animate-bounce"></div>
//                                         <div
//                                             className="w-2 h-2 rounded-full bg-muted-foreground/50 animate-bounce"
//                                             style={{ animationDelay: "0.2s" }}
//                                         ></div>
//                                         <div
//                                             className="w-2 h-2 rounded-full bg-muted-foreground/50 animate-bounce"
//                                             style={{ animationDelay: "0.4s" }}
//                                         ></div>
//                                       </div>
//                                     </div>
//                                   </div>
//                                 </div>
//                             )}
//
//                             {/* Invisible element to scroll to */}
//                             <div ref={messagesEndRef} />
//                           </div>
//                           {showScrollTop && (
//                               <Button
//                                   onClick={scrollToTop}
//                                   size="icon"
//                                   className="h-8 w-8 rounded-full shadow-md fixed bottom-20 right-4 z-10 bg-primary hover:bg-primary/90"
//                                   aria-label="Remonter en haut"
//                               >
//                                 <ArrowUp className="h-4 w-4" />
//                               </Button>
//                           )}
//                         </ScrollArea>
//
//                         {/* Input area */}
//                         <form onSubmit={handleSendMessage} className="p-3 border-t border-border">
//                           <div className="flex gap-2">
//                             <Input
//                                 ref={inputRef}
//                                 value={input}
//                                 onChange={(e) => setInput(e.target.value)}
//                                 placeholder="Écrivez votre message..."
//                                 className="flex-1"
//                             />
//                             <Button type="submit" size="icon" disabled={!input.trim()}>
//                               <Send className="h-4 w-4" />
//                             </Button>
//                           </div>
//                         </form>
//                       </motion.div>
//                   )}
//                 </AnimatePresence>
//               </motion.div>
//           )}
//         </AnimatePresence>
//       </>
//   )
// }
//




















"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { MessageSquare, X, Send, Bot, User, ChevronDown, ChevronUp, Trash2, ArrowUp } from "lucide-react"

type Message = {
  id: number
  text: string
  sender: "user" | "bot"
  timestamp: Date
}

interface FloatingChatbotProps {
  title?: string
  botAvatar?: string
  userAvatar?: string
  position?: "bottom-right" | "bottom-left" | "top-right" | "top-left"
  initiallyOpen?: boolean
  welcomeMessage?: string
  theme?: "light" | "dark" | "system"
}

export function FloatingChatbot({
                                  title,
                                  botAvatar = "",
                                  userAvatar = "",
                                  position = "bottom-right",
                                  initiallyOpen = false,
                                  welcomeMessage = "Bonjour ! Comment puis-je vous aider aujourd'hui ?",
                                  theme = "system",
                                }: FloatingChatbotProps) {
  const [isOpen, setIsOpen] = useState(initiallyOpen)
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null!)
  const messagesEndRef = useRef<HTMLDivElement>(null!)
  const scrollAreaRef = useRef<HTMLDivElement>(null!)
  const [showScrollTop, setShowScrollTop] = useState(false)

  // Position classes based on the position prop
  const positionClasses = {
    "bottom-right": "bottom-4 right-4",
    "bottom-left": "bottom-4 left-4",
    "top-right": "top-4 right-4",
    "top-left": "top-4 left-4",
  }

  // Add welcome message on first render
  useEffect(() => {
    if (welcomeMessage) {
      setMessages([
        {
          id: 1,
          text: welcomeMessage,
          sender: "bot",
          timestamp: new Date(),
        },
      ])
    }
  }, [welcomeMessage])

  // Auto-scroll to bottom when new messages are added
  useEffect(() => {
    if (messagesEndRef.current) {
      requestAnimationFrame(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
      })
    }
  }, [messages, isTyping]) // Ajout de isTyping comme dépendance

  // Focus input when chat is opened
  useEffect(() => {
    if (typeof window !== "undefined" && isOpen && !isMinimized && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen, isMinimized])

  // Sample bot responses for demo
  const botResponses = [
    "Je suis là pour vous aider avec toutes vos questions.",
    "N'hésitez pas à me demander des informations sur nos services.",
    "Je peux vous aider à naviguer sur notre site web.",
    "Avez-vous besoin d'aide pour trouver quelque chose de spécifique ?",
    "Je suis un assistant virtuel, je ferai de mon mieux pour répondre à vos questions.",
    "Merci pour votre message. Comment puis-je vous aider davantage ?",
  ]

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    // Add user message
    const userMessage: Message = {
      id: messages.length + 1,
      text: input,
      sender: "user",
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsTyping(true)

    // Simulate bot response after a delay
    setTimeout(
        () => {
          const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)]
          const botMessage: Message = {
            id: messages.length + 2,
            text: randomResponse,
            sender: "bot",
            timestamp: new Date(),
          }
          setMessages((prev) => [...prev, botMessage])
          setIsTyping(false)
        },
        1000 + Math.random() * 1000,
    ) // Random delay between 1-2 seconds
  }

  const toggleChat = () => {
    if (!isOpen) {
      setIsOpen(true)
      setIsMinimized(false)
    } else {
      setIsOpen(false)
    }
  }

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized)
  }

  // Format time for messages
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  const scrollToTop = () => {
    if (scrollAreaRef.current) {
      // Accéder directement à l'élément qui contient le défilement
      const scrollContainer = scrollAreaRef.current.querySelector("[data-radix-scroll-area-viewport]")
      if (scrollContainer) {
        scrollContainer.scrollTo({
          top: 0,
          behavior: "smooth",
        })
      }
    }
  }

  // Détecter le défilement pour afficher/masquer le bouton de retour en haut
  useEffect(() => {
    if (!scrollAreaRef.current || !isOpen || isMinimized) return

    const scrollContainer = scrollAreaRef.current.querySelector("[data-radix-scroll-area-viewport]")
    if (!scrollContainer) return

    const handleScroll = () => {
      setShowScrollTop(scrollContainer.scrollTop > 300)
    }

    scrollContainer.addEventListener("scroll", handleScroll)
    return () => {
      scrollContainer.removeEventListener("scroll", handleScroll)
    }
  }, [isOpen, isMinimized])

  // Générer des messages de test pour démontrer le défilement
  const addTestMessages = () => {
    const newMessages = []
    for (let i = 0; i < 20; i++) {
      newMessages.push({
        id: messages.length + i + 1,
        text: `Message de test ${i + 1} pour démontrer le défilement`,
        sender: i % 2 === 0 ? "bot" : "user",
        timestamp: new Date(),
      })
    }
    setMessages((prev) => [...prev, ...newMessages])
  }

  return (
      <>
        {/* Floating button when chat is closed */}
        {!isOpen && (
            <motion.div
                className={`fixed ${positionClasses[position]} z-50`}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
              <Button
                  onClick={toggleChat}
                  size="icon"
                  className="h-14 w-14 rounded-full shadow-lg bg-primary hover:bg-primary/90"
                  aria-label="Ouvrir le chat"
              >
                <MessageSquare className="h-6 w-6" />
              </Button>
            </motion.div>
        )}

        {/* Chat window */}
        <AnimatePresence>
          {isOpen && (
              <motion.div
                  className={`fixed ${positionClasses[position]} z-50 flex flex-col bg-background border border-border rounded-lg shadow-xl overflow-hidden`}
                  initial={{ opacity: 0, y: 20, width: "90%", height: "70vh", maxWidth: "400px" }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    width: "90%",
                    height: isMinimized ? "auto" : "70vh",
                    maxWidth: "400px",
                  }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.2 }}
              >
                {/* Chat header - toujours visible */}
                <div className="flex items-center justify-between p-3 border-b border-border bg-primary text-primary-foreground sticky top-0 z-10">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      {botAvatar ? (
                          <AvatarImage src={botAvatar} alt={title} />
                      ) : (
                          <AvatarFallback className="bg-primary-foreground text-primary">
                            <Bot className="h-4 w-4" />
                          </AvatarFallback>
                      )}
                    </Avatar>
                    <div className="font-medium">{title || "Assistant"}</div>
                  </div>
                  <div className="flex items-center gap-1">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground"
                        onClick={addTestMessages}
                        aria-label="Ajouter des messages de test"
                    >
                      <span className="text-xs">+20</span>
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground"
                        onClick={() => {
                          // Reset messages to just the welcome message
                          setMessages([
                            {
                              id: 1,
                              text: welcomeMessage ?? "Bienvenue ! Comment puis-je vous aider ?",
                              sender: "bot",
                              timestamp: new Date(),
                            },
                          ])
                        }}
                        aria-label="Effacer la conversation"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground"
                        onClick={toggleMinimize}
                        aria-label={isMinimized ? "Agrandir le chat" : "Réduire le chat"}
                    >
                      {isMinimized ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground"
                        onClick={toggleChat}
                        aria-label="Fermer le chat"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Chat content - only shown when not minimized */}
                <AnimatePresence>
                  {!isMinimized && (
                      <motion.div
                          className="flex-1 flex flex-col overflow-hidden"
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.2 }}
                      >
                        {/* Messages area */}
                        <div className="relative flex-1">
                          <ScrollArea
                              className="h-full max-h-[calc(70vh-120px)] p-4"
                              ref={scrollAreaRef}
                              type="always" // Toujours afficher la barre de défilement
                          >
                            <div className="space-y-4">
                              {messages.map((message, index) => (
                                  <div
                                      key={index}
                                      className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                                  >
                                    <div className="flex items-start gap-2 max-w-[80%]">
                                      {message.sender === "bot" && (
                                          <Avatar className="h-8 w-8 mt-1">
                                            {botAvatar ? (
                                                <AvatarImage src={botAvatar} alt={title} />
                                            ) : (
                                                <AvatarFallback className="bg-primary text-primary-foreground">
                                                  <Bot className="h-4 w-4" />
                                                </AvatarFallback>
                                            )}
                                          </Avatar>
                                      )}
                                      <div
                                          className={`p-3 rounded-lg ${
                                              message.sender === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                                          }`}
                                      >
                                        <p className="whitespace-pre-wrap break-words">{message.text}</p>
                                        <p
                                            className={`text-xs mt-1 ${
                                                message.sender === "user" ? "text-primary-foreground/70" : "text-muted-foreground"
                                            }`}
                                        >
                                          {formatTime(message.timestamp)}
                                        </p>
                                      </div>
                                      {message.sender === "user" && (
                                          <Avatar className="h-8 w-8 mt-1">
                                            {userAvatar ? (
                                                <AvatarImage src={userAvatar} alt="Vous" />
                                            ) : (
                                                <AvatarFallback className="bg-secondary text-secondary-foreground">
                                                  <User className="h-4 w-4" />
                                                </AvatarFallback>
                                            )}
                                          </Avatar>
                                      )}
                                    </div>
                                  </div>
                              ))}

                              {/* Typing indicator */}
                              {isTyping && (
                                  <div className="flex justify-start">
                                    <div className="flex items-start gap-2 max-w-[80%]">
                                      <Avatar className="h-8 w-8 mt-1">
                                        {botAvatar ? (
                                            <AvatarImage src={botAvatar} alt={title} />
                                        ) : (
                                            <AvatarFallback className="bg-primary text-primary-foreground">
                                              <Bot className="h-4 w-4" />
                                            </AvatarFallback>
                                        )}
                                      </Avatar>
                                      <div className="p-3 rounded-lg bg-muted">
                                        <div className="flex space-x-1">
                                          <div className="w-2 h-2 rounded-full bg-muted-foreground/50 animate-bounce"></div>
                                          <div
                                              className="w-2 h-2 rounded-full bg-muted-foreground/50 animate-bounce"
                                              style={{ animationDelay: "0.2s" }}
                                          ></div>
                                          <div
                                              className="w-2 h-2 rounded-full bg-muted-foreground/50 animate-bounce"
                                              style={{ animationDelay: "0.4s" }}
                                          ></div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                              )}

                              {/* Invisible element to scroll to */}
                              <div ref={messagesEndRef} />
                            </div>
                            <ScrollBar />
                          </ScrollArea>

                          {/* Bouton de retour en haut */}
                          {showScrollTop && (
                              <Button
                                  onClick={scrollToTop}
                                  size="icon"
                                  className="h-10 w-10 rounded-full shadow-md absolute bottom-4 right-4 z-50 bg-primary hover:bg-primary/90"
                                  aria-label="Remonter en haut"
                              >
                                <ArrowUp className="h-5 w-5" />
                              </Button>
                          )}
                        </div>

                        {/* Input area */}
                        <form onSubmit={handleSendMessage} className="p-3 border-t border-border">
                          <div className="flex gap-2">
                            <Input
                                ref={inputRef}
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Écrivez votre message..."
                                className="flex-1"
                            />
                            <Button type="submit" size="icon" disabled={!input.trim()}>
                              <Send className="h-4 w-4" />
                            </Button>
                          </div>
                        </form>
                      </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
          )}
        </AnimatePresence>
      </>
  )
}

