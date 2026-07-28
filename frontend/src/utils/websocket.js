import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";

    export const createWebSocketClient = (onMessageReceived, auctionId) => {
  const token = sessionStorage.getItem("jwtToken") || sessionStorage.getItem("token") || "";

  const stompClient = new Client({
    brokerURL: "", // Leave blank because we are supplying a custom SockJS factory
    webSocketFactory: () => new SockJS("http://localhost:8080/bids/ws"),
    connectHeaders: token ? {
      Authorization: `Bearer ${token}`
    } : {},
    debug: function (str) {
      console.log("[STOMP Debug] ", str);
    },
    reconnectDelay: 5000, // Handle auto-reconnection after 5sec if drops
    heartbeatIncoming: 4000,
    heartbeatOutgoing: 4000
  });

  stompClient.onConnect = (frame) => {
    console.log("Connected to STOMP over WebSocket");
    
    // Subscribe to live bid updates for the specific auction
    stompClient.subscribe(`/topic/auction/${auctionId}`, (message) => {
      if (message.body) {
        try {
          const bidUpdate = JSON.parse(message.body);
          onMessageReceived(bidUpdate);
        } catch (error) {
          console.error("Failed to parse live bid update message:", error);
        }
      }
    });
  };

  stompClient.onStompError = (frame) => {
    console.error("STOMP protocol error encountered:", frame.headers["message"]);
    console.error("Error details:", frame.body);
  };

  stompClient.onWebSocketClose = () => {
    console.log("WebSocket connection closed");
  };

  stompClient.activate();

  // Return unsubscribe/deactivate clean cleanup function
  return () => {
    if (stompClient.active) {
      stompClient.deactivate();
      console.log("Deactivated STOMP connection client");
    }
  };
};
