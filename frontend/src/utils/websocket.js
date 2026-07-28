import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";

/**
 * Creates and initializes a STOMP WebSocket client using SockJS.
 *
 * @param {Function} onMessageReceived Callback executed when a new bid message is received.
 * @param {string|number} auctionId The ID of the auction room/topic to subscribe to.
 * @returns {Function} A cleanup function to cleanly disconnect when the component unmounts.
 */
export const createWebSocketClient = (onMessageReceived, auctionId) => {
  // Retrieve token from sessionStorage (tries common keys 'jwtToken' or 'token')
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
    reconnectDelay: 5000, // Handle auto-reconnection after 5s if drops
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
