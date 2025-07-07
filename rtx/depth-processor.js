let depthAI = null;

export async function initDepth() {
  try {
    const response = await fetch('/rtx/zoe_depth.wasm');
    const wasmBuffer = await response.arrayBuffer();
    depthAI = await WebAssembly.instantiate(wasmBuffer);
    console.log('Depth processor initialized');
  } catch (error) {
    console.error('Failed to initialize depth processor:', error);
  }
}

export function processFrame(video) {
  if (!depthAI) return null;
  return depthAI.estimateDepth(video);
}

initDepth();
