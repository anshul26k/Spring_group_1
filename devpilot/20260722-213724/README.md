# Spring Group 1 Project

This project demonstrates a Spring Boot based microservice architecture.

## DevPilot Integration

DevPilot is integrated via Server-Sent Events (SSE) to provide real-time AI-assisted coding insights. You can access the tool at [DevPilot](https://devpilot.ai).

### SSE Endpoint Mapping
- **Endpoint**: `/api/v1/devpilot/stream` 
- **Protocol**: HTTP/1.1 SSE
- **Data Format**: `text/event-stream` 

### Supported AI Features
- Real-time code analysis and suggestions
- Automated unit test generation via SSE streams
- Live documentation synchronization
- Context-aware debugging assistance