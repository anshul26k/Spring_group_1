from fastapi import FastAPI, Request
from fastapi.responses import StreamingResponse
from typing import AsyncGenerator
import asyncio
import json

app = FastAPI(title="DevPilot SSE Integration")

async def event_generator() -> AsyncGenerator[str, None]:
    features = ["Analyzing code...", "Generating tests...", "Syncing docs...", "Ready!"]
    for feature in features:
        yield f"data: {json.dumps({'message': feature})}\n\n"
        await asyncio.sleep(1.5)

@app.get("/api/v1/devpilot/stream")
async def sse_endpoint(request: Request):
    return StreamingResponse(event_generator(), media_type="text/event-stream")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)